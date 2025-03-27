import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../Components/Header';
import KPDataDisplay from "../../../InputHandling/InputDisplay/KP/KPDataDisplay";
import SolutionExchange from './SolutionExchange';
import FlowchartKnapsackExchange from './FlowchartExchange.js';
import {
    initialize,
    iteration,
    updateIndexes,
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
        initialize(
            items,
            capacity,
            generateBinaryVector,
            setCurrentBackpack,
            setCurrentWeight,
            setCurrentPrice,
            setCurrentNotBackpack,
            setExchangeHistory,
            setIsCompleted
        );
    };

    const handleIteration = () => {
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
            setCurrentBackpack,
            setCurrentNotBackpack,
            setCurrentWeight,
            setCurrentPrice,
            isCompleted,
        );

        if (result.exchange) {
            setExchangeHistory(prev => [...prev, result.exchange]);
            setIndexI(0);
            setIndexJ(0);
        }
        else {
            updateIndexes(indexI, indexJ, currentBackpack, currentNotBackpack, setIndexI, setIndexJ, setIsCompleted);
        }
    };

    const handleRun = () => {
        let backpackCurrent = [...currentBackpack];
        let notBackpackCurrent = [...currentNotBackpack];
        let totalWeight = currentWeight;
        let totalPrice = currentPrice;
        let indexI = 0;
        let indexJ = 0;
        let isCompleted = false;

        let exchangeHistoryTemp = [];

        while (!isCompleted) {
            backpackCurrent.sort((a, b) => a.originalIndex - b.originalIndex);
            notBackpackCurrent.sort((a, b) => a.originalIndex - b.originalIndex);

            const outItem = backpackCurrent[indexI];
            const inItem = notBackpackCurrent[indexJ];

            if (!outItem || !inItem) {
                break;
            }

            const potentialWeight = totalWeight - outItem.weight + inItem.weight;
            const potentialPrice = totalPrice - outItem.price + inItem.price;

            let admissible = false;
            let improving = false;

            if (potentialWeight <= capacity) {
                admissible = true;

                if (potentialPrice > totalPrice) {
                    improving = true;

                    backpackCurrent[indexI] = inItem;
                    notBackpackCurrent = notBackpackCurrent.filter(item => item !== inItem);
                    notBackpackCurrent.push(outItem);

                    totalWeight = potentialWeight;
                    totalPrice = potentialPrice;

                    const binaryVector = generateBinaryVector(backpackCurrent);

                    exchangeHistoryTemp.push({
                        removed: outItem,
                        added: inItem,
                        binaryVector,
                        newWeight: totalWeight,
                        newPrice: totalPrice,
                        indexI: backpackCurrent[indexI].originalIndex,
                        indexJ: notBackpackCurrent[indexJ].originalIndex,
                    });

                    indexI = 0;
                    indexJ = 0;
                    break;
                }
            }

            if (indexJ + 1 < notBackpackCurrent.length) {
                indexJ++;
            } else if (indexI + 1 < backpackCurrent.length) {
                indexI++;
                indexJ = 0;
            } else {
                isCompleted = true;
            }
        }

        const binaryVector = generateBinaryVector(backpackCurrent);

        setCurrentBackpack(backpackCurrent);
        setCurrentNotBackpack(notBackpackCurrent);
        setCurrentWeight(totalWeight);
        setCurrentPrice(totalPrice);
        setIsCompleted(isCompleted);
        setExchangeHistory(prevHistory => [...prevHistory, ...exchangeHistoryTemp]);  // Accumulate history properly
    };

    const handleReset = () => {
        setCurrentBackpack([]);
        setCurrentWeight(0);
        setCurrentPrice(0);
        setExchangeHistory([]);
        setCurrentNotBackpack([...items]);
        setHighlightLinks([]);
        setIndexI(0);
        setOriginalIndexI(0);
        setIndexJ(0);
        setOriginalIndexJ(0);
        setAdmissible(false);
        setImproving(false);
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
