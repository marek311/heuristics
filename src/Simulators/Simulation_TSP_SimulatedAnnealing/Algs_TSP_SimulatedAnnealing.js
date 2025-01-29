export const initializeTour = (data) => {
    const cities = Array.from(new Set(data.edges.flatMap((edge) => [edge.city1, edge.city2])));
    const startingCity = data.startingCity || cities[0];

    const otherCities = cities.filter((city) => city !== startingCity);
    let randomTour = [startingCity, ...otherCities.sort(() => Math.random() - 0.5), startingCity]; // Ensure the tour starts and ends with the starting city

    let totalCost = calculateCost(randomTour, data.edges);
    return { randomTour, totalCost };
};

export const calculateCost = (tour, edges) => {
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

export const handleIteration = (
    currentTour,
    setCurrentTour,
    currentCost,
    setCurrentCost,
    temperature,
    setTemperature,
    iteration,
    setIteration,
    data,
    setCostDifference,
    setAcceptanceProbability,
    setRandomValue,
    setBestTour,
    bestCost,
    setBestCost,
    setProposedTour,
    setProposedCost,
    setSolutionStatus
) => {
    if (currentTour.length < 2 || temperature <= 1e-5) return;

    const newTour = [...currentTour];
    let i, j;
    do {
        i = Math.floor(Math.random() * (newTour.length - 2)) + 1;
        j = Math.floor(Math.random() * (newTour.length - 2)) + 1;
    } while (i === j);

    [newTour[i], newTour[j]] = [newTour[j], newTour[i]];

    const newCost = calculateCost(newTour, data.edges);
    const costDifference = newCost - currentCost;
    let acceptanceProbability = costDifference < 0 ? 1 : Math.exp(-costDifference / temperature);
    let randomValue = 0;

    if (costDifference < 0) {
        acceptanceProbability = 1;
    } else {
        acceptanceProbability = Math.exp(-costDifference / temperature);
        randomValue = Math.random();
    }

    setProposedTour(newTour);
    setProposedCost(newCost);
    setCostDifference(costDifference);
    setAcceptanceProbability(acceptanceProbability);
    setRandomValue(randomValue);

    let status;
    if (costDifference < 0) {
        status = "ACCEPTED\nBetter Solution - No Experiment";
    } else if (randomValue < acceptanceProbability) {
        status = "ACCEPTED\nWorse Solution - Experiment Successful";
    } else {
        status = "DECLINED\nWorse Solution - Experiment Unsuccessful";
    }

    if (costDifference < 0 || randomValue < acceptanceProbability) {
        setCurrentTour(newTour);
        setCurrentCost(newCost);

        if (newCost < bestCost) {
            setBestTour(newTour);
            setBestCost(newCost);
        }
    }

    setSolutionStatus(status);
    setTemperature((prevTemperature) => prevTemperature * 0.95);
    setIteration((prevIteration) => prevIteration + 1);
};