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
                className="mb-4 flex flex-col items-center justify-center w-fit h-fit text-gray-800 p-6 bg-white rounded-lg mx-auto my-10">
                <p><strong>Prices:</strong> {prices.join(', ')} Total count: {prices.length}</p>
                <p><strong>Weights:</strong> {weights.join(', ')} Total count: {weights.length}</p>
                <p><strong>Capacity:</strong> {capacity}</p>
                <div className="flex justify-between mb-4 space-x-4 mt-4">
                    <button
                        className="px-2 py-2 rounded bg-red-500 hover:bg-red-600"
                        onClick={() => navigate(-1)} >
                        Späť
                    </button>
                    <button
                        className="px-2 py-2 rounded bg-teal-500 hover:bg-teal-400"
                        onClick={handleRunClick} >
                        Spusti
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SimulationKnapsack;