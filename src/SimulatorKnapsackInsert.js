import React from 'react';
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

    const selectedItems = [];
    let currentWeight = 0;
    let currentPrice = 0;

    for (let item of items) {
        if (currentWeight + item.weight <= capacity) {
            selectedItems.push(item);
            currentWeight += item.weight;
            currentPrice += item.price;
        }
    }

    return (
        <div>
            <div
                className="mb-4 flex flex-col items-center justify-center w-fit h-fit text-white p-6 bg-purple-600 rounded-lg mx-auto my-10">
                <h2>Knapsack Insert Simulation</h2>
                <p><strong>Prices:</strong> {prices.join(', ')}</p>
                <p><strong>Weights:</strong> {weights.join(', ')}</p>
                <p><strong>Capacity:</strong> {capacity}</p>

                <h3>Selected Items:</h3>
                <ul>
                    {selectedItems.map((item, index) => (
                        <li key={index}>
                            Weight: {item.weight}, Price: {item.price}, Efficiency: {item.efficiency.toFixed(2)}
                        </li>
                    ))}
                </ul>
                <p><strong>Total Weight:</strong> {currentWeight}</p>
                <p><strong>Total Price:</strong> {currentPrice}</p>
            </div>
        </div>
    );
}

export default SimulationKnapsackInsert;
