import React from 'react';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import KnapsackDefaultData from '../DefaultData/KnapsackDefaultData';

function InputHandlerKnapsackProblem( {mode} ) {

    const defaultData = KnapsackDefaultData();

    const [weights, setWeights] = useState(defaultData.weights);
    const [prices, setPrices] = useState(defaultData.prices);
    const [capacity, setCapacity] = useState(defaultData.capacity);

    const navigate = useNavigate();
    const handleGoBack = () => {
        navigate(`/`);
    };

    const handleFileUpload = (event) => {
        const file = event.target.files[0];

        const reader = new FileReader();
        reader.onload = (e) => {
            const text = e.target.result;
            const lines = text.split('\n').filter(line => line.trim() !== '');

            const parsedPrices = [];
            const parsedWeights = [];
            lines.forEach((line) => {
                const [price, weight] = line.split(';').map(Number);
                if (!isNaN(price) && !isNaN(weight)) {
                    parsedPrices.push(price);
                    parsedWeights.push(weight);
                }
            });

            setPrices(parsedPrices);
            setWeights(parsedWeights);
        };

        reader.readAsText(file);
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

    const handleInputs = () => {
        return (
            <div>
                <label className="block text-gray-800 mb-2">
                    CSV súbor: riadok obsahuje cenu a hmotnosť vo formáte: cena;hmotnosť
                </label>
                <input
                    type="file"
                    accept=".csv"
                    className="p-2 mb-4 text-black border rounded w-full"
                    onChange={handleFileUpload}
                />
                <label className="block text-gray-800 mb-2">Zadajte kapacitu batohu:</label>
                <input
                    type="number"
                    className="p-2 mb-4 text-black border rounded w-full"
                    placeholder="Kapacita batohu"
                    value={capacity}
                    onChange={(e) => setCapacity(e.target.value)}
                />
                <div className="items-center justify-center flex space-x-4 mt-4">
                    <button onClick={handleGoBack} className="px-4 py-2 bg-red-500 rounded hover:bg-red-600">
                        Späť
                    </button>
                    <button onClick={handleRunClick} className="px-4 py-2 bg-teal-500 rounded hover:bg-teal-400">
                        Ďaľej
                    </button>
                </div>
            </div>
        );
    }

    return (
        <> {handleInputs()} </>
    );
}

export default InputHandlerKnapsackProblem;