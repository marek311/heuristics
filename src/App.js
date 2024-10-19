import {BrowserRouter as Router, Route, Routes,} from 'react-router-dom';
import Selector from './Selector';
import InputReader from './InputReader';

function App() {
  return (
      <Router>
          <div className="flex items-center justify-center min-h-screen bg-gray-900">
              <Routes>
                  <Route path="/" element={
                      <div className="text-center p-6 bg-purple-800 rounded-lg shadow-lg">
                          <h1 className="text-white text-4xl font-bold mb-6">Heuristiky a metaheuristiky</h1>
                          <Selector />
                      </div>
                  } />
                  <Route path="/visualization" element={<InputReader />} />
              </Routes>
          </div>
      </Router>
  );
}

export default App;
