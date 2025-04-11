export const generateInitialPopulation = (data, size, setFitnessValues) => {
    if (!data || !data.edges || !data.cityCount) return [];

    const cities = Array.from(new Set(data.edges.flatMap(edge => [edge.city1, edge.city2])));
    const startingCity = data.startingCity || cities[0];

    const generateRandomTour = () => {
        const shuffled = [...cities].filter(city => city !== startingCity).sort(() => Math.random() - 0.5);
        return [startingCity, ...shuffled, startingCity];
    };

    const uniqueTours = new Set();
    while (uniqueTours.size < size) {
        uniqueTours.add(JSON.stringify(generateRandomTour()));
    }

    const population = Array.from(uniqueTours).map(tour => JSON.parse(tour));
    const fitnessValues = population.map(tour => calculateFitness(tour, data));
    setFitnessValues(fitnessValues);

    return population;
};

export const calculateFitness = (tour, data) => {
    if (!data || !data.edges) return 0;

    let totalDistance = 0;
    for (let i = 0; i < tour.length - 1; i++) {
        const city1 = tour[i];
        const city2 = tour[i + 1];

        const edge = data.edges.find(e =>
            (e.city1 === city1 && e.city2 === city2) || (e.city1 === city2 && e.city2 === city1)
        );

        if (edge) {
            totalDistance += edge.distance;
        }
    }

    return totalDistance === 0 ? 0 : 1000 / totalDistance;
};

export const selection = (
    population, data, selectionSize,
    setFitnessValues, setProbabilities,
    setCumulativeProbabilities, setSelectedPopulation,
    setRandomValues
) => {
    if (!population || population.length === 0) return;

    const fitnessValues = population.map(tour => calculateFitness(tour, data));
    setFitnessValues(fitnessValues);

    const totalFitness = fitnessValues.reduce((sum, f) => sum + f, 0);

    const probabilities = totalFitness === 0
        ? fitnessValues.map(() => 1 / fitnessValues.length)
        : fitnessValues.map(f => f / totalFitness);
    setProbabilities(probabilities);

    let cumulative = 0;
    const cumulativeProbabilities = probabilities.map(prob => cumulative += prob);
    setCumulativeProbabilities(cumulativeProbabilities);

    const randomValues = [];
    const selectedIndices = new Set();

    while (selectedIndices.size < selectionSize) {
        let randomValue;
        let selectedIndex;

        do {
            randomValue = Math.random();
            // eslint-disable-next-line
            selectedIndex = cumulativeProbabilities.findIndex(prob => randomValue < prob);
        } while (selectedIndices.has(selectedIndex));

        randomValues.push(randomValue);
        selectedIndices.add(selectedIndex);
    }

    const sortedIndices = Array.from(selectedIndices).sort((a, b) => a - b);

    const selectedPopulation = sortedIndices.map(index => ({ index: index, tour: population[index] }));

    setRandomValues(randomValues);
    setSelectedPopulation(selectedPopulation);
};

export const crossover = (parent1, parent2) => {
    if (!parent1 || !parent2 || parent1.length !== parent2.length) return null;

    const length = parent1.length;
    const middleIndex = Math.floor((length - 1) / 2);
    const child = new Array(length).fill(null);

    for (let i = 0; i <= middleIndex; i++) {
        child[i] = parent1[i];
    }

    let index = middleIndex + 1;
    for (let city of parent2) {
        if (!child.includes(city)) {
            child[index] = city;
            index++;
        }
    }

    child[0] = parent1[0];
    child[length - 1] = parent1[length - 1];

    return child;
};

export const generateUniqueChildren = (selectedPopulation, generationSize) => {
    let newChildren = [];
    const generatedChildrenSet = new Set();

    const serializeChild = (child) => JSON.stringify(child);

    for (let i = 0; i < selectedPopulation.length; i++) {
        for (let j = i + 1; j < selectedPopulation.length; j++) {
            const parent1 = selectedPopulation[i];
            const parent2 = selectedPopulation[j];

            const child1 = crossover(parent1.tour, parent2.tour);
            const serializedChild1 = serializeChild(child1);
            if (!generatedChildrenSet.has(serializedChild1)) {
                newChildren.push({ child: child1, parent1: parent1, parent2: parent2 });
                generatedChildrenSet.add(serializedChild1);
            }

            const child2 = crossover(parent2.tour, parent1.tour);
            const serializedChild2 = serializeChild(child2);
            if (!generatedChildrenSet.has(serializedChild2)) {
                newChildren.push({ child: child2, parent1: parent2, parent2: parent1 });
                generatedChildrenSet.add(serializedChild2);
            }
        }
    }

    if (newChildren.length > generationSize) {
        newChildren = newChildren.slice(0, generationSize);
    }

    return newChildren;
};

export const mutation = (tour, mutationRate = 0.1) => {
    if (Math.random() > mutationRate) return tour;

    const mutatedTour = [...tour];

    const index1 = Math.floor(Math.random() * (mutatedTour.length - 2)) + 1;
    let index2;
    do {
        index2 = Math.floor(Math.random() * (mutatedTour.length - 2)) + 1;
    } while (index1 === index2);

    [mutatedTour[index1], mutatedTour[index2]] = [mutatedTour[index2], mutatedTour[index1]];

    return mutatedTour;
};

export const handleStep = (
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
) => {
    if (step === 0) {
        selection(
            population, data, 3,
            setFitnessValues,
            setProbabilities,
            setCumulativeProbabilities,
            setSelectedPopulation,
            setRandomValues
        );
        setIsIterationComplete(false);
    }

    if (step === 1) {
        setChildren(generateUniqueChildren(selectedPopulation, generationSize));
        setIsIterationComplete(false);
    }

    if (step === 2) {
        const newChildrenOnly = children.map((entry) => entry.child);
        const originalChildren = [...newChildrenOnly];
        let updatedChildren = [...newChildrenOnly];

        if (originalChildren.length < generationSize) {
            while (updatedChildren.length < generationSize) {
                const randomIndex = Math.floor(Math.random() * originalChildren.length);
                const mutatedChild = mutation(originalChildren[randomIndex], 1.0);
                updatedChildren.push(mutatedChild);
            }
        } else {
            updatedChildren = updatedChildren.map((child) => mutation(child, mutationProbability));
        }

        setMutatedChildren(updatedChildren);
        setIsIterationComplete(false);
    }

    if (step === 3 && children.length > 0) {
        setPopulation(mutatedChildren);
        const fitnessValues = mutatedChildren.map(tour => calculateFitness(tour, data));
        setFitnessValues(fitnessValues);

        const bestInCurrentGeneration = mutatedChildren.reduce((best, tour, index) => {
            const fitness = fitnessValues[index];
            if (fitness > best.fitness) {
                return { tour, fitness };
            }
            return best;
        }, { tour: null, fitness: -Infinity });

        setBestSolution(prevBest => {
            if (!prevBest || bestInCurrentGeneration.fitness > prevBest.fitness) {
                return bestInCurrentGeneration;
            }
            return prevBest;
        });

        setSelectedPopulation([]);
        setIsIterationComplete(true);
    }

    let index =  (step + 1) % 4;
    setStep(index);
};

export const runAlgorithm = (
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
) => {
    if (!population || population.length === 0 || !data) return;

    if (!isIterationComplete) {
        alert(`Current Iteration Is Not Complete - Run Cannot Be Performed!`);
        return;
    }

    if (mutatedChildren && mutatedChildren.length > 0 && !mutatedChildren.some(tour => tour.every(city => city === "x"))) {
        population = mutatedChildren;
        setPopulation(mutatedChildren);
    }

    const fitnessValues = population.map(tour => calculateFitness(tour, data));
    const totalFitness = fitnessValues.reduce((sum, f) => sum + f, 0);

    const probabilities = totalFitness === 0
        ? fitnessValues.map(() => 1 / fitnessValues.length)
        : fitnessValues.map(f => f / totalFitness);

    let cumulative = 0;
    const cumulativeProbabilities = probabilities.map(prob => cumulative += prob);

    const selectedIndices = new Set();
    const randomValues = [];

    while (selectedIndices.size < 3) {
        let randomValue;
        let selectedIndex;

        do {
            randomValue = Math.random();
            // eslint-disable-next-line
            selectedIndex = cumulativeProbabilities.findIndex(prob => randomValue < prob);
        } while (selectedIndices.has(selectedIndex));

        randomValues.push(randomValue);
        selectedIndices.add(selectedIndex);
    }

    const sortedIndices = Array.from(selectedIndices).sort((a, b) => a - b);

    const selectedPopulation = sortedIndices.map(index => ({ index: index, tour: population[index] }));

    const children = generateUniqueChildren(selectedPopulation, generationSize);

    let newChildrenOnly = children.map((entry) => entry.child);
    const originalChildren = [...newChildrenOnly];
    let updatedChildren = [...newChildrenOnly];

    if (originalChildren.length < generationSize) {
        while (updatedChildren.length < generationSize) {
            const randomIndex = Math.floor(Math.random() * originalChildren.length);
            const mutatedChild = mutation(originalChildren[randomIndex], 1.0);
            updatedChildren.push(mutatedChild);
        }
    } else {
        updatedChildren = updatedChildren.map((child) => mutation(child, mutationProbability));
    }

    const newFitnessValues = updatedChildren.map(tour => calculateFitness(tour, data));
    const maxFitnessIndex = newFitnessValues.indexOf(Math.max(...newFitnessValues));
    const bestTour = updatedChildren[maxFitnessIndex];
    const bestFitness = newFitnessValues[maxFitnessIndex];

    setFitnessValues(fitnessValues);
    setProbabilities(probabilities);
    setCumulativeProbabilities(cumulativeProbabilities);
    setSelectedPopulation(selectedPopulation);
    setRandomValues(randomValues);
    setChildren(children);
    setMutatedChildren(updatedChildren);

    setBestSolution(prevBest => {
        if (!prevBest || bestFitness > prevBest.fitness) {
            return { tour: bestTour, fitness: bestFitness };
        }
        return prevBest;
    });
};
