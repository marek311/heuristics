import React from 'react';

function SolTSPSimAnnealing({
                                bestCost,
                                bestTour,
                                currentCost,
                                iteration,
                                currentTour,
                                costDifference,
                                acceptanceProbability,
                                randomValue,
                                proposedTour,
                                proposedCost,
                            }) {
    return (
        <div className="p-4 bg-white rounded-lg shadow-md w-full">
            <div className="text-center text-lg">
                Iteration: {iteration}
            </div>
            <div className="bg-red-100 p-2 rounded-lg mb-2">
                <h2 className="text-lg font-semibold text-red-600">Current Solution</h2>
                <ul className="space-y-2 text-gray-800">
                    <li><strong>Current Cost:</strong> {currentCost}</li>
                    <li>
                        <strong>Current Tour:</strong>
                        <p>{currentTour.join(', ')}</p>
                    </li>
                </ul>
            </div>
            <div className="bg-blue-100 p-2 rounded-lg mb-2">
                <ul className="space-y-2 text-gray-800">
                    <h2 className="text-lg font-semibold text-blue-600">Proposed Solution</h2>
                    <ul className="space-y-2 text-gray-800">
                        <li><strong>Proposed Cost:</strong> {proposedCost}</li>
                        <li>
                            <strong>Proposed Tour:</strong>
                            <p>{proposedTour.join(', ')}</p>
                        </li>
                    </ul>
                    <li><strong>Cost Difference:</strong> {costDifference}</li>
                    <li><strong>Acceptance Probability:</strong> {acceptanceProbability.toFixed(4)}</li>
                    <li><strong>Random Value:</strong> {randomValue.toFixed(4)}</li>
                </ul>
            </div>
            <div className="bg-green-100 p-2 rounded-lg mb-2">
                <h2 className="text-lg font-semibold text-green-600">Best Found Solution</h2>
                <ul className="space-y-2 text-gray-800">
                    <li><strong>Best Cost:</strong> {bestCost}</li>
                    <li>
                        <strong>Best Tour:</strong>
                        <p> {bestTour.join(', ')} </p>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default SolTSPSimAnnealing;