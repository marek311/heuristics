import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../Components/Header';
import {
    generateInitialPopulation,
    calculateFitness
} from './AlgorithmsGeneticAlgorithm';

function MainComponentGeneticAlgorithm() {
    const navigate = useNavigate();
    const location = useLocation();
    const { data } = location.state || {};

    const [population, setPopulation] = useState([]);

    useEffect(() => {
        if (data) {
            setPopulation(generateInitialPopulation(data, 5));
        }
    }, [data]);

    return (
        <div className="text-gray-800 p-6">
            <Header
                handleGoBack={() => navigate(-1)}
                title="TSP Simulation Using Genetic Algorithm"
            />
            <div className="flex flex-col w-full h-full space-y-6 items-center">
                <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-3xl">
                    <h2 className="text-xl font-semibold text-center">Population</h2>
                    {population.map((tour, index) => (
                        <div key={index} className="flex items-center justify-center space-x-2 text-gray-700 py-2">
                            <span className="font-medium text-gray-900">{index + 1}.</span>
                            {tour.map((city, i) => (
                                <span key={i}>
                                    {city} {i !== tour.length - 1 && <span className="text-gray-500">→</span>}
                                </span>
                            ))}
                            <span className="ml-4 text-sm text-gray-600">(Fitness: {calculateFitness(tour, data).toFixed(4)})</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default MainComponentGeneticAlgorithm;
