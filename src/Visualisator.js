import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import D3Flowchart from './FlowchartVisualisator'; // Ensure to import D3Flowchart

function VisualizationPage() {
    const location = useLocation();
    const [inputs, setInputs] = useState({});
    const [solution, setSolution] = useState(null);

    const query = new URLSearchParams(location.search);
    const heuristic = query.get('heuristic');
    const problem = query.get('problem');

    const renderInputs = () => {
        switch (problem) {
            case 'knapsack':
                return (
                    <div>
                        <label className="block text-white mb-2">Zadajte pole hmotnosti predmetov:</label>
                        <input type="text" className="p-2 mb-4 border rounded w-full"
                               placeholder="Hmotnosti predmetov" onChange={(e) => setInputs({ ...inputs, weights: e.target.value })}/>

                        <label className="block text-white mb-2">Zadajte pole cien predmetov:</label>
                        <input type="text" className="p-2 mb-4 border rounded w-full"
                               placeholder="Ceny predmetov" onChange={(e) => setInputs({ ...inputs, values: e.target.value })}/>

                        <label className="block text-white mb-2">Zadajte kapacitu batohu:</label>
                        <input type="text" className="p-2 mb-4 border rounded w-full"
                               placeholder="Kapacita batohu" onChange={(e) => setInputs({ ...inputs, capacity: e.target.value })}/>
                    </div>
                );
            case 'TSP':
                return (
                    <div>
                        <label className="block text-white mb-2">Zadajte mestá a ich pozície:</label>
                        <input type="text" className="p-2 mb-4 border rounded w-full" placeholder="Zadajte mestá"
                               onChange={(e) => setInputs({...inputs, cities: e.target.value})}/>
                    </div>
                );
            default:
                return null;
        }
    };

    const handleRunHeuristic = () => {
        setSolution({ message: 'Riešenie bolo úspešne vykonané!' });
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6">
            <h1 className="text-3xl font-bold mb-4">Heuristika: {heuristic}, Problém: {problem}</h1>

            {renderInputs()}

            <button className="px-4 py-2 bg-purple-600 rounded hover:bg-purple-700" onClick={handleRunHeuristic}>
                Spusti heuristiku
            </button>

            <div className="mt-8">
                {solution && (
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Aktuálne riešenie:</h2>
                        <p>{solution.message}</p>
                        <D3Flowchart heuristic={heuristic} problem={problem} />
                    </div>
                )}
            </div>
        </div>
    );
}

export default VisualizationPage;
