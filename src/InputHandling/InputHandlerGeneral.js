import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Colors from '../Main/Colors';
import InputHandlerKnapsack from './InputHandlerKnapsack';
import InputHandlerTSP from './InputHandlerTSP';
import DefaultDataKnapsack from './DefaultDataKnapsack';

function InputHandlerGeneral() {
    const location = useLocation();
    const navigate = useNavigate();
    const query = new URLSearchParams(location.search);
    const mode = query.get('mode');

    const defaultKnapsackData = DefaultDataKnapsack();
    const [knapsackData, setKnapsackData] = useState({
        weights: defaultKnapsackData.weights,
        prices: defaultKnapsackData.prices,
        capacity: defaultKnapsackData.capacity,
    });

    const [tspData, setTspData] = useState({
        xCoordinates: '',
        yCoordinates: '',
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
            case 'KnapsackGenetic':
                simulationPath = '/knapsack-genetic-simulation';
                break;
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
        <div className={`mb-4 flex flex-col items-center justify-center w-fit h-fit p-6 bg-white rounded-lg shadow-lg mx-auto my-10`}>
            {['KnapsackInsert', 'KnapsackExchangeFirst', 'KnapsackExchangeBest', 'KnapsackGenetic'].includes(mode) && (
                <InputHandlerKnapsack data={knapsackData} setData={setKnapsackData} />
            )}
            {['TSPSimulatedAnnealing', 'TSPTabuSearch'].includes(mode) && (
                <InputHandlerTSP data={tspData} setData={setTspData} />
            )}
            <div className="items-center justify-center flex space-x-4 mt-4">
                <button
                    onClick={handleGoBack}
                    className={`px-4 py-2 rounded ${Colors.buttonSecondary} ${Colors.buttonSecondaryHover}`}>
                    Späť
                </button>
                <button
                    onClick={handleRunClick}
                    className={`px-4 py-2 rounded ${Colors.buttonPrimary} ${Colors.buttonPrimaryHover}`}>
                    Ďaľej
                </button>
            </div>
        </div>
    );
}

export default InputHandlerGeneral;
