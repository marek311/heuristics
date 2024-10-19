import { useLocation } from 'react-router-dom';

function VisualizationPage() {
    const location = useLocation();

    const query = new URLSearchParams(location.search);
    const heuristic = query.get('heuristic');
    const problem = query.get('problem');

    const renderInputFields = () => {
        switch (problem) {
            case 'Knapsack':
                return (
                    <div>
                        <label className="block text-white mb-2">Zadajte pole hmotnosti predmetov:</label>
                        <input type="text" className="p-2 mb-4 text-black border rounded w-full"
                               placeholder="Hmotnosti predmetov" />

                        <label className="block text-white mb-2">Zadajte pole cien predmetov:</label>
                        <input type="text" className="p-2 mb-4 text-black border rounded w-full"
                               placeholder="Ceny predmetov" />

                        <label className="block text-white mb-2">Zadajte kapacitu batohu:</label>
                        <input type="text" className="p-2 mb-4 text-black border rounded w-full"
                               placeholder="Kapacita batohu" />
                    </div>
                );
            case 'TSP':
                return (
                    <div>
                        <label className="block text-white mb-2">Zadajte x suradnice miest:</label>
                        <input type="text" className="p-2 mb-4 text-black border rounded w-full"
                               placeholder="X suradnice"/>

                        <label className="block text-white mb-2">Zadajte y suradnice miest:</label>
                        <input type="text" className="p-2 mb-4 text-black border rounded w-full"
                               placeholder="Y suradnice"/>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div
            className=" mb-4 flex flex-col items-center justify-center w-fit h-fit text-white p-6 bg-purple-600 rounded-lg mx-auto my-10">
            <h2 className="text-3xl font-bold">
                Problém: {problem}
            </h2>
            <h2 className="text-3xl font-bold">
                Heuristika: {heuristic}
            </h2>
            {renderInputFields()}
            <div className="flex space-x-4 mt-4">
                <button className="px-4 py-2 bg-red-800 rounded hover:bg-red-950">
                    Späť
                </button>
                <button className="px-4 py-2 bg-teal-700 rounded hover:bg-purple-700">
                    Spusti
                </button>
            </div>
        </div>
    );
}

export default VisualizationPage;
