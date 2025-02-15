import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../Components/Header';
import TSPDataGraph from '../../../InputDisplay/TSP/TSPDataGraph';
import FlowchartTabuSearch from "./FlowchartTabuSearch";
import TabuTable from './TabuTable';
import SolutionTSPTabuSearch from "./SolutionTabuSearch";
import Neighborhood from "./Neighborhood";
import { useTabuSearch } from './AlgorithmsTabuSearch';

function MainComponentTabuSearch() {
    const navigate = useNavigate();
    const location = useLocation();
    const { data } = location.state || {};

    const [currentTour, setCurrentTour] = useState([]);
    const [currentCost, setCurrentCost] = useState(0);
    const [bestTour, setBestTour] = useState([]);
    const [bestCost, setBestCost] = useState(Infinity);
    const [previousTour, setPreviousTour] = useState([]);
    const [previousCost, setPreviousCost] = useState(null);
    const [neighborhood, setNeighborhood] = useState([]);
    const [tabuList, setTabuList] = useState([]);
    const [iteration, setIteration] = useState(0);
    const [status, setStatus] = useState("");

    const { initialize, step, run } = useTabuSearch({
        data,
        currentTour,
        currentCost,
        bestTour,
        bestCost,
        tabuList,
        iteration,
        setCurrentTour,
        setCurrentCost,
        setBestTour,
        setBestCost,
        setTabuList,
        setIteration,
        setPreviousTour,
        setPreviousCost,
        setNeighborhood,
        setStatus
    });

    useEffect(() => {
        initialize();
    }, [data]);

    return (
        <div className="text-gray-800 p-6">
            <Header
                handleGoBack={() => navigate(-1)}
                title="TSP Simulation Using Tabu Search"
                handleStep={step}
                handleReset={initialize}
                handleRun={run}
            />
            <div className="flex flex-col lg:flex-row w-full h-full lg:space-x-2">
                <TSPDataGraph
                    data={data}
                    tour={currentTour}
                />
                <SolutionTSPTabuSearch
                    currentTour={currentTour}
                    currentCost={currentCost}
                    bestTour={bestTour}
                    bestCost={bestCost}
                    previousTour={previousTour}
                    previousCost={previousCost}
                    iteration={iteration}
                    status={status}
                />
                <Neighborhood
                    neighborhood={neighborhood}
                    tabuList={tabuList}
                    iteration={iteration}
                />
                <TabuTable
                    tabuList={tabuList}
                />
                <FlowchartTabuSearch />
            </div>
        </div>
    );
}

export default MainComponentTabuSearch;