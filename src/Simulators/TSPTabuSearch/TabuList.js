import React from 'react';
import Colors from "../../Main/Colors";

function TabuList({ tabuList, tabuTenure }) {
    return (
        <div className={`${Colors.cardBackground} shadow-md rounded-lg p-4 w-full lg:w-1/3`}>
            <h2 className="text-lg text-center font-semibold mb-3">Tabu List</h2>
            <div className="text-center">Tabu Tenure: {tabuTenure}</div>
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                <tr className="bg-gray-200">
                    <th className="border border-gray-300 p-2">Iteration</th>
                    <th className="border border-gray-300 p-2">Swap</th>
                    <th className="border border-gray-300 p-2">Expires</th>
                </tr>
                </thead>
                <tbody>
                {tabuList.length > 0 ? (
                    [...tabuList].reverse().map((entry, index) => (
                        <tr key={index} className="border border-gray-300">
                            <td className="border border-gray-300 p-2 text-center">{entry.iteration}</td>
                            <td className="border border-gray-300 p-2 text-center">{`${entry.swap[0]} - ${entry.swap[1]}`}</td>
                            <td className="border border-gray-300 p-2 text-center">{entry.expiryIteration}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="3" className="p-2 text-center text-gray-500">No tabu moves recorded</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
}

export default TabuList;