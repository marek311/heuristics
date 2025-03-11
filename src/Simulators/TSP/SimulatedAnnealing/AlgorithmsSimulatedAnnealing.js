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

const modifyTourAndCalculateCost = (tour, edges) => {
    let newTour = [...tour];
    let i, j;

    do {
        i = Math.floor(Math.random() * (newTour.length - 2)) + 1;
        j = Math.floor(Math.random() * (newTour.length - 2)) + 1;
    } while (i === j);

    [newTour[i], newTour[j]] = [newTour[j], newTour[i]];

    const newCost = calculateCost(newTour, edges);
    const costDifference = newCost - calculateCost(tour, edges);

    return { newTour, newCost, costDifference };
};

export const proposeNewSolution = (
    currentTour,
    setProposedTour,
    setProposedCost,
    setCostDifference,
    data,
    setStatus,
    setHighlightLinks
) => {
    const { newTour, newCost, costDifference } = modifyTourAndCalculateCost(currentTour, data.edges);

    setProposedTour(newTour);
    setProposedCost(newCost);
    setCostDifference(costDifference);
    setStatus("Proposed a new solution, calculated cost difference: proposed cost - current cost.");

    const highlightedLinks = [
        { source: 'current', target: 'neighbor' },
        { source: 'neighbor', target: 'better' }
    ];
    setHighlightLinks([]);
    setHighlightLinks(highlightedLinks);
};

export const calculateAcceptanceAndDecide = (
    currentTour,
    proposedTour,
    currentCost,
    proposedCost,
    costDifference,
    temperature,
    setPreviousTour,
    setPreviousCost,
    setCurrentTour,
    setCurrentCost,
    bestTour,
    bestCost,
    setBestTour,
    setBestCost,
    setAcceptanceProbability,
    setRandomValue,
    setStatus,
    setHighLightLinks
) => {
    const acceptanceProbability = costDifference < 0 ? 1 : Math.exp(-costDifference / temperature);
    const randomValue = costDifference <= 0 ? 0 : Math.random();

    let status;
    if (costDifference < 0) {
        status = "Proposed solution: Better as Current => Accepted Without Experiment";
        setHighLightLinks(prevLinks => [
            ...prevLinks,
            { source: 'better', target: 'new' },
            { source: 'new', target: 'betterBest' }
        ]);
    } else if (costDifference === 0) {
        status = "Proposed solution: Equal as Current => Accepted Without Experiment";
        setHighLightLinks(prevLinks => [
            ...prevLinks,
            { source: 'better', target: 'new' },
            { source: 'new', target: 'betterBest' }
        ]);
    } else if (randomValue < acceptanceProbability) {
        status = "Proposed solution: Worse as Current => Accepted by Random Experiment";
        setHighLightLinks(prevLinks => [
            ...prevLinks,
            { source: 'better', target: 'experiment' },
            { source: 'experiment', target: 'new' },
            { source: 'new', target: 'betterBest' }
        ]);
    } else {
        status = "Proposed solution: Worse as Current => Declined by Random Experiment";
        setHighLightLinks(prevLinks => [
            ...prevLinks,
            { source: 'better', target: 'experiment' },
            { source: 'experiment', target: 'cooldown' }
        ]);
    }

    setAcceptanceProbability(acceptanceProbability);
    setRandomValue(randomValue);

    if (costDifference <= 0 || randomValue < acceptanceProbability) {
        setPreviousTour([...currentTour]);
        setPreviousCost(currentCost);
        setCurrentTour(proposedTour);
        setCurrentCost(proposedCost);

        if (proposedCost < bestCost) {
            setBestTour(proposedTour);
            setBestCost(proposedCost);

            setHighLightLinks(prevLinks => [
                ...prevLinks,
                { source: 'betterBest', target: 'newBest' },
                { source: 'newBest', target: 'cooldown' }
            ]);
        } else {
            setHighLightLinks(prevLinks => [
                ...prevLinks,
                { source: 'betterBest', target: 'cooldown' }
            ]);
        }
    }

    setStatus(status);
};

export const updateStateAndCoolDown = (
    setTemperature,
    setIteration,
    temperature,
    iteration,
    setStatus,
    setHighlightLinks
) => {
    setTemperature((prevTemperature) => prevTemperature * 0.95);
    setIteration((prevIteration) => prevIteration + 1);
    setStatus("Iteration++, Temperature =* 0.95;");
    setHighlightLinks(prevLinks => [
        ...prevLinks,
        { source: 'cooldown', target: 'newIteration' }
    ]);
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
    setStatus,
    setHighlightLinks
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
        const { newTour, newCost, costDifference } = modifyTourAndCalculateCost(current, data.edges);

        setProposedTour(newTour);
        setProposedCost(newCost);
        setCostDifference(costDifference);

        const acceptanceProbability = costDifference < 0 ? 1 : Math.exp(-costDifference / temp);
        const randomValue = costDifference <= 0 ? 0 : Math.random();

        setAcceptanceProbability(acceptanceProbability);
        setRandomValue(randomValue);

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
        terminationReason = "Algorithm Ended: Temperature too low.";
    } else if (noChangeCounter >= 15) {
        terminationReason = "Algorithm Ended: No solution change for 15 iterations in a row.";
    }

    setHighlightLinks([]);
    setCurrentTour(current);
    setCurrentCost(cost);
    setBestTour(best);
    setBestCost(bestCostSoFar);
    setTemperature(temp);
    setIteration(iter);
    setStatus(terminationReason);
};