import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import KnapsackData from './KnapsackData';
import Colors from '../Main/Colors';

function KnapsackPage() {

    const location = useLocation();
    const navigate = useNavigate();

    const { mode, data } = location.state || {};
    const { weights, prices, capacity } = data || {};
    const items = weights.map((weight, index) => ({
        weight: parseFloat(weight),
        price: parseFloat(prices[index]),
        efficiency: parseFloat(prices[index]) / parseFloat(weight),
        originalIndex: index
    }));

    const handleRunClick = () => {
        navigate('simulate', { state: { mode, weights, prices, capacity } });
    };

    return (
        <div className={`mb-4 flex flex-col items-center justify-center w-fit h-fit ${Colors.textPrimary} p-6 ${Colors.cardBackground} rounded-lg mx-auto my-10`}>
            <KnapsackData
                items={items}
                capacity={capacity}
                simpleMode={true}
                showStatus={false}
                highlightCurrent={false}
            />
            <div className="flex justify-between mb-4 space-x-4 mt-4">
                <button
                    className={`px-2 py-2 rounded ${Colors.buttonSecondary} ${Colors.buttonSecondaryHover}`}
                    onClick={() => navigate(-1)}>
                    Späť
                </button>
                <button
                    className={`px-2 py-2 rounded ${Colors.buttonPrimary} ${Colors.buttonPrimaryHover}`}
                    onClick={handleRunClick}>
                    Spusti
                </button>
            </div>
        </div>
    );
}

export default KnapsackPage;
