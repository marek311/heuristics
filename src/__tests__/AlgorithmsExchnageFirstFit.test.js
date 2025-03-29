import { iteration, run} from '../Simulators/KPHeuristicExchange/AlgorithmsExchange';

describe('Algorithms - Exchange Heuristic - First Fit', () => {

    test('Perform Iteration', () => {
        const items = [
            { weight: 5, price: 10, originalIndex: 0 },
            { weight: 5, price: 20, originalIndex: 1 },
            { weight: 5, price: 10, originalIndex: 2 },
            { weight: 5, price: 30, originalIndex: 3 },
            { weight: 5, price: 50, originalIndex: 4 },
        ];

        const capacity = 10;

        const initialState = {
            currentBackpack: [items[0], items[1]],
            currentNotBackpack: [items[2], items[3], items[4]],
            currentWeight: 10,
            currentPrice: 30,
            setHighlightLinks: jest.fn(),
            setOriginalIndexI: jest.fn(),
            setOriginalIndexJ: jest.fn(),
            setAdmissible: jest.fn(),
            setImproving: jest.fn(),
            setCurrentBackpack: jest.fn(),
            setCurrentNotBackpack: jest.fn(),
            setCurrentWeight: jest.fn(),
            setCurrentPrice: jest.fn(),
            setIsCompleted: jest.fn(),
            generateBinaryVector: jest.fn().mockReturnValue([1, 1, 0, 0, 0]),
        };

        const indexI = 0;
        const indexJ = 1;

        iteration(
            initialState.currentBackpack,
            initialState.currentNotBackpack,
            initialState.currentWeight,
            initialState.currentPrice,
            capacity,
            initialState.generateBinaryVector,
            'firstFit',
            initialState.setHighlightLinks,
            indexI,
            initialState.setOriginalIndexI,
            indexJ,
            initialState.setOriginalIndexJ,
            initialState.setAdmissible,
            initialState.setImproving,
            initialState.setCurrentBackpack,
            initialState.setCurrentNotBackpack,
            initialState.setCurrentWeight,
            initialState.setCurrentPrice,
            false,
            initialState.setIsCompleted,
            null,
            jest.fn(),
            0,
            jest.fn(),
            0,
            jest.fn(),
        );

        expect(initialState.setCurrentBackpack).toHaveBeenCalledWith(
            expect.arrayContaining([
                { weight: 5, price: 20, originalIndex: 1 },
                { weight: 5, price: 30, originalIndex: 3 },
            ])
        );

        expect(initialState.setCurrentNotBackpack).toHaveBeenCalledWith(
            expect.arrayContaining([
                { weight: 5, price: 10, originalIndex: 0 },
                { weight: 5, price: 10, originalIndex: 2 },
                { weight: 5, price: 50, originalIndex: 4 },
            ])
        );

        expect(initialState.setCurrentWeight).toHaveBeenCalledWith(10);
        expect(initialState.setCurrentPrice).toHaveBeenCalledWith(50);
    });

    test('Perform Run', () => {
        const items = [
            { weight: 5, price: 10, originalIndex: 0 },
            { weight: 5, price: 20, originalIndex: 1 },
            { weight: 5, price: 10, originalIndex: 2 },
            { weight: 5, price: 30, originalIndex: 3 },
            { weight: 5, price: 50, originalIndex: 4 },
            { weight: 5, price: 70, originalIndex: 5 },
        ];

        const capacity = 10;

        const state = {
            currentBackpack: [items[0], items[1]],
            currentNotBackpack: [items[2], items[3], items[4], items[5]],
            currentWeight: 10,
            currentPrice: 30,
            setHighlightLinks: jest.fn(),
            setOriginalIndexI: jest.fn(),
            setOriginalIndexJ: jest.fn(),
            setAdmissible: jest.fn(),
            setImproving: jest.fn(),
            setCurrentBackpack: jest.fn(),
            setCurrentNotBackpack: jest.fn(),
            setCurrentWeight: jest.fn(),
            setCurrentPrice: jest.fn(),
            setExchangeHistory: jest.fn(),
            setIsCompleted: jest.fn(),
            generateBinaryVector: jest.fn().mockReturnValue([1, 1, 0, 0, 0]),
        };

        run({
            capacity,
            currentBackpack: state.currentBackpack,
            currentNotBackpack: state.currentNotBackpack,
            currentWeight: state.currentWeight,
            currentPrice: state.currentPrice,
            setHighlightLinks: state.setHighlightLinks,
            indexI: 0,
            setOriginalIndexI: state.setOriginalIndexI,
            indexJ: 0,
            setOriginalIndexJ: state.setOriginalIndexJ,
            setAdmissible: state.setAdmissible,
            setImproving: state.setImproving,
            setCurrentBackpack: state.setCurrentBackpack,
            setCurrentNotBackpack: state.setCurrentNotBackpack,
            setCurrentWeight: state.setCurrentWeight,
            setCurrentPrice: state.setCurrentPrice,
            setExchangeHistory: state.setExchangeHistory,
            setIsCompleted: state.setIsCompleted,
            generateBinaryVector: state.generateBinaryVector,
            strategy: 'firstFit',
            setBestFoundSolution: jest.fn(),
            setBestFoundPrice: jest.fn(),
            setBestFoundWeight: jest.fn(),
        });

        expect(state.setCurrentBackpack).toHaveBeenCalledWith(
            expect.arrayContaining([
                { weight: 5, price: 50, originalIndex: 4 },
                { weight: 5, price: 70, originalIndex: 5 },
            ])
        );

        expect(state.setCurrentNotBackpack).toHaveBeenCalledWith(
            expect.arrayContaining([
                { weight: 5, price: 10, originalIndex: 0 },
                { weight: 5, price: 20, originalIndex: 1 },
                { weight: 5, price: 10, originalIndex: 2 },
                { weight: 5, price: 30, originalIndex: 3 },
            ])
        );

        expect(state.setCurrentWeight).toHaveBeenCalledWith(10);
        expect(state.setCurrentPrice).toHaveBeenCalledWith(120);
        expect(state.setIsCompleted).toHaveBeenCalledWith(true);
    });
});
