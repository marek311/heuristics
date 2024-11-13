import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function SimulationKnapsack() {
    const location = useLocation();
    const navigate = useNavigate();

    const { mode, data } = location.state || {};
    const { weights, prices, capacity } = data || {};

    const handleRunClick = () => {
        navigate('simulate', { state: { mode,weights,prices,capacity } });
    };

    return (
        <div>
            <div
                className="mb-4 flex flex-col items-center justify-center w-fit h-fit text-white p-6 bg-purple-600 rounded-lg mx-auto my-10">
                <p><strong>Prices:</strong> {prices.join(', ')} Total count: {prices.length}</p>
                <p><strong>Weights:</strong> {weights.join(', ')} Total count: {weights.length}</p>
                <p><strong>Capacity:</strong> {capacity}</p>
                <button onClick={() => navigate(-1)} className="mt-4 px-4 py-2 bg-red-800 rounded hover:bg-red-950">
                    Späť
                </button>
                <button onClick={handleRunClick} className="px-4 py-2 bg-teal-700 rounded hover:bg-purple-700">
                    Spusti
                </button>
            </div>
        </div>
    );
}

export default SimulationKnapsack;