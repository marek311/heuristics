import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../Components/Header';
import {
    generateInitialPopulation,
    rouletteWheelSelection
} from './AlgorithmsGeneticAlgorithm';
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
                    <table className="w-full text-gray-700 text-center border-collapse border border-gray-300">
                        <thead className="bg-gray-100">
                        <tr>
                            <th className="border border-gray-300 px-4 py-2">Tour</th>
                            <th className="border border-gray-300 px-4 py-2">Fitness</th>
                            <th className="border border-gray-300 px-4 py-2">Probability</th>
                            <th className="border border-gray-300 px-4 py-2">Cumulative</th>
                        </tr>
                        </thead>
                        <tbody>
                        {probabilities.map((prob, index) => {
                            const isSelected = selectedPopulation.some(
                                (selectedTour) =>
                                    JSON.stringify(selectedTour) === JSON.stringify(population[index])
                            );
                            return (
                                <tr
                                    key={index}
                                    className={`border border-gray-300 ${isSelected ? 'bg-green-200 text-green-800 font-bold' : ''}`}>
                                    <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                                    <td className="border border-gray-300 px-4 py-2">{fitnessValues[index]?.toFixed(4)}</td>
                                    <td className="border border-gray-300 px-4 py-2">{prob.toFixed(4)}</td>
                                    <td className="border border-gray-300 px-4 py-2">{cumulativeProbabilities[index]?.toFixed(4)}</td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                    <h3 className="mt-4 text-lg font-semibold">Random Numbers Used for Selection:</h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {randomValues.map((rand, index) => (
                            <span key={index} className="px-3 py-1 bg-blue-200 rounded text-blue-800 font-semibold">
                                {rand.toFixed(4)}
                            </span>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    );
}

export default MainComponentGeneticAlgorithm;
