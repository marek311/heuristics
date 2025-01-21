import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Colors from "./Colors";

function Selector() {

    const modes = [
        {id: 'KnapsackInsert', name: 'Knapsack problem - Insert heuristic'},
        {id: 'KnapsackExchangeFirst', name: 'Knapsack problem - Exchange first fit'},
        {id: 'KnapsackExchangeBest', name: 'Knapsack problem - Exchange best fit'},
        {id: 'KnapsackGenetic', name: 'Knapsack problem - Genetic algorithm'},
        {id: 'TSPSimulatedAnnealing', name: 'TSP - Simulated annealing'},
        {id: 'TSPTabuSearch', name: 'TSP - Tabu search'},
    ];

    const [selectedMode, setSelectedMode] = useState(modes[0].id);

    const navigate = useNavigate();

    const handleModeChange = (event) => {
        setSelectedMode(event.target.value);
    };

    const handleSubmit = () => {
        navigate(`/handleInputs?mode=${selectedMode}`);
    };

    return (
        <div className="text-center p-6 bg-white rounded-lg shadow-lg flex flex-col items-center mt-4">
            <h1 className="text-4xl font-bold mb-6">Heuristics and Metaheuristics</h1>
            <label className="mb-4 text-gray-800">
                Mód:
                <select
                    value={selectedMode}
                    onChange={handleModeChange}
                    className="ml-2 p-2 border border-gray-300 rounded text-gray-800 focus:outline-none focus:ring-2">
                    {modes.map((mode) => (
                        <option key={mode.id} value={mode.id}>
                            {mode.name}
                        </option>
                    ))}
                </select>
            </label>
            <button
                onClick={handleSubmit}
                className={`px-4 py-2 rounded ${Colors.buttonPrimary} ${Colors.buttonPrimaryHover}`}>
                Next
            </button>
        </div>
    );
}

export default Selector;