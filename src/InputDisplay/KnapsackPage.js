import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import KnapsackDataForEdit from './KnapsackDataForEdit';
import Colors from '../Main/Colors';

function KnapsackPage() {
    const location = useLocation();
    const navigate = useNavigate();

    const { mode, data } = location.state || {};
    const { weights = [], prices = [], capacity = 0 } = data || {};

    const savedItems = JSON.parse(localStorage.getItem('knapsackItems')) ||
        weights.map((weight, index) => ({
            weight: parseFloat(weight),
            price: parseFloat(prices[index]),
            originalIndex: index,
        }));
    const [items, setItems] = useState(savedItems);

    const savedCapacity = parseFloat(localStorage.getItem('knapsackCapacity')) || capacity;
    const [currentCapacity] = useState(savedCapacity);

    const handleDataChange = (newItems) => {
        setItems(newItems);
        localStorage.setItem('knapsackItems', JSON.stringify(newItems));
    };

    useEffect(() => {
        localStorage.setItem('knapsackCapacity', currentCapacity);
    }, [currentCapacity]);

    const handleRunClick = () => {
        const updatedWeights = items.map((item) => item.weight);
        const updatedPrices = items.map((item) => item.price);

        navigate('simulate', {
            state: { mode, weights: updatedWeights, prices: updatedPrices, capacity: currentCapacity },
        });
    };

    const handleBackClick = () => {
        localStorage.removeItem('knapsackItems');
        localStorage.removeItem('knapsackCapacity');
        navigate(-1);
    };

    return (
        <div className={`mb-4 flex flex-col items-center justify-center w-fit h-fit ${Colors.textPrimary} p-6 ${Colors.cardBackground} rounded-lg mx-auto my-10`}>
            <KnapsackDataForEdit
                items={items}
                capacity={currentCapacity}
                onDataChange={handleDataChange}
            />
            <div className="flex justify-between w-full px-12">
                <button
                    className={`px-2 py-2 rounded ${Colors.buttonSecondary} ${Colors.buttonSecondaryHover}`}
                    onClick={handleBackClick}>
                    Back
                </button>
                <button
                    className={`px-2 py-2 rounded ${Colors.buttonPrimary} ${Colors.buttonPrimaryHover}`}
                    onClick={handleRunClick}>
                    Start
                </button>
            </div>
        </div>
    );
}

export default KnapsackPage;
