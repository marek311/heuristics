import React from 'react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import KnapsackInsert from '../FlowchartWindows/KnapsackInsertChart.js';

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
        originalIndex: index + 1
    }));

    items.sort((a, b) => b.efficiency - a.efficiency);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentWeight, setCurrentWeight] = useState(0);
    const [currentPrice, setCurrentPrice] = useState(0);
    const [selectedItems, setSelectedItems] = useState([]);
    const [itemStatus, setItemStatus] = useState(new Array(items.length).fill(null));
    const [binarySolution, setBinarySolution] = useState(new Array(weights.length).fill(0));

    const handleStep = () => {
        if (currentIndex < items.length) {
            const item = items[currentIndex];
            const newItemStatus = [...itemStatus];
            const newBinarySolution = [...binarySolution];

            if (currentWeight + item.weight <= capacity) {
                setSelectedItems([...selectedItems, item]);
                setCurrentWeight(currentWeight + item.weight);
                setCurrentPrice(currentPrice + item.price);
                newItemStatus[currentIndex] = true;
                newBinarySolution[item.originalIndex - 1] = 1;
            } else {
                newItemStatus[currentIndex] = false;
            }

            setCurrentIndex(currentIndex + 1);
            setItemStatus(newItemStatus);
            setBinarySolution(newBinarySolution);
        }
    };

    const handleRun = () => {
        let newSelectedItems = [...selectedItems];
        let newCurrentWeight = currentWeight;
        let newCurrentPrice = currentPrice;
        let newItemStatus = [...itemStatus];
        let newBinarySolution = [...binarySolution];
        let index = currentIndex;

        while (index < items.length) {
            const item = items[index];
            if (newCurrentWeight + item.weight <= capacity) {
                newSelectedItems.push(item);
                newCurrentWeight += item.weight;
                newCurrentPrice += item.price;
                newItemStatus[index] = true;
                newBinarySolution[item.originalIndex - 1] = 1;
            } else {
                newItemStatus[index] = false;
            }
            index++;
        }

        setSelectedItems(newSelectedItems);
        setCurrentWeight(newCurrentWeight);
        setCurrentPrice(newCurrentPrice);
        setItemStatus(newItemStatus);
        setBinarySolution(newBinarySolution);
        setCurrentIndex(items.length - 1);
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
                <div className="flex-1 p-4 bg-white rounded-lg mr-2">
                    <div className="flex justify-between mb-4">
                        <h2><strong>Predmety k dispozícií</strong></h2>
                        <p>Kapacita batohu: {capacity}</p>
                    </div>
                    <ul className="mt-4 space-y-2">
                        <li className="flex justify-between items-center p-2 bg-gray-200 rounded">
                            <div>Index</div>
                            <div>Váha</div>
                            <div>Cena</div>
                            <div>Výhodnosť</div>
                            <div> ✓ / ✗</div>
                        </li>
                        {items.map((item, index) => (
                            <li
                                key={index}
                                className={`flex justify-between items-center p-2 rounded ${
                                    index === currentIndex ? 'bg-teal-500' : 'bg-gray-200'}`}>
                                <div>{item.originalIndex}</div>
                                <div>{item.weight}</div>
                                <div>{item.price}</div>
                                <div>{item.efficiency.toFixed(2)}</div>
                                <span
                                    className={`${
                                        itemStatus[index] === true ? 'text-teal-700' : itemStatus[index] === false ? 'text-red-500' : ''
                                    } flex justify-end`}
                                >
                                {itemStatus[index] === true ? "✓" : itemStatus[index] === false ? "✗" : ""}
                            </span>
                            </li>
                        ))}
                    </ul>
                </div>
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
                                    currentIndex={currentIndex}
                                    currentBackpackWeight={currentWeight}
                                    backpackCapacity={capacity}
                    />
                </div>
            </div>
        </div>
    );
}

export default SimulationKnapsackInsert;
