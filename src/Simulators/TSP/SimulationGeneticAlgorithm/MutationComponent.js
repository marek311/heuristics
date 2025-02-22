import React from "react";

const MutationComponent = ({ children, mutatedChildren }) => {
    if (!mutatedChildren || mutatedChildren.length === 0) return null;

    return (
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-3xl">
            <h2 className="text-xl font-semibold text-center">Mutated Children</h2>
            <div className="mt-4 p-4 border rounded-md">
                <h3 className="text-lg font-semibold">Before Mutation:</h3>
                {children.map((child, index) => (
                    <p key={index}><strong>Child {index + 1}:</strong> {JSON.stringify(child)}</p>
                ))}

                <h3 className="mt-4 text-lg font-semibold">After Mutation:</h3>
                {mutatedChildren.map((child, index) => (
                    <p key={index} className="text-green-600">
                        <strong>Mutated Child {index + 1}:</strong> {JSON.stringify(child)}
                    </p>
                ))}
            </div>
        </div>
    );
};

export default MutationComponent;
