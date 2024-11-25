import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import InfoKnapsackData from "../InfoWindows/InfoKnapsackData";

function SimulationKnapsackExchange() {
    const location = useLocation();
    const {weights, prices, capacity} = location.state || {};

    const navigate = useNavigate();
    const handleGoBack = () => {
        navigate(`/handleInputs?mode=KnapsackExchangeFirst`);
    };

    const items = weights.map((weight, index) => ({
        weight: parseFloat(weight),
        price: parseFloat(prices[index]),
        originalIndex: index
    }));

    const [currentBackpack, setCurrentBackpack] = useState([]);
    const [currentWeight, setCurrentWeight] = useState(0);
    const [currentPrice, setCurrentPrice] = useState(0);
    const [currentIteration, setCurrentIteration] = useState(0);
    const [solutionHistory, setSolutionHistory] = useState([]);
    const [currentNotBackpack, setCurrentNotBackpack] = useState([...items]);
    const [exchangeHistory, setExchangeHistory] = useState([]);

    const generateBinaryVector = (backpack) => {
        const binaryVector = new Array(items.length).fill(0);
        for (const item of backpack) {
            binaryVector[item.originalIndex] = 1;
        }
        return binaryVector;
    };

    const initializeSolution = () => {
        const newBackpack = [];
        let totalWeight = 0;
        let totalPrice = 0;

        for (const item of items) {
            if (totalWeight + item.weight <= capacity) {
                newBackpack.push(item);
                totalWeight += item.weight;
                totalPrice += item.price;
            }
        }

        const binaryVector = generateBinaryVector(newBackpack);
        setCurrentBackpack(newBackpack);
        setCurrentWeight(totalWeight);
        setCurrentPrice(totalPrice);
        setCurrentNotBackpack(items.filter(item => !newBackpack.includes(item)));
        setSolutionHistory([binaryVector]);

        setExchangeHistory([
            {
                binaryVector,
                newWeight: totalWeight,
                newPrice: totalPrice,
                removed: null,
                added: null,
            }
        ]);
    };

    const performIteration = () => {
        let foundBetter = false;

        for (let i = 0; i < currentBackpack.length; i++) {
            const backpackItem = currentBackpack[i];

            for (const candidate of currentNotBackpack) {
                const potentialWeight = currentWeight - backpackItem.weight + candidate.weight;
                const potentialPrice = currentPrice - backpackItem.price + candidate.price;

                if (potentialWeight <= capacity && potentialPrice > currentPrice) {
                    const newBackpack = [...currentBackpack];
                    newBackpack[i] = candidate;

                    const newNotInBackpack = currentNotBackpack.filter(item => item !== candidate);
                    newNotInBackpack.push(backpackItem);

                    const newTotalWeight = currentWeight - backpackItem.weight + candidate.weight;
                    const newTotalPrice = currentPrice - backpackItem.price + candidate.price;

                    const binaryVector = generateBinaryVector(newBackpack);
                    setCurrentBackpack(newBackpack);
                    setCurrentNotBackpack(newNotInBackpack);
                    setCurrentWeight(newTotalWeight);
                    setCurrentPrice(newTotalPrice);
                    setSolutionHistory([...solutionHistory, binaryVector]);
                    setExchangeHistory(prev => [
                        ...prev,
                        {
                            removed: backpackItem,
                            added: candidate,
                            binaryVector,
                            newWeight: newTotalWeight,
                            newPrice: newTotalPrice,
                        }
                    ]);
                    foundBetter = true;
                    break;
                }
            }
            if (foundBetter) break;
        }
        setCurrentIteration(currentIteration + 1);
    };

    const handleReset = () => {
        setCurrentBackpack([]);
        setCurrentWeight(0);
        setCurrentPrice(0);
        setCurrentIteration(0);
        setSolutionHistory([]);
        setExchangeHistory([]);
        setCurrentNotBackpack([...items]);
        initializeSolution();
    };

    useEffect(() => {
        initializeSolution();
    }, []);

    return (
            <div className="flex flex-col w-full h-full text-gray-800 p-6">
                <div className="flex justify-between items-center p-4 bg-white rounded-lg mb-4">
                    <button onClick={handleGoBack} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                        Späť
                    </button>
                    <h2 className="text-lg font-semibold">
                        Simulácia úlohy o batohu výmennou heuristikou - FIRST FIT!
                    </h2>
                    <div className="space-x-2">
                        <button onClick={performIteration}
                                className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-400">
                            Krok
                        </button>
                        <button className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-400">
                            Spusti
                        </button>
                        <button onClick={handleReset}
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                            Reset
                        </button>
                    </div>
                </div>
                <div className="flex flex-col lg:flex-row w-full h-full">
                    <InfoKnapsackData
                        items={items}
                        capacity={capacity}
                        simpleMode={true}
                        showStatus={false}
                        highlightCurrent={false}
                    />
                    <div className="flex-1 p-4 bg-white rounded-lg mr-2">
                        <h2 className="mb-4 font-semibold">Vykonané výmeny</h2>
                        <div className="flex-1 p-4 bg-white rounded-lg mr-2">
                            <ul className="space-y-4">
                                {exchangeHistory.map((exchange, index) => (
                                    <li key={index} className="p-4 bg-gray-100 rounded">
                                        <p>Iterácia: {index}</p>
                                        <p>Vektor: {exchange.binaryVector.join('; ')}</p>
                                        {exchange.removed && exchange.added ? (
                                            <>
                                                <p>
                                                    Odstránené: {exchange.removed.index},
                                                    Váha: {exchange.removed.weight},
                                                    Cena: {exchange.removed.price}
                                                </p>
                                                <p>
                                                    Pridané: {exchange.added.index},
                                                    Váha: {exchange.added.weight},
                                                    Cena: {exchange.added.price}
                                                </p>
                                            </>
                                        ) : (
                                            <p>Počiatočné riešenie</p>
                                        )}
                                        <p>
                                            Váha: {exchange.newWeight}, Cena: {exchange.newPrice}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="flex-1 p-4 bg-white rounded-lg">
                        <h2 className="font-semibold">Flowchart</h2>
                        <p className="mt-2 text-gray-600">TO_DO!</p>
                    </div>
                </div>
            </div>
    );
}

export default SimulationKnapsackExchange;
