import React from 'react';

function Solution({ currentTour, currentCost, bestTour, bestCost, iteration }) {
    return (
        <div className="bg-white shadow-md rounded-lg p-4 w-full lg:w-1/3">
            <div className="mb-4 p-4 bg-gray-100 rounded-lg">
                <h2 className="text-lg font-bold">Tabu Search Progress:</h2>
                <p><strong>Aktuálna trasa:</strong></p>
                <p>{currentTour.join("→")}</p>
                <p><strong>Cost:</strong> {currentCost}</p>
                <p><strong>Najlepšia trasa:</strong></p>
                <p>{bestTour.join("→")}</p>
                <p><strong>Cost:</strong> {bestCost}</p>
            </div>
            <div className="p-4 bg-white shadow-lg rounded-lg">
                <h2 className="text-lg font-bold">Iteration</h2>
                <p>{iteration}</p>
            </div>
        </div>
    );
}

export default Solution;
