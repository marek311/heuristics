function DefaultData_TSP() {
    return {
        cityCount: 7,
        edges: [
            { city1: "A", city2: "B", distance: Math.round(Math.random() * 50 + 10) },
            { city1: "A", city2: "C", distance: Math.round(Math.random() * 80 + 20) },
            { city1: "A", city2: "D", distance: Math.round(Math.random() * 100 + 30) },
            { city1: "B", city2: "C", distance: Math.round(Math.random() * 70 + 15) },
            { city1: "B", city2: "D", distance: Math.round(Math.random() * 60 + 25) },
            { city1: "C", city2: "E", distance: Math.round(Math.random() * 50 + 10) },
            { city1: "D", city2: "F", distance: Math.round(Math.random() * 100 + 50) },
            { city1: "E", city2: "F", distance: Math.round(Math.random() * 120 + 10) },
            { city1: "A", city2: "F", distance: Math.round(Math.random() * 80 + 40) },
            { city1: "A", city2: "G", distance: Math.round(Math.random() * 60 + 15) },
            { city1: "B", city2: "G", distance: Math.round(Math.random() * 50 + 25) },
            { city1: "C", city2: "G", distance: Math.round(Math.random() * 75 + 20) },
            { city1: "D", city2: "G", distance: Math.round(Math.random() * 110 + 30) },
            { city1: "E", city2: "G", distance: Math.round(Math.random() * 40 + 15) },
            { city1: "F", city2: "G", distance: Math.round(Math.random() * 90 + 30) },
        ]
    };
}

export default DefaultData_TSP;
