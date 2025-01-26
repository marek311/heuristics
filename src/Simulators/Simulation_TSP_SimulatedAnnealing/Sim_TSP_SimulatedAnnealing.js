import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SimulationHeader from '../Simulation_General/Simulation_Header';
import TSPDataGraph from '../../InputDisplay/TSP/TSP_DataGraph';
import {
    initializeTour
} from './Algs_TSP_SimulatedAnnealing';

function SimulationTSPAnnealing() {
    const navigate = useNavigate();
    const location = useLocation();

    const { data } = location.state || {};

    const [currentTour, setCurrentTour] = useState([]);
    const [currentCost, setCurrentCost] = useState(0);
    const [temperature, setTemperature] = useState(100);
    const [coolingRate, setCoolingRate] = useState(0.95);
    const [iteration, setIteration] = useState(0);

    useEffect(() => {
        if (data && data.edges) {
            const { randomTour, totalCost } = initializeTour(data);
            setCurrentTour(randomTour);
            setCurrentCost(totalCost);
        }
    }, [data]);

    const handleIteration = () => {
        // TODO
        //Randomly swapping two cities in the currentTour.
        //Calculating the cost of the new tour.
        //Accepting or rejecting the new tour based on the cost difference and temperature.
        //Updating the temperature (lower it over time).
        //Incrementing the iteration count.
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
            />
            <div className="flex flex-col lg:flex-row w-full h-full">
                <TSPDataGraph data={data} tour={currentTour} />
                <div className="p-4 bg-white rounded-lg shadow-md w-full lg:w-1/3">
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
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default SimulationTSPAnnealing;
