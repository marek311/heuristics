import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import KnapsackInput from './InputHandler-KnapsackProblem';
import TSPInput from './InputHandler-TSP';

function InputHandler() {

    const location = useLocation();
    const navigate = useNavigate();

    const query = new URLSearchParams(location.search);
    const mode = query.get('mode');

    const handleGoBack = () => {
        navigate(`/`);
    };

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
                <div className="flex space-x-4 mt-4">
                    <button onClick={handleGoBack} className="px-4 py-2 bg-red-800 rounded hover:bg-red-950">
                        Späť
                    </button>
                    <button className="px-4 py-2 bg-teal-700 rounded hover:bg-purple-700">
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

export default InputHandler;
