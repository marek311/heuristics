import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SimulationHeader from '../Simulation_General/Simulation_Header';
import TSPDataGraph from '../../InputDisplay/TSP/TSP_DataGraph';
import FlowchartTSPSimulatedAnnealing from "./Flowchart_TSP_SimulatedAnnealing";
import BarTemperature from "./Bar_Temperature";
import BarExperiment from "./Bar_Experiment";
import Solution from "./Solution_TSP_SimulatedAnnealing";
import {
    initializeTour,
    proposeNewSolution,
    calculateAcceptanceAndDecide,
    updateStateAndCoolDown,
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
    const [swappedIndexes, setSwappedIndexes] = useState([]);
    const [previousTour, setPreviousTour] = useState([]);
    const [previousCost, setPreviousCost] = useState(0);
    const [stepIndex, setStepIndex] = useState(0)

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
        if (stepIndex === 0) {
            proposeNewSolution(
                currentTour,
                setProposedTour,
                setProposedCost,
                setCostDifference,
                setSwappedIndexes,
                data,
                setSolutionStatus
            );
        } else if (stepIndex === 1) {
            calculateAcceptanceAndDecide(
                currentTour,
                proposedTour,
                currentCost,
                proposedCost,
                costDifference,
                temperature,
                setPreviousTour,
                setPreviousCost,
                setCurrentTour,
                setCurrentCost,
                bestTour,
                bestCost,
                setBestTour,
                setBestCost,
                setAcceptanceProbability,
                setRandomValue,
                setSolutionStatus
            );
        } else if (stepIndex === 2) {
            updateStateAndCoolDown(setTemperature, setIteration, temperature, iteration, setSolutionStatus);
        }

        setStepIndex((prevStepIndex) => (prevStepIndex + 1) % 3);
    };

    const handleRunSimulation = () => {
        handleRun(
            currentTour,
            setCurrentTour,
            previousTour,
            setPreviousTour,
            currentCost,
            setCurrentCost,
            previousCost,
            setPreviousCost,
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
            setSolutionStatus,
            setSwappedIndexes
        );
    };

    const handleResetUI = () => {
        if (data && data.edges) {
            const { randomTour, totalCost } = initializeTour(data);
            setCurrentTour(randomTour);
            setCurrentCost(totalCost);
            setBestTour(randomTour);
            setBestCost(totalCost);
            setTemperature(100);
            setIteration(0);
            setCostDifference(0);
            setAcceptanceProbability(0);
            setRandomValue(0);
            setProposedTour([]);
            setProposedCost(0);
            setSolutionStatus("");
            setSwappedIndexes([]);
            setPreviousTour([]);
            setPreviousCost(0);
            setStepIndex(0);
        }
    };

    return (
        <div className="text-gray-800 p-6">
            <SimulationHeader
                handleGoBack={() => navigate(-1)}
                title="TSP Simulation Using Simulated Annealing"
                handleStep={handleStep}
                handleRun={handleRunSimulation}
                handleReset={handleResetUI}
            />
            <div className="flex flex-col lg:flex-row w-full h-full lg:space-x-2">
                <TSPDataGraph
                    data={data}
                    tour={currentTour}
                />
                <Solution
                    currentCost={currentCost}
                    proposedCost={proposedCost}
                    bestCost={bestCost}
                    previousCost={previousCost}
                    currentTour={currentTour}
                    proposedTour={proposedTour}
                    bestTour={bestTour}
                    previousTour={previousTour}
                    costDifference={costDifference}
                    solutionStatus={solutionStatus}
                    iteration={iteration}
                />
                <FlowchartTSPSimulatedAnnealing
                    currentTour={currentTour}
                    proposedTour={proposedTour}
                />
                <BarExperiment
                    acceptanceProbability={acceptanceProbability}
                    randomValue={randomValue}
                />
                <BarTemperature
                    temperature={temperature}
                />
            </div>
        </div>
    );
}

export default SimulationTSPAnnealing;