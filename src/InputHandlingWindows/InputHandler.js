import { useLocation } from 'react-router-dom';
import InputHandlerKnapsackProblem from './InputHandlerKnapsackProblem';
import InputHandlerTSP from './InputHandlerTSP';

function InputHandler() {

    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const mode = query.get('mode');

    const showInputFields = () => {
        if (['KnapsackInsert', 'KnapsackExchangeFirst', 'KnapsackExchangeBest', 'KnapsackGenetic'].includes(mode))
        {
            return <InputHandlerKnapsackProblem mode={mode} />;
        }
        if (['TSPSimulatedAnnealing', 'TSPTabuSearch'].includes(mode))
        {
            return <InputHandlerTSP mode={mode} />;
        }
        return null;
    }

    const handleInputs = () => {
        return (
            <div
                className="mb-4 flex flex-col items-center justify-center w-fit h-fit text-gray-800 p-6 bg-white rounded-lg shadow-lg mx-auto my-10">
                <> {showInputFields()} </>
            </div>
        );
    }

    return (
        <> {handleInputs()} </>
    );
}

export default InputHandler;
