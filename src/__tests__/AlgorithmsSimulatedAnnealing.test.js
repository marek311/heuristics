import { initializeTour } from '../Simulators/TSPSimulatedAnnealing/AlgorithmsSimulatedAnnealing';

describe('Algorithms - Simulated Annealing', () => {

    let data;
    //let state;

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

        //state = {};
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
});
