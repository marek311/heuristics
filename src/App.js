import logo from './logo.svg';
import './App.css';
import Selector from './Selector';

function App() {
  return (
      <div className="App">
        <img src={logo} className="App-logo" alt="logo"/>
        <h1 className="text-purple-500 text-6xl font-bold">Toto je moja hlavička</h1>
        <div>
          <Selector />
        </div>
      </div>
  );
}
export default App;