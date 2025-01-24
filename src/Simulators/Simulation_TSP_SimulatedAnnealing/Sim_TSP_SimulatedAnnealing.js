import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Simulation_Header from '../Simulation_General/Simulation_Header';
import TSPDataGraph from "../../InputDisplay/TSP/TSP_DataGraph";

function SimulationTSPAnnealing() {
    const navigate = useNavigate();
    const location = useLocation();

    const { data } = location.state || {};

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div className="text-gray-800 p-6">
            <Simulation_Header
                handleGoBack={handleGoBack}
                title="TSP Simulation Using Simulated Annealing"
            />
            <div className="flex flex-col lg:flex-row w-full h-full">
                <TSPDataGraph data={data} />
                <TSPDataGraph data={data} />
            </div>
        </div>
    );
}

export default SimulationTSPAnnealing;
