import { Routes, Route } from 'react-router-dom';
import Selector from './Selector';
import InputReader from './InputReader';

function Application() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <Routes>
                <Route path="/" element={<Selector />} />
                <Route path="/visualization" element={<InputReader />} />
            </Routes>
        </div>
    );
}

export default Application;