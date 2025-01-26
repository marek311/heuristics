export const initializeTour = (data) => {
    const cities = Array.from(new Set(data.edges.flatMap((edge) => [edge.city1, edge.city2])));
    let randomTour = [...cities].sort(() => Math.random() - 0.5);
    randomTour.push(randomTour[0]); // Make it a closed tour

    let totalCost = calculateCost(randomTour, data.edges);
    return { randomTour, totalCost };
};

export const calculateCost = (tour, edges) => {
    let totalCost = 0;
    for (let i = 0; i < tour.length - 1; i++) {
        const edge = edges.find(
            (e) =>
                (e.city1 === tour[i] && e.city2 === tour[i + 1]) ||
                (e.city1 === tour[i + 1] && e.city2 === tour[i])
        );
        if (edge) totalCost += edge.distance;
    }
    return totalCost;
};