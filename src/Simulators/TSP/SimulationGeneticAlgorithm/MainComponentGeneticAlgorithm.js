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
            <div className="flex flex-col w-full h-full space-y-6 items-center">
                <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-3xl">
                    <h2 className="text-xl font-semibold text-center">Population</h2>
                    {population.map((tour, index) => (
                        <div key={index} className="flex items-center justify-center space-x-2 text-gray-700 py-2">
                            <span className="font-medium text-gray-900">{index + 1}.</span>
                            {tour.map((city, i) => (
                                <span key={i}>
                                    {city} {i !== tour.length - 1 && <span className="text-gray-500">→</span>}
                                </span>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default MainComponentGeneticAlgorithm;
