import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../Components/Header';
import {
    generateInitialPopulation,
    rouletteWheelSelection
} from './AlgorithmsGeneticAlgorithm';
import SelectionComponent from "./SelectionComponent";
import RouletteWheel from "./RouletteWheel";

function MainComponentGeneticAlgorithm() {
    const navigate = useNavigate();
    const location = useLocation();
    const { data } = location.state || {};

    const [population, setPopulation] = useState([]);
    const [fitnessValues, setFitnessValues] = useState([]);
    const [probabilities, setProbabilities] = useState([]);
    const [cumulativeProbabilities, setCumulativeProbabilities] = useState([]);
    const [selectedPopulation, setSelectedPopulation] = useState([]);
    const [randomValues, setRandomValues] = useState([]);

    useEffect(() => {
        if (data) {
            const initialPop = generateInitialPopulation(data, 5);
            setPopulation(initialPop);
            rouletteWheelSelection(
                initialPop, data, 3,
                setFitnessValues,
                setProbabilities,
                setCumulativeProbabilities,
                setSelectedPopulation,
                setRandomValues
            );
        }
    }, [data]);

    return (
        <div className="text-gray-800 p-6">
            <Header
                handleGoBack={() => navigate(-1)}
                title="TSP Simulation Using Genetic Algorithm"
            />
            <div className="flex flex-col lg:flex-row w-full h-full lg:space-x-2">
                <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-3xl">
                    <h2 className="text-xl font-semibold text-center">Initial Population</h2>
                    {population.map((tour, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-center space-x-2 text-gray-700 py-2 whitespace-nowrap overflow-x-auto">
                            <span className="font-medium text-gray-900">{index + 1}.</span>
                            {tour.map((city, i) => (
                                <span key={i} className="whitespace-nowrap">
                                    {city} {i !== tour.length - 1 && <span className="text-gray-500">→</span>}
                                </span>
                            ))}
                            <span className="ml-4 text-sm text-gray-600">
                                (Fitness: {fitnessValues[index]?.toFixed(4)})
                            </span>
                        </div>
                    ))}
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-3xl">
                    <h2 className="text-lg font-semibold text-gray-800">Selection - Roulette Wheel</h2>
                    <RouletteWheel
                        population={population}
                        fitnessValues={fitnessValues}
                        randomValues={randomValues}
                    />
                    <SelectionComponent
                        population={population}
                        fitnessValues={fitnessValues}
                        probabilities={probabilities}
                        cumulativeProbabilities={cumulativeProbabilities}
                        selectedPopulation={selectedPopulation}
                    />
                </div>
            </div>
        </div>
    );
}

export default MainComponentGeneticAlgorithm;
