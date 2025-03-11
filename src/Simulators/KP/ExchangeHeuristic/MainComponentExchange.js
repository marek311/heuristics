import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../Components/Header';
import KPDataDisplay from "../../../InputHandling/InputDisplay/KP/KPDataDisplay";
import SolutionExchange from './SolutionExchange';
import FlowchartKnapsackExchange from './FlowchartExchange.js';
import {
    performInitializeSolution,
    performIteration,
    performRun
} from "./AlgorithmsExchange";

function MainComponentExchange() {

    const navigate = useNavigate();
    const location = useLocation();

    const {weights, prices, capacity} = location.state || {};
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
    const [highlightLinks, setHighlightLinks] = useState([]);
    const [strategy, setStrategy] = useState('bestFit');

    useEffect(() => {
        const path = location.pathname;
        if (path.includes('knapsack-exchange-best-simulation')) {
            setStrategy('bestFit');
        } else if (path.includes('knapsack-exchange-first-simulation')) {
            setStrategy('firstFit');
        }
    }, [location.pathname]);

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
            strategy,
            setHighlightLinks
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
            strategy,
            setHighlightLinks
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
        setHighlightLinks([]);
        handleInitializeSolution();
    };

    useEffect(() => {
        handleInitializeSolution();
        // eslint-disable-next-line
    }, []);

    return (
    <div className="text-gray-800 p-6">
        <Header
            handleGoBack={() => navigate(-1)}
            title={`Knapsack Problem Simulation Using Exchange Heuristic with ${strategy === 'bestFit' ? 'Best Fit' : 'First Fit'} Strategy`}
            handleStep={handleIteration}
            handleRun={handleRun}
            handleReset={handleReset}
            isDisabled={isCompleted}
        />
        <div className="flex flex-col lg:flex-row w-full" style={{height: '95vh'}}>
            <KPDataDisplay
                items={items}
                capacity={capacity}
                simpleMode={true}
                showStatus={false}
                highlightCurrent={false}
            />
            <SolutionExchange
                exchangeHistory={exchangeHistory}
            />
            <FlowchartKnapsackExchange
                strategy={strategy}
                highlightLinks={highlightLinks}
            />
        </div>
    </div>
    );
}

export default MainComponentExchange;
