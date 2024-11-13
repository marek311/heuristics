import { Routes, Route } from 'react-router-dom';
import Selector from './Selector';
import InputHandler from './InputHandler';

function Application() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <Routes>
                <Route path="/" element={<Selector />} />
                <Route path="/visualization" element={<InputHandler />} />
            </Routes>
        </div>
    );
}

export default Application;