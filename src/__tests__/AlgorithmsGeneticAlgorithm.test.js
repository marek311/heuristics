import { generateInitialPopulation } from '../Simulators/TSPGeneticAlgorithm/AlgorithmsGeneticAlgorithm';

describe('Algorithms - Genetic Algorithm', () => {

    let data;
    let setFitnessValues;

    beforeEach(() => {
        setFitnessValues = jest.fn();
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
            cityCount: 4,
        };
    });

    test('Perform Initialize', () => {

        const populationSize = 3;
        const population = generateInitialPopulation(data, populationSize, setFitnessValues);

        expect(population.length).toBe(populationSize);

        const uniqueTours = new Set(population.map(tour => JSON.stringify(tour)));
        expect(uniqueTours.size).toBe(populationSize);

        population.forEach(tour => {
            const citiesInTour = new Set(tour.slice(0, -1));
            const citiesInData = new Set(data.edges.flatMap(edge => [edge.city1, edge.city2]));
            expect(citiesInTour.size).toBe(citiesInData.size);
            expect([...citiesInTour].sort()).toEqual([...citiesInData].sort());
        });

        expect(setFitnessValues).toHaveBeenCalledTimes(1);
        expect(setFitnessValues.mock.calls[0][0].length).toBe(populationSize);

        const noStartCityData = { ...data };
        delete noStartCityData.startingCity;
        const populationWithoutStartCity = generateInitialPopulation(noStartCityData, populationSize, setFitnessValues);

        expect(populationWithoutStartCity.length).toBe(populationSize);

        const cities = Array.from(new Set(data.edges.flatMap((edge) => [edge.city1, edge.city2])));
        const firstCity = cities[0];

        populationWithoutStartCity.forEach(tour => {
            expect(tour[0]).toBe(firstCity);
            expect(tour[tour.length - 1]).toBe(firstCity);
        });
    });
});
