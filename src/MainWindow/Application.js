import { Routes, Route } from 'react-router-dom';
import Selector from '../SelectWindows/Selector';
import InputHandler from '../InputHandlingWindows/InputHandler';
import InfoKnapsack from "../InfoWindows/InfoKnapsack";
import InfoTSP from '../InfoWindows/InfoTSP';
import SimulatorKnapsackInsert from '../SimulationWindows/SimulatorKnapsackInsert'

function Application() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <Routes>
                <Route path="/" element={<Selector />} />
                <Route path="/handleInputs" element={<InputHandler />} />

                <Route path="/knapsack-insert-simulation" element={<InfoKnapsack />} />
                <Route path="/knapsack-exchange-first-simulation" element={<InfoKnapsack />} />
                <Route path="/knapsack-exchange-best-simulation" element={<InfoKnapsack />} />
                <Route path="/knapsack-genetic-simulation" element={<InfoKnapsack />} />

                <Route path="knapsack-insert-simulation/simulate" element={<SimulatorKnapsackInsert />} />

                <Route path="/tsp-simulated-annealing-simulation" element={<InfoTSP/>} />
                <Route path="/tsp-tabu-search-simulation" element={<InfoTSP />} />
            </Routes>
        </div>
    );
}

export default Application;