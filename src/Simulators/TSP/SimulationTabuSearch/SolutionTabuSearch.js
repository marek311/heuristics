import React from 'react';

function SolutionTabuSearch({
                                currentTour,
                                currentCost,
                                bestTour,
                                bestCost,
                                previousTour,
                                previousCost,
                                iteration,
                                neighborhood
                            }) {
    return (
        <div className="bg-white shadow-md rounded-lg p-4 w-full lg:w-1/3">
            <div className="p-4 bg-white shadow-lg rounded-lg">
                <h2 className="text-lg font-bold">Iteration</h2>
                <p>{iteration}</p>
            </div>
            <div className="mb-4 p-4 bg-gray-100 rounded-lg">
                <h2 className="text-lg font-bold">Tabu Search Progress:</h2>
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
            <div className="p-4 bg-white shadow-lg rounded-lg mt-4">
                <h2 className="text-lg font-bold">Neighborhood</h2>
                {neighborhood.map((neighbor, index) => (
                    <div key={index} className="border p-2 rounded my-2">
                        <p><strong>Tour:</strong> {neighbor.tour.join("→")}</p>
                        <p><strong>Cost:</strong> {neighbor.cost}</p>
                        <p><strong>Tabu:</strong> {neighbor.isTabu ? "Yes" : "No"}</p>
                        {neighbor.isChosen && <p className="text-green-800 font-bold">Chosen Solution</p>}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SolutionTabuSearch;
