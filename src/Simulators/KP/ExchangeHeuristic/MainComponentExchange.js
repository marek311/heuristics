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
    const [strategy, setStrategy] = useState(() => {
        const path = location.pathname;
        if (path.includes('knapsack-exchange-best-simulation')) {
            return 'bestFit';
        }
        if (path.includes('knapsack-exchange-first-simulation')) {
            return 'firstFit';
        }
    });
    const [currentBackpack, setCurrentBackpack] = useState([]);
    const [currentWeight, setCurrentWeight] = useState(0);
    const [currentPrice, setCurrentPrice] = useState(0);
    const [currentNotBackpack, setCurrentNotBackpack] = useState([...items]);
    const [exchangeHistory, setExchangeHistory] = useState([]);
    const [isCompleted, setIsCompleted] = useState(false);
    const [highlightLinks, setHighlightLinks] = useState([]);
    const [indexI, setIndexI] = useState(0);
    const [originalIndexI, setOriginalIndexI] = useState(0);
    const [indexJ, setIndexJ] = useState(0);
    const [originalIndexJ, setOriginalIndexJ] = useState(0);
    const [admissible, setAdmissible] = useState(false);
    const [improving, setImproving] = useState(false);

    const [bestFoundSolution, setBestFoundSolution] = useState();
    const [bestFoundPrice, setBestFoundPrice] = useState(0);
    const [bestFoundWeight, setBestFoundWeight] = useState(0);
    const [performBestExchange, setPerformBestExchange] = useState(false);

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
            setIsCompleted,
            bestFoundSolution,
            setBestFoundSolution,
            bestFoundPrice,
            setBestFoundPrice,
            bestFoundWeight,
            setBestFoundWeight,
        );

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
                setPerformBestExchange(true);


                const removedItem = currentBackpack.find(item => item.originalIndex === bestFoundSolution.removed);
                const addedItem = currentNotBackpack.find(item => item.originalIndex === bestFoundSolution.added);

                if (!removedItem || !addedItem) return;

                const updatedBackpack = currentBackpack
                    .filter(item => item.originalIndex !== removedItem.originalIndex)
                    .concat(addedItem);

                const updatedNotBackpack = currentNotBackpack
                    .filter(item => item.originalIndex !== addedItem.originalIndex)
                    .concat(removedItem);

                const binaryVector = generateBinaryVector(updatedBackpack);

                setCurrentBackpack(updatedBackpack);
                setCurrentNotBackpack(updatedNotBackpack);
                setCurrentWeight(bestFoundWeight);
                setCurrentPrice(bestFoundPrice);

                setIsCompleted(false);
                setBestFoundSolution(null);
                setBestFoundPrice(0);
                setBestFoundWeight(0);
                setPerformBestExchange(false);

                setExchangeHistory(prev => [
                    ...prev,
                    {
                        removed: removedItem,
                        added: addedItem,
                        binaryVector,
                        newWeight: bestFoundWeight,
                        newPrice: bestFoundPrice,
                    },
                ]);
            }
        }
    }

    const handleRun = () => {
        run({
            currentBackpack,
            currentNotBackpack,
            currentWeight,
            currentPrice,
            capacity,
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
            setExchangeHistory,
            setIsCompleted,
            generateBinaryVector,
            strategy,
        });
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

            <div className="bg-white">
                best weight - {bestFoundWeight} <br/>
                best price - {bestFoundPrice} <br/>
            </div>

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
