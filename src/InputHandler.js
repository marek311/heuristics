import { useLocation } from 'react-router-dom';
import KnapsackInput from './InputHandlerKnapsackProblem';
import TSPInput from './InputHandlerTSP';

function InputHandler() {

    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const mode = query.get('mode');

    const showInputFields = () => {
        if (['KnapsackInsert', 'KnapsackExchangeFirst', 'KnapsackExchangeBest', 'KnapsackGenetic'].includes(mode))
        {
            return <KnapsackInput mode={mode} />;
        }
        if (['TSPSimulatedAnnealing', 'TSPTabuSearch'].includes(mode))
        {
            return <TSPInput mode={mode} />;
        }
        return null;
    }

    const handleInputs = () => {
        return (
            <div
                className="mb-4 flex flex-col items-center justify-center w-fit h-fit text-white p-6 bg-purple-600 rounded-lg mx-auto my-10">
                <> {showInputFields()} </>
            </div>
        );
    }

    return (
        <> {handleInputs()} </>
    );
}

export default InputHandler;
