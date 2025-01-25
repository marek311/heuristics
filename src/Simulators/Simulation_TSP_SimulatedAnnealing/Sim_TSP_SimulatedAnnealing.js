import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SimulationHeader from '../Simulation_General/Simulation_Header';
import TSPDataGraph from "../../InputDisplay/TSP/TSP_DataGraph";

function SimulationTSPAnnealing() {
    const navigate = useNavigate();
    const location = useLocation();

    const { data } = location.state || {};

    const [currentTour, setCurrentTour] = useState([]);
    const [currentCost, setCurrentCost] = useState(0);

    useEffect(() => {
        if (data && data.edges) {
            const cities = Array.from(new Set(data.edges.flatMap((edge) => [edge.city1, edge.city2])));
            let randomTour = [...cities].sort(() => Math.random() - 0.5);

            randomTour.push(randomTour[0]);
            setCurrentTour(randomTour);

            let totalCost = 0;
            for (let i = 0; i < randomTour.length - 1; i++) {
                const edge = data.edges.find((e) =>
                    (e.city1 === randomTour[i] && e.city2 === randomTour[i + 1]) ||
                    (e.city1 === randomTour[i + 1] && e.city2 === randomTour[i])
                );
                totalCost += edge.distance;
            }

            setCurrentCost(totalCost);
        }
    }, [data]);

    const handleIteration = () => {
        // TODO
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
                <TSPDataGraph data={data} tour={currentTour}/>
                <div className="p-4 bg-white rounded-lg shadow-md w-full lg:w-1/3">
                    <h2 className="text-lg font-semibold mb-4">Current Simulation Details</h2>
                    <ul className="space-y-2">
                        <li>Cost: {currentCost}</li>
                        <li>Iteration: 0</li>
                        <li>Temperature:</li>
                        <li>
                            <strong>Current Tour:</strong>
                            <ul>
                                <li>
                                    {currentTour.map((city, index) => (
                                        <span key={index}> {city}
                                            {index < currentTour.length - 1 ? ',' : ''}
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
