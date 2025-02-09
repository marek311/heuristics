import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../Components/Header';
import TSPDataGraph from '../../../InputDisplay/TSP/TSPDataGraph';
import Flowchart_TSP_TabuSearch from "./FlowchartTabuSearch";
import TabuTable from './TabuTable';
import Solution_TSP_TabuSearch from "./SolutionTabuSearch";
import { useTabuSearch } from './AlgorithmsTabuSearch';

function MainComponentTabuSearch() {
    const navigate = useNavigate();
    const location = useLocation();
    const { data } = location.state || {};

    const [currentTour, setCurrentTour] = useState([]);
    const [currentCost, setCurrentCost] = useState(Infinity);
    const [bestTour, setBestTour] = useState([]);
    const [bestCost, setBestCost] = useState(Infinity);
    const [tabuList, setTabuList] = useState([]);
    const [iteration, setIteration] = useState(0);

    const { initialize, step } = useTabuSearch({
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
        setIteration
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
                <Flowchart_TSP_TabuSearch
                />
                <TabuTable
                    tabuList={tabuList}
                />
            </div>
        </div>
    );
}

export default MainComponentTabuSearch;