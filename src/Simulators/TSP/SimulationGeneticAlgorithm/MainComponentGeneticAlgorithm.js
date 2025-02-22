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
    const [children, setChildren] = useState([]);
    const [step, setStep] = useState(0);

    function handleStep() {
        if (step === 0) {
            const initialPop = generateInitialPopulation(data, 6);
            setPopulation(initialPop);
        }

        if (step === 1) {
            rouletteWheelSelection(
                population, data, 3,
                setFitnessValues,
                setProbabilities,
                setCumulativeProbabilities,
                setSelectedPopulation,
                setRandomValues
            );
        }

        if (step === 2 && selectedPopulation.length === 3) {
            const newChildren = [
                orderCrossoverSingleChild(selectedPopulation[0], selectedPopulation[1]),
                orderCrossoverSingleChild(selectedPopulation[1], selectedPopulation[0]),
                orderCrossoverSingleChild(selectedPopulation[0], selectedPopulation[2]),
                orderCrossoverSingleChild(selectedPopulation[2], selectedPopulation[0]),
                orderCrossoverSingleChild(selectedPopulation[1], selectedPopulation[2]),
                orderCrossoverSingleChild(selectedPopulation[2], selectedPopulation[1])
            ];
            setChildren(newChildren);
        }

        setStep((prevStep) => (prevStep + 1) % 3);
    }

    return (
        <div className="text-gray-800 p-6">
            <Header
                handleGoBack={() => navigate(-1)}
                title="TSP Simulation Using Genetic Algorithm"
                handleStep={handleStep}
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
                    children={children}
                />
            </div>
        </div>
    );
}

export default MainComponentGeneticAlgorithm;
