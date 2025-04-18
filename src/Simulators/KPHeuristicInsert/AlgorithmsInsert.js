export const performIteration = (
    items,
    currentIndex,
    currentWeight,
    currentPrice,
    selectedItems,
    itemStatus,
    binarySolution,
    capacity,
    setHighlightLinks
) => {
    if (currentIndex >= items.length) {
        return {
            currentIndex,
            currentWeight,
            currentPrice,
            selectedItems,
            itemStatus,
            binarySolution,
            completed: true
        };
    }

    const item = items[currentIndex];
    const newItemStatus = [...itemStatus];
    const newBinarySolution = [...binarySolution];
    const newSelectedItems = [...selectedItems];

    setHighlightLinks([]);
    let highlightedLinks = [];

    if (currentWeight + item.weight <= capacity) {
        newSelectedItems.push(item);
        currentWeight += item.weight;
        currentPrice += item.price;
        newItemStatus[currentIndex] = true;
        newBinarySolution[item.originalIndex] = 1;

        highlightedLinks = [
            { source: 'load', target: 'check' },
            { source: 'check', target: 'add' },
            { source: 'add', target: 'next' },
        ];
    } else {
        highlightedLinks = [
            { source: 'load', target: 'check' },
            { source: 'check', target: 'next' }
        ];
        newItemStatus[currentIndex] = false;
    }

    setHighlightLinks(highlightedLinks);

    return {
        currentIndex: currentIndex + 1,
        currentWeight: currentWeight,
        currentPrice: currentPrice,
        selectedItems: newSelectedItems,
        itemStatus: newItemStatus,
        binarySolution: newBinarySolution,
        completed: currentIndex + 1 >= items.length
    };
};

export const performRun = (
    items,
    currentIndex,
    currentWeight,
    currentPrice,
    selectedItems,
    itemStatus,
    binarySolution,
    capacity,
    setHighlightLinks
) => {

    let newCurrentWeight = currentWeight;
    let newCurrentPrice = currentPrice;
    const newSelectedItems = [...selectedItems];
    const newItemStatus = [...itemStatus];
    const newBinarySolution = [...binarySolution];
    let index = currentIndex;

    while (index < items.length) {
        const item = items[index];
        if (newCurrentWeight + item.weight <= capacity) {
            newSelectedItems.push(item);
            newCurrentWeight += item.weight;
            newCurrentPrice += item.price;
            newItemStatus[index] = true;
            newBinarySolution[item.originalIndex] = 1;
        } else {
            newItemStatus[index] = false;
        }
        index++;
    }

    setHighlightLinks([]);

    return {
        currentIndex: items.length,
        currentWeight: newCurrentWeight,
        currentPrice: newCurrentPrice,
        selectedItems: newSelectedItems,
        itemStatus: newItemStatus,
        binarySolution: newBinarySolution,
        completed: true
    };
};