const TABU_TENURE = 5;

const initializeTour = (data) => {
    const cities = Array.from(new Set(data.edges.flatMap(edge => [edge.city1, edge.city2])));
    const startingCity = data.startingCity || cities[0];

    const otherCities = cities.filter(city => city !== startingCity);
    const randomTour = [startingCity, ...otherCities.sort(() => Math.random() - 0.5), startingCity];

    return { tour: randomTour, cost: calculateTourCost(randomTour, data.edges) };
};

const calculateTourCost = (tour, edges) => {
    return tour.reduce((totalCost, city, i) => {
        if (i < tour.length - 1) {
            const edge = edges.find(e =>
                (e.city1 === city && e.city2 === tour[i + 1]) ||
                (e.city1 === tour[i + 1] && e.city2 === city)
            );
            return totalCost + (edge ? edge.distance : 0);
        }
        return totalCost;
    }, 0);
};

export const useTabuSearch = ({
                                  data,
                                  currentTour,
                                  setCurrentTour,
                                  currentCost,
                                  setCurrentCost,
                                  bestTour,
                                  setBestTour,
                                  bestCost,
                                  setBestCost,
                                  setPreviousTour,
                                  setPreviousCost,
                                  tabuList,
                                  setTabuList,
                                  iteration,
                                  setIteration,
                                  neighborhood,
                                  setNeighborhood,
                                  setStatus,
                                  step,
                                  setStep,
                                  bestNeighborData,
                                  setBestNeighborData,
                                  setHighlightLinks
                              }) => {

    const initialize = () => {
        if (!data || !data.edges) return;
        const { tour, cost } = initializeTour(data);
        setCurrentTour(tour);
        setCurrentCost(cost);
        setBestTour(tour);
        setBestCost(cost);
        setPreviousTour([]);
        setPreviousCost(null);
        setNeighborhood([]);
        setTabuList([]);
        setIteration(0);
        setStatus("Initialized Random Solution.");
        setStep(0);
        setHighlightLinks([]);
    };

    const generateNeighborhood = () => {
        let neighborhood = [];
        const numCities = currentTour.length - 2;

        for (let i = 1; i <= numCities; i++) {
            let j;
            do {
                j = Math.floor(Math.random() * numCities) + 1;
            } while (i === j);

            const newTour = [...currentTour];
            [newTour[i], newTour[j]] = [newTour[j], newTour[i]];
            const newCost = calculateTourCost(newTour, data.edges);

            const isTabu = tabuList.some(entry =>
                (entry.swap[0] === i && entry.swap[1] === j) ||
                (entry.swap[0] === j && entry.swap[1] === i)
            ) && tabuList.some(entry => entry.expiryIteration >= iteration);

            neighborhood.push({
                tour: newTour,
                cost: newCost,
                isTabu: isTabu,
                isChosen: false,
                indexI: i,
                indexJ: j
            });
        }

        setHighlightLinks([]);
        setHighlightLinks([
            { source: 'current', target: 'neighbor' },
            { source: 'neighbor', target: 'bestNeighbor' }
        ]);

        setNeighborhood(neighborhood);
        setStatus("Neighborhood generated.");
    };

    const findBestNeighbor = () => {
        let bestNeighbor = null;
        let bestNeighborCost = Infinity;
        let bestSwap = null;

        neighborhood.forEach(neighbor => {

            if (!neighbor.isTabu || neighbor.cost < bestCost) {

                if (neighbor.cost < bestNeighborCost) {

                    setHighlightLinks([
                        { source: 'current', target: 'neighbor' },
                        { source: 'neighbor', target: 'bestNeighbor' }
                    ]);

                    if(!neighbor.isTabu) {
                        setHighlightLinks(prevLinks => [
                            ...prevLinks,
                            { source: 'bestNeighbor', target: 'tabuCheck' },
                            { source: 'tabuCheck', target: 'newSolution' }
                        ]);
                    }
                    else
                    {
                        setHighlightLinks(prevLinks => [
                            ...prevLinks,
                            { source: 'bestNeighbor', target: 'tabuCheck' },
                            { source: 'tabuCheck', target: 'aspirationCheck' },
                            { source: 'aspirationCheck', target: 'newSolution' }
                        ]);
                    }

                    bestNeighbor = neighbor.tour;
                    bestNeighborCost = neighbor.cost;
                    bestSwap = [neighbor.indexI, neighbor.indexJ];

                    neighborhood.forEach(n => (n.isChosen = false));
                    neighbor.isChosen = true;
                }
            }
        });

        setBestNeighborData({ bestNeighbor, bestNeighborCost, bestSwap });
        setStatus("Best neighbor found.");
    };

    const updateSolutionStep = () => {
        if (!bestNeighborData || !bestNeighborData.bestNeighbor) return;

        const { bestNeighbor, bestNeighborCost, bestSwap } = bestNeighborData;

        setPreviousTour(currentTour);
        setPreviousCost(currentCost);
        setCurrentTour(bestNeighbor);
        setCurrentCost(bestNeighborCost);

        setTabuList(prevTabuList => {
            const updatedTabuList = prevTabuList.filter(entry => entry.expiryIteration >= iteration + 1);
            return [...updatedTabuList, { iteration: iteration + 1, swap: bestSwap, expiryIteration: iteration + 1 + TABU_TENURE }];
        });

        if (bestNeighborCost < bestCost) {
            setBestCost(bestNeighborCost);
            setBestTour(bestNeighbor);
        }


        setHighlightLinks(prevLinks => [
            ...prevLinks,
            { source: 'newSolution', target: 'newIteration' }
        ]);

        setIteration(prev => prev + 1);
        setStatus("Best neighbor accepted as current.");
    };

    const iterationMethod = () => {
        if (currentTour.length < 4) return;

        if (step === 0) {
            generateNeighborhood();
            setStep(1);
        } else if (step === 1) {
            findBestNeighbor();
            setStep(2);
        } else if (step === 2) {
            updateSolutionStep();
            setStep(0);
        }
    };

    const run = () => {
        if (currentTour.length < 4) return;

        let noImprovementCounter = 0;
        let finalTour = [...currentTour];
        let finalCost = currentCost;
        let finalBestTour = [...bestTour];
        let finalBestCost = bestCost;
        let finalTabuList = [...tabuList];
        let finalIteration = iteration;
        let lastPreviousTour = [...currentTour];
        let lastPreviousCost = currentCost;

        while (noImprovementCounter < 15) {
            let bestNeighbor = null;
            let bestNeighborCost = Infinity;
            let bestSwap = null;
            let neighborhood = [];

            const numCities = finalTour.length - 2;

            for (let i = 1; i <= numCities; i++) {
                let j;
                do {
                    j = Math.floor(Math.random() * numCities) + 1;
                } while (i === j);

                const isTabu = finalTabuList.some(entry =>
                    (entry.swap[0] === i && entry.swap[1] === j) ||
                    (entry.swap[0] === j && entry.swap[1] === i)
                ) && finalTabuList.some(entry => entry.expiryIteration >= iteration);

                let newTour = [...finalTour];
                [newTour[i], newTour[j]] = [newTour[j], newTour[i]];
                let newCost = calculateTourCost(newTour, data.edges);

                neighborhood.push({
                    tour: newTour,
                    cost: newCost,
                    isTabu: isTabu,
                    isChosen: false,
                    indexI: i,
                    indexJ: j
                });

                if (!isTabu || newCost < finalBestCost) {
                    if (newCost < bestNeighborCost) {
                        bestNeighbor = newTour;
                        bestNeighborCost = newCost;
                        bestSwap = [i, j];
                    }
                }
            }

            setNeighborhood(neighborhood);

            if (!bestNeighbor) break;

            lastPreviousTour = [...finalTour];
            lastPreviousCost = finalCost;

            finalTour = bestNeighbor;
            finalCost = bestNeighborCost;
            finalIteration += 1;

            finalTabuList = finalTabuList.filter(entry => entry.expiryIteration >= finalIteration);
            finalTabuList.push({ iteration: finalIteration, swap: bestSwap, expiryIteration: finalIteration + TABU_TENURE });

            if (bestNeighborCost < finalBestCost) {
                finalBestTour = bestNeighbor;
                finalBestCost = bestNeighborCost;
                noImprovementCounter = 0;
            } else {
                noImprovementCounter++;
            }
        }

        setPreviousTour(lastPreviousTour);
        setPreviousCost(lastPreviousCost);
        setCurrentTour(finalTour);
        setCurrentCost(finalCost);
        setBestTour(finalBestTour);
        setBestCost(finalBestCost);
        setTabuList(finalTabuList);
        setIteration(finalIteration);
        setStatus("Run Complete.");
    };

    return { initialize, iterationMethod, run };
};