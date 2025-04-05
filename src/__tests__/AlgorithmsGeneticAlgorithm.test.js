import { generateInitialPopulation, crossover, mutation } from '../Simulators/TSPGeneticAlgorithm/AlgorithmsGeneticAlgorithm';

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

    test('Perform Crossover', () => {
        const parent1 = ['A', 'B', 'C', 'D', 'E', 'F', 'A'];
        const parent2 = ['A', 'F', 'E', 'D', 'C', 'B', 'A'];

        const expectedChild1 = ['A', 'B', 'C', 'D', 'F', 'E', 'A'];
        const child1 = crossover(parent1, parent2);

        const expectedChild2 = ['A' , 'F' , 'E' , 'D' , 'B' , 'C' , 'A' ];
        const child2 = crossover(parent2, parent1);

        expect(child1).toEqual(expectedChild1);
        expect(child1.length).toBe(parent1.length);
        expect(child2).toEqual(expectedChild2);
        expect(child2.length).toBe(parent2.length);

        expect(child1[0]).toBe(parent1[0]);
        expect(child1[child1.length - 1]).toBe(parent1[parent1.length - 1]);

        const uniqueCities = new Set(child1.slice(0, -1));
        const expectedCities = new Set(parent1.slice(0, -1));

        expect(uniqueCities.size).toBe(expectedCities.size);
        expect([...uniqueCities].sort()).toEqual([...expectedCities].sort());
    });

    test('Perform Mutation', () => {
        const tour = ['A', 'B', 'C', 'D', 'E', 'F', 'A'];
        const result = mutation(tour, 0);
        expect(result).toEqual(tour);

        const mutatedTour = mutation(tour, 1);
        expect(mutatedTour).not.toEqual(tour);
        expect(mutatedTour.length).toBe(tour.length);
        expect(mutatedTour[0]).toBe(tour[0]);
        expect(mutatedTour[mutatedTour.length - 1]).toBe(tour[tour.length - 1]);

        const originalCities = [...tour.slice(1, -1)].sort();
        const mutatedCities = [...mutatedTour.slice(1, -1)].sort();
        expect(mutatedCities).toEqual(originalCities);

        const mutated = mutation(tour, 1);
        const originalMiddle = tour.slice(1, -1).sort();
        const mutatedMiddle = mutated.slice(1, -1).sort();
        expect(originalMiddle).toEqual(mutatedMiddle);
    });
});
