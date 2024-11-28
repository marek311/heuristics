import React from 'react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import KnapsackInsert from '../FlowchartWindows/ChartKnapsackInsert.js';
import InfoKnapsackData from '../InfoWindows/InfoKnapsackData';
import {
    performStep,
    performRun
} from "../Algorithms/AlgorithmKnapsackInsert";

function SimulationKnapsackInsert() {
    const location = useLocation();
    const { weights, prices, capacity } = location.state || {};

    const navigate = useNavigate();
    const handleGoBack = () => {
        navigate(`/handleInputs?mode=KnapsackInsert`);
    };

    const items = weights.map((weight, index) => ({
        weight: parseFloat(weight),
        price: parseFloat(prices[index]),
        efficiency: parseFloat(prices[index]) / parseFloat(weight),
        originalIndex: index
    }));

    items.sort((a, b) => b.efficiency - a.efficiency);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentWeight, setCurrentWeight] = useState(0);
    const [currentPrice, setCurrentPrice] = useState(0);
    const [selectedItems, setSelectedItems] = useState([]);
    const [itemStatus, setItemStatus] = useState(new Array(items.length).fill(null));
    const [binarySolution, setBinarySolution] = useState(new Array(weights.length).fill(0));

    const handleStep = () => {
        const result = performStep(
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
                <button
                    className={`px-4 py-2 rounded ${currentIndex >= items.length - 1 ? 'bg-gray-500 cursor-not-allowed' : 'bg-teal-500 hover:bg-teal-400'}`}
                    onClick={handleStep}
                    disabled={currentIndex >= items.length - 1}>
                    Krok
                </button>
                <button
                    className={`px-4 py-2 rounded ${currentIndex >= items.length - 1 ? 'bg-gray-500 cursor-not-allowed' : 'bg-teal-500 hover:bg-teal-400'}`}
                    onClick={handleRun}
                    disabled={currentIndex >= items.length - 1}>
                    Spusti
                </button>
                <button
                    className="px-4 py-2 rounded bg-red-500 hover:bg-red-600"
                    onClick={handleReset}>
                    Reset
                </button>
            </div>
            <div className="flex flex-col lg:flex-row w-full h-full">
                <InfoKnapsackData
                    items={items}
                    currentIndex={currentIndex - 1}
                    itemStatus={itemStatus}
                    capacity={capacity}
                    showStatus={true}
                    highlightCurrent={true}
                    simpleMode={false}
                />
                <div className="flex-1 p-4 bg-white rounded-lg mr-2">
                    <div className="flex justify-between items-center mb-4 space-x-4">
                        <h2><strong>Predmety vybrané do batohu</strong></h2>
                        <p>Aktuálna váha: {currentWeight}</p>
                        <p>Aktuálna cena: {currentPrice}</p>
                        <p>Iterácia: {currentIndex}</p>
                    </div>
                    <ul className="mt-2 space-y-2">
                        <li className="flex justify-between items-center p-2 bg-gray-200 rounded">
                            <div>Index</div>
                            <div>Váha</div>
                            <div>Cena</div>
                        </li>
                        {selectedItems.map((item, index) => (
                            <li key={index} className="flex justify-between items-center p-2 bg-gray-200 rounded">
                                <div>{item.originalIndex}</div>
                                <div>{item.weight}</div>
                                <div>{item.price}</div>
                            </li>
                        ))}
                    </ul>
                    {currentIndex >= items.length - 1 && (
                        <p className="mt-2 flex justify-center text-center">Algoritmus skončil!</p>
                    )}
                    <div className="flex-1 p-4 bg-gray-500 rounded-lg mt-4">
                        <h2><strong>Binárny vektor riešenia</strong></h2>
                        <p className="mt-2 bg-gray-200 p-2 rounded text-center">
                            {binarySolution.join("; ")}
                        </p>
                    </div>
                </div>
                <div className="flex justify-center items-start p-4 bg-white rounded-lg mr-2">
                    <KnapsackInsert items={items}
                                    currentIndex={currentIndex - 1}
                                    currentBackpackWeight={currentWeight}
                                    backpackCapacity={capacity}
                    />
                </div>
            </div>
        </div>
    );
}

export default SimulationKnapsackInsert;
