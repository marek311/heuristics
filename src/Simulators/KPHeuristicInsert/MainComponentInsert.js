import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../Components/Header';
import KPDataDisplay from '../../InputHandling/InputDisplay/KPDataDisplay';
import SolutionInsert from './SolutionInsert';
import FlowchartKnapsackInsert from './FlowchartInsert.js';
import {
    performIteration,
    performRun
} from "./AlgorithmsInsert";
import Colors from "../../Main/Colors";

function MainComponentInsert() {

    const navigate = useNavigate();
    const location = useLocation();

    const { weights, prices, capacity } = location.state || {};
    const items = weights.map((weight, index) => ({
        weight: parseFloat(weight),
        price: parseFloat(prices[index]),
        efficiency: parseFloat(prices[index]) / parseFloat(weight),
        originalIndex: index
    }));
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentWeight, setCurrentWeight] = useState(0);
    const [currentPrice, setCurrentPrice] = useState(0);
    const [selectedItems, setSelectedItems] = useState([]);
    const [itemStatus, setItemStatus] = useState(new Array(items.length).fill(null));
    const [binarySolution, setBinarySolution] = useState(new Array(weights.length).fill(0));
    const [highlightLinks, setHighlightLinks] = useState([]);

    items.sort((a, b) => b.efficiency - a.efficiency);

    const handleIteration = () => {
        const result = performIteration(
            items,
            currentIndex,
            currentWeight,
            currentPrice,
            selectedItems,
            itemStatus,
            binarySolution,
            capacity,
            setHighlightLinks
        );
        setCurrentIndex(result.currentIndex);
        setCurrentWeight(result.currentWeight);
        setCurrentPrice(result.currentPrice);
        setSelectedItems(result.selectedItems);
        setItemStatus(result.itemStatus);
        setBinarySolution(result.binarySolution);
    };

    const handleRun = () => {
        const result = performRun(
            items,
            currentIndex,
            currentWeight,
            currentPrice,
            selectedItems,
            itemStatus,
            binarySolution,
            capacity,
            setHighlightLinks
        );
        setCurrentIndex(result.currentIndex);
        setCurrentWeight(result.currentWeight);
        setCurrentPrice(result.currentPrice);
        setSelectedItems(result.selectedItems);
        setItemStatus(result.itemStatus);
        setBinarySolution(result.binarySolution);
    };

    const handleReset = () => {
        setCurrentIndex(0);
        setCurrentWeight(0);
        setCurrentPrice(0);
        setSelectedItems([]);
        setItemStatus(new Array(items.length).fill(null));
        setBinarySolution(new Array(weights.length).fill(0));
        setHighlightLinks([]);
    };

    return (
        <div className={`${Colors.textPrimary} p-6`}>
            <Header
                handleGoBack={() => navigate(-1)}
                title="Knapsack Problem Simulation Using Insertion Heuristic with Profitability Coefficients"
                handleStep={handleIteration}
                handleRun={handleRun}
                handleReset={handleReset}
                isDisabled={currentIndex >= items.length}
            />
            <div className="flex flex-col lg:flex-row w-full h-full">
                <KPDataDisplay
                    items={items}
                    currentIndex={currentIndex}
                    itemStatus={itemStatus}
                    capacity={capacity}
                    showStatus={true}
                    highlightCurrent={true}
                    simpleMode={false}
                />
                <SolutionInsert
                    currentWeight={currentWeight}
                    currentPrice={currentPrice}
                    currentIndex={currentIndex}
                    items={items}
                    binarySolution={binarySolution}
                />
                <FlowchartKnapsackInsert
                    items={items}
                    currentIndex={currentIndex}
                    highlightLinks={highlightLinks}
                />
            </div>
        </div>
    );
}

export default MainComponentInsert;
