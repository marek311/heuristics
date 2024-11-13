import React from 'react';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

function InputHandlerKnapsackProblem( {mode} ) {

    const [weights, setWeights] = useState('');
    const [prices, setPrices] = useState('');
    const [capacity, setCapacity] = useState('');

    const navigate = useNavigate();
    const handleGoBack = () => {
        navigate(`/`);
    };

    const handleRunClick = () => {
        const inputData = {weights, prices, capacity};
        let simulationPath;
        switch (mode) {
            case 'KnapsackInsert':
                simulationPath = '/knapsack-insert-simulation';
                break;
            case 'KnapsackExchangeFirst':
                simulationPath = '/knapsack-exchange-first-simulation';
                break;
            case 'KnapsackExchangeBest':
                simulationPath = '/knapsack-exchange-best-simulation';
                break;
            case 'KnapsackGenetic':
                simulationPath = '/knapsack-genetic-simulation';
                break;
            default:
                simulationPath = '/';
        }
        navigate(simulationPath, { state: { mode, data: inputData } });
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

            <div className="items-center justify-center flex space-x-4 mt-4">
                <button onClick={handleGoBack} className="px-4 py-2 bg-red-800 rounded hover:bg-red-950">
                    Späť
                </button>
                <button onClick={handleRunClick} className="px-4 py-2 bg-teal-700 rounded hover:bg-purple-700">
                    Ďaľej
                </button>
            </div>
        </div>
    );
}

export default InputHandlerKnapsackProblem;