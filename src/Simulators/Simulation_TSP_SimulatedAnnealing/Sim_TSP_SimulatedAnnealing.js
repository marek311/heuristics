import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SimulationHeader from '../Simulation_General/Simulation_Header';
import TSPDataGraph from "../../InputDisplay/TSP/TSP_DataGraph";

function SimulationTSPAnnealing() {
    const navigate = useNavigate();
    const location = useLocation();

    const { data } = location.state || {};
    const [tour, setTour] = useState([]);
    const [temperature, setTemperature] = useState(100);
    const [coolingRate] = useState(0.99);
    const [iteration, setIteration] = useState(0);
    const [currentCost, setCurrentCost] = useState(0);

    useEffect(() => {
        if (data && data.edges && data.edges.length > 0) {
            const greedyTour = [];
            const visitedCities = new Set();
            let currentCity = data.edges[0].city1;

            greedyTour.push(currentCity);
            visitedCities.add(currentCity);

            const getDistance = (city1, city2) => {
                const edge = data.edges.find(
                    (edge) =>
                        (edge.city1 === city1 && edge.city2 === city2) ||
                        (edge.city1 === city2 && edge.city2 === city1)
                );
                return edge ? edge.distance : Infinity;
            };

            while (visitedCities.size < data.cityCount) {
                let nearestCity = null;
                let shortestDistance = Infinity;

                for (const edge of data.edges) {
                    const nextCity = edge.city1 === currentCity && !visitedCities.has(edge.city2) ? edge.city2 :
                        (edge.city2 === currentCity && !visitedCities.has(edge.city1) ? edge.city1 : null);
                    if (nextCity) {
                        const distance = getDistance(currentCity, nextCity);
                        if (distance < shortestDistance) {
                            nearestCity = nextCity;
                            shortestDistance = distance;
                        }
                    }
                }

                if (nearestCity) {
                    greedyTour.push(nearestCity);
                    visitedCities.add(nearestCity);
                    currentCity = nearestCity;
                }
            }

            greedyTour.push(greedyTour[0]);

            setTour(greedyTour);

            const calculateCost = (tour) => {
                let cost = 0;
                for (let i = 0; i < tour.length - 1; i++) {
                    const currentCity = tour[i];
                    const nextCity = tour[i + 1];
                    const edge = data.edges.find(
                        (edge) =>
                            (edge.city1 === currentCity && edge.city2 === nextCity) ||
                            (edge.city1 === nextCity && edge.city2 === currentCity)
                    );
                    if (edge) {
                        cost += edge.distance;
                    }
                }
                return cost;
            };

            const initialCost = calculateCost(greedyTour);
            setCurrentCost(initialCost);
        }
    }, [data]);

    const handleIteration = () => {
        // To be implemented
    };

    const handleRun = () => {
        // To be implemented
    };

    const handleReset = () => {
        // To be implemented
    };

    return (
        <div className="text-gray-800 p-6">
            <SimulationHeader
                handleGoBack={() => navigate(-1)}
                title="TSP Simulation Using Simulated Annealing"
            />
            <div className="flex flex-col lg:flex-row w-full h-full">
                <TSPDataGraph data={data}/>

                <div className="p-4 bg-white rounded-lg shadow-md w-full lg:w-1/3">
                    <h2 className="text-lg font-semibold mb-4">Simulation Details</h2>
                    <ul className="space-y-2">
                        <li>Initial Cost: {currentCost.toFixed(2)}</li>
                        <li>Iteration: {iteration}</li>
                        <li>Current Temperature: {temperature.toFixed(2)}</li>
                        <li>
                            <strong>Current Tour:</strong>
                            <ul>
                                {tour.map((city, index) => (
                                    <li key={index}>{city}</li>
                                ))}
                            </ul>
                        </li>

                    </ul>
                </div>
            </div>
        </div>
    );
}

export default SimulationTSPAnnealing;
