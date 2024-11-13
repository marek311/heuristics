import React from 'react';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

function InputHandlerKnapsackProblem() {

    const [weights, setWeights] = useState('');
    const [prices, setPrices] = useState('');
    const [capacity, setCapacity] = useState('');

    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(`/`);
    };

    return (
        <div>
            <label className="block text-white mb-2">Zadajte pole hmotnosti predmetov:</label>
            <input
                type="text"
                className="p-2 mb-4 text-black border rounded w-full"
                placeholder="Hmotnosti predmetov"
                value={weights}
                onChange={(e) => setWeights(e.target.value)}
            />

            <label className="block text-white mb-2">Zadajte pole cien predmetov:</label>
            <input
                type="text"
                className="p-2 mb-4 text-black border rounded w-full"
                placeholder="Ceny predmetov"
                value={prices}
                onChange={(e) => setPrices(e.target.value)}
            />

            <label className="block text-white mb-2">Zadajte kapacitu batohu:</label>
            <input
                type="text"
                className="p-2 mb-4 text-black border rounded w-full"
                placeholder="Kapacita batohu"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
            />

            <div className="flex space-x-4 mt-4">
                <button onClick={handleGoBack} className="px-4 py-2 bg-red-800 rounded hover:bg-red-950">
                    Späť
                </button>
                <button className="px-4 py-2 bg-teal-700 rounded hover:bg-purple-700">
                    Spusti
                </button>
            </div>

        </div>

    );
}

export default InputHandlerKnapsackProblem;