import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

    const selectMode = () => {
        return (
        <div className="text-center p-6 bg-purple-800 rounded-lg shadow-lg flex flex-col items-center mt-4">
            <h1 className="text-white text-4xl font-bold mb-6">Heuristiky a metaheuristiky</h1>
                <label className="mb-4 text-white">
                    Vyberte mód:
                    <select
                        value={selectedMode}
                        onChange={handleModeChange}
                        className="ml-2 p-2 border border-gray-300 rounded bg-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                        {modes.map((mode) => (
                            <option key={mode.id} value={mode.id}>
                                {mode.name}
                            </option>
                        ))}
                    </select>
                </label>
                <button
                    className="mt-4 px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    onClick={handleSubmit}>
                    Ďaľej
                </button>
            </div>
        );
    }

    return (
        <> {selectMode()} </>
    );
}

export default Selector;
