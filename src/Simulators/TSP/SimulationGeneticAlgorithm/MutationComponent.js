import React from "react";

const MutationComponent = ({mutatedChildren }) => {
    if (!mutatedChildren || mutatedChildren.length === 0) return null;

    return (
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-3xl">
            <h2 className="text-xl font-semibold text-center">Mutation</h2>
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

export default MutationComponent;
