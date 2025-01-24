import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Colors from '../../Main/Colors';

function TSPDataPage() {
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
            <h2 className="mx-4 mb-4 text-xl font-bold">TSP Data</h2>
            <div className="mb-4 w-full">
                <h3 className="mx-4"><strong>Number of Cities: </strong>{data.cityCount}</h3>
            </div>
            <div className="mb-4 w-full">
                <h3 className="mx-4"><strong>Edges:</strong></h3>
                {data.edges.length > 0 ? (
                    <ul className="space-y-1">
                        {data.edges.map((edge, index) => (
                            <li
                                key={index}
                                className={`flex justify-between items-center p-1 rounded ${Colors.itemBackground}`}>
                                <div>{edge.city1}</div>
                                <div>{edge.city2}</div>
                                <div>{edge.distance}</div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No edges to display.</p>
                )}
            </div>
            <div className="flex justify-between w-full mt-4">
                <button
                    className={`px-2 py-2 rounded ${Colors.buttonSecondary} ${Colors.buttonSecondaryHover}`}
                    onClick={handleBackClick}>
                    Back
                </button>
                <button
                    className={`px-2 py-2 rounded ${Colors.buttonPrimary} ${Colors.buttonPrimaryHover}`}
                    onClick={handleRunClick}>
                    Start
                </button>
            </div>
        </div>
    );
}

export default TSPDataPage;
