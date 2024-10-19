import Selector from './Selector';

function App() {
  return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-center p-6 bg-purple-800 rounded-lg shadow-lg">
          <h1 className="text-white text-4xl font-bold mb-6">Heuristiky a metaheuristiky</h1>
          <Selector />
        </div>
      </div>
  );
}

export default App;
