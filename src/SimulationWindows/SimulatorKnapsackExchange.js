import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import InfoKnapsackData from "../InfoWindows/InfoKnapsackData";
import {
    performIteration,
    performRun,
} from "../Algorithms/AlgorithmKnapsackExchangeFistFit";

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
    const [currentNotBackpack, setCurrentNotBackpack] = useState([...items]);
    const [exchangeHistory, setExchangeHistory] = useState([]);
    const [isCompleted, setIsCompleted] = useState(false);

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

        setExchangeHistory([
            {
                binaryVector,
                newWeight: totalWeight,
                newPrice: totalPrice,
                removed: null,
                added: null,
            }
        ]);

        setIsCompleted(false);
    };

    const handleIteration = () => {
        if (isCompleted) return;

        const result = performIteration(
            currentBackpack,
            currentNotBackpack,
            currentWeight,
            currentPrice,
            capacity,
            generateBinaryVector
        );

        setCurrentBackpack(result.updatedBackpack);
        setCurrentNotBackpack(result.updatedNotBackpack);
        setCurrentWeight(result.updatedWeight);
        setCurrentPrice(result.updatedPrice);
        if (result.exchange) {
            setExchangeHistory(prev => [...prev, result.exchange]);
        } else {
            setIsCompleted(true);
        }
    };

    const handleRun = () => {
        if (isCompleted) return;

        const result = performRun(
            currentBackpack,
            currentNotBackpack,
            currentWeight,
            currentPrice,
            capacity,
            generateBinaryVector
        );

        setCurrentBackpack(result.updatedBackpack);
        setCurrentNotBackpack(result.updatedNotBackpack);
        setCurrentWeight(result.updatedWeight);
        setCurrentPrice(result.updatedPrice);
        setExchangeHistory(prev => [...prev, ...result.exchangeHistory]);

        if (result.exchangeHistory.length === 0) {
            setIsCompleted(true);
        }
    };


    const handleReset = () => {
        setCurrentBackpack([]);
        setCurrentWeight(0);
        setCurrentPrice(0);
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
                        <button
                            onClick={handleIteration}
                            className={`px-4 py-2 rounded ${isCompleted ? 'bg-gray-500 cursor-not-allowed' : 'bg-teal-500 hover:bg-teal-400'}`}
                            disabled={isCompleted}>
                            Krok
                        </button>
                        <button
                            onClick={handleRun}
                            className={`px-4 py-2 rounded ${isCompleted ? 'bg-gray-500 cursor-not-allowed' : 'bg-teal-500 hover:bg-teal-400'}`}
                            disabled={isCompleted}>
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
                        <h2 className="mb-4 font-semibold"><strong>Vykonané výmeny</strong></h2>
                        <div className="flex-1 p-4 bg-white rounded-lg mr-2">
                            <ul className="space-y-4">
                                {exchangeHistory.map((exchange, index) => (
                                    <li key={index} className="p-4 bg-gray-100 rounded">
                                        <p>Iterácia: {index}</p>
                                        <p>Vektor: {exchange.binaryVector.join('; ')}</p>
                                        {exchange.removed && exchange.added ? (
                                            <>
                                                <p>
                                                    Odstránené: {exchange.removed.originalIndex},
                                                    Váha: {exchange.removed.weight},
                                                    Cena: {exchange.removed.price}
                                                </p>
                                                <p>
                                                    Pridané: {exchange.added.originalIndex},
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
