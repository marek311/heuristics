import { Routes, Route } from 'react-router-dom';
import Selector from './Selector';
import InputHandlerGeneral from '../InputHandling/InputHandlerGeneral';
import KnapsackPage from "../InputDisplay/KnapsackPage";
import TSP from '../InputDisplay/TSP';
import SimKnapsackInsert from '../Simulators/SimulationKnapsackInsert/SimKnapsackInsert'
import SimKnapsackExchange from '../Simulators/SimulationKnapsackExchange/SimKnapsackExchange'

function Application() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <Routes>
                <Route path="/" element={<Selector />} />
                <Route path="/handleInputs" element={<InputHandlerGeneral />} />

                <Route path="/knapsack-insert-simulation" element={<KnapsackPage />} />
                <Route path="/knapsack-exchange-first-simulation" element={<KnapsackPage />} />
                <Route path="/knapsack-exchange-best-simulation" element={<KnapsackPage />} />
                <Route path="/knapsack-genetic-simulation" element={<KnapsackPage />} />

                <Route path="knapsack-insert-simulation/simulate" element={<SimKnapsackInsert />} />
                <Route path="knapsack-exchange-first-simulation/simulate" element={<SimKnapsackExchange />} />
                <Route path="knapsack-exchange-best-simulation/simulate" element={<SimKnapsackExchange />} />

                <Route path="/tsp-simulated-annealing-simulation" element={<TSP/>} />
                <Route path="/tsp-tabu-search-simulation" element={<TSP />} />
            </Routes>
        </div>
    );
}

export default Application;