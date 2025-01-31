import React from 'react';

function SolTSPSimAnnealing({
                                bestTour,
                                iteration,
                                currentTour,
                                costDifference,
                                proposedTour,
                                solutionStatus,
                                swappedIndexes,
                                previousTour,
                            }) {
    return (
        <div className="p-4 bg-white rounded-lg shadow-md w-full">
            <div className="text-center text-lg pb-4">
                <h2 className="text-lg font-semibold text-gray-800">Iteration: {iteration}</h2>
            </div>
            <div className="bg-blue-100 p-2 rounded-lg mb-4">
                <div className="bg-blue-200 rounded-lg mb-2">
                    <h2 className="text-lg font-semibold text-blue-600">Proposed Solution</h2>
                </div>
                <ul className="space-y-2 text-gray-800">
                    <li><p>{proposedTour.join(', ')}</p></li>
                </ul>
                <div>
                    Swapped Indexes: {swappedIndexes.join('⟷')}
                </div>
                <div>
                    Cost Difference: {costDifference}<br/>
                </div>
            </div>
            <div className="bg-red-100 p-2 rounded-lg mb-4">
                <div className="bg-red-200 rounded-lg mb-2">
                    <h2 className="text-lg font-semibold text-red-600">Current Solution</h2>
                </div>
                <ul className="space-y-2 text-gray-800">
                    <li>
                        <p>{currentTour.join(', ')}</p>
                    </li>
                </ul>
            </div>
            <div className="bg-yellow-100 p-2 rounded-lg mb-4">
                <div className="bg-yellow-200 rounded-lg mb-2">
                    <h2 className="text-lg font-semibold text-red-600">Previous Solution</h2>
                </div>
                <ul className="space-y-2 text-gray-800">
                    <ul className="space-y-2 text-gray-800">
                        <li>{previousTour.join(', ')}</li>
                    </ul>
                </ul>
            </div>
            <div className="bg-green-100 p-2 rounded-lg mb-4">
                <div className="bg-green-200 rounded-lg mb-2">
                    <h2 className="text-lg font-semibold text-green-600">Best Found Solution</h2>
                </div>
                <ul className="space-y-2 text-gray-800">
                    <li>
                        <p> {bestTour.join(', ')} </p>
                    </li>
                </ul>
            </div>
            <div className="bg-gray-100 p-2 rounded-lg mb-4">
                <div className="text-center pb-4">
                    Status: {solutionStatus}
                </div>
            </div>
        </div>
    );
}

export default SolTSPSimAnnealing;