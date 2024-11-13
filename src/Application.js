import { Routes, Route } from 'react-router-dom';
import Selector from './Selector';
import InputHandler from './InputHandler';
import SimulatorKnapsack from "./SimulatorKnapsack";
import SimulatorTSP from "./SimulatorTSP";

function Application() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <Routes>
                <Route path="/" element={<Selector />} />
                <Route path="/handleInputs" element={<InputHandler />} />
                <Route path="/knapsack-insert-simulation" element={<SimulatorKnapsack />} />
                <Route path="/knapsack-exchange-first-simulation" element={<SimulatorKnapsack />} />
                <Route path="/knapsack-exchange-best-simulation" element={<SimulatorKnapsack />} />
                <Route path="/knapsack-genetic-simulation" element={<SimulatorKnapsack />} />
                <Route path="/tsp-simulated-annealing-simulation" element={<SimulatorTSP/>} />
                <Route path="/tsp-tabu-search-simulation" element={<SimulatorTSP />} />
            </Routes>
        </div>
    );
}

export default Application;