import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../Components/Header';
import {
    generateInitialPopulation,
    orderCrossoverSingleChild,
    rouletteWheelSelection
} from './AlgorithmsGeneticAlgorithm';
import SelectionComponent from "./SelectionComponent";
import PopulationComponent from "./PopulationComponent";
import RouletteWheel from "./RouletteWheel";
import CrossoverComponent from "./CrossoverComponent"

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
    const [child, setChild] = useState(null);

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
        if (selectedPopulation.length >= 2) {
            const newChild = orderCrossoverSingleChild(selectedPopulation[0], selectedPopulation[1]);
            setChild(newChild);
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
                <CrossoverComponent
                    selectedPopulation={selectedPopulation}
                    child={child}
                />
            </div>
        </div>
    );
}

export default MainComponentGeneticAlgorithm;
