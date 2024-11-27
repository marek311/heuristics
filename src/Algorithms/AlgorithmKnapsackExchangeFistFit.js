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

    return { newBackpack, totalWeight, totalPrice, binaryVector};
};

export const performIteration = (
    currentBackpack,
    currentNotBackpack,
    currentWeight,
    currentPrice,
    capacity,
    generateBinaryVector
) => {
    let updatedBackpack = [...currentBackpack];
    let updatedNotBackpack = [...currentNotBackpack];
    let updatedWeight = currentWeight;
    let updatedPrice = currentPrice;
    let exchange = null;

    for (let i = 0; i < updatedBackpack.length; i++) {
        const backpackItem = updatedBackpack[i];

        for (const candidate of updatedNotBackpack) {
            const potentialWeight = updatedWeight - backpackItem.weight + candidate.weight;
            const potentialPrice = updatedPrice - backpackItem.price + candidate.price;

            if (potentialWeight <= capacity && potentialPrice > updatedPrice) {
                updatedBackpack[i] = candidate;

                updatedNotBackpack = updatedNotBackpack.filter(item => item !== candidate);
                updatedNotBackpack.push(backpackItem);

                updatedWeight = potentialWeight;
                updatedPrice = potentialPrice;

                const binaryVector = generateBinaryVector(updatedBackpack);

                exchange = {
                    removed: backpackItem,
                    added: candidate,
                    binaryVector,
                    newWeight: updatedWeight,
                    newPrice: updatedPrice,
                };

                return {
                    updatedBackpack,
                    updatedNotBackpack,
                    updatedWeight,
                    updatedPrice,
                    exchange,
                };
            }
        }
    }

    return { updatedBackpack, updatedNotBackpack, updatedWeight, updatedPrice, exchange };
};

export const performRun = (
    currentBackpack,
    currentNotBackpack,
    currentWeight,
    currentPrice,
    capacity,
    generateBinaryVector
) => {
    let updatedBackpack = [...currentBackpack];
    let updatedNotBackpack = [...currentNotBackpack];
    let updatedWeight = currentWeight;
    let updatedPrice = currentPrice;
    const exchangeHistory = [];

    let foundBetter = true;

    while (foundBetter) {
        foundBetter = false;

        for (let i = 0; i < updatedBackpack.length; i++) {
            const backpackItem = updatedBackpack[i];

            for (const candidate of updatedNotBackpack) {
                const potentialWeight = updatedWeight - backpackItem.weight + candidate.weight;
                const potentialPrice = updatedPrice - backpackItem.price + candidate.price;

                if (potentialWeight <= capacity && potentialPrice > updatedPrice) {

                    updatedBackpack[i] = candidate;

                    updatedNotBackpack = updatedNotBackpack.filter(item => item !== candidate);
                    updatedNotBackpack.push(backpackItem);

                    updatedWeight = potentialWeight;
                    updatedPrice = potentialPrice;

                    const binaryVector = generateBinaryVector(updatedBackpack);

                    exchangeHistory.push({
                        removed: backpackItem,
                        added: candidate,
                        binaryVector,
                        newWeight: updatedWeight,
                        newPrice: updatedPrice,
                    });

                    foundBetter = true;
                    break;
                }
            }
            if (foundBetter) break;
        }
    }

    return { updatedBackpack, updatedNotBackpack, updatedWeight, updatedPrice, exchangeHistory };
};