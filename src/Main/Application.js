import { Routes, Route } from 'react-router-dom';
import Selector from './Selector';
import GeneralInputHandler from '../InputHandling/InputReading/GeneralInputHandler';
import KPDataPage from "../InputHandling/InputDisplay/KPDataPage";
import TSPDataTable from '../InputHandling/InputDisplay/TSPDataTable';
import SimKnapsackInsert from '../Simulators/KPHeuristicInsert/MainComponentInsert'
import SimKnapsackExchange from '../Simulators/KPHeuristicExchange/MainComponentExchange'
import SimTSPSimulatedAnnealing from "../Simulators/TSPSimulatedAnnealing/MainComponentSimulatedAnnealing";
import SimTSPTabuSearch from "../Simulators/TSPTabuSearch/MainComponentTabuSearch";
import SimTSPGeneticAlgorithm from "../Simulators/TSPGeneticAlgorithm/MainComponentGeneticAlgorithm"
import Colors from "./Colors";

function Application() {
    return (
        <div className={`flex items-center justify-center min-h-screen ${Colors.background}`}>
            <Routes>
                <Route path="/" element={<Selector />} />
                <Route path="/handleInputs" element={<GeneralInputHandler />} />

                <Route path="/knapsack-insert-simulation" element={<KPDataPage />} />
                <Route path="knapsack-insert-simulation/simulate" element={<SimKnapsackInsert />} />

                <Route path="/knapsack-exchange-first-simulation" element={<KPDataPage />} />
                <Route path="knapsack-exchange-first-simulation/simulate" element={<SimKnapsackExchange />} />

                <Route path="/knapsack-exchange-best-simulation" element={<KPDataPage />} />
                <Route path="knapsack-exchange-best-simulation/simulate" element={<SimKnapsackExchange />} />

                <Route path="/tsp-simulated-annealing-simulation" element={<TSPDataTable />}/>
                <Route path="/tsp-simulated-annealing-simulation/simulate" element={<SimTSPSimulatedAnnealing />} />

                <Route path="/tsp-tabu-search-simulation" element={<TSPDataTable />} />
                <Route path="/tsp-tabu-search-simulation/simulate" element={<SimTSPTabuSearch />} />

                <Route path="/tsp-genetic-simulation" element={<TSPDataTable />}/>
                <Route path="/tsp-genetic-simulation/simulate" element={<SimTSPGeneticAlgorithm />} />
            </Routes>
        </div>
    );
}

export default Application;