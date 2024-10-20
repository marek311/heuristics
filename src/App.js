import {BrowserRouter as Router, Route, Routes,} from 'react-router-dom';
import Selector from './Selector';
import InputReader from './InputReader';

function App() {
  return (
      <Router>
          <div className="flex items-center justify-center min-h-screen bg-gray-900">
              <Routes>
                  <Route path="/" element={<Selector/>}/>
                  <Route path="/visualization" element={<InputReader/>}/>
              </Routes>
          </div>
      </Router>
  );
}

export default App;
