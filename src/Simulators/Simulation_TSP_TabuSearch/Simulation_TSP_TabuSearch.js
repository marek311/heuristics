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
    const [currentCost, setCurrentCost] = useState(Infinity);
    const [previousTour, setPreviousTour] = useState([]);
    const [previousCost, setPreviousCost] = useState(Infinity);
    const [bestTour, setBestTour] = useState([]);
    const [bestCost, setBestCost] = useState(Infinity);
    const [tabuList, setTabuList] = useState([]);

    useEffect(() => {
        if (!data || !data.edges) return;

        const cities = Array.from(new Set(data.edges.flatMap((edge) => [edge.city1, edge.city2])));
        const startingCity = data.startingCity || cities[0];

        const otherCities = cities.filter((city) => city !== startingCity);
        const randomizedTour = [startingCity, ...otherCities.sort(() => Math.random() - 0.5), startingCity];

        setCurrentTour(randomizedTour);
        setCurrentCost(calculateTourCost(randomizedTour));
        setBestTour(randomizedTour);
        setBestCost(calculateTourCost(randomizedTour));
    }, [data]);

    const calculateTourCost = (tour) => {
        let cost = 0;
        for (let i = 0; i < tour.length - 1; i++) {
            const city1 = tour[i];
            const city2 = tour[i + 1];
            const edge = data.edges.find(e =>
                (e.city1 === city1 && e.city2 === city2) || (e.city1 === city2 && e.city2 === city1)
            );
            if (edge) {
                cost += edge.distance;
            }
        }
        return cost;
    };

    const handleStep = () => {
        if (currentTour.length < 4) return;

        const iteration = tabuList.length + 1;
        let bestNeighbor = null;
        let bestNeighborCost = Infinity;
        let bestSwap = null;

        for (let i = 1; i < currentTour.length - 2; i++) {
            for (let j = i + 1; j < currentTour.length - 1; j++) {
                const isTabu = tabuList.some(entry =>
                    (entry.swap[0] === i && entry.swap[1] === j) || (entry.swap[0] === j && entry.swap[1] === i));

                const newTour = [...currentTour];
                [newTour[i], newTour[j]] = [newTour[j], newTour[i]];
                const newCost = calculateTourCost(newTour);

                if (!isTabu || (isTabu && newCost < bestCost)) {
                    if (newCost < bestNeighborCost) {
                        bestNeighbor = newTour;
                        bestNeighborCost = newCost;
                        bestSwap = [i, j];
                    }
                }
            }
        }

        if (bestNeighbor) {
            setPreviousTour(currentTour);
            setPreviousCost(currentCost);

            setCurrentTour(bestNeighbor);
            setCurrentCost(bestNeighborCost);
            setTabuList([...tabuList, { iteration, swap: bestSwap }]);

            if (bestNeighborCost < bestCost) {
                setBestCost(bestNeighborCost);
                setBestTour(bestNeighbor);
            }
        }
    };

    const handleRunSimulation = () => {
        //POZNAMKY
        //Iteracia
        //-najdi susedne riesenia - mnozinu
        //-vyber riesenie z mnoziny s najnizsou ucelovkou
        //--ktore nie je v tabu liste alebo je globalne najlepsie
        //--ak prechod nie je zakazany alebo je najlepsie - vyber toto riesenie ako aktualne
        //--ak je prechod zakazany  a nie je najlepsi - vymaz z mnoziny susednych rieseni
        //-vykonaj vybrany prechod
        //-pridaj prechod do tabu zoznamu
        //-skontroluj ci nie je najlepsie najdene - ak ano prepis
        //ukonci ak x iteraci nedoslo k zlepseniu reisenia
    };

    const handleResetUI = () => {
        setCurrentTour([]);
        setPreviousTour([]);
        setBestTour([]);
        setCurrentCost(Infinity);
        setPreviousCost(Infinity);
        setBestCost(Infinity);
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

                <div className="mb-4 p-4 bg-gray-100 rounded-lg">
                    <div className="mb-4 p-4 bg-gray-100 rounded-lg">
                        <h2 className="text-lg font-bold">Tabu Search Progress:</h2>
                        <p><strong>Aktuálna trasa:</strong></p>
                        <p>{currentTour.join("→")}</p>
                        <p><strong>Cost:</strong> {currentCost}</p>
                        <p><strong>Predchádzajúca trasa:</strong></p>
                        <p> {previousTour.join("→")}</p>
                        <p><strong>Cost:</strong> {previousCost}</p>
                        <p><strong>Najlepšia trasa:</strong></p>
                        <p> {bestTour.join("→")}</p>
                        <p><strong>Cost:</strong> {bestCost}</p>
                    </div>
                    <p><strong>Tabu zoznam (last 5 steps):</strong></p>
                    <ul className="list-disc pl-5">
                        {tabuList.slice(-5).map((entry, index) => (
                            <li key={index}>Iterácia {entry.iteration}: swap {entry.swap.join(" ⇄ ")}</li>
                        ))}
                    </ul>
                </div>

                <TabuTable
                    tabuList={tabuList}
                />

            </div>
        </div>
    );
}

export default SimulationTSPTabu;