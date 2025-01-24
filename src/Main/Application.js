import { Routes, Route } from 'react-router-dom';
import Selector from './Selector';
import InputHandler_General from '../InputHandling/InputHandler_General';
import KP_DataPage from "../InputDisplay/KP/KP_DataPage";
import TSP_DataTable from '../InputDisplay/TSP/TSP_DataTable';
import SimKnapsackInsert from '../Simulators/Simulation_KP_Insert/Sim_KP_Insert'
import SimKnapsackExchange from '../Simulators/Simulation_KP_Exchange/Sim_KP_Exchange'
import Sim_TSP_SimulatedAnnealing from "../Simulators/Simulation_TSP_SimulatedAnnealing/Sim_TSP_SimulatedAnnealing";

function Application() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <Routes>
                <Route path="/" element={<Selector />} />
                <Route path="/handleInputs" element={<InputHandler_General />} />

                <Route path="/knapsack-insert-simulation" element={<KP_DataPage />} />
                <Route path="knapsack-insert-simulation/simulate" element={<SimKnapsackInsert />} />

                <Route path="/knapsack-exchange-first-simulation" element={<KP_DataPage />} />
                <Route path="knapsack-exchange-first-simulation/simulate" element={<SimKnapsackExchange />} />

                <Route path="/knapsack-exchange-best-simulation" element={<KP_DataPage />} />
                <Route path="knapsack-exchange-best-simulation/simulate" element={<SimKnapsackExchange />} />

                <Route path="/tsp-simulated-annealing-simulation" element={<TSP_DataTable />}/>
                <Route path="/tsp-simulated-annealing-simulation/simulate" element={<Sim_TSP_SimulatedAnnealing />} />

                <Route path="/tsp-genetic-simulation" element={<TSP_DataTable />}/>


                <Route path="/tsp-tabu-search-simulation" element={<TSP_DataTable />} />


            </Routes>
        </div>
    );
}

export default Application;