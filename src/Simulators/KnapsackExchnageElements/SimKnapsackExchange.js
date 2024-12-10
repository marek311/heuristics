import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SolKnapsackExchange from './SolKnapsackExchange';
import KnapsackData from "../../InputDisplay/KnapsackData";
import ChartKnapsackExchange from '../../Charts/ChartKnapsackExchange.js';
import {
    performInitializeSolution,
    performIteration,
    performRun
} from "../../Algorithms/AlgKnapsackExchange";

function SimulationKnapsackExchange() {

    const location = useLocation();
    const navigate = useNavigate();
    const handleGoBack = () => {
        navigate(`/handleInputs?mode=KnapsackExchangeFirst`);
    };

    const [strategy, setStrategy] = useState('bestFit');

    useEffect(() => {
        const path = location.pathname;
        if (path.includes('knapsack-exchange-best-simulation')) {
            setStrategy('bestFit');
        } else if (path.includes('knapsack-exchange-first-simulation')) {
            setStrategy('firstFit');
        }
    }, [location.pathname]);

    const [currentBackpack, setCurrentBackpack] = useState([]);
    const [currentWeight, setCurrentWeight] = useState(0);
    const [currentPrice, setCurrentPrice] = useState(0);

    const {weights, prices, capacity} = location.state || {};
    const items = weights.map((weight, index) => ({
        weight: parseFloat(weight),
        price: parseFloat(prices[index]),
        originalIndex: index
    }));

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

    const handleInitializeSolution = () => {
        const { newBackpack, totalWeight, totalPrice, binaryVector } = performInitializeSolution(
            items,
            capacity,
            generateBinaryVector
        );

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
            generateBinaryVector,
            strategy
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
            generateBinaryVector,
            strategy
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
        handleInitializeSolution();
    };

    useEffect(() => {
        handleInitializeSolution();
    }, []);

    return (
            <div className="flex flex-col w-full h-full text-gray-800 p-6">
                <div className="flex justify-between items-center p-4 bg-white rounded-lg mb-4">
                    <button onClick={handleGoBack} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                        Späť
                    </button>
                    <h2 className="text-lg font-semibold">
                        Simulácia úlohy o batohu výmennou heuristikou
                        - {strategy === 'bestFit' ? 'BEST FIT' : 'FIRST FIT'}!
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
                    <KnapsackData
                        items={items}
                        capacity={capacity}
                        simpleMode={true}
                        showStatus={false}
                        highlightCurrent={false}
                    />
                    <SolKnapsackExchange
                        exchangeHistory={exchangeHistory}
                    />
                    <div className="flex justify-center items-start p-4 bg-white rounded-lg mr-2">
                        <ChartKnapsackExchange
                            currentBackpackPrice={currentPrice}
                            currentBackpackWeight={currentWeight}
                            backpackCapacity={capacity}
                            strategy={strategy}
                        />
                    </div>
                </div>
            </div>
    );
}

export default SimulationKnapsackExchange;
