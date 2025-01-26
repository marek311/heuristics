import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SimulationHeader from '../Simulation_General/Simulation_Header';
import TSPDataGraph from '../../InputDisplay/TSP/TSP_DataGraph';
import {
    initializeTour,
    handleIteration,
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
            setBestCost
        );
    };

    const handleRun = () => {
        // TODO
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
            />
            <div className="flex flex-col lg:flex-row w-full h-full">
                <TSPDataGraph data={data} tour={currentTour} />
                <div className="p-4 bg-white rounded-lg shadow-md w-full lg:w-1/3">
                    <h2 className="text-lg font-semibold mb-4">Best Found Solution</h2>
                    <ul className="space-y-2">
                        <li>Best Cost: {bestCost}</li>
                        <li>
                            <strong>Best Tour:</strong>
                            <ul>
                                <li>
                                    {bestTour.map((city, index) => (
                                        <span key={index}>
                                            {city}{index < bestTour.length - 1 ? ',' : ''}
                                        </span>
                                    ))}
                                </li>
                            </ul>
                        </li>
                    </ul>
                    <h2 className="text-lg font-semibold mb-4">Current Simulation Details</h2>
                    <ul className="space-y-2">
                        <li>Cost: {currentCost}</li>
                        <li>Iteration: {iteration}</li>
                        <li>Temperature: {temperature.toFixed(2)}</li>
                        <li>
                            <strong>Current Tour:</strong>
                            <ul>
                                <li>
                                    {currentTour.map((city, index) => (
                                        <span key={index}>
                                            {city}{index < currentTour.length - 1 ? ',' : ''}
                                        </span>
                                    ))}
                                </li>
                            </ul>
                        </li>
                        <li>Cost Difference: {costDifference}</li>
                        <li>Acceptance Probability: {acceptanceProbability.toFixed(4)}</li>
                        <li>Random Value: {randomValue.toFixed(4)}</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default SimulationTSPAnnealing;
