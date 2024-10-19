import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Selector() {
    const heuristics = [
        { id: 'insert', name: 'Vkladacia heuristika' },
        { id: 'exchange', name: 'Vymenná heuristika' },
        { id: 'annealing', name: 'Simulated annealing' },
        { id: 'tabu', name: 'Tabu search' },
        { id: 'genetic', name: 'Genetický algoritmus' },
    ];

    const problems = [
        { id: 'knapsack', name: 'Úloha o batohu' },
        { id: 'TSP', name: 'Travelling salesman problem' },
    ];

    const [selectedHeuristic, setSelectedHeuristic] = useState(heuristics[0].id);
    const [selectedProblem, setSelectedProblem] = useState(problems[0].id);
    const navigate = useNavigate();

    const handleSubmit = () => {
        navigate(`/visualization?heuristic=${selectedHeuristic}&problem=${selectedProblem}`);
    };

    const handleHeuristicChange = (event) => {
        setSelectedHeuristic(event.target.value);
    };

    const handleProblemChange = (event) => {
        setSelectedProblem(event.target.value);
    };

    return (
        <div className="flex flex-col items-center mt-4">
            <label className="mb-4 text-white">
                Vyberte heuristiku:
                <select
                    value={selectedHeuristic}
                    onChange={handleHeuristicChange}
                    className="ml-2 p-2 border border-gray-300 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500" // Dark background and text color
                >
                    <option value="">-- Vyberte --</option>
                    {heuristics.map((heuristic) => (
                        <option key={heuristic.id} value={heuristic.id}>
                            {heuristic.name}
                        </option>
                    ))}
                </select>
            </label>

            <label className="mb-4 text-white">
                Vyberte problém:
                <select
                    value={selectedProblem}
                    onChange={handleProblemChange}
                    className="ml-2 p-2 border border-gray-300 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500" // Dark background and text color
                >
                    <option value="">-- Vyberte --</option>
                    {problems.map((problem) => (
                        <option key={problem.id} value={problem.id}>
                            {problem.name}
                        </option>
                    ))}
                </select>
            </label>

            {selectedHeuristic && selectedProblem && (
                <p className="mt-4 text-lg text-white">
                    Vybraná heuristika: {selectedHeuristic}, Vybraný problém: {selectedProblem}
                </p>
            )}

            <button className="mt-4 px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    onClick={handleSubmit}>
                Potvrď
            </button>

        </div>
    );
}

export default Selector;
