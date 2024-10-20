import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Selector() {
    const heuristics = [
        {id: 'Insert heuristic', name: 'Insert heuristic'},
        {id: 'Exchange first fit', name: 'Exchange first fit'},
        {id: 'Exchange best fit', name: 'Exchange best fit'},
        {id: 'Simulated annealing', name: 'Simulated annealing'},
        {id: 'Tabu search', name: 'Tabu search'},
        {id: 'Genetic algorithm', name: 'Genetic algorithm'},
    ];

    const problems = [
        {id: 'Knapsack problem', name: 'Knapsack problem'},
        {id: 'TSP', name: 'Problém obchodného cestujúceho'},
    ];

    const [selectedHeuristic, setSelectedHeuristic] = useState(heuristics[0].id);
    const [selectedProblem, setSelectedProblem] = useState(problems[0].id);

    const navigate = useNavigate();

    const handleHeuristicChange = (event) => {
        setSelectedHeuristic(event.target.value);
    };

    const handleProblemChange = (event) => {
        setSelectedProblem(event.target.value);
    };

    const handleSubmit = () => {
        navigate(`/visualization?heuristic=${selectedHeuristic}&problem=${selectedProblem}`);
    };

    const selectProblemAndHeuristic = () => {
        return (
        <div className="text-center p-6 bg-purple-800 rounded-lg shadow-lg flex flex-col items-center mt-4">
            <h1 className="text-white text-4xl font-bold mb-6">Heuristiky a metaheuristiky</h1>
                <label className="mb-4 text-white">
                    Vyberte heuristiku:
                    <select
                        value={selectedHeuristic}
                        onChange={handleHeuristicChange}
                        className="ml-2 p-2 border border-gray-300 rounded bg-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
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
                        className="ml-2 p-2 border border-gray-300 rounded bg-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                        <option value="">-- Vyberte --</option>
                        {problems.map((problem) => (
                            <option key={problem.id} value={problem.id}>
                                {problem.name}
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
        <>
            {selectProblemAndHeuristic()}
        </>
    );
}

export default Selector;
