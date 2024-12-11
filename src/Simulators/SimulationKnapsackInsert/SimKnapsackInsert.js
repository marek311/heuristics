import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SolKnapsackInsert from './SolKnapsackInsert';
import FlowchartKnapsackInsert from './FlowchartKnapsackInsert.js';
import {
    performIteration,
    performRun
} from "./AlgsKnapsackInsert";
import ButtonsPanel from '../SimulationGeneral/ButtonsPanel';
import KnapsackData from '../../InputDisplay/KnapsackData';

function SimulationKnapsackInsert() {

    const navigate = useNavigate();
    const handleGoBack = () => {
        navigate(`/handleInputs?mode=KnapsackInsert`);
    };
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
            capacity
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
            capacity
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
    };

    return (
        <div className="flex flex-col w-full h-full text-gray-800 p-6">
            <div className="flex justify-between items-center p-4 bg-white rounded-lg mb-4">
                <button onClick={handleGoBack} className="px-4 py-2 bg-red-500 rounded hover:bg-red-600">
                    Späť
                </button>
                <h2 className="text-lg font-semibold">
                    Simulácia úlohy o batohu vkladacou heuristikou s výhodnostými koeficientami
                </h2>
                <ButtonsPanel
                    handleStep={handleIteration}
                    handleRun={handleRun}
                    handleReset={handleReset}
                    isDisabled={currentIndex >= items.length}
                />
            </div>
            <div className="flex flex-col lg:flex-row w-full h-full">
                <KnapsackData
                    items={items}
                    currentIndex={currentIndex}
                    itemStatus={itemStatus}
                    capacity={capacity}
                    showStatus={true}
                    highlightCurrent={true}
                    simpleMode={false}
                />
                <SolKnapsackInsert
                    currentWeight={currentWeight}
                    currentPrice={currentPrice}
                    currentIndex={currentIndex}
                    items={items}
                    binarySolution={binarySolution}
                />
                <FlowchartKnapsackInsert items={items}
                                         currentIndex={currentIndex}
                                         currentBackpackWeight={currentWeight}
                                         backpackCapacity={capacity}
                />
            </div>
        </div>
    );
}

export default SimulationKnapsackInsert;
