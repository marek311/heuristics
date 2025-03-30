import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../Components/Header';
import TSPDataGraph from '../../InputHandling/InputDisplay/TSPDataGraph';
import FlowchartTabuSearch from "./FlowchartTabuSearch";
import TabuList from './TabuList';
import SolutionTSPTabuSearch from "./SolutionTabuSearch";
import Neighborhood from "./Neighborhood";
import { useTabuSearch } from './AlgorithmsTabuSearch';
import Colors from "../../Main/Colors";

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
    const [bestNeighborData, setBestNeighborData] = useState(null);
    const [iteration, setIteration] = useState(0);
    const [status, setStatus] = useState("");
    const [step, setStep] = useState(0);
    const [highlightLinks, setHighlightLinks] = useState([]);
    const [isIterationComplete, setIsIterationComplete] = useState(true);
    const tabuTenure = data?.tabuTenure || 4;

    const { initialize, iterationMethod, run } = useTabuSearch({
        data,
        currentTour,
        setCurrentTour,
        currentCost,
        setCurrentCost,
        setBestTour,
        bestCost,
        setBestCost,
        setPreviousTour,
        setPreviousCost,
        tabuList,
        setTabuList,
        iteration,
        setIteration,
        neighborhood,
        setNeighborhood,
        setStatus,
        step,
        setStep,
        bestNeighborData,
        setBestNeighborData,
        setHighlightLinks,
        isIterationComplete,
        setIsIterationComplete,
        tabuTenure
    });

    useEffect(() => {
        initialize();
        // eslint-disable-next-line
    }, [data]);

    return (
        <div className={`${Colors.textPrimary} p-6`}>
            <Header
                handleGoBack={() => navigate(-1)}
                title="Travelling Salesman Problem Simulation Using Tabu Search"
                handleStep={iterationMethod}
                handleReset={initialize}
                handleRun={run}
            />
            <div className="flex flex-col lg:flex-row w-full h-full lg:space-x-2">
                <TSPDataGraph
                    data={data}
                    tour={bestTour}
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
                <TabuList
                    tabuList={tabuList}
                    tabuTenure={tabuTenure}
                />
                <FlowchartTabuSearch
                    highlightLinks={highlightLinks}
                />
            </div>
        </div>
    );
}

export default MainComponentTabuSearch;