import { useLocation, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import Colors from '../../Main/Colors';
import InputHandlerKP from './InputHandlerKP';
import InputHandlerTSP from './InputHandlerTSP';
import KP_DefaultData from '../DefaultData/KP_DefaultData';
import TSP_DefaultData from '../DefaultData/TSP_DefaultData';

function InputHandlerGeneral() {
    const location = useLocation();
    const navigate = useNavigate();
    const query = new URLSearchParams(location.search);
    const mode = query.get('mode');

    const defaultKnapsackData = KP_DefaultData();
    const [knapsackData, setKnapsackData] = useState({
        weights: defaultKnapsackData.weights,
        prices: defaultKnapsackData.prices,
        capacity: defaultKnapsackData.capacity,
    });

    const defaultTspData = TSP_DefaultData();
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
                <InputHandlerKP data={knapsackData} setData={setKnapsackData}/>
            )}
            {['TSPSimulatedAnnealing', 'TSPGenetic', 'TSPTabuSearch'].includes(mode) && (
                <InputHandlerTSP data={tspData} setData={setTspData} mode={mode}/>
            )}
            <div className="flex w-full">
                <button
                    onClick={handleGoBack}
                    className={`px-4 py-4 rounded ${Colors.buttonSecondary} ${Colors.buttonSecondaryHover} ml-5`}>
                    Back
                </button>
                <div className="flex-grow"></div>
                <button
                    onClick={handleRunClick}
                    className={`px-4 py-4 rounded ${Colors.buttonPrimary} ${Colors.buttonPrimaryHover} mr-6`}>
                    Next
                </button>
            </div>
        </div>
    );
}

export default InputHandlerGeneral;
