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
    setIsCompleted,
    bestFoundSolution,
    setBestFoundSolution,
    bestFoundPrice,
    setBestFoundPrice,
    bestFoundWeight,
    setBestFoundWeight,
    betterBest,
    setBetterBest,
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

    if (strategy === 'bestFit') {
        return performIterationBestFit(
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
            setIsCompleted,
            bestFoundSolution,
            setBestFoundSolution,
            bestFoundPrice,
            setBestFoundPrice,
            bestFoundWeight,
            setBestFoundWeight,
            betterBest,
            setBetterBest,
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
    setIsCompleted,
    bestFoundSolution,
    setBestFoundSolution,
    bestFoundPrice,
    setBestFoundPrice,
    bestFoundWeight,
    setBestFoundWeight,
    betterBest,
    setBetterBest,
) => {
    if (isCompleted) return { exchange: null };

    let highlightLinks = [
        { source: 'inBackpack', target: 'notInBackpack' },
        { source: 'notInBackpack', target: 'admissible' },
    ];

    currentBackpack.sort((a, b) => a.originalIndex - b.originalIndex);
    currentNotBackpack.sort((a, b) => a.originalIndex - b.originalIndex);

    const outItem = currentBackpack[indexI];
    const inItem = currentNotBackpack[indexJ];

    if (!outItem || !inItem) return { exchange: null };

    const potentialWeight = currentWeight - outItem.weight + inItem.weight;
    const potentialPrice = currentPrice - outItem.price + inItem.price;

    const originalIndexI = outItem.originalIndex;
    const originalIndexJ = inItem.originalIndex;
    let isAdmissible = false;
    let isImproving = false;
    let isBetterBest = false;
    let newBestSolution = bestFoundSolution;
    let newBestPrice = bestFoundPrice;
    let newBestWeight = bestFoundWeight;

    if (potentialWeight <= capacity) {
        isAdmissible = true;
        highlightLinks.push(
            { source: 'admissible', target: 'improving' },
        );

        if (potentialPrice > currentPrice) {
            isImproving = true;
            highlightLinks.push(
                { source: 'improving', target: 'bestQuestion' },
            );

            if(potentialPrice > bestFoundPrice) {
                isBetterBest = true;
                highlightLinks.push(
                    { source: 'bestQuestion', target: 'exchange' },
                    { source: 'exchange', target: 'next' },
                );
                newBestSolution = { removed: originalIndexI, added: originalIndexJ };
                newBestPrice = potentialPrice;
                newBestWeight = potentialWeight;

            } else {
                highlightLinks.push(
                    {source: 'bestQuestion', target: 'next'},
                );
            }
        } else {
            highlightLinks.push(
                {source: 'improving', target: 'next'},
            );
        }
    } else {
        highlightLinks.push(
            { source: 'admissible', target: 'next' },
        );
    }

    setHighlightLinks(highlightLinks);
    setOriginalIndexI(originalIndexI);
    setOriginalIndexJ(originalIndexJ);
    setAdmissible(isAdmissible);
    setImproving(isImproving);
    setBetterBest(isBetterBest);
    setBestFoundSolution(newBestSolution);
    setBestFoundPrice(newBestPrice);
    setBestFoundWeight(newBestWeight);

    return { exchange: null };
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

export const run = ({
                        currentBackpack,
                        currentNotBackpack,
                        currentWeight,
                        currentPrice,
                        capacity,
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
                        setExchangeHistory,
                        setIsCompleted,
                        generateBinaryVector,
                        strategy,
                        setBestFoundSolution,
                        setBestFoundPrice,
                        setBestFoundWeight
                    }) => {
    if (strategy === 'firstFit') {
        runFirstFit({
            capacity,
            currentBackpack,
            currentNotBackpack,
            currentWeight,
            currentPrice,
            setHighlightLinks,
            setOriginalIndexI,
            setOriginalIndexJ,
            setAdmissible,
            setImproving,
            setCurrentBackpack,
            setCurrentNotBackpack,
            setCurrentWeight,
            setCurrentPrice,
            setExchangeHistory,
            setIsCompleted,
            generateBinaryVector
        });
    }
    if (strategy === 'bestFit') {
        runBestFit({
            capacity,
            currentBackpack,
            currentNotBackpack,
            currentWeight,
            currentPrice,
            setOriginalIndexI,
            setOriginalIndexJ,
            setAdmissible,
            setImproving,
            setCurrentBackpack,
            setCurrentNotBackpack,
            setCurrentWeight,
            setCurrentPrice,
            setExchangeHistory,
            setIsCompleted,
            generateBinaryVector,
            setBestFoundSolution,
            setBestFoundPrice,
            setBestFoundWeight
        });
    }
};

export let runBestFit = ({
                               capacity,
                               currentBackpack,
                               currentNotBackpack,
                               currentWeight,
                               currentPrice,
                               setOriginalIndexI,
                               setOriginalIndexJ,
                               setAdmissible,
                               setImproving,
                               setCurrentBackpack,
                               setCurrentNotBackpack,
                               setCurrentWeight,
                               setCurrentPrice,
                               setExchangeHistory,
                               setIsCompleted,
                               generateBinaryVector,
                               setBestFoundSolution,
                               setBestFoundPrice,
                               setBestFoundWeight
                           }) => {
    let backpackCurrent = [...currentBackpack];
    let notBackpackCurrent = [...currentNotBackpack];
    let totalWeight = currentWeight;
    let totalPrice = currentPrice;
    let isCompleted = false;
    let bestSwap = null;
    let bestPrice = totalPrice;
    let bestWeight = totalWeight;

    let exchangeHistoryTemp = [];
    let lastOriginalCheckedIndexI = null;
    let lastOriginalCheckedIndexJ = null;
    let admissible = false;
    let improving = false;

    while (!isCompleted) {
        backpackCurrent.sort((a, b) => a.originalIndex - b.originalIndex);
        notBackpackCurrent.sort((a, b) => a.originalIndex - b.originalIndex);

        bestSwap = null;
        bestPrice = totalPrice;
        bestWeight = totalWeight;

        for (let i = 0; i < backpackCurrent.length; i++) {
            for (let j = 0; j < notBackpackCurrent.length; j++) {
                const outItem = backpackCurrent[i];
                const inItem = notBackpackCurrent[j];

                if (!outItem || !inItem) continue;

                lastOriginalCheckedIndexI = outItem.originalIndex;
                lastOriginalCheckedIndexJ = inItem.originalIndex;
                admissible = totalWeight - outItem.weight + inItem.weight <= capacity;
                improving = totalPrice - outItem.price + inItem.price > totalPrice;

                const potentialWeight = totalWeight - outItem.weight + inItem.weight;
                const potentialPrice = totalPrice - outItem.price + inItem.price;

                if (potentialWeight <= capacity && potentialPrice > bestPrice) {
                    bestSwap = { outItem, inItem, indexI: i, indexJ: j };
                    bestPrice = potentialPrice;
                    bestWeight = potentialWeight;
                }
            }
        }

        if (!bestSwap) {
            isCompleted = true;
            break;
        }

        const { outItem, inItem, indexI, indexJ } = bestSwap;

        backpackCurrent[indexI] = inItem;
        notBackpackCurrent = notBackpackCurrent.filter(item => item !== inItem);
        notBackpackCurrent.push(outItem);

        totalWeight = bestWeight;
        totalPrice = bestPrice;

        const binaryVector = generateBinaryVector(backpackCurrent);

        exchangeHistoryTemp.push({
            removed: outItem,
            added: inItem,
            binaryVector,
            newWeight: totalWeight,
            newPrice: totalPrice,
            indexI: outItem.originalIndex,
            indexJ: inItem.originalIndex,
        });
    }

    setCurrentBackpack(backpackCurrent);
    setCurrentNotBackpack(notBackpackCurrent);
    setCurrentWeight(totalWeight);
    setCurrentPrice(totalPrice);
    setIsCompleted(isCompleted);
    setExchangeHistory(prevHistory => [...prevHistory, ...exchangeHistoryTemp]);
    setOriginalIndexI(lastOriginalCheckedIndexI);
    setOriginalIndexJ(lastOriginalCheckedIndexJ);
    setAdmissible(admissible);
    setImproving(improving);
    setBestFoundSolution(null);
    setBestFoundPrice(0);
    setBestFoundWeight(0);
};

export const runFirstFit = ({
                                capacity,
                                currentBackpack,
                                currentNotBackpack,
                                currentWeight,
                                currentPrice,
                                setOriginalIndexI,
                                setOriginalIndexJ,
                                setAdmissible,
                                setImproving,
                                setCurrentBackpack,
                                setCurrentNotBackpack,
                                setCurrentWeight,
                                setCurrentPrice,
                                setExchangeHistory,
                                setIsCompleted,
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
    let lastCheckedIndexI = null;
    let lastCheckedIndexJ = null;
    let admissible = false;
    let improving = false;
    let lastOriginalCheckedIndexI = null;
    let lastOriginalCheckedIndexJ = null;

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

        lastCheckedIndexI = indexI;
        lastCheckedIndexJ = indexJ;
        lastOriginalCheckedIndexI = backpackCurrent[indexI].originalIndex;
        lastOriginalCheckedIndexJ = notBackpackCurrent[indexJ].originalIndex;

        admissible = false;
        improving = false;

        if (potentialWeight <= capacity) {
            admissible = true;

            if (potentialPrice > totalPrice) {
                improving = true;

                backpackCurrent[indexI] = inItem;
                notBackpackCurrent = notBackpackCurrent.filter(item => item !== inItem);
                notBackpackCurrent.push(outItem);

                totalWeight = potentialWeight;
                totalPrice = potentialPrice;

                const binaryVector = generateBinaryVector(backpackCurrent);

                exchangeHistoryTemp.push({
                    removed: outItem,
                    added: inItem,
                    binaryVector,
                    newWeight: totalWeight,
                    newPrice: totalPrice,
                    indexI: backpackCurrent[indexI].originalIndex,
                    indexJ: notBackpackCurrent[indexJ].originalIndex,
                });

                indexI = 0;
                indexJ = 0;
                continue;
            }
        }

        if (indexJ + 1 < notBackpackCurrent.length) {
            indexJ++;
        } else if (indexI + 1 < backpackCurrent.length) {
            indexI++;
            indexJ = 0;
        } else {
            isCompleted = true;
        }
    }

    const binaryVector = generateBinaryVector(backpackCurrent);
    setCurrentBackpack(backpackCurrent);
    setCurrentNotBackpack(notBackpackCurrent);
    setCurrentWeight(totalWeight);
    setCurrentPrice(totalPrice);
    setIsCompleted(isCompleted);
    setExchangeHistory(prevHistory => [...prevHistory, ...exchangeHistoryTemp]);

    setOriginalIndexI(lastOriginalCheckedIndexI);
    setOriginalIndexJ(lastOriginalCheckedIndexJ);
    setAdmissible(admissible);
    setImproving(improving);
};
