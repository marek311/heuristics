import { Routes, Route } from 'react-router-dom';
import Selector from './Selector';
import InputHandlerGeneral from '../InputHandling/InputHandlerGeneral';
import KnapsackDataPage from "../InputDisplay/KnapsackDataPage";
import TSPDataPage from '../InputDisplay/TSPDataPage';
import SimKnapsackInsert from '../Simulators/SimulationKnapsackInsert/SimKnapsackInsert'
import SimKnapsackExchange from '../Simulators/SimulationKnapsackExchange/SimKnapsackExchange'

function Application() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <Routes>
                <Route path="/" element={<Selector />} />
                <Route path="/handleInputs" element={<InputHandlerGeneral />} />

                <Route path="/knapsack-insert-simulation" element={<KnapsackDataPage />} />
                <Route path="knapsack-insert-simulation/simulate" element={<SimKnapsackInsert />} />

                <Route path="/knapsack-exchange-first-simulation" element={<KnapsackDataPage />} />
                <Route path="knapsack-exchange-first-simulation/simulate" element={<SimKnapsackExchange />} />

                <Route path="/knapsack-exchange-best-simulation" element={<KnapsackDataPage />} />
                <Route path="knapsack-exchange-best-simulation/simulate" element={<SimKnapsackExchange />} />

                <Route path="/tsp-simulated-annealing-simulation" element={<TSPDataPage />}/>


                <Route path="/tsp-genetic-simulation" element={<TSPDataPage />}/>


                <Route path="/tsp-tabu-search-simulation" element={<TSPDataPage />} />


            </Routes>
        </div>
    );
}

export default Application;