export const generateInitialPopulation = (data, size) => {
    if (!data || !data.edges || !data.cityCount || !data.startingCity) return [];

    const startingCity = data.startingCity;
    const cities = Array.from(new Set(data.edges.flatMap(edge => [edge.city1, edge.city2])))
        .filter(city => city !== startingCity);

    const generateRandomTour = () => {
        const shuffled = [...cities].sort(() => Math.random() - 0.5);
        return [startingCity, ...shuffled, startingCity];
    };

    const uniqueTours = new Set();
    while (uniqueTours.size < size) {
        uniqueTours.add(JSON.stringify(generateRandomTour()));
    }

    return Array.from(uniqueTours).map(tour => JSON.parse(tour));
};

export const calculateFitness = (tour, data) => {
    if (!data || !data.edges) return 0;

    let totalDistance = 0;
    for (let i = 0; i < tour.length - 1; i++) {
        const city1 = tour[i];
        const city2 = tour[i + 1];

        const edge = data.edges.find(e =>
            (e.city1 === city1 && e.city2 === city2) || (e.city1 === city2 && e.city2 === city1)
        );

        if (edge) {
            totalDistance += edge.distance;
        }
    }

    return totalDistance === 0 ? 0 : 1000 / totalDistance;
};
