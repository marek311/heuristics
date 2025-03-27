export const performInitializeSolution = (
    items,
    capacity,
    generateBinaryVector
) => {

    const newBackpack = [];
    let totalWeight = 0;
    let totalPrice = 0;

    for (const item of items) {
        if (totalWeight + item.weight <= capacity) {
            newBackpack.push(item);
            totalWeight += item.weight;
            totalPrice += item.price;
        }
    }

    const binaryVector = generateBinaryVector(newBackpack);
    return {
        newBackpack,
        totalWeight,
        totalPrice,
        binaryVector
    };
};

export const performIteration = (
    currentBackpack,
    currentNotBackpack,
    currentWeight,
    currentPrice,
    capacity,
    generateBinaryVector,
    strategy,
    setHighlightLinks
) => {
    let highlightedLinks = [];

    if (strategy === 'bestFit') {
        const result = performIterationBestFit(
            currentBackpack,
            currentNotBackpack,
            currentWeight,
            currentPrice,
            capacity,
            generateBinaryVector
        );

        if (result.exchange) {

            highlightedLinks = [
                { source: 'inBackpack', target: 'notInBackpack' },
                { source: 'notInBackpack', target: 'admissible' },
                { source: 'admissible', target: 'improving' },
                { source: 'improving', target: 'bestQuestion' },
                { source: 'bestQuestion', target: 'exchange' },
                { source: 'exchange', target: 'solution' },
            ];
        }

        setHighlightLinks(highlightedLinks);
        return result;
    }

    if (strategy === 'firstFit') {
        const result = performIterationFirstFit(
            currentBackpack,
            currentNotBackpack,
            currentWeight,
            currentPrice,
            capacity,
            generateBinaryVector
        );

        if (result.exchange) {

            highlightedLinks = [
                { source: 'inBackpack', target: 'notInBackpack' },
                { source: 'notInBackpack', target: 'admissible' },
                { source: 'admissible', target: 'improving' },
                { source: 'improving', target: 'exchange' },
                { source: 'exchange', target: 'solution' },
            ];
        }

        setHighlightLinks(highlightedLinks);
        return result;
    }
};

const performIterationBestFit = (
    currentBackpack,
    currentNotBackpack,
    currentWeight,
    currentPrice,
    capacity,
    generateBinaryVector
) => {
    let updatedBackpack = [...currentBackpack];
    let updatedNotBackpack = [...currentNotBackpack];
    let bestFitCandidate = null;
    let bestFitImprovement = -Infinity;
    let indexI;
    let indexJ;

    for (let i = 0; i < updatedBackpack.length; i++) {
        const backpackItem = updatedBackpack[i];

        for (let j = 0; j < updatedNotBackpack.length; j++) {
            const candidate = updatedNotBackpack[j];
            const potentialWeight = currentWeight - backpackItem.weight + candidate.weight;
            const potentialPrice = currentPrice - backpackItem.price + candidate.price;

            if (potentialWeight <= capacity && potentialPrice > currentPrice) {
                const priceImprovement = potentialPrice - currentPrice;

                if (priceImprovement > bestFitImprovement) {

                    indexI = updatedBackpack[i].originalIndex;
                    indexJ = updatedNotBackpack[j].originalIndex;

                    bestFitImprovement = priceImprovement;
                    bestFitCandidate = {
                        removed: backpackItem,
                        added: candidate,
                        newWeight: potentialWeight,
                        newPrice: potentialPrice,
                    };
                }
            }
        }
    }

    if (bestFitCandidate) {
        updatedBackpack = updatedBackpack.map(item =>
            item === bestFitCandidate.removed ? bestFitCandidate.added : item
        );
        updatedNotBackpack = updatedNotBackpack.filter(item => item !== bestFitCandidate.added);
        updatedNotBackpack.push(bestFitCandidate.removed);

        const binaryVector = generateBinaryVector(updatedBackpack);
        return {
            updatedBackpack,
            updatedNotBackpack,
            updatedWeight: bestFitCandidate.newWeight,
            updatedPrice: bestFitCandidate.newPrice,
            exchange: {
                ...bestFitCandidate,
                binaryVector,
                indexI: indexI,
                indexJ: indexJ,
            },
        };
    }

    return {
        updatedBackpack,
        updatedNotBackpack,
        updatedWeight: currentWeight,
        updatedPrice: currentPrice,
        exchange: null,
    };
};

const performIterationFirstFit = (
    currentBackpack,
    currentNotBackpack,
    currentWeight,
    currentPrice,
    capacity,
    generateBinaryVector
) => {
    let updatedBackpack = [...currentBackpack];
    let updatedNotBackpack = [...currentNotBackpack];
    let indexI;
    let indexJ;

    for (let i = 0; i < updatedBackpack.length; i++) {
        const backpackItem = updatedBackpack[i];

        for (let j = 0; j < updatedNotBackpack.length; j++) {
            const candidate = updatedNotBackpack[j];
            const potentialWeight = currentWeight - backpackItem.weight + candidate.weight;
            const potentialPrice = currentPrice - backpackItem.price + candidate.price;

            if (potentialWeight <= capacity && potentialPrice > currentPrice) {
                indexI = updatedBackpack[i].originalIndex;
                indexJ = updatedNotBackpack[j].originalIndex;

                updatedBackpack[i] = candidate;

                updatedNotBackpack = updatedNotBackpack.filter(item => item !== candidate);
                updatedNotBackpack.push(backpackItem);

                const binaryVector = generateBinaryVector(updatedBackpack);

                return {
                    updatedBackpack,
                    updatedNotBackpack,
                    updatedWeight: potentialWeight,
                    updatedPrice: potentialPrice,
                    exchange: {
                        removed: backpackItem,
                        added: candidate,
                        binaryVector,
                        newWeight: potentialWeight,
                        newPrice: potentialPrice,
                        indexI: indexI,
                        indexJ: indexJ,
                    },
                };
            }
        }
    }

    return {
        updatedBackpack,
        updatedNotBackpack,
        updatedWeight: currentWeight,
        updatedPrice: currentPrice,
        exchange: null,
    };
};

export const performRun = (
    currentBackpack,
    currentNotBackpack,
    currentWeight,
    currentPrice,
    capacity,
    generateBinaryVector,
    strategy,
    setHighlightLinks
) => {
    setHighlightLinks([]);

    if (strategy === 'bestFit') {
        return performRunBestFit(
            currentBackpack,
            currentNotBackpack,
            currentWeight,
            currentPrice,
            capacity,
            generateBinaryVector
        );
    }
    if (strategy === 'firstFit') {
        return performRunFirstFit(
            currentBackpack,
            currentNotBackpack,
            currentWeight,
            currentPrice,
            capacity,
            generateBinaryVector
        );
    }
};

const performRunBestFit = (
    currentBackpack,
    currentNotBackpack,
    currentWeight,
    currentPrice,
    capacity,
    generateBinaryVector
) => performRunGeneric(
    performIterationBestFit,
    currentBackpack,
    currentNotBackpack,
    currentWeight,
    currentPrice,
    capacity,
    generateBinaryVector
);

const performRunFirstFit = (
    currentBackpack,
    currentNotBackpack,
    currentWeight,
    currentPrice,
    capacity,
    generateBinaryVector
) => performRunGeneric(
    performIterationFirstFit,
    currentBackpack,
    currentNotBackpack,
    currentWeight,
    currentPrice,
    capacity,
    generateBinaryVector
);

const performRunGeneric = (
    iterationFunction,
    currentBackpack,
    currentNotBackpack,
    currentWeight,
    currentPrice,
    capacity,
    generateBinaryVector
) => {
    const exchangeHistory = [];
    let updatedBackpack = [...currentBackpack];
    let updatedNotBackpack = [...currentNotBackpack];
    let updatedWeight = currentWeight;
    let updatedPrice = currentPrice;

    while (true) {
        const result = iterationFunction(
            updatedBackpack,
            updatedNotBackpack,
            updatedWeight,
            updatedPrice,
            capacity,
            generateBinaryVector
        );

        if (result.exchange) {
            exchangeHistory.push(result.exchange);
            updatedBackpack = result.updatedBackpack;
            updatedNotBackpack = result.updatedNotBackpack;
            updatedWeight = result.updatedWeight;
            updatedPrice = result.updatedPrice;
        } else {
            break;
        }
    }

    return {
        updatedBackpack,
        updatedNotBackpack,
        updatedWeight,
        updatedPrice,
        exchangeHistory,
    };
};