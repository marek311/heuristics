import { useLocation } from 'react-router-dom';

function VisualizationPage() {
    const location = useLocation();

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
                               placeholder="Hmotnosti predmetov" />

                        <label className="block text-white mb-2">Zadajte pole cien predmetov:</label>
                        <input type="text" className="p-2 mb-4 border rounded w-full"
                               placeholder="Ceny predmetov" />

                        <label className="block text-white mb-2">Zadajte kapacitu batohu:</label>
                        <input type="text" className="p-2 mb-4 border rounded w-full"
                               placeholder="Kapacita batohu" />
                    </div>
                );
            case 'TSP':
                return (
                    <div>
                        <label className="block text-white mb-2">Zadajte x suradnice miest:</label>
                        <input type="text" className="p-2 mb-4 border rounded w-full"
                               placeholder="X suradnice"/>

                        <label className="block text-white mb-2">Zadajte y suradnice miest:</label>
                        <input type="text" className="p-2 mb-4 border rounded w-full"
                               placeholder="Y suradnice"/>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6">
            <h1 className="text-3xl font-bold mb-4">Heuristika: {heuristic}, Problém: {problem}</h1>
            {renderInputs()}
            <button className="px-4 py-2 bg-purple-600 rounded hover:bg-purple-700">
                Spusti heuristiku
            </button>
        </div>
    );
}

export default VisualizationPage;
