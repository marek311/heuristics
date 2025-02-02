export const initializeTour = (data) => {
    const cities = Array.from(new Set(data.edges.flatMap((edge) => [edge.city1, edge.city2])));
    const startingCity = data.startingCity || cities[0];

    const otherCities = cities.filter((city) => city !== startingCity);
    const randomTour = [startingCity, ...otherCities.sort(() => Math.random() - 0.5), startingCity];

    const totalCost = calculateCost(randomTour, data.edges);
    return { randomTour, totalCost };
};

const calculateCost = (tour, edges) => {
    let totalCost = 0;
    for (let i = 0; i < tour.length - 1; i++) {
        const edge = edges.find(
            (e) =>
                (e.city1 === tour[i] && e.city2 === tour[i + 1]) ||
                (e.city1 === tour[i + 1] && e.city2 === tour[i])
        );
        if (edge) totalCost += edge.distance;
    }
    return totalCost;
};

const modifyTourAndCalculateCost = (tour, edges, temperature) => {
    let newTour = [...tour];
    let i, j;

    do {
        i = Math.floor(Math.random() * (newTour.length - 2)) + 1;
        j = Math.floor(Math.random() * (newTour.length - 2)) + 1;
    } while (i === j);

    let swappedIndexes;
    swappedIndexes = [i, j];

    [newTour[i], newTour[j]] = [newTour[j], newTour[i]];

    const newCost = calculateCost(newTour, edges);
    const costDifference = newCost - calculateCost(tour, edges);
    const acceptanceProbability = costDifference < 0 ? 1 : Math.exp(-costDifference / temperature);
    const randomValue = costDifference <= 0 ? 0 : Math.random();

    return { newTour, newCost, costDifference, acceptanceProbability, randomValue, swappedIndexes };
};

export const proposeNewSolution = (
    currentTour,
    setProposedTour,
    setProposedCost,
    setCostDifference,
    setAcceptanceProbability,
    setRandomValue,
    setSwappedIndexes,
    data,
    temperature
) => {
    const { newTour, newCost, costDifference, acceptanceProbability, randomValue, swappedIndexes } =
        modifyTourAndCalculateCost(currentTour, data.edges, temperature);

    setProposedTour(newTour);
    setProposedCost(newCost);
    setCostDifference(costDifference);
    setAcceptanceProbability(acceptanceProbability);
    setRandomValue(randomValue);
    setSwappedIndexes(swappedIndexes);
};

export const decideAcceptance = (
    currentTour,
    proposedTour,
    currentCost,
    proposedCost,
    costDifference,
    acceptanceProbability,
    randomValue,
    setPreviousTour,
    setPreviousCost,
    setCurrentTour,
    setCurrentCost,
    bestTour,
    bestCost,
    setBestTour,
    setBestCost,
    setSolutionStatus
) => {
    let status;
    if (costDifference < 0) {
        status = "Proposed => Better as Current => Accepted Without Experiment";
    } else if (costDifference === 0) {
        status = "Proposed => Equal as Current => Accepted Without Experiment";
    } else if (randomValue < acceptanceProbability) {
        status = "Proposed => Worse as Current => Accepted by Random Experiment";
    } else {
        status = "Proposed => Worse as Current => Declined by Random Experiment";
    }

    if (costDifference <= 0 || randomValue < acceptanceProbability) {
        setPreviousTour([...currentTour]);
        setPreviousCost(currentCost);
        setCurrentTour(proposedTour);
        setCurrentCost(proposedCost);

        if (proposedCost < bestCost) {
            setBestTour(proposedTour);
            setBestCost(proposedCost);
        }
    }

    setSolutionStatus(status);
};

export const updateStateAndCoolDown = (setTemperature, setIteration, temperature, iteration) => {
    setTemperature((prevTemperature) => prevTemperature * 0.95);
    setIteration((prevIteration) => prevIteration + 1);
};

export const handleRun = (
    currentTour,
    setCurrentTour,
    previousTour,
    setPreviousTour,
    currentCost,
    setCurrentCost,
    previousCost,
    setPreviousCost,
    temperature,
    setTemperature,
    iteration,
    setIteration,
    data,
    setCostDifference,
    setAcceptanceProbability,
    setRandomValue,
    bestTour,
    setBestTour,
    bestCost,
    setBestCost,
    setProposedTour,
    setProposedCost,
    setSolutionStatus,
    setSwappedIndexes
) => {
    if (currentTour.length < 2 || temperature <= 1e-5) return;

    let temp = temperature;
    let iter = iteration;
    let current = [...currentTour];
    let best = [...bestTour];
    let cost = currentCost;
    let bestCostSoFar = bestCost;

    let noChangeCounter = 0;
    let terminationReason = "";

    while (temp > 1e-5 && noChangeCounter < 15) {
        const {
            newTour,
            newCost,
            costDifference,
            acceptanceProbability,
            randomValue,
            swappedIndexes
        } = modifyTourAndCalculateCost(current, data.edges, temp);

        setProposedTour(newTour);
        setProposedCost(newCost);
        setCostDifference(costDifference);
        setAcceptanceProbability(acceptanceProbability);
        setRandomValue(randomValue);
        setSwappedIndexes(swappedIndexes);

        if (costDifference <= 0 || randomValue < acceptanceProbability) {
            setPreviousTour([...current]);
            setPreviousCost(cost);
            current = newTour;
            cost = newCost;
            noChangeCounter = 0;

            if (newCost < bestCostSoFar) {
                best = newTour;
                bestCostSoFar = newCost;
            }
        } else {
            noChangeCounter++;
        }

        iter++;
        temp *= 0.95;
    }

    if (temp <= 1e-5) {
        terminationReason = "Algorithm Ended => Temperature too low.";
    } else if (noChangeCounter >= 15) {
        terminationReason = "Algorithm Ended => No solution change for 15 iterations in row.";
    }

    setCurrentTour(current);
    setCurrentCost(cost);
    setBestTour(best);
    setBestCost(bestCostSoFar);
    setTemperature(temp);
    setIteration(iter);
    setSolutionStatus(terminationReason);
};