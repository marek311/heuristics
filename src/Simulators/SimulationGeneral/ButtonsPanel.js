import React from 'react';

function ButtonPanel({
                         handleStep,
                         handleRun,
                         handleReset,
                         isDisabled,
                     }) {
    return (
        <div className="space-x-2">
            <button
                onClick={handleStep}
                className={`px-4 py-2 rounded ${isDisabled ? 'bg-gray-500 cursor-not-allowed' : 'bg-teal-500 hover:bg-teal-400'}`}
                disabled={isDisabled}>
                Krok
            </button>
            <button
                onClick={handleRun}
                className={`px-4 py-2 rounded ${isDisabled ? 'bg-gray-500 cursor-not-allowed' : 'bg-teal-500 hover:bg-teal-400'}`}
                disabled={isDisabled}>
                Spusti
            </button>
            <button
                onClick={handleReset}
                className="px-4 py-2 rounded bg-red-500 hover:bg-red-600">
                Reset
            </button>
        </div>
    );
}

export default ButtonPanel;
