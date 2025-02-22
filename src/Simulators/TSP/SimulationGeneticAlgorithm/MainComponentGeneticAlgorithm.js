import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../Components/Header';
import {
    generateInitialPopulation,
    generateUniqueChildren,
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
            setChildren(generateUniqueChildren(selectedPopulation));
        }

        if (step === 2) {
            let updatedChildren = [...children];

            while (updatedChildren.length < 4) {
                const randomIndex = Math.floor(Math.random() * updatedChildren.length);
                const mutatedChild = mutation(updatedChildren[randomIndex], 1.0);
                updatedChildren.push(mutatedChild);
            }

            setMutatedChildren(updatedChildren);
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
