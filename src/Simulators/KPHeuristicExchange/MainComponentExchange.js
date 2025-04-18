import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../Components/Header';
import KPDataDisplay from "../../InputHandling/InputDisplay/KPDataDisplay";
import SolutionExchange from './SolutionExchange';
import FlowchartKnapsackExchange from './FlowchartExchange.js';
import {
    initialize,
    iteration,
    run,
} from "./AlgorithmsExchange";
import Colors from "../../Main/Colors";

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
    const [betterBest, setBetterBest] = useState(false);

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
            betterBest,
            setBetterBest,
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
            }
        }
    };

    useEffect(() => {

        if (!bestFoundSolution) return;

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
        setPerformBestExchange(false);
        setBestFoundSolution(null);
        setBestFoundPrice(0);
        setBestFoundWeight(0);

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

        setIndexI(0);
        setIndexJ(0);

    }, [performBestExchange]);

    const handleRun = () => {
        setHighlightLinks([]);
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
            setBestFoundSolution,
            setBestFoundPrice,
            setBestFoundWeight,
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
        setBetterBest(false);
        setPerformBestExchange(false);
        setHighlightLinks([]);
        handleInitialization();
        setBestFoundSolution(null);
        setBestFoundPrice(0);
        setBestFoundWeight(0);
    };

    useEffect(() => {
        handleInitialization();
        // eslint-disable-next-line
    }, []);

    return (
    <div className={`${Colors.textPrimary} p-6`}>
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
                betterBest={betterBest}
                bestFoundSolution={bestFoundSolution}
                bestFoundPrice={bestFoundPrice}
                bestFoundWeight={bestFoundWeight}
                strategy={strategy}
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
