import { iteration } from '../Simulators/KP/ExchangeHeuristic/AlgorithmsExchange';

describe('Algorithms - Exchange Heuristic - Best Fit', () => {

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
            bestFoundSolution: null,
            bestFoundPrice: 0,
            bestFoundWeight: 0,
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
            setBestFoundSolution: jest.fn(),
            setBestFoundPrice: jest.fn(),
            setBestFoundWeight: jest.fn(),
            setBetterBest: jest.fn(),
            generateBinaryVector: jest.fn().mockReturnValue([1, 1, 0, 0, 0]),
        };

        const indexI = 0;
        const indexJ = 2;

        iteration(
            initialState.currentBackpack,
            initialState.currentNotBackpack,
            initialState.currentWeight,
            initialState.currentPrice,
            capacity,
            initialState.generateBinaryVector,
            'bestFit',
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
            initialState.bestFoundSolution,
            initialState.setBestFoundSolution,
            initialState.bestFoundPrice,
            initialState.setBestFoundPrice,
            initialState.bestFoundWeight,
            initialState.setBestFoundWeight,
            false,
            initialState.setBetterBest,
        );

        expect(initialState.setBestFoundSolution).toHaveBeenCalledWith({
            removed: 0,
            added: 4,
        });
        expect(initialState.setBestFoundPrice).toHaveBeenCalledWith(70);
        expect(initialState.setBestFoundWeight).toHaveBeenCalledWith(10);
    });
});
