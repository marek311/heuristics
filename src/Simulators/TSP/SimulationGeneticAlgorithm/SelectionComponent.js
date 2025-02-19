import React from 'react';

function RouletteSelectionTable({ population, fitnessValues, probabilities, cumulativeProbabilities, selectedPopulation }) {
    return (
        <table className="w-full text-gray-700 text-center border-collapse border border-gray-300">
            <thead className="bg-gray-100">
            <tr>
                <th className="border border-gray-300 px-4 py-2">Tour</th>
                <th className="border border-gray-300 px-4 py-2">Fitness</th>
                <th className="border border-gray-300 px-4 py-2">Probability</th>
                <th className="border border-gray-300 px-4 py-2">Cumulative</th>
            </tr>
            </thead>
            <tbody>
            {probabilities.map((prob, index) => {
                const isSelected = selectedPopulation.some(
                    (selectedTour) =>
                        JSON.stringify(selectedTour) === JSON.stringify(population[index])
                );
                return (
                    <tr
                        key={index}
                        className={`border border-gray-300 ${isSelected ? 'bg-green-200 text-green-800 font-bold' : ''}`}>
                        <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                        <td className="border border-gray-300 px-4 py-2">{fitnessValues[index]?.toFixed(4)}</td>
                        <td className="border border-gray-300 px-4 py-2">{prob.toFixed(4)}</td>
                        <td className="border border-gray-300 px-4 py-2">{cumulativeProbabilities[index]?.toFixed(4)}</td>
                    </tr>
                );
            })}
            </tbody>
        </table>
    );
}

export default RouletteSelectionTable;
