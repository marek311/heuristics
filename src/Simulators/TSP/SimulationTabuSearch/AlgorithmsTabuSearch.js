import { useState } from 'react';

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

export const useTabuSearch = (data) => {
    const [currentTour, setCurrentTour] = useState([]);
    const [currentCost, setCurrentCost] = useState(Infinity);
    const [bestTour, setBestTour] = useState([]);
    const [bestCost, setBestCost] = useState(Infinity);
    const [tabuList, setTabuList] = useState([]);
    const [iteration, setIteration] = useState(0);

    const initialize = () => {
        if (!data || !data.edges) return;
        const { tour, cost } = initializeTour(data);
        setCurrentTour(tour);
        setCurrentCost(cost);
        setBestTour(tour);
        setBestCost(cost);
        setTabuList([]);
        setIteration(0);
    };

    const findBestNeighbor = () => {
        let bestNeighbor = null;
        let bestNeighborCost = Infinity;
        let bestSwap = null;

        for (let i = 1; i < currentTour.length - 2; i++) {
            for (let j = i + 1; j < currentTour.length - 1; j++) {
                const isTabu = tabuList.some(entry =>
                    (entry.swap[0] === i && entry.swap[1] === j) ||
                    (entry.swap[0] === j && entry.swap[1] === i)
                );

                const newTour = [...currentTour];
                [newTour[i], newTour[j]] = [newTour[j], newTour[i]];
                const newCost = calculateTourCost(newTour, data.edges);

                if (!isTabu || newCost < bestCost) {
                    if (newCost < bestNeighborCost) {
                        bestNeighbor = newTour;
                        bestNeighborCost = newCost;
                        bestSwap = [i, j];
                    }
                }
            }
        }

        return { bestNeighbor, bestNeighborCost, bestSwap };
    };

    const step = () => {
        if (currentTour.length < 4) return;

        setIteration(prev => prev + 1);
        const { bestNeighbor, bestNeighborCost, bestSwap } = findBestNeighbor();

        if (bestNeighbor) {
            setCurrentTour(bestNeighbor);
            setCurrentCost(bestNeighborCost);

            const updatedTabuList = tabuList.filter(entry => entry.expiryIteration > iteration);
            setTabuList([...updatedTabuList, { iteration, swap: bestSwap, expiryIteration: iteration + TABU_TENURE }]);

            if (bestNeighborCost < bestCost) {
                setBestCost(bestNeighborCost);
                setBestTour(bestNeighbor);
            }
        }
    };

    return { currentTour, currentCost, bestTour, bestCost, tabuList, iteration, initialize, step };
};
