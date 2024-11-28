import { Routes, Route } from 'react-router-dom';
import Selector from '../SelectMode/Selector';
import InputHandler from '../InputHandling/InputHandler';
import InfoKnapsackPage from "../InfoWindows/InfoKnapsackPage";
import InfoTSP from '../InfoWindows/InfoTSP';
import SimulatorKnapsackInsert from '../Simulators/SimulatorKnapsackInsert'
import SimulatorKnapsackExchange from '../Simulators/SimulatorKnapsackExchange'

function Application() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <Routes>
                <Route path="/" element={<Selector />} />
                <Route path="/handleInputs" element={<InputHandler />} />

                <Route path="/knapsack-insert-simulation" element={<InfoKnapsackPage />} />
                <Route path="/knapsack-exchange-first-simulation" element={<InfoKnapsackPage />} />
                <Route path="/knapsack-exchange-best-simulation" element={<InfoKnapsackPage />} />
                <Route path="/knapsack-genetic-simulation" element={<InfoKnapsackPage />} />

                <Route path="knapsack-insert-simulation/simulate" element={<SimulatorKnapsackInsert />} />
                <Route path="knapsack-exchange-first-simulation/simulate" element={<SimulatorKnapsackExchange />} />
                <Route path="knapsack-exchange-best-simulation/simulate" element={<SimulatorKnapsackExchange />} />

                <Route path="/tsp-simulated-annealing-simulation" element={<InfoTSP/>} />
                <Route path="/tsp-tabu-search-simulation" element={<InfoTSP />} />
            </Routes>
        </div>
    );
}

export default Application;