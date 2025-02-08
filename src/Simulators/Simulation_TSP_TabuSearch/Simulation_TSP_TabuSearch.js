import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SimulationHeader from '../Simulation_General/Simulation_Header';
import TSPDataGraph from '../../InputDisplay/TSP/TSP_DataGraph';

function SimulationTSPTabu() {
    const navigate = useNavigate();
    const location = useLocation();

    const { data } = location.state || {};

    const [currentTour, setCurrentTour] = useState([]);

    useEffect(() => {
        if (!data || !data.edges) return;

        const cities = Array.from(new Set(data.edges.flatMap((edge) => [edge.city1, edge.city2])));
        const startingCity = data.startingCity || cities[0];

        const otherCities = cities.filter((city) => city !== startingCity);
        const randomizedTour = [startingCity, ...otherCities.sort(() => Math.random() - 0.5), startingCity];

        setCurrentTour(randomizedTour);
    }, [data]);

    const handleStep = () => {
        //inicializacia - random poradie miest
        //iteracia
        //-najdi susedne riesenia - mnozinu
        //-vyber riesenie s najnizsou ucelovkou ktore nie je v tabu liste alebo je globalne najlepsie
        //vykonaj prechod
        //skontroluj ci nie je najlepsie najdene - ak ano prepis
        //pridaj prechod do tabu zoznamu
        //ukonci ak x iteraci nedoslo k zlepseniu reisenia

        //tabu zoznam ak bude susedne riesenie najdene swapom dvoch miest - zakazat swap tychto miest

        //Casti simulacie
        //-graf - hotovo
        //-tabu tabulka
        //-solution - popis co sa deje
    };

    const handleRunSimulation = () => {

    };

    const handleResetUI = () => {

    };

    return (
        <div className="text-gray-800 p-6">
            <SimulationHeader
                handleGoBack={() => navigate(-1)}
                title="TSP Simulation Using Tabu Search"
                handleStep={handleStep}
                handleRun={handleRunSimulation}
                handleReset={handleResetUI}
            />
            <div className="flex flex-col lg:flex-row w-full h-full lg:space-x-2">
                <TSPDataGraph
                    data={data}
                    tour={currentTour}
                />
                <TSPDataGraph
                    data={data}
                    tour={currentTour}
                />
                <TSPDataGraph
                    data={data}
                    tour={currentTour}
                />
            </div>
        </div>
    );
}

export default SimulationTSPTabu;