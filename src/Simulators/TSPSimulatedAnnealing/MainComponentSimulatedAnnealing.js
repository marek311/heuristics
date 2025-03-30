import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../Components/Header';
import TSPDataGraph from '../../InputHandling/InputDisplay/TSPDataGraph';
import FlowchartTSPSimulatedAnnealing from "./FlowchartSimulatedAnnealing";
import BarTemperature from "./BarTemperature";
import BarExperiment from "./BarExperiment";
import Solution from "./SolutionSimulatedAnnealing";
import {
    initializeTour,
    proposeNewSolution,
    calculateAcceptanceAndDecide,
    updateStateAndCoolDown,
    handleRun,
} from './AlgorithmsSimulatedAnnealing';
import Colors from "../../Main/Colors";

function MainComponentSimulatedAnnealing() {

    const navigate = useNavigate();
    const location = useLocation();
    const { data } = location.state || {};

    const [currentTour, setCurrentTour] = useState([]);
    const [currentCost, setCurrentCost] = useState(0);
    const [bestTour, setBestTour] = useState([]);
    const [bestCost, setBestCost] = useState(Infinity);
    const [previousTour, setPreviousTour] = useState([]);
    const [previousCost, setPreviousCost] = useState(0);
    const [proposedTour, setProposedTour] = useState([]);
    const [proposedCost, setProposedCost] = useState(0);
    const [temperature, setTemperature] = useState(data?.temperature || 100);
    const [costDifference, setCostDifference] = useState(0);
    const [acceptanceProbability, setAcceptanceProbability] = useState(0);
    const [randomValue, setRandomValue] = useState(0);
    const [iteration, setIteration] = useState(0);
    const [status, setStatus] = useState("");
    const [stepIndex, setStepIndex] = useState(0);
    const [highlightLinks, setHighlightLinks] = useState([]);
    const [isIterationComplete, setIsIterationComplete] = useState(true);
    const coolingSchedule = data?.coolingRate || 0.95;

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
                data,
                setStatus,
                setHighlightLinks
            );
            setIsIterationComplete(false);
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
                setStatus,
                setHighlightLinks
            );
            setIsIterationComplete(false);
        } else if (stepIndex === 2) {
            updateStateAndCoolDown(
                setTemperature,
                setIteration,
                temperature,
                iteration,
                setStatus,
                setHighlightLinks,
                coolingSchedule
            );
            setIsIterationComplete(true);
        }
        setStepIndex((prevStepIndex) => (prevStepIndex + 1) % 3);
    };

    const handleRunSimulation = () => {
        if (!isIterationComplete) {
            alert(`Current Iteration Is Not Complete - Run Cannot Be Performed!`);
            return;
        }

        handleRun(
            currentTour,
            setCurrentTour,
            previousTour,
            setPreviousTour,
            currentCost,
            setCurrentCost,
            previousCost,
            setPreviousCost,
            setTemperature,
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
            setStatus,
            setHighlightLinks,
            coolingSchedule
        );
    };

    const handleResetUI = () => {
        if (data && data.edges) {
            const { randomTour, totalCost } = initializeTour(data);
            setCurrentTour(randomTour);
            setCurrentCost(totalCost);
            setBestTour(randomTour);
            setBestCost(totalCost);
            setPreviousTour([]);
            setPreviousCost(0);
            setProposedTour([]);
            setProposedCost(0);
            setTemperature(data?.temperature);
            setIteration(0);
            setCostDifference(0);
            setAcceptanceProbability(0);
            setRandomValue(0);
            setStatus("");
            setStepIndex(0);
            setHighlightLinks([]);
            setIsIterationComplete(true);
        }
    };

    return (
        <div className={`${Colors.textPrimary} p-6`}>
            <Header
                handleGoBack={() => navigate(-1)}
                title="Travelling Salesman Problem Simulation Using Simulated Annealing"
                handleStep={handleStep}
                handleRun={handleRunSimulation}
                handleReset={handleResetUI}
            />
            <div className="flex flex-col lg:flex-row w-full h-full lg:space-x-2">
                <TSPDataGraph
                    data={data}
                    tour={bestTour}
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
                    solutionStatus={status}
                    iteration={iteration}
                />
                <FlowchartTSPSimulatedAnnealing
                    highlightLinks={highlightLinks}
                />
                <BarExperiment
                    acceptanceProbability={acceptanceProbability}
                    randomValue={randomValue}
                />
                <BarTemperature
                    temperature={temperature}
                    maxTemperature={data.temperature}
                    coolingSchedule={coolingSchedule}
                />
            </div>
        </div>
    );
}

export default MainComponentSimulatedAnnealing;