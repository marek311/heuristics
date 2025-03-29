import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Colors from '../../Main/Colors';

function TSPDataTable() {
    const location = useLocation();
    const navigate = useNavigate();
    const { data } = location.state || {};

    if (!data) {
        return <div>No TSP data available.</div>;
    }

    const handleBackClick = () => {
        navigate(-1);
    };

    const handleRunClick = () => {
        navigate('simulate', { state: { data } });
    };

    return (
        <div className={`mb-4 flex flex-col items-center justify-center w-fit h-fit p-6 ${Colors.cardBackground} rounded-lg mx-auto my-10`}>
            <div className="mb-4 w-full">
                <h3 className="mx-4"><strong>Number of Cities: </strong>{data.cityCount}</h3>
            </div>
            <div className="mb-4 w-full">
                {data.edges.length > 0 ? (
                    <table className="w-full table-auto border-collapse border">
                        <thead className={` ${Colors.lightBackground} `}>
                        <tr>
                            <th className="p-2 border">City 1</th>
                            <th className="p-2 border">City 2</th>
                            <th className="p-2 border">Distance</th>
                        </tr>
                        </thead>
                        <tbody>
                        {data.edges.map((edge, index) => (
                            <tr key={index} className="text-center">
                                <td className="p-2 border">{edge.city1}</td>
                                <td className="p-2 border">{edge.city2}</td>
                                <td className="p-2 border">{edge.distance}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No edges to display.</p>
                )}
            </div>
            <div className="flex justify-between w-full mt-4">
                <button
                    className={`px-4 py-4 rounded ${Colors.buttonSecondary} ${Colors.buttonSecondaryHover}`}
                    onClick={handleBackClick}>
                    Back
                </button>
                <button
                    className={`px-4 py-4 rounded ${Colors.buttonPrimary} ${Colors.buttonPrimaryHover}`}
                    onClick={handleRunClick}>
                    Start
                </button>
            </div>
        </div>
    );
}

export default TSPDataTable;
