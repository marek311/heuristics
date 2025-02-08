import React from 'react';

function TabuTable({ tabuList }) {
    return (
        <div className="bg-white shadow-md rounded-lg p-4 w-full lg:w-1/3">
            <h2 className="text-lg font-semibold mb-3">Tabu List</h2>
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                <tr className="bg-gray-200">
                    <th className="border border-gray-300 p-2">Iteration</th>
                    <th className="border border-gray-300 p-2">Swap (Index 1 - Index 2)</th>
                </tr>
                </thead>
                <tbody>
                {tabuList.length > 0 ? (
                    tabuList.map((entry, index) => (
                        <tr key={index} className="border border-gray-300">
                            <td className="border border-gray-300 p-2 text-center">{entry.iteration}</td>
                            <td className="border border-gray-300 p-2 text-center">{`${entry.swap[0]} - ${entry.swap[1]}`}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="2" className="p-2 text-center text-gray-500">No tabu moves recorded</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
}

export default TabuTable;
