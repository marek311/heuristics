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
    setHighlightLinks([]);
    let highlightedLinks = [];

    if (strategy === 'bestFit') {
        highlightedLinks = [
            { source: 'inBackpack', target: 'notInBackpack' },
            { source: 'notInBackpack', target: 'admissible' },
            { source: 'admissible', target: 'improving' },
            { source: 'improving', target: 'bestQuestion' },
            { source: 'bestQuestion', target: 'next' },
            { source: 'next', target: 'solution' },
        ];
        setHighlightLinks(highlightedLinks);

        return performIterationBestFit(
            currentBackpack,
            currentNotBackpack,
            currentWeight,
            currentPrice,
            capacity,
            generateBinaryVector
        );
    }
    if (strategy === 'firstFit') {


        return performIterationFirstFit(
            currentBackpack,
            currentNotBackpack,
            currentWeight,
            currentPrice,
            capacity,
            generateBinaryVector
        );
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

    for (let i = 0; i < updatedBackpack.length; i++) {
        const backpackItem = updatedBackpack[i];

        for (const candidate of updatedNotBackpack) {
            const potentialWeight = currentWeight - backpackItem.weight + candidate.weight;
            const potentialPrice = currentPrice - backpackItem.price + candidate.price;

            if (potentialWeight <= capacity && potentialPrice > currentPrice) {
                const priceImprovement = potentialPrice - currentPrice;

                if (priceImprovement > bestFitImprovement) {
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

    for (let i = 0; i < updatedBackpack.length; i++) {
        const backpackItem = updatedBackpack[i];

        for (const candidate of updatedNotBackpack) {
            const potentialWeight = currentWeight - backpackItem.weight + candidate.weight;
            const potentialPrice = currentPrice - backpackItem.price + candidate.price;

            if (potentialWeight <= capacity && potentialPrice > currentPrice) {
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