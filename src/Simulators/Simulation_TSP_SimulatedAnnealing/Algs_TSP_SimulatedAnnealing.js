export const initializeTour = (data) => {
    const cities = Array.from(new Set(data.edges.flatMap((edge) => [edge.city1, edge.city2])));
    let randomTour = [...cities].sort(() => Math.random() - 0.5);
    randomTour.push(randomTour[0]);

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
    setRandomValue
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
    const acceptanceProbability = costDifference < 0 ? 1 : Math.exp(-costDifference / temperature);
    const randomValue = Math.random();

    setCostDifference(costDifference);
    setAcceptanceProbability(acceptanceProbability);
    setRandomValue(randomValue);

    if (costDifference < 0 || randomValue < acceptanceProbability) {
        setCurrentTour(newTour);
        setCurrentCost(newCost);
    }

    setTemperature((prevTemperature) => prevTemperature * 0.95);
    setIteration((prevIteration) => prevIteration + 1);
};