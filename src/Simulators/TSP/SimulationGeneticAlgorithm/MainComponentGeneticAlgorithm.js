import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../Components/Header';

function MainComponentGeneticAlgorithm() {
    const navigate = useNavigate();
    const location = useLocation();
    const { data } = location.state || {};

    const [population, setPopulation] = useState([]);

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

        return Array.from(uniqueTours).map(tour => JSON.parse(tour));
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

            <div className="flex flex-col w-full h-full space-y-6">
                <h2 className="text-xl font-semibold text-center">Population</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {population.map((tour, index) => (
                        <div key={index} className="border p-4 rounded-lg shadow bg-white">
                            <h3 className="text-center font-medium mb-2">Tour {index + 1}</h3>
                            <ul className="list-disc list-inside text-gray-700">
                                {tour.map((city, i) => (
                                    <li key={i}>
                                        {city}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default MainComponentGeneticAlgorithm;