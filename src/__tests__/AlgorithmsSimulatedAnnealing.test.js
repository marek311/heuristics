import { initializeTour, proposeNewSolution, calculateAcceptanceAndDecide } from '../Simulators/TSPSimulatedAnnealing/AlgorithmsSimulatedAnnealing';

describe('Algorithms - Simulated Annealing', () => {

    let data;
    let state;

    beforeEach(() => {
        data = {
            edges: [
                { city1: 'A', city2: 'B', distance: 10 },
                { city1: 'A', city2: 'C', distance: 15 },
                { city1: 'A', city2: 'D', distance: 12 },
                { city1: 'B', city2: 'C', distance: 14 },
                { city1: 'B', city2: 'D', distance: 15 },
                { city1: 'C', city2: 'D', distance: 10 },
            ],
            startingCity: 'A',
        };

        state = {
            currentTour: [],
            data: data,
            setProposedTour: jest.fn(),
            setProposedCost: jest.fn(),
            setCostDifference: jest.fn(),
            setStatus: jest.fn(),
            setHighlightLinks: jest.fn(),
            temperature: 100,
            setPreviousTour: jest.fn(),
            setPreviousCost: jest.fn(),
            setCurrentTour: jest.fn(),
            setCurrentCost: jest.fn(),
            setBestTour: jest.fn(),
            setBestCost: jest.fn(),
            setAcceptanceProbability: jest.fn(),
            setRandomValue: jest.fn(),
            setHighLightLinks: jest.fn(),
            costDifference: 0,
        };
    });

    test('Perform Initialize', () => {

        const { randomTour: randomTour, totalCost: calculatedCost } = initializeTour(data);

        expect(randomTour[0]).toBe('A');
        expect(randomTour[randomTour.length - 1]).toBe('A');

        expect(typeof calculatedCost).toBe('number');
        expect(calculatedCost).toBeGreaterThanOrEqual(0);

        const dataCities = new Set(data.edges.flatMap(e => [e.city1, e.city2]));
        const tourCities = new Set(randomTour.slice(0, -1));

        expect(tourCities.size).toBe(dataCities.size);
        expect([...tourCities].sort()).toEqual([...dataCities].sort());

        const noStartCityData = { ...data };
        delete noStartCityData.startingCity;

        const { randomTour: randomTourWithoutStartCity, totalCost: randomCost } = initializeTour(noStartCityData);
        const cities = Array.from(new Set(data.edges.flatMap((edge) => [edge.city1, edge.city2])));

        expect(randomTourWithoutStartCity[0]).toBe(cities[0]);
        expect(randomTourWithoutStartCity[randomTourWithoutStartCity.length - 1]).toBe(cities[0]);

        const testData = {
            edges: [
                { city1: 'A', city2: 'B', distance: 123 },
                { city1: 'B', city2: 'C', distance: 231 },
                { city1: 'C', city2: 'A', distance: 312 },
            ],
            startingCity: 'B',
        };
        const { randomTour: testTour, totalCost: testCost } = initializeTour(testData);

        const expectedCost = 123 + 231 + 312;
        expect(testCost).toBe(expectedCost);
    });

    test('Perform Iteration - Part 1', () => {

        state.currentTour = ['A', 'B', 'C', 'D', 'A'];
        proposeNewSolution(
            state.currentTour,
            state.setProposedTour,
            state.setProposedCost,
            state.setCostDifference,
            state.data,
            state.setStatus,
            state.setHighlightLinks
        );

        expect(state.setProposedTour).toHaveBeenCalledTimes(1);

        const newTour = state.setProposedTour.mock.calls[0][0];

        expect(newTour[0]).toBe(state.currentTour[0]);
        expect(newTour[newTour.length - 1]).toBe(state.currentTour[state.currentTour.length - 1]);
        expect(newTour).not.toEqual(state.currentTour);

        expect(state.setProposedCost).toHaveBeenCalledTimes(1);
        expect(typeof state.setProposedCost.mock.calls[0][0]).toBe('number');

        expect(state.setCostDifference).toHaveBeenCalledTimes(1);
        expect(typeof state.setCostDifference.mock.calls[0][0]).toBe('number');
    });

    test('Perform Iteration - Part 2', () => {

        //ACCEPT BETTER SOLUTION
        state.costDifference = -10;
        calculateAcceptanceAndDecide(
            state.currentTour,
            state.proposedTour,
            state.currentCost,
            state.proposedCost,
            state.costDifference,
            state.temperature,
            state.setPreviousTour,
            state.setPreviousCost,
            state.setCurrentTour,
            state.setCurrentCost,
            state.bestTour,
            state.bestCost,
            state.setBestTour,
            state.setBestCost,
            state.setAcceptanceProbability,
            state.setRandomValue,
            state.setStatus,
            state.setHighLightLinks
        );
        expect(state.setPreviousTour).toHaveBeenCalledWith(state.currentTour);
        expect(state.setCurrentTour).toHaveBeenCalledWith(state.proposedTour);

        //ACCEPT WORSE SOLUTION
        jest.spyOn(global.Math, 'random').mockReturnValue(0.01);
        state.costDifference = 10;
        const expectedProb = Math.exp(-state.costDifference / state.temperature);
        calculateAcceptanceAndDecide(
            state.currentTour,
            state.proposedTour,
            state.currentCost,
            state.proposedCost,
            state.costDifference,
            state.temperature,
            state.setPreviousTour,
            state.setPreviousCost,
            state.setCurrentTour,
            state.setCurrentCost,
            state.bestTour,
            state.bestCost,
            state.setBestTour,
            state.setBestCost,
            state.setAcceptanceProbability,
            state.setRandomValue,
            state.setStatus,
            state.setHighLightLinks
        );
        expect(state.setAcceptanceProbability).toHaveBeenCalledWith(expectedProb);
        expect(state.setRandomValue).toHaveBeenCalledWith(0.01);
        expect(state.setPreviousTour).toHaveBeenCalledWith(state.currentTour);
        expect(state.setCurrentTour).toHaveBeenCalledWith(state.proposedTour);

        state.setCurrentTour.mockClear();
        //DECLINE WORSE SOLUTION
        jest.spyOn(global.Math, 'random').mockReturnValue(0.99);
        state.costDifference = 10;
        calculateAcceptanceAndDecide(
            state.currentTour,
            state.proposedTour,
            state.currentCost,
            state.proposedCost,
            state.costDifference,
            state.temperature,
            state.setPreviousTour,
            state.setPreviousCost,
            state.setCurrentTour,
            state.setCurrentCost,
            state.bestTour,
            state.bestCost,
            state.setBestTour,
            state.setBestCost,
            state.setAcceptanceProbability,
            state.setRandomValue,
            state.setStatus,
            state.setHighLightLinks
        );
        expect(state.setCurrentTour).not.toHaveBeenCalled();
    });
});
