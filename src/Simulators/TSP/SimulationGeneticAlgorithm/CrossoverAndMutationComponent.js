import React from "react";

const CrossoverAndMutationComponent = ({children,mutatedChildren,step }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-3xl">
            <h2 className={`text-xl font-semibold text-center ${step === 1 ? 'bg-green-500 text-white' : ''}`}>
                Crossover
            </h2>
            <div className="mt-4 p-4 border rounded-md">
                {children.map((child, index) => (
                    <p key={index}><strong>Child {index + 1}:</strong> {JSON.stringify(child)}</p>
                ))}
            </div>
            <h2 className={`text-xl font-semibold text-center ${step === 2 ? 'bg-green-500 text-white' : ''}`}>
                Mutation
            </h2>
            <div className="mt-4 p-4 border rounded-md">
                {mutatedChildren.map((child, index) => (
                    <p key={index}>
                        <strong>Mutated Child {index + 1}:</strong> {JSON.stringify(child)}
                    </p>
                ))}
            </div>
        </div>

    );
};

export default CrossoverAndMutationComponent;
