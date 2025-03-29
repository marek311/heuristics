import { performIteration, performRun } from '../Simulators/KP/InsertHeuristic/AlgorithmsInsert';

describe('Algorithms - Insert Heuristic', () => {

    test('Perform Iteration', () => {
        const items = [
            {weight: 1, price: 50, originalIndex: 0},
            {weight: 2, price: 40, originalIndex: 1},
            {weight: 3, price: 30, originalIndex: 2},
            {weight: 4, price: 20, originalIndex: 3},
            {weight: 5, price: 10, originalIndex: 4},
        ];

        const initialState = {
            currentIndex: 0,
            currentWeight: 0,
            currentPrice: 0,
            selectedItems: [],
            itemStatus: [false, false, false, false, false],
            binarySolution: [0, 0, 0, 0, 0],
            capacity: 10,
        };

        const result = performIteration(
            items,
            initialState.currentIndex,
            initialState.currentWeight,
            initialState.currentPrice,
            initialState.selectedItems,
            initialState.itemStatus,
            initialState.binarySolution,
            initialState.capacity,
            () => {}
        );

        const expectedResult = {
            currentIndex: 1,
            currentWeight: 1,
            currentPrice: 50,
            selectedItems: [
                {weight: 1, price: 50, originalIndex: 0},
            ],
            itemStatus: [true, false, false, false, false],
            binarySolution: [1, 0, 0, 0, 0],
            completed: false,
        };

        expect(result).toEqual(expectedResult);
    });


    test('Perform Run', () => {
        const items = [
            {weight: 1, price: 50, originalIndex: 0},
            {weight: 2, price: 40, originalIndex: 1},
            {weight: 3, price: 30, originalIndex: 2},
            {weight: 4, price: 20, originalIndex: 3},
            {weight: 5, price: 10, originalIndex: 4},
        ];

        const initialState = {
            currentIndex: 0,
            currentWeight: 0,
            currentPrice: 0,
            selectedItems: [],
            itemStatus: [false, false, false, false, false],
            binarySolution: [0, 0, 0, 0, 0],
            capacity: 10,
        };

        const result = performRun(
            items,
            initialState.currentIndex,
            initialState.currentWeight,
            initialState.currentPrice,
            initialState.selectedItems,
            initialState.itemStatus,
            initialState.binarySolution,
            initialState.capacity,
            () => {}
        );

        const expectedResult = {
            currentIndex: 5,
            currentWeight: 10,
            currentPrice: 140,
            selectedItems: [
                {weight: 1, price: 50, originalIndex: 0},
                {weight: 2, price: 40, originalIndex: 1},
                {weight: 3, price: 30, originalIndex: 2},
                {weight: 4, price: 20, originalIndex: 3},
            ],
            itemStatus: [true, true, true, true, false],
            binarySolution: [1, 1, 1, 1, 0],
            completed: true,
        };

        expect(result).toEqual(expectedResult);
    });
});
