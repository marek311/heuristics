import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SimulationHeader from '../Simulation_General/Simulation_Header';
import TSPDataGraph from '../../InputDisplay/TSP/TSP_DataGraph';
import TabuTable from './TabuTable';

function SimulationTSPTabu() {
    const navigate = useNavigate();
    const location = useLocation();

    const { data } = location.state || {};

    const [currentTour, setCurrentTour] = useState([]);
    const [tabuList, setTabuList] = useState([]);

    useEffect(() => {
        if (!data || !data.edges) return;

        const cities = Array.from(new Set(data.edges.flatMap((edge) => [edge.city1, edge.city2])));
        const startingCity = data.startingCity || cities[0];

        const otherCities = cities.filter((city) => city !== startingCity);
        const randomizedTour = [startingCity, ...otherCities.sort(() => Math.random() - 0.5), startingCity];

        setCurrentTour(randomizedTour);
    }, [data]);

    const handleStep = () => {

        const iteration = tabuList.length + 1;
        const index1 = Math.floor(Math.random() * (currentTour.length - 2)) + 1;
        let index2;
        do {
            index2 = Math.floor(Math.random() * (currentTour.length - 2)) + 1;
        } while (index1 === index2);

        const newTour = [...currentTour];
        [newTour[index1], newTour[index2]] = [newTour[index2], newTour[index1]];

        setCurrentTour(newTour);
        setTabuList([...tabuList, { iteration, swap: [index1, index2] }]);

        //inicializacia - random poradie miest
        //iteracia
        //-najdi susedne riesenia - mnozinu
        //-vyber riesenie s najnizsou ucelovkou ktore nie je v tabu liste alebo je globalne najlepsie
        //--ak prechod nie je zakazany - vyber toto riesenie ako aktualne
        //--ak je prechod zakazany - vymaz z mnoziny
        //vykonaj vybrany prechod
        //pridaj prechod do tabu zoznamu
        //skontroluj ci nie je najlepsie najdene - ak ano prepis
        //ukonci ak x iteraci nedoslo k zlepseniu reisenia

        //tabu zoznam ak bude susedne riesenie najdene swapom dvoch miest - zakazat swap tychto miest

        //Casti simulacie
        //-graf - hotovo
        //-tabu tabulka
        //-flowchart
        //-solution - popis co sa deje
    };

    const handleRunSimulation = () => {

    };

    const handleResetUI = () => {
        setTabuList([]);
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
                <TabuTable
                    tabuList={tabuList}
                />
            </div>
        </div>
    );
}

export default SimulationTSPTabu;