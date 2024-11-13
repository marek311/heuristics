import { useLocation } from 'react-router-dom';
import KnapsackInput from './InputHandler-KnapsackProblem';
import TSPInput from './InputHandler-TSP';

function InputHandler() {

    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const mode = query.get('mode');

    const showInputFields = () => {
        if (['KnapsackInsert', 'KnapsackExchangeFirst', 'KnapsackExchangeBest', 'KnapsackGenetic'].includes(mode))
        {
            return <KnapsackInput/>;
        }
        if (['TSPSimulatedAnnealing', 'TSPTabuSearch'].includes(mode))
        {
            return <TSPInput/>;
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
