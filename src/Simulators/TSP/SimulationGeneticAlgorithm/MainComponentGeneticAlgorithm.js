import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../Components/Header';

function MainComponentTabuSearch() {
    const navigate = useNavigate();
    const location = useLocation();
    const { data } = location.state || {};


    useEffect(() => {

    }, [data]);

    return (
        <div className="text-gray-800 p-6">
            <Header
                handleGoBack={() => navigate(-1)}
                title="TSP Simulation Using Genetic Algorithm"
            />
            <div className="flex flex-col lg:flex-row w-full h-full lg:space-x-2">
                <h2>
                    HELLO GENETIC ALGORITHM
                </h2>
            </div>
        </div>
    );
}

export default MainComponentTabuSearch;