import React from "react";

const CrossoverComponent = ({ selectedPopulation, child }) => {
    if (!child || selectedPopulation.length < 2) return null;

    const midpoint = Math.floor((selectedPopulation[0].length - 1) / 2);

    return (
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-3xl">
            <h2 className="text-xl font-semibold text-center">Crossover</h2>
            <div className="mt-4 p-4 border rounded-md">
                <p><strong>Parent 1:</strong> {JSON.stringify(selectedPopulation[0])}</p>
                <p><strong>Parent 2:</strong> {JSON.stringify(selectedPopulation[1])}</p>
                <p><strong>Midpoint:</strong> {midpoint}</p>
                <p><strong>Child:</strong> {JSON.stringify(child)}</p>
            </div>
        </div>
    );
};

export default CrossoverComponent;
