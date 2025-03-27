import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../Components/Header';
import KPDataDisplay from "../../../InputHandling/InputDisplay/KP/KPDataDisplay";
import SolutionExchange from './SolutionExchange';
import FlowchartKnapsackExchange from './FlowchartExchange.js';
import {
    initialize,
    iteration,
    run,
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
    const [indexI, setIndexI] = useState(0);
    const [originalIndexI, setOriginalIndexI] = useState(0);
    const [indexJ, setIndexJ] = useState(0);
    const [originalIndexJ, setOriginalIndexJ] = useState(0);
    const [admissible, setAdmissible] = useState(false);
    const [improving, setImproving] = useState(false);

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

    const handleInitialization = () => {
        const { newBackpack, totalWeight, totalPrice, binaryVector } = initialize(
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

        currentBackpack.sort((a, b) => a.originalIndex - b.originalIndex);
        currentNotBackpack.sort((a, b) => a.originalIndex - b.originalIndex);

        const result = iteration(
            currentBackpack,
            currentNotBackpack,
            currentWeight,
            currentPrice,
            capacity,
            generateBinaryVector,
            strategy,
            setHighlightLinks,
            indexI,
            setOriginalIndexI,
            indexJ,
            setOriginalIndexJ,
            setAdmissible,
            setImproving,
        );
        setCurrentBackpack(result.updatedBackpack);
        setCurrentNotBackpack(result.updatedNotBackpack);
        setCurrentWeight(result.updatedWeight);
        setCurrentPrice(result.updatedPrice);

        if (result.exchange) {
            setExchangeHistory(prev => [...prev, result.exchange]);
            setIndexI(0);
            setIndexJ(0);
        } else {
            if (indexJ + 1 < currentNotBackpack.length) {
                setIndexJ(prevJ => prevJ + 1);
            } else if (indexI + 1 < currentBackpack.length) {
                setIndexI(prevI => prevI + 1);
                setIndexJ(0);
            } else {
                setIsCompleted(true);
            }
        }
    };

    const handleRun = () => {
        if (isCompleted) return;

        const result = run(
            currentBackpack,
            currentNotBackpack,
            currentWeight,
            currentPrice,
            capacity,
            generateBinaryVector,
            setHighlightLinks,
            setAdmissible,
            setImproving,
            setOriginalIndexI,
            setOriginalIndexJ,
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
        setHighlightLinks([]);
        handleInitialization();
    };

    useEffect(() => {
        handleInitialization();
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
        <div className="flex flex-col lg:flex-row w-full" style={{height: '75vh'}}>
            <KPDataDisplay
                items={items}
                capacity={capacity}
                simpleMode={true}
                showStatus={false}
                highlightCurrent={false}
            />
            <SolutionExchange
                exchangeHistory={exchangeHistory}
                originalIndexI={originalIndexI}
                originalIndexJ={originalIndexJ}
                admissible={admissible}
                improving={improving}
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
