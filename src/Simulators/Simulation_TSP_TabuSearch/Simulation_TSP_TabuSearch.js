import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SimulationHeader from '../Simulation_General/Simulation_Header';
import TSPDataGraph from '../../InputDisplay/TSP/TSP_DataGraph';
import TabuTable from './TabuTable';
import { useTabuSearch } from './Algs_TSP_TabuSearch';
import Flowchart_TSP_TabuSearch from "./Flowchart_TSP_TabuSearch";
import Solution_TSP_TabuSearch from "./Solution_TSP_TabuSearch";

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
                <Solution_TSP_TabuSearch
                    currentTour={currentTour}
                    currentCost={currentCost}
                    bestTour={bestTour}
                    bestCost={bestCost}
                    iteration={iteration}
                />
                <TabuTable
                    tabuList={tabuList}
                />
                <Flowchart_TSP_TabuSearch

                />
            </div>
        </div>
    );
}

export default SimulationTSPTabu;