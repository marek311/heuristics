import { iteration, run } from '../Simulators/KP/ExchangeHeuristic/AlgorithmsExchange';

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
            setExchangeHistory: jest.fn(),
            setIsCompleted: jest.fn(),
            generateBinaryVector: jest.fn().mockReturnValue([1, 1, 0, 0, 0]),
            setBestFoundSolution: jest.fn(),
            setBestFoundPrice: jest.fn(),
            setBestFoundWeight: jest.fn(),
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
            strategy: 'bestFit',
            setBestFoundSolution: state.setBestFoundSolution,
            setBestFoundPrice: state.setBestFoundPrice,
            setBestFoundWeight: state.setBestFoundWeight,
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

        expect(state.setBestFoundSolution).toHaveBeenCalledWith(null);
        expect(state.setBestFoundPrice).toHaveBeenCalledWith(0);
        expect(state.setBestFoundWeight).toHaveBeenCalledWith(0);
    });
});
