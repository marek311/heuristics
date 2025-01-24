import { Routes, Route } from 'react-router-dom';
import Selector from './Selector';
import InputHandlerGeneral from '../InputHandling/InputHandlerGeneral';
import KnapsackDataPage from "../InputDisplay/KnapsackProblem/KnapsackDataPage";
import TSPDataTable from '../InputDisplay/TSP/TSPDataTable';
import SimKnapsackInsert from '../Simulators/SimulationKnapsackInsert/SimKnapsackInsert'
import SimKnapsackExchange from '../Simulators/SimulationKnapsackExchange/SimKnapsackExchange'
import TempGraph from "../InputDisplay/TSP/TSPDataGraph";

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

                <Route path="/tsp-simulated-annealing-simulation" element={<TSPDataTable />}/>
                <Route path="/tsp-simulated-annealing-simulation/simulate" element={<TempGraph />} />

                <Route path="/tsp-genetic-simulation" element={<TSPDataTable />}/>


                <Route path="/tsp-tabu-search-simulation" element={<TSPDataTable />} />


            </Routes>
        </div>
    );
}

export default Application;