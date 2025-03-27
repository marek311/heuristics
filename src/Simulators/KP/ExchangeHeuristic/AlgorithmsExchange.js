export const initialize = (items, capacity, generateBinaryVector) => {
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

export const iteration = (
    currentBackpack,
    currentNotBackpack,
    currentWeight,
    currentPrice,
    capacity,
    generateBinaryVector,
    strategy,
    setHighlightLinks,
    indexI,
    setOriginalIndexI,
    indexJ,
    setOriginalIndexJ,
    setAdmissible,
    setImproving,
) => {

    if (strategy === 'bestFit') {
        return performIterationBestFit(
            currentBackpack,
            currentNotBackpack,
            currentWeight,
            currentPrice,
            capacity,
            generateBinaryVector,
            setHighlightLinks,
        );
    }

    if (strategy === 'firstFit') {
        return performIterationFirstFit(
            currentBackpack,
            currentNotBackpack,
            currentWeight,
            currentPrice,
            capacity,
            generateBinaryVector,
            indexI,
            setOriginalIndexI,
            indexJ,
            setOriginalIndexJ,
            setAdmissible,
            setImproving,
            setHighlightLinks,
        );
    }
};

const performIterationBestFit = (
    currentBackpack,
    currentNotBackpack,
    currentWeight,
    currentPrice,
    capacity,
    generateBinaryVector,
    setHighlightLinks,
) => {

    setHighlightLinks([
        { source: 'inBackpack', target: 'notInBackpack' },
        { source: 'notInBackpack', target: 'admissible' },
        { source: 'admissible', target: 'improving' },
        { source: 'improving', target: 'bestQuestion' },
        { source: 'bestQuestion', target: 'exchange' },
        { source: 'exchange', target: 'solution' },
    ]);

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
    generateBinaryVector,
    indexI,
    setOriginalIndexI,
    indexJ,
    setOriginalIndexJ,
    setAdmissible,
    setImproving,
    setHighlightLinks
) => {

    let highlightLinks = [
        { source: 'inBackpack', target: 'notInBackpack' },
        { source: 'notInBackpack', target: 'admissible' },
    ];

    let backpackCurrent = [...currentBackpack];
    let notBackpackCurrent = [...currentNotBackpack];

    const outItem = backpackCurrent[indexI];
    const inItem = notBackpackCurrent[indexJ];

    if (!outItem || !inItem) {
        setHighlightLinks(highlightLinks);
        return {
            updatedBackpack: backpackCurrent,
            updatedNotBackpack: notBackpackCurrent,
            updatedWeight: currentWeight,
            updatedPrice: currentPrice,
            exchange: null,
        };
    }

    const potentialWeight = currentWeight - outItem.weight + inItem.weight;
    const potentialPrice = currentPrice - outItem.price + inItem.price;

    setAdmissible(false);
    setImproving(false);
    setOriginalIndexI(backpackCurrent[indexI].originalIndex);
    setOriginalIndexJ(notBackpackCurrent[indexJ].originalIndex);

    if (potentialWeight <= capacity) {
        setAdmissible(true);
        highlightLinks.push(
            { source: 'admissible', target: 'improving' },
        );

        if (potentialPrice > currentPrice) {
            setImproving(true);
            highlightLinks.push(
                { source: 'improving', target: 'exchange' },
                { source: 'exchange', target: 'solution' },
            );

            backpackCurrent[indexI] = inItem;
            notBackpackCurrent = notBackpackCurrent.filter(item => item !== inItem);
            notBackpackCurrent.push(outItem);

            const binaryVector = generateBinaryVector(backpackCurrent);

            setHighlightLinks(highlightLinks);

            return {
                updatedBackpack: backpackCurrent,
                updatedNotBackpack: notBackpackCurrent,
                updatedWeight: potentialWeight,
                updatedPrice: potentialPrice,
                exchange: {
                    removed: outItem,
                    added: inItem,
                    binaryVector,
                    newWeight: potentialWeight,
                    newPrice: potentialPrice,
                },
            };
        } else {
            highlightLinks.push(
                { source: 'improving', target: 'next' },
            );
        }
    } else {
        highlightLinks.push(
            { source: 'admissible', target: 'next' },
        );
    }

    setHighlightLinks(highlightLinks);

    return {
        updatedBackpack: backpackCurrent,
        updatedNotBackpack: notBackpackCurrent,
        updatedWeight: currentWeight,
        updatedPrice: currentPrice,
        exchange: null,
    };
};

export const run = (
    currentBackpack,
    currentNotBackpack,
    currentWeight,
    currentPrice,
    capacity,
    generateBinaryVector,
    setHighlightLinks,
    setAdmissible,
    setImproving,
    setOriginalIndexI,
    setOriginalIndexJ,
    strategy,
) => {
    setHighlightLinks([]);

    if (strategy === 'bestFit') {

    }
    if (strategy === 'firstFit') {
        return performRunFirstFit(
            currentBackpack,
            currentNotBackpack,
            currentWeight,
            currentPrice,
            capacity,
            generateBinaryVector,
            setHighlightLinks,
            setAdmissible,
            setImproving,
            setOriginalIndexI,
            setOriginalIndexJ,
        );
    }
};

export const performRunFirstFit = (
    currentBackpack,
    currentNotBackpack,
    currentWeight,
    currentPrice,
    capacity,
    generateBinaryVector,
    setHighlightLinks,
    setAdmissible,
    setImproving,
    setOriginalIndexI,
    setOriginalIndexJ,
) => {
    const exchangeHistory = [];
    let updatedBackpack = [...currentBackpack];
    let updatedNotBackpack = [...currentNotBackpack];
    let updatedWeight = currentWeight;
    let updatedPrice = currentPrice;

    let indexI = 0;
    let indexJ = 0;

    while (true) {

        updatedBackpack.sort((a, b) => a.originalIndex - b.originalIndex);
        updatedNotBackpack.sort((a, b) => a.originalIndex - b.originalIndex);

        const result = performIterationFirstFit(
            updatedBackpack,
            updatedNotBackpack,
            updatedWeight,
            updatedPrice,
            capacity,
            generateBinaryVector,
            indexI,
            setOriginalIndexI,
            indexJ,
            setOriginalIndexJ,
            setAdmissible,
            setImproving,
            setHighlightLinks
        );

        if (result.exchange) {
            exchangeHistory.push(result.exchange);
            updatedBackpack = result.updatedBackpack;
            updatedNotBackpack = result.updatedNotBackpack;
            updatedWeight = result.updatedWeight;
            updatedPrice = result.updatedPrice;
            indexI = 0;
            indexJ = 0;
        } else {
            if (indexJ + 1 < updatedNotBackpack.length) {
                indexJ++;
            } else if (indexI + 1 < updatedBackpack.length) {
                indexI++;
                indexJ = 0;
            } else {
                break;
            }
        }
    }

    return {
        updatedBackpack,
        updatedNotBackpack,
        updatedWeight,
        updatedPrice,
        exchangeHistory
    };
};