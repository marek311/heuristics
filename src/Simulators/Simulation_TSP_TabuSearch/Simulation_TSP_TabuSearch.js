import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SimulationHeader from '../Simulation_General/Simulation_Header';
import TSPDataGraph from '../../InputDisplay/TSP/TSP_DataGraph';
import TabuTable from './TabuTable';
import { useTabuSearch } from './Algs_TSP_TabuSearch';

function SimulationTSPTabu() {
    const navigate = useNavigate();
    const location = useLocation();
    const { data } = location.state || {};

    const {
        currentTour,
        currentCost,
        bestTour,
        bestCost,
        tabuList,
        iteration,
        initialize,
        step
    } = useTabuSearch(data);

    useEffect(() => {
        initialize();
    }, [data]);

    return (
        <div className="text-gray-800 p-6">
            <SimulationHeader
                handleGoBack={() => navigate(-1)}
                title="TSP Simulation Using Tabu Search"
                handleStep={step}
                handleReset={initialize}
            />
            <div className="flex flex-col lg:flex-row w-full h-full lg:space-x-2">
                <TSPDataGraph
                    data={data}
                    tour={currentTour}
                />

                <div className="mb-4 p-4 bg-gray-100 rounded-lg">
                    <div className="mb-4 p-4 bg-gray-100 rounded-lg">
                        <h2 className="text-lg font-bold">Tabu Search Progress:</h2>
                        <p><strong>Aktuálna trasa:</strong></p>
                        <p>{currentTour.join("→")}</p>
                        <p><strong>Cost:</strong> {currentCost}</p>
                        <p><strong>Najlepšia trasa:</strong></p>
                        <p> {bestTour.join("→")}</p>
                        <p><strong>Cost:</strong> {bestCost}</p>
                    </div>
                    <div className="p-4 bg-white shadow-lg rounded-lg">
                        <h2 className="text-lg font-bold">Iteration</h2>
                        <p>{iteration}</p>
                    </div>
                </div>
                <TabuTable tabuList={tabuList} />
            </div>
        </div>
    );
}

export default SimulationTSPTabu;