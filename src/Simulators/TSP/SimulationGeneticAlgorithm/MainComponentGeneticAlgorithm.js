import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../Components/Header';
import {
    generateInitialPopulation,
    orderCrossover,
    rouletteWheelSelection
} from './AlgorithmsGeneticAlgorithm';
import SelectionComponent from "./SelectionComponent";
import PopulationComponent from "./PopulationComponent";
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
    const [offspring, setOffspring] = useState([]);
    const [crossoverDetails, setCrossoverDetails] = useState([]);

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

    useEffect(() => {
        if (selectedPopulation.length > 1) {
            const { offspring, crossoverDetails } = orderCrossover(selectedPopulation);
            setOffspring(offspring);
            setCrossoverDetails(crossoverDetails);
        }
    }, [selectedPopulation]);

    return (
        <div className="text-gray-800 p-6">
            <Header
                handleGoBack={() => navigate(-1)}
                title="TSP Simulation Using Genetic Algorithm"
            />
            <div className="flex flex-col lg:flex-row w-full h-full lg:space-x-2">
                <PopulationComponent
                    population={population}
                    fitnessValues={fitnessValues}
                />
                <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-3xl">
                    <h2 className="text-xl font-semibold text-center">Selection - Roulette Wheel</h2>
                    <RouletteWheel
                        fitnessValues={fitnessValues}
                        probabilities={probabilities}
                        cumulativeProbabilities={cumulativeProbabilities}
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
                <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-3xl">
                    <h2 className="text-xl font-semibold text-center">Crossover - Order Crossover</h2>
                    {crossoverDetails.map((detail, index) => (
                        <div key={index} className="mt-4 p-4 border rounded-md">
                            <p><strong>Parent 1:</strong> {JSON.stringify(detail.parent1)}</p>
                            <p><strong>Parent 2:</strong> {JSON.stringify(detail.parent2)}</p>
                            <p><strong>Crossover Points:</strong> {detail.crossoverPoint1}, {detail.crossoverPoint2}</p>
                            <p><strong>Child 1:</strong> {JSON.stringify(detail.child1)}</p>
                            <p><strong>Child 2:</strong> {JSON.stringify(detail.child2)}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default MainComponentGeneticAlgorithm;
