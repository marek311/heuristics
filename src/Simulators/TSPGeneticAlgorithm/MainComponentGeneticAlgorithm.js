import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../Components/Header';
import PopulationComponent from "./PopulationComponent";
import SelectionComponent from "./SelectionComponent";
import RouletteWheel from "./RouletteWheel";
import CrossoverComponent from "./CrossoverComponent";
import MutationComponent from "./MutationComponent";
import {
    calculateFitness,
    generateInitialPopulation,
    handleStep,
    runAlgorithm
} from './AlgorithmsGeneticAlgorithm';
import Colors from "../../Main/Colors";

function MainComponentGeneticAlgorithm() {

    const navigate = useNavigate();
    const location = useLocation();
    const { data } = location.state || {};

    const [population, setPopulation] = useState([]);
    const [selectedPopulation, setSelectedPopulation] = useState([]);
    const [children, setChildren] = useState([]);
    const [mutatedChildren, setMutatedChildren] = useState([]);
    const [fitnessValues, setFitnessValues] = useState([]);
    const [probabilities, setProbabilities] = useState([]);
    const [cumulativeProbabilities, setCumulativeProbabilities] = useState([]);
    const [randomValues, setRandomValues] = useState([]);
    const [bestSolution, setBestSolution] = useState(null);
    const [step, setStep] = useState(0);
    const [isIterationComplete, setIsIterationComplete] = useState(true);
    const generationSize = data?.generationSize || 4;
    const mutationProbability = data?.mutationProbability || 0.2;

    useEffect(() => {
        if (data) {
            const initialPopulation = generateInitialPopulation(data, generationSize, setFitnessValues);
            setPopulation(initialPopulation);
            const fitnessValues = initialPopulation.map(tour => calculateFitness(tour, data));
            const maxFitnessIndex = fitnessValues.indexOf(Math.max(...fitnessValues));
            const bestInitialSolution = { tour: initialPopulation[maxFitnessIndex], fitness: fitnessValues[maxFitnessIndex] };
            setBestSolution(bestInitialSolution);
            initializeChildren();
        }
    }, [data]);

    function initializeChildren() {
        const parent1 = { tour: new Array(data.cityCount + 1).fill("x") };
        const parent2 = { tour: new Array(data.cityCount + 1).fill("x") };
        const defaultChild = {
            child: new Array(data.cityCount + 1).fill("x"),
            parent1: parent1,
            parent2: parent2,
        };
        setChildren([defaultChild]);
        setMutatedChildren([new Array(data.cityCount + 1).fill("x")]);
    }

    function handleIteration() {
        handleStep(
            step,
            setStep,
            population,
            selectedPopulation,
            children,
            mutatedChildren,
            data,
            setFitnessValues,
            setProbabilities,
            setCumulativeProbabilities,
            setSelectedPopulation,
            setRandomValues,
            setChildren,
            setMutatedChildren,
            setPopulation,
            setBestSolution,
            setIsIterationComplete,
            generationSize,
            mutationProbability
        );
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
            setBestSolution,
            mutatedChildren,
            isIterationComplete,
            generationSize,
            mutationProbability
        );
    }

    function handleReset() {
        if (data) {
            const newPopulation = generateInitialPopulation(data, generationSize, setFitnessValues);
            setPopulation(newPopulation);
            const fitnessVals = newPopulation.map(tour => calculateFitness(tour, data));
            const maxFitnessIndex = fitnessVals.indexOf(Math.max(...fitnessVals));
            const newBestSolution = { tour: newPopulation[maxFitnessIndex], fitness: fitnessVals[maxFitnessIndex] };
            setBestSolution(newBestSolution);
        }
        setProbabilities([]);
        setCumulativeProbabilities([]);
        setRandomValues([]);
        setSelectedPopulation([]);
        initializeChildren();
        setStep(0);
        setIsIterationComplete(true);
    }

    return (
        <div className={`${Colors.textPrimary} p-6`}>
            <Header
                handleGoBack={() => navigate(-1)}
                title="Travelling Salesman Problem Simulation Using Genetic Algorithm"
                handleStep={handleIteration}
                handleRun={handleRunAlgorithm}
                handleReset={handleReset}
            />
            <div className="flex flex-col lg:flex-row w-full h-full lg:space-x-2">
                <div className={`${Colors.cardBackground} p-6 rounded-lg shadow-md w-full max-w-3xl`}>
                    <h2 className={`text-xl font-semibold text-center ${step === 0 ? 'bg-green-500 text-white' : ''}`}>
                        Population ({generationSize})
                    </h2>
                    <div className="mt-4 p-4 border-2 border-yellow-500 bg-yellow-100 rounded-lg shadow-md">
                        <h3 className="text-lg font-bold text-center">Fitness Calculation</h3>
                        <p className="text-center font-medium mt-2">
                            <strong>Fitness Value</strong> = 1000 / Total Tour Distance
                        </p>
                    </div>
                    <PopulationComponent
                        population={population}
                        fitnessValues={fitnessValues}
                        bestSolution={bestSolution}
                        step={step}
                    />
                </div>
                <div className={`${Colors.cardBackground} p-6 rounded-lg shadow-md w-full max-w-3xl`}>
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
                <div className={`${Colors.cardBackground} p-6 rounded-lg shadow-md w-full max-w-3xl`}>
                    <h2 className={`text-xl font-semibold text-center ${step === 2 ? 'bg-green-500 text-white' : ''}`}>
                        Crossover
                    </h2>
                    <CrossoverComponent
                        children={children}
                    />
                </div>
                <div className={`${Colors.cardBackground} p-6 rounded-lg shadow-md w-full max-w-3xl`}>
                    <h2 className={`text-xl font-semibold text-center ${step === 3 ? 'bg-green-500 text-white' : ''}`}>
                        Mutation ({mutationProbability.toFixed(1)})
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
