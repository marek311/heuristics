import { useState } from 'react';

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

    const handleHeuristicChange = (event) => {
        setSelectedHeuristic(event.target.value);
    };

    const handleProblemChange = (event) => {
        setSelectedProblem(event.target.value);
    };

    return (
        <div className="flex flex-col items-center mt-4">
            <label className="mb-2">
                Vyberte heuristiku:
                <select value={selectedHeuristic} onChange={handleHeuristicChange} className="ml-2 p-1 border rounded">
                    <option value="">-- Vyberte --</option>
                    {heuristics.map((heuristic) => (
                        <option key={heuristic.id} value={heuristic.id}>
                            {heuristic.name} {/* Display the heuristic name */}
                        </option>
                    ))}
                </select>
            </label>

            <label className="mb-2">
                Vyberte problém:
                <select value={selectedProblem} onChange={handleProblemChange} className="ml-2 p-1 border rounded">
                    <option value="">-- Vyberte --</option>
                    {problems.map((problem) => (
                        <option key={problem.id} value={problem.id}>
                            {problem.name} {/* Display the problem name */}
                        </option>
                    ))}
                </select>
            </label>

            {selectedHeuristic && selectedProblem && (
                <p className="mt-4">
                    Vybraná heuristika: {selectedHeuristic}, Vybraný problém: {selectedProblem}
                </p>
            )}
        </div>
    );
}

export default Selector;
