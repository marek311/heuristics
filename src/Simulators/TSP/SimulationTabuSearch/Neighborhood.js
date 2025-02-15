import React from 'react';

function SolutionTabuSearch({ neighborhood}) {
    return (
        <div className="bg-white shadow-md rounded-lg p-4 w-full lg:w-1/3">
            <h2 className="text-lg font-semibold">Neighborhood</h2>
            {neighborhood.map((neighbor, index) => (
                <div key={index} className="border p-2 rounded my-2">
                    <p><strong>Tour:</strong> {neighbor.tour.join("→")}</p>
                    <p><strong>Cost:</strong> {neighbor.cost}</p>
                    <p><strong>I:</strong> {neighbor.indexI}</p>
                    <p><strong>J:</strong> {neighbor.indexJ}</p>
                    <p><strong>Tabu:</strong> {neighbor.isTabu ? "Yes" : "No"}</p>
                    {neighbor.isChosen && <p className="text-green-800 font-semibold">Chosen Solution</p>}
                </div>
            ))}
        </div>
    );
}

export default SolutionTabuSearch;
