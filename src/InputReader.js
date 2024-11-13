import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';

function InputReader() {

    const location = useLocation();
    const navigate = useNavigate();

    const query = new URLSearchParams(location.search);
    const mode = query.get('mode');

    const [showForm, setShowForm] = useState(true);

    //Knapsack problem
    const [weights, setWeights] = useState('');
    const [prices, setPrices] = useState('');
    const [capacity, setCapacity] = useState('');

    //TSA
    const [xCoordinates, setXCoordinates] = useState('');
    const [yCoordinates, setYCoordinates] = useState('');

    const handleGoBack = () => {
        navigate(`/`);
    };

    const handleRunSimulation = () => {
        setShowForm(false);
    };

    const showInputFields = () => {
        if (['KnapsackInsert', 'KnapsackExchangeFirst', 'KnapsackExchangeBest', 'KnapsackGenetic'].includes(mode))
        {
            return (
                <div>
                    <label className="block text-white mb-2">Zadajte pole hmotnosti predmetov:</label>
                    <input
                        type="text"
                        className="p-2 mb-4 text-black border rounded w-full"
                        placeholder="Hmotnosti predmetov"
                        value={weights}
                        onChange={(e) => setWeights(e.target.value)}
                    />

                    <label className="block text-white mb-2">Zadajte pole cien predmetov:</label>
                    <input
                        type="text"
                        className="p-2 mb-4 text-black border rounded w-full"
                        placeholder="Ceny predmetov"
                        value={prices}
                        onChange={(e) => setPrices(e.target.value)}
                    />

                    <label className="block text-white mb-2">Zadajte kapacitu batohu:</label>
                    <input
                        type="text"
                        className="p-2 mb-4 text-black border rounded w-full"
                        placeholder="Kapacita batohu"
                        value={capacity}
                        onChange={(e) => setCapacity(e.target.value)}
                    />
                </div>
            );
        }
        if (['TSPSimulatedAnnealing', 'TSPTabuSearch'].includes(mode))
        {
            return (
                <div>
                    <label className="block text-white mb-2">Zadajte x suradnice miest:</label>
                    <input
                        type="text"
                        className="p-2 mb-4 text-black border rounded w-full"
                        placeholder="X suradnice"
                        value={xCoordinates}
                        onChange={(e) => setXCoordinates(e.target.value)}
                    />

                    <label className="block text-white mb-2">Zadajte y suradnice miest:</label>
                    <input
                        type="text"
                        className="p-2 mb-4 text-black border rounded w-full"
                        placeholder="Y suradnice"
                        value={yCoordinates}
                        onChange={(e) => setYCoordinates(e.target.value)}
                    />
                </div>
            );
        }
    }

    const showInputs = () => {
        return (
            <div className="text-center mt-6">
                <h3 className="text-2xl font-bold mb-4">Simulácia spustená!</h3>
                <p className="text-white mb-2">Mód: {mode}</p>

                {['KnapsackInsert', 'KnapsackExchangeFirst', 'KnapsackExchangeBest', 'KnapsackGenetic'].includes(mode) && (
                    <div>
                        <p className="text-white mb-2">Hmotnosti: {weights}</p>
                        <p className="text-white mb-2">Ceny: {prices}</p>
                        <p className="text-white mb-2">Kapacita batohu: {capacity}</p>
                    </div>
                )}

                {['TSPSimulatedAnnealing', 'TSPTabuSearch'].includes(mode) && (
                    <div>
                        <p className="text-white mb-2">X súradnice: {xCoordinates}</p>
                        <p className="text-white mb-2">Y súradnice: {yCoordinates}</p>
                    </div>
                )}
            </div>
        );
    };

    const handleInputs = () => {
        return (
            <div
                className="mb-4 flex flex-col items-center justify-center w-fit h-fit text-white p-6 bg-purple-600 rounded-lg mx-auto my-10">
                {showForm ? (
                    <> {showInputFields()} </>
                ) : (
                    <> {showInputs()} </>
                )}
                <div className="flex space-x-4 mt-4">
                    <button onClick={handleGoBack} className="px-4 py-2 bg-red-800 rounded hover:bg-red-950">
                        Späť
                    </button>
                    <button onClick={handleRunSimulation} className="px-4 py-2 bg-teal-700 rounded hover:bg-purple-700">
                        Spusti
                    </button>
                </div>
            </div>
        );
    }

    return (
        <> {handleInputs()} </>
    );
}

export default InputReader;
