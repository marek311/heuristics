import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../Components/Header';
import {
    generateInitialPopulation,
    crossover,
    selection,
    mutation
} from './AlgorithmsGeneticAlgorithm';
import SelectionComponent from "./SelectionComponent";
import PopulationComponent from "./PopulationComponent";
import RouletteWheel from "./RouletteWheel";
import CrossoverAndMutationComponent from "./CrossoverAndMutationComponent";

function MainComponentGeneticAlgorithm() {
    const navigate = useNavigate();
    const location = useLocation();
    const { data } = location.state || {};

    const [population, setPopulation] = useState([]);
    const [fitnessValues, setFitnessValues] = useState([]);
    const [probabilities, setProbabilities] = useState([]);
    const [cumulativeProbabilities, setCumulativeProbabilities] = useState([]);
    const [randomValues, setRandomValues] = useState([]);
    const [selectedPopulation, setSelectedPopulation] = useState([]);
    const [children, setChildren] = useState([]);
    const [mutatedChildren, setMutatedChildren] = useState([]);
    const [step, setStep] = useState(0);

    useEffect(() => {
        if (data) {
            setPopulation(generateInitialPopulation(data, 4));
        }
    }, [data]);

    function handleStep() {
        if (step === 0) {
            selection(
                population, data, 3,
                setFitnessValues,
                setProbabilities,
                setCumulativeProbabilities,
                setSelectedPopulation,
                setRandomValues
            );
        }

        if (step === 1) {
            const newChildren = [];
            const generatedChildrenSet = new Set();

            const serializeChild = (child) => JSON.stringify(child);

            for (let i = 0; i < selectedPopulation.length; i++) {
                for (let j = i + 1; j < selectedPopulation.length; j++) {
                    const parent1 = selectedPopulation[i];
                    const parent2 = selectedPopulation[j];

                    const child1 = crossover(parent1, parent2);
                    const serializedChild1 = serializeChild(child1);
                    if (!generatedChildrenSet.has(serializedChild1)) {
                        newChildren.push(child1);
                        generatedChildrenSet.add(serializedChild1);
                    }

                    const child2 = crossover(parent2, parent1);
                    const serializedChild2 = serializeChild(child2);
                    if (!generatedChildrenSet.has(serializedChild2)) {
                        newChildren.push(child2);
                        generatedChildrenSet.add(serializedChild2);
                    }
                }
            }

            setChildren(newChildren);
        }

        if (step === 2 && selectedPopulation.length === 3) {
            const mutatedChildren = children.map(child => mutation(child, 0.2));
            setMutatedChildren(mutatedChildren);
        }

        if (step === 3 && children.length > 0) {
            setPopulation(mutatedChildren);
            setSelectedPopulation([]);
        }

        setStep((prevStep) => (prevStep + 1) % 4);
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
                    step={step}
                />
                <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-3xl">
                    <h2 className={`text-xl font-semibold text-center ${step === 0 ? 'bg-green-500 text-white' : ''}`}>
                        Selection
                    </h2>
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
                <CrossoverAndMutationComponent
                    children={children}
                    mutatedChildren={mutatedChildren}
                    step={step}
                />
            </div>
        </div>
    );
}

export default MainComponentGeneticAlgorithm;
