export const initialize = (
    items,
    capacity,
    generateBinaryVector,
    setCurrentBackpack,
    setCurrentWeight,
    setCurrentPrice,
    setCurrentNotBackpack,
    setExchangeHistory,
    setIsCompleted
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

    setCurrentBackpack(newBackpack);
    setCurrentWeight(totalWeight);
    setCurrentPrice(totalPrice);
    setCurrentNotBackpack(items.filter(item => !newBackpack.includes(item)));

    setExchangeHistory([{
        binaryVector,
        newWeight: totalWeight,
        newPrice: totalPrice,
        removed: null,
        added: null,
    }]);

    setIsCompleted(false);
};

export const updateIndexes = (indexI, indexJ, currentBackpack, currentNotBackpack, setIndexI, setIndexJ, setIsCompleted) => {
    if (indexJ + 1 < currentNotBackpack.length) {
        setIndexJ(prevJ => prevJ + 1);
    } else if (indexI + 1 < currentBackpack.length) {
        setIndexI(prevI => prevI + 1);
        setIndexJ(0);
    } else {
        setIsCompleted(true);
    }
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
    setCurrentBackpack,
    setCurrentNotBackpack,
    setCurrentWeight,
    setCurrentPrice,
    isCompleted,
) => {

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
            setCurrentBackpack,
            setCurrentNotBackpack,
            setCurrentWeight,
            setCurrentPrice,
            isCompleted,
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
    setHighlightLinks,
    setCurrentBackpack,
    setCurrentNotBackpack,
    setCurrentWeight,
    setCurrentPrice,
    isCompleted,
) => {

    if (isCompleted) return;

    currentBackpack.sort((a, b) => a.originalIndex - b.originalIndex);
    currentNotBackpack.sort((a, b) => a.originalIndex - b.originalIndex);

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
        setCurrentBackpack(backpackCurrent);
        setCurrentNotBackpack(notBackpackCurrent);
        setCurrentWeight(currentWeight);
        setCurrentPrice(currentPrice);

        return {
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
            setCurrentBackpack(backpackCurrent);
            setCurrentNotBackpack(notBackpackCurrent);
            setCurrentWeight(potentialWeight);
            setCurrentPrice(potentialPrice);

            return {
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
    setCurrentBackpack(backpackCurrent);
    setCurrentNotBackpack(notBackpackCurrent);
    setCurrentWeight(currentWeight);
    setCurrentPrice(currentPrice);

    return {
        exchange: null,
    };
};

export const runExchangeAlgorithm = ({
                                         items,
                                         capacity,
                                         currentBackpack,
                                         currentNotBackpack,
                                         currentWeight,
                                         currentPrice,
                                         setCurrentBackpack,
                                         setCurrentNotBackpack,
                                         setCurrentWeight,
                                         setCurrentPrice,
                                         setExchangeHistory,
                                         setIsCompleted,
                                         setHighlightLinks,
                                         generateBinaryVector
                                     }) => {
    let backpackCurrent = [...currentBackpack];
    let notBackpackCurrent = [...currentNotBackpack];
    let totalWeight = currentWeight;
    let totalPrice = currentPrice;
    let indexI = 0;
    let indexJ = 0;
    let isCompleted = false;

    let exchangeHistoryTemp = [];

    while (!isCompleted) {
        backpackCurrent.sort((a, b) => a.originalIndex - b.originalIndex);
        notBackpackCurrent.sort((a, b) => a.originalIndex - b.originalIndex);

        const outItem = backpackCurrent[indexI];
        const inItem = notBackpackCurrent[indexJ];

        if (!outItem || !inItem) {
            break;
        }

        const potentialWeight = totalWeight - outItem.weight + inItem.weight;
        const potentialPrice = totalPrice - outItem.price + inItem.price;

        let admissible = false;
        let improving = false;

        if (potentialWeight <= capacity) {
            admissible = true;

            if (potentialPrice > totalPrice) {
                improving = true;

                // Perform the exchange
                backpackCurrent[indexI] = inItem;
                notBackpackCurrent = notBackpackCurrent.filter(item => item !== inItem);
                notBackpackCurrent.push(outItem);

                totalWeight = potentialWeight;
                totalPrice = potentialPrice;

                const binaryVector = generateBinaryVector(backpackCurrent);

                // Log the exchange
                exchangeHistoryTemp.push({
                    removed: outItem,
                    added: inItem,
                    binaryVector,
                    newWeight: totalWeight,
                    newPrice: totalPrice,
                    indexI: backpackCurrent[indexI].originalIndex,
                    indexJ: notBackpackCurrent[indexJ].originalIndex,
                });

                // Reset indices for the next iteration but continue with the loop
                indexI = 0;
                indexJ = 0;
                continue; // Skip the rest of the current iteration and restart the loop
            }
        }

        // Move to the next combination of `indexI` and `indexJ`
        if (indexJ + 1 < notBackpackCurrent.length) {
            indexJ++;
        } else if (indexI + 1 < backpackCurrent.length) {
            indexI++;
            indexJ = 0;  // Reset indexJ when we increment indexI
        } else {
            isCompleted = true;
        }
    }

    const binaryVector = generateBinaryVector(backpackCurrent);

    // Final update after loop completes
    setCurrentBackpack(backpackCurrent);
    setCurrentNotBackpack(notBackpackCurrent);
    setCurrentWeight(totalWeight);
    setCurrentPrice(totalPrice);
    setIsCompleted(isCompleted);
    setExchangeHistory(prevHistory => [...prevHistory, ...exchangeHistoryTemp]);  // Accumulate history properly
};
