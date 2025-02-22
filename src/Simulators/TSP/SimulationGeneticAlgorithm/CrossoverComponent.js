import React from "react";

const CrossoverComponent = ({ selectedPopulation, children }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-3xl">
            <h2 className="text-xl font-semibold text-center">Crossover</h2>
            <div className="mt-4 p-4 border rounded-md">
                <p><strong>Selected Parents:</strong></p>
                <p><strong>Parent 1:</strong> {JSON.stringify(selectedPopulation[0])}</p>
                <p><strong>Parent 2:</strong> {JSON.stringify(selectedPopulation[1])}</p>
                <p><strong>Parent 3:</strong> {JSON.stringify(selectedPopulation[2])}</p>
                <h3 className="mt-4 text-lg font-semibold">Generated Children:</h3>
                {children.map((child, index) => (
                    <p key={index}><strong>Child {index + 1}:</strong> {JSON.stringify(child)}</p>
                ))}
            </div>
        </div>
    );
};

export default CrossoverComponent;
