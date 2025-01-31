import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SimulationHeader from '../Simulation_General/Simulation_Header';
import TSPDataGraph from '../../InputDisplay/TSP/TSP_DataGraph';
import SolTSPSimulatedAnnealing from "./Sol_TSP_SimulatedAnnealing";
import TemperatureBar from "./BarCharts/TemperatureBar";
import ProbabilityBar from "./BarCharts/ProbabilityBar";
import CostsBar from "./BarCharts/CostsBar";
import {
    initializeTour,
    handleIteration,
    handleRun,
} from './Algs_TSP_SimulatedAnnealing';

function SimulationTSPAnnealing() {
    const navigate = useNavigate();
    const location = useLocation();

    const { data } = location.state || {};

    const [currentTour, setCurrentTour] = useState([]);
    const [currentCost, setCurrentCost] = useState(0);
    const [bestTour, setBestTour] = useState([]);
    const [bestCost, setBestCost] = useState(Infinity);
    const [temperature, setTemperature] = useState(100);
    const [iteration, setIteration] = useState(0);
    const [costDifference, setCostDifference] = useState(0);
    const [acceptanceProbability, setAcceptanceProbability] = useState(0);
    const [randomValue, setRandomValue] = useState(0);
    const [proposedTour, setProposedTour] = useState([]);
    const [proposedCost, setProposedCost] = useState(0);
    const [solutionStatus, setSolutionStatus] = useState("");

    useEffect(() => {
        if (data && data.edges) {
            const { randomTour, totalCost } = initializeTour(data);
            setCurrentTour(randomTour);
            setCurrentCost(totalCost);
            setBestTour(randomTour);
            setBestCost(totalCost);
        }
    }, [data]);

    const handleStep = () => {
        handleIteration(
            currentTour,
            setCurrentTour,
            currentCost,
            setCurrentCost,
            temperature,
            setTemperature,
            iteration,
            setIteration,
            data,
            setCostDifference,
            setAcceptanceProbability,
            setRandomValue,
            setBestTour,
            bestCost,
            setBestCost,
            setProposedTour,
            setProposedCost,
            setSolutionStatus
        );
    };

    const handleRunSimulation = () => {
        handleRun(
            currentTour,
            setCurrentTour,
            currentCost,
            setCurrentCost,
            temperature,
            setTemperature,
            iteration,
            setIteration,
            data,
            setCostDifference,
            setAcceptanceProbability,
            setRandomValue,
            bestTour,
            setBestTour,
            bestCost,
            setBestCost,
            setProposedTour,
            setProposedCost,
            setSolutionStatus
        );
    };

    const handleReset = () => {
        // TODO
    };

    return (
        <div className="text-gray-800 p-6">
            <SimulationHeader
                handleGoBack={() => navigate(-1)}
                title="TSP Simulation Using Simulated Annealing"
                handleStep={handleStep}
                handleRun={handleRunSimulation}
            />
            <div className="flex flex-col lg:flex-row w-full h-full lg:space-x-2">
                <TSPDataGraph
                    data={data}
                    tour={currentTour}
                />
                <CostsBar
                    currentCost={currentCost}
                    proposedCost={proposedCost}
                    bestCost={bestCost}
                />
                <SolTSPSimulatedAnnealing
                    bestCost={bestCost}
                    bestTour={bestTour}
                    currentCost={currentCost}
                    iteration={iteration}
                    currentTour={currentTour}
                    costDifference={costDifference}
                    proposedTour={proposedTour}
                    proposedCost={proposedCost}
                    solutionStatus={solutionStatus}
                />
                <ProbabilityBar
                    acceptanceProbability={acceptanceProbability}
                    randomValue={randomValue}
                />
                <TemperatureBar
                    temperature={temperature}
                />
            </div>
        </div>
    );
}

export default SimulationTSPAnnealing;