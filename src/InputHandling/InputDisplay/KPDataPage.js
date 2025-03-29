import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import KPDataEdit from './KPDataEdit';
import Colors from '../../Main/Colors';

function KPDataPage() {
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
            <KPDataEdit
                items={items}
                capacity={currentCapacity}
                onDataChange={handleDataChange}
            />
            <div className="flex w-full">
                <button
                    className={`px-4 py-4 rounded ${Colors.buttonSecondary} ${Colors.buttonSecondaryHover} ml-5`}
                    onClick={handleBackClick}>
                    Back
                </button>
                <div className="flex-grow"></div>
                <button
                    className={`px-4 py-4 rounded ${Colors.buttonPrimary} ${Colors.buttonPrimaryHover} mr-6`}
                    onClick={handleRunClick}>
                    Start
                </button>
            </div>
        </div>
    );
}

export default KPDataPage;
