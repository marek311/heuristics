import React from 'react';

function SolutionTabuSearch({
                                currentTour,
                                currentCost,
                                bestTour,
                                bestCost,
                                previousTour,
                                previousCost,
                                iteration,
                                status
                            }) {
    return (
        <div className="bg-white shadow-md rounded-lg p-4 w-full lg:w-1/3">
            <h2 className="text-lg font-semibold">Iteration</h2>
            <p>{iteration}</p>
            <h2 className="text-lg font-semibold">Status</h2>
            <p>{status}</p>
            <h2 className="text-lg font-semibold">Tabu Search Progress:</h2>
            <p><strong>Aktuálna trasa:</strong></p>
            <p>{currentTour.join("→")}</p>
            <p><strong>Cost:</strong> {currentCost}</p>
            <p><strong>Najlepšia trasa:</strong></p>
            <p>{bestTour.join("→")}</p>
            <p><strong>Cost:</strong> {bestCost}</p>
            <p><strong>Predošlá trasa:</strong></p>
            <p>{previousTour.join("→")}</p>
            <p><strong>Cost:</strong> {previousCost}</p>
        </div>
    );
}

export default SolutionTabuSearch;
