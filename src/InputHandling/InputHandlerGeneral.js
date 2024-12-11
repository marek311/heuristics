import { useLocation } from 'react-router-dom';
import InputHandlerKnapsack from './InputHandlerKnapsack';
import InputHandlerTSP from './InputHandlerTSP';

function InputHandlerGeneral() {
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const mode = query.get('mode');

    return (
        <div className="mb-4 flex flex-col items-center justify-center w-fit h-fit text-gray-800 p-6 bg-white rounded-lg shadow-lg mx-auto my-10">
            {['KnapsackInsert', 'KnapsackExchangeFirst', 'KnapsackExchangeBest', 'KnapsackGenetic'].includes(mode) && (
                <InputHandlerKnapsack mode={mode} />
            )}
            {['TSPSimulatedAnnealing', 'TSPTabuSearch'].includes(mode) && (
                <InputHandlerTSP mode={mode} />
            )}
        </div>
    );
}

export default InputHandlerGeneral;
