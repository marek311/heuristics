import React from 'react';

function PopulationComponent({ population, fitnessValues }) {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-3xl">
            <h2 className="text-xl font-semibold text-center">Initial Population</h2>
            {population.map((tour, index) => (
                <div
                    key={index}
                    className="flex items-center justify-center space-x-2 text-gray-700 py-2 whitespace-nowrap overflow-x-auto">
                    <span className="font-medium text-gray-900">{index + 1}.</span>
                    {tour.map((city, i) => (
                        <span key={i} className="whitespace-nowrap">
                            {city} {i !== tour.length - 1 && <span className="text-gray-500">→</span>}
                        </span>
                    ))}
                    <span className="ml-4 text-sm text-gray-600">
                        (Fitness: {fitnessValues[index]?.toFixed(4)})
                    </span>
                </div>
            ))}
        </div>
    );
}

export default PopulationComponent;
