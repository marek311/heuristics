import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../Components/Header';

function MainComponentGeneticAlgorithm() {
    const navigate = useNavigate();
    const location = useLocation();
    const { data } = location.state || {};

    const [population, setPopulation] = useState([]);

    const calculateDistance = (city1, city2) => {
        const edge = data.edges.find(edge =>
            (edge.city1 === city1 && edge.city2 === city2) ||
            (edge.city1 === city2 && edge.city2 === city1)
        );
        return edge ? edge.distance : Infinity;
    };

    const calculateFitness = (tour) => {
        let totalDistance = 0;
        for (let i = 0; i < tour.length - 1; i++) {
            totalDistance += calculateDistance(tour[i], tour[i + 1]);
        }
        return totalDistance === 0 ? 0 : 1000 / totalDistance;
    };

    const generateInitialPopulation = (size) => {
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

        return Array.from(uniqueTours).map(tour => ({
            tour: JSON.parse(tour),
            fitness: calculateFitness(JSON.parse(tour))
        }));
    };

    useEffect(() => {
        setPopulation(generateInitialPopulation(5));
    }, [data]);

    return (
        <div className="text-gray-800 p-6">
            <Header
                handleGoBack={()=>navigate(-1)}
                title="TSP Simulation Using Genetic Algorithm"
            />
            <div className="flex flex-col w-full h-full space-y-6 items-center">
                <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-3xl">
                    <h2 className="text-xl font-semibold text-center">Population</h2>
                    {population.map((entry, index) => (
                        <div key={index} className="flex items-center justify-between text-gray-700 py-2">
                            <span className="font-medium text-gray-900">{index + 1}.</span>
                            <div className="flex items-center space-x-2">
                                {entry.tour.map((city, i) => (
                                    <span key={i}>
                                        {city} {i !== entry.tour.length - 1 && <span className="text-gray-500">→</span>}
                                    </span>
                                ))}
                            </div>
                            <span className="font-medium">Distance: {entry.fitness}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default MainComponentGeneticAlgorithm;
