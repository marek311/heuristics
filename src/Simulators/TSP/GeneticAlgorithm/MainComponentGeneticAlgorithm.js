import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../Components/Header';
import PopulationComponent from "./PopulationComponent";
import SelectionComponent from "./SelectionComponent";
import RouletteWheel from "./RouletteWheel";
import CrossoverComponent from "./CrossoverComponent";
import MutationComponent from "./MutationComponent";
import {
    generateInitialPopulation,
    generateUniqueChildren,
    selection,
    mutation,
    calculateFitness,
    runAlgorithm
} from './AlgorithmsGeneticAlgorithm';

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
    const [bestSolution, setBestSolution] = useState(null);
    const [step, setStep] = useState(0);

    useEffect(() => {
        if (data) {
            setPopulation(generateInitialPopulation(data, 4,setFitnessValues));
        }
    }, [data]);

    const updateBestSolution = (currentPopulation) => {
        const fitnessValues = currentPopulation.map(tour => calculateFitness(tour, data));
        const maxFitnessIndex = fitnessValues.indexOf(Math.max(...fitnessValues));

        if (!bestSolution || fitnessValues[maxFitnessIndex] > calculateFitness(bestSolution.tour, data)) {
            setBestSolution({ tour: currentPopulation[maxFitnessIndex], fitness: fitnessValues[maxFitnessIndex] });
        }
    };

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
            let newChildrenOnly = children.map((entry) => entry.child);
            let updatedChildren = [...newChildrenOnly];

            if(updatedChildren.length < 4) {
                while (updatedChildren.length < 4) {
                    const randomIndex = Math.floor(Math.random() * updatedChildren.length);
                    const mutatedChild = mutation(updatedChildren[randomIndex], 1.0);
                    updatedChildren.push(mutatedChild);
                }
            }
            else {
                updatedChildren = updatedChildren.map((child) => mutation(child, 0.2));
            }

            setMutatedChildren(updatedChildren);
        }

        if (step === 3 && children.length > 0) {
            setPopulation(mutatedChildren);
            const fitnessValues = mutatedChildren.map(tour => calculateFitness(tour, data));
            setFitnessValues(fitnessValues);
            setSelectedPopulation([]);
            updateBestSolution(mutatedChildren);
        }

        setStep((prevStep) => (prevStep + 1) % 4);
    }

    function handleRunAlgorithm() {
        runAlgorithm(
            population,
            data,
            setPopulation,
            setFitnessValues,
            setProbabilities,
            setCumulativeProbabilities,
            setSelectedPopulation,
            setRandomValues,
            setChildren,
            setMutatedChildren,
            setBestSolution
        );
    }

    function handleReset() {
        if (data) {
            setPopulation(generateInitialPopulation(data, 4));
        }
        setFitnessValues([]);
        setProbabilities([]);
        setCumulativeProbabilities([]);
        setRandomValues([]);
        setSelectedPopulation([]);
        setChildren([]);
        setMutatedChildren([]);
        setBestSolution(null);
        setStep(0);
    }

    return (
        <div className="text-gray-800 p-6">
            <Header
                handleGoBack={() => navigate(-1)}
                title="TSP Simulation Using Genetic Algorithm"
                handleStep={handleStep}
                handleRun={handleRunAlgorithm}
                handleReset={handleReset}
            />
            <div className="flex flex-col lg:flex-row w-full h-full lg:space-x-2">
                <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-3xl">
                    <h2 className={`text-xl font-semibold text-center ${step === 0 ? 'bg-green-500 text-white' : ''}`}>
                        Population
                    </h2>
                    <PopulationComponent
                        population={population}
                        fitnessValues={fitnessValues}
                        bestSolution={bestSolution}
                        step={step}
                    />
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-3xl">
                    <h2 className={`text-xl font-semibold text-center ${step === 1 ? 'bg-green-500 text-white' : ''}`}>
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
                <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-3xl">
                    <h2 className={`text-xl font-semibold text-center ${step === 2 ? 'bg-green-500 text-white' : ''}`}>
                        Crossover
                    </h2>
                    <CrossoverComponent
                        children={children}
                    />
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-3xl">
                    <h2 className={`text-xl font-semibold text-center ${step === 3 ? 'bg-green-500 text-white' : ''}`}>
                        Mutation
                    </h2>
                    <MutationComponent
                        children={children}
                        mutatedChildren={mutatedChildren}
                    />
                </div>
            </div>
        </div>
    );
}

export default MainComponentGeneticAlgorithm;
