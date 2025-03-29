import { iteration, run} from '../Simulators/KP/ExchangeHeuristic/AlgorithmsExchange';

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
});
