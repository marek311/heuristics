import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Colors from '../Main/Colors';
import InputHandler_KP from './InputHandler_KP';
import InputHandler_TSP from './InputHandler_TSP';
import DefaultData_KP from './DefaultData/DefaultData_KP';
import DefaultData_TSP from './DefaultData/DefaultData_TSP';

function InputHandler_General() {
    const location = useLocation();
    const navigate = useNavigate();
    const query = new URLSearchParams(location.search);
    const mode = query.get('mode');

    const defaultKnapsackData = DefaultData_KP();
    const [knapsackData, setKnapsackData] = useState({
        weights: defaultKnapsackData.weights,
        prices: defaultKnapsackData.prices,
        capacity: defaultKnapsackData.capacity,
    });

    const defaultTspData = DefaultData_TSP();
    const [tspData, setTspData] = useState({
        cityCount: defaultTspData.cityCount,
        edges: defaultTspData.edges,
    });

    const handleGoBack = () => {
        navigate(`/`);
    };

    const handleRunClick = () => {
        let simulationPath;
        const inputData = mode.startsWith('Knapsack')
            ? knapsackData
            : tspData;

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
            case 'TSPSimulatedAnnealing':
                simulationPath = '/tsp-simulated-annealing-simulation';
                break;
            case 'TSPGenetic':
                simulationPath = '/tsp-genetic-simulation';
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
        <div className={`mb-4 flex flex-col items-center justify-center w-fit h-fit p-6 bg-white rounded-lg shadow-lg mx-auto my-10`}>
            {['KnapsackInsert', 'KnapsackExchangeFirst', 'KnapsackExchangeBest'].includes(mode) && (
                <InputHandler_KP data={knapsackData} setData={setKnapsackData} />
            )}
            {['TSPSimulatedAnnealing','TSPGenetic', 'TSPTabuSearch'].includes(mode) && (
                <InputHandler_TSP data={tspData} setData={setTspData} />
            )}
            <div className="items-center justify-center flex space-x-4 mt-4">
                <button
                    onClick={handleGoBack}
                    className={`px-4 py-2 rounded ${Colors.buttonSecondary} ${Colors.buttonSecondaryHover}`}>
                    Back
                </button>
                <button
                    onClick={handleRunClick}
                    className={`px-4 py-2 rounded ${Colors.buttonPrimary} ${Colors.buttonPrimaryHover}`}>
                    Next
                </button>
            </div>
        </div>
    );
}

export default InputHandler_General;
