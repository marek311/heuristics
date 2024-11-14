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
            const newItemStatus = [...itemStatus];
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
        <div className="flex flex-col lg:flex-row w-full h-full text-white p-6 bg-gray-900">
            <div className="flex-1 p-4 bg-purple-700 rounded-lg mr-2">
                <div className="flex justify-between mb-4">
                    <h2>Predmety k dispozícií</h2>
                    <p>Kapacita batohu: {capacity}</p>
                </div>
                <ul className="mt-4 space-y-2">
                    {items.map((item, index) => (
                        <li key={index} className="flex justify-between items-center p-2 bg-purple-500 rounded">
                            <span>
                                Váha: {item.weight}, Cena: {item.price}, Výhodnosť: {item.efficiency.toFixed(2)}
                            </span>
                            <span>
                                {itemStatus[index] === true ? "✓" : itemStatus[index] === false ? "✗" : ""}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="flex-1 p-4 bg-purple-800 rounded-lg ml-2">
                <div className="flex justify-between mb-4">
                    <p>Aktuálna váha: {currentWeight}</p>
                    <p>Aktuálna cena: {currentPrice}</p>
                </div>
                <div className="flex justify-between mb-4">
                    <p><strong>Vybrané predmety:</strong></p>
                    <button onClick={handleStep} className="mt-4 px-4 py-2 bg-teal-700 rounded hover:bg-teal-600">
                        Krok
                    </button>
                </div>
                <ul className="mt-2 space-y-2">
                    {selectedItems.map((item, index) => (
                        <li key={index} className="p-2 bg-purple-600 rounded">
                        Váha: {item.weight}, Cena: {item.price}, Výhodnosť: {item.efficiency.toFixed(2)}
                        </li>
                    ))}
                </ul>
                {currentIndex >= items.length && <p className="mt-2">Algoritmus dokončený</p>}
            </div>
        </div>
    );
}

export default SimulationKnapsackInsert;
