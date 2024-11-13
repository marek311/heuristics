import React from 'react';
import { useState } from 'react';
import { useNavigate} from "react-router-dom";

function InputHandlerTSP( {mode}) {

    const [xCoordinates, setXCoordinates] = useState('');
    const [yCoordinates, setYCoordinates] = useState('');

    const navigate = useNavigate();
    const handleGoBack = () => {
        navigate(`/`);
    };

    const handleRunClick = () => {
        const inputData = {xCoordinates, yCoordinates};
        let simulationPath;
        switch (mode) {
            case 'TSPSimulatedAnnealing':
                simulationPath = '/tsp-simulated-annealing-simulation';
                break;
            case 'TSPTabuSearch':
                simulationPath = '/tsp-tabu-search-simulation';
                break;
            default:
                simulationPath = '/';
        }
        navigate(simulationPath, { state: { mode, data: inputData } });
    };

    return (
        <div>
            <label className="block text-white mb-2">Zadajte x suradnice miest:</label>
            <input
                type="text"
                className="p-2 mb-4 text-black border rounded w-full"
                placeholder="X suradnice"
                value={xCoordinates}
                onChange={(e) => setXCoordinates(e.target.value)}
            />

            <label className="block text-white mb-2">Zadajte y suradnice miest:</label>
            <input
                type="text"
                className="p-2 mb-4 text-black border rounded w-full"
                placeholder="Y suradnice"
                value={yCoordinates}
                onChange={(e) => setYCoordinates(e.target.value)}
            />

            <div className="items-center justify-center flex space-x-4 mt-4">
                <button onClick={handleGoBack} className="px-4 py-2 bg-red-800 rounded hover:bg-red-950">
                    Späť
                </button>
                <button onClick={handleRunClick} className="px-4 py-2 bg-teal-700 rounded hover:bg-purple-700">
                    Spusti
                </button>
            </div>

        </div>
    );
}

export default InputHandlerTSP;