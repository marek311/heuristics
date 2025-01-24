function TSPDefaultData() {
    return {
        cityCount: 4,
        edges: [
            { city1: "A", city2: "B", distance: 10 },
            { city1: "A", city2: "C", distance: 15 },
            { city1: "A", city2: "D", distance: 20 },
            { city1: "B", city2: "C", distance: 25 },
            { city1: "B", city2: "D", distance: 30 },
            { city1: "C", city2: "D", distance: 35 },
        ],
    };
}

export default TSPDefaultData;