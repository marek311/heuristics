import React from 'react';

function SolTSPSimAnnealing({
                                bestCost,
                                bestTour,
                                currentCost,
                                iteration,
                                currentTour,
                                costDifference,
                                proposedTour,
                                proposedCost,
                                solutionStatus
                            }) {
    return (
        <div className="p-4 bg-white rounded-lg shadow-md w-full">
            <div className="text-center text-lg">
                Iteration: {iteration}
            </div>
            <div className="bg-blue-100 p-2 rounded-lg mb-2">
                <div className="bg-blue-200 rounded-lg mb-2">
                    <h2 className="text-lg font-semibold text-blue-600">Proposed Solution</h2>
                </div>
                <ul className="space-y-2 text-gray-800">
                    <li><p>{proposedTour.join(', ')}</p></li>
                    <li><strong>Cost:</strong> {proposedCost}</li>
                    <li><strong>Cost Difference:</strong> {costDifference}</li>
                    <li><strong>Status:</strong></li>
                    <li>{solutionStatus}</li>
                </ul>
            </div>
            <div className="bg-red-100 p-2 rounded-lg mb-2">
                <div className="bg-red-200 rounded-lg mb-2">
                    <h2 className="text-lg font-semibold text-red-600">Current Solution</h2>
                </div>
                <ul className="space-y-2 text-gray-800">
                    <li>
                        <p>{currentTour.join(', ')}</p>
                    </li>
                    <li><strong>Cost:</strong> {currentCost}</li>
                </ul>
            </div>
            <div className="bg-green-100 p-2 rounded-lg mb-2">
                <div className="bg-green-200 rounded-lg mb-2">
                    <h2 className="text-lg font-semibold text-green-600">Best Found Solution</h2>
                </div>
                <ul className="space-y-2 text-gray-800">
                    <li>
                        <p> {bestTour.join(', ')} </p>
                    </li>
                    <li><strong>Cost:</strong> {bestCost}</li>
                </ul>
            </div>
        </div>
    );
}

export default SolTSPSimAnnealing;