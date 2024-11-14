import React from 'react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

function SimulationKnapsackInsert() {
    const location = useLocation();
    const { weights, prices, capacity } = location.state || {};

    const items = weights.map((weight, index) => ({
        weight: parseFloat(weight),
        price: parseFloat(prices[index]),
        efficiency: parseFloat(prices[index]) / parseFloat(weight)
    }));

    items.sort((a, b) => b.efficiency - a.efficiency);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentWeight, setCurrentWeight] = useState(0);
    const [currentPrice, setCurrentPrice] = useState(0);
    const [selectedItems, setSelectedItems] = useState([]);

    const [itemStatus, setItemStatus] = useState(new Array(items.length).fill(null));

    const handleStep = () => {
        if (currentIndex < items.length) {
            const item = items[currentIndex];
            let newItemStatus = [...itemStatus];
            if (currentWeight + item.weight <= capacity) {
                setSelectedItems([...selectedItems, item]);
                setCurrentWeight(currentWeight + item.weight);
                setCurrentPrice(currentPrice + item.price);
                newItemStatus[currentIndex] = true;
            } else {
                newItemStatus[currentIndex] = false;
            }
            setCurrentIndex(currentIndex + 1);
            setItemStatus(newItemStatus);
        }
    };

    return (
        <div
            className="mb-4 flex flex-col items-center justify-center w-fit h-fit text-white p-6 bg-purple-600 rounded-lg mx-auto my-10">
            <h2> Knapsack Insert Simulation </h2>
            <p><strong>Capacity:</strong> {capacity}</p>

            <h3>All Items:</h3>
            <ul>
                {items.map((item, index) => (
                    <li key={index}>
                        Weight: {item.weight}, Price: {item.price}, Efficiency: {item.efficiency.toFixed(2)}
                        {itemStatus[index] === true && " ✓"}
                        {itemStatus[index] === false && " ✗"}
                    </li>
                ))}
            </ul>

            <h3>Current Solution:</h3>
            <p><strong>Current Weight:</strong> {currentWeight}</p>
            <p><strong>Current Price:</strong> {currentPrice}</p>
            <p><strong>Selected Items:</strong></p>
            <ul>
                {selectedItems.map((item, index) => (
                    <li key={index}>
                        Weight: {item.weight}, Price: {item.price}, Efficiency: {item.efficiency.toFixed(2)}
                    </li>
                ))}
            </ul>

            <button onClick={handleStep} className="px-4 py-2 bg-teal-700 rounded hover:bg-purple-700">
                Step
            </button>
            {currentIndex >= items.length && <p>Algoritmus dokončený</p>}
        </div>
    );
}

export default SimulationKnapsackInsert;
