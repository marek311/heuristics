import { useTabuSearch } from '../Simulators/TSPTabuSearch/AlgorithmsTabuSearch';

describe('Algorithms - Tabu Search', () => {

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
            data,
            currentTour: [],
            setCurrentTour: jest.fn(),
            currentCost: 0,
            setCurrentCost: jest.fn(),
            setBestTour: jest.fn(),
            bestCost: Infinity,
            setBestCost: jest.fn(),
            setPreviousTour: jest.fn(),
            setPreviousCost: jest.fn(),
            tabuList: [],
            setTabuList: jest.fn(),
            iteration: 0,
            setIteration: jest.fn(),
            neighborhood: [],
            setNeighborhood: jest.fn(),
            setStatus: jest.fn(),
            step: 0,
            setStep: jest.fn(),
            bestNeighborData: null,
            setBestNeighborData: jest.fn(),
            setHighlightLinks: jest.fn(),
            isIterationComplete: jest.fn(),
            setIsIterationComplete: jest.fn(),
            tabuTenure: 5,
        };
    });

    test('Perform Initialize', () => {

        const tabuSearch = useTabuSearch(state);
        tabuSearch.initialize();

        const validTourPricePairs = [
            { tour: ['A', 'B', 'C', 'D', 'A'], cost: 46 },
            { tour: ['A', 'B', 'D', 'C', 'A'], cost: 50 },
            { tour: ['A', 'C', 'B', 'D', 'A'], cost: 56 },
            { tour: ['A', 'C', 'D', 'B', 'A'], cost: 50 },
            { tour: ['A', 'D', 'B', 'C', 'A'], cost: 56 },
            { tour: ['A', 'D', 'C', 'B', 'A'], cost: 46 },
        ];

        expect(state.setCurrentCost).toHaveBeenCalled();
        expect(state.setCurrentTour).toHaveBeenCalled();

        const [[initializedTour]] = state.setCurrentTour.mock.calls;
        const [[initializedCost]] = state.setCurrentCost.mock.calls;

        const isValidTourAndCost = validTourPricePairs.some(pair =>
            JSON.stringify(pair.tour) === JSON.stringify(initializedTour) && pair.cost === initializedCost
        );
        expect(isValidTourAndCost).toBe(true);

        expect(state.setBestTour).toHaveBeenCalledWith(initializedTour);
        expect(state.setBestCost).toHaveBeenCalledWith(initializedCost);

        expect(state.setNeighborhood).toHaveBeenCalled();
        const [[initializedNeighborhood]] = state.setNeighborhood.mock.calls;
        const hasXTour = initializedNeighborhood.some(neighbor =>
            JSON.stringify(neighbor.tour) === JSON.stringify(['x', 'x', 'x', 'x', 'x'])
        );
        expect(hasXTour).toBe(true);

        expect(state.setIteration).toHaveBeenCalledWith(0);
        expect(state.setStatus).toHaveBeenCalledWith('Initialized Random Solution.');
    });

    test('Perform Iteration - Part 1', () => {
        state.currentTour = ['A', 'B', 'C', 'D', 'A'];
        state.currentCost = 46;
        state.bestCost = 46;
        state.step = 0;
        const tabuSearch = useTabuSearch(state);
        tabuSearch.iterationMethod();
        expect(state.setStep).toHaveBeenCalledWith(1);
    });

    test('Perform Iteration - Part 2', () => {
        state.currentTour = ['A', 'B', 'C', 'D', 'A'];
        state.currentCost = 46;
        state.bestCost = 46;
        state.step = 1;
        const tabuSearch = useTabuSearch(state);
        tabuSearch.iterationMethod();
        expect(state.setStep).toHaveBeenCalledWith(2);
    });

    test('Perform Iteration - Part 3', () => {
        state.currentTour = ['A', 'B', 'C', 'D', 'A'];
        state.currentCost = 46;
        state.bestCost = 46;
        state.step = 2;
        const tabuSearch = useTabuSearch(state);
        tabuSearch.iterationMethod();
        expect(state.setStep).toHaveBeenCalledWith(0);
    });
});
