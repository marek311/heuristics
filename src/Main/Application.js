import { Routes, Route } from 'react-router-dom';
import Selector from './Selector';
import InputHandlerGeneral from '../InputHandling/InputHandlerGeneral';
import KPDataPage from "../InputDisplay/KP/KPDataPage";
import TSPDataTable from '../InputDisplay/TSP/TSPDataTable';
import SimKnapsackInsert from '../Simulators/KP/SimulationInsert/MainComponentInsert'
import SimKnapsackExchange from '../Simulators/KP/SimulationExchange/MainComponentExchange'
import SimTSPSimulatedAnnealing from "../Simulators/TSP/SimulationSimulatedAnnealing/MainComponentSimulatedAnnealing";
import SimTSPTabuSearch from "../Simulators/TSP/SimulationTabuSearch/MainComponentTabuSearch";
import SimTSPGeneticAlgorithm from "../Simulators/TSP/SimulationGeneticAlgorithm/MainComponentGeneticAlgorithm"

function Application() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <Routes>
                <Route path="/" element={<Selector />} />
                <Route path="/handleInputs" element={<InputHandlerGeneral />} />

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