import React from 'react';
import Colors from '../../Main/Colors';

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
                className={`px-4 py-2 rounded ${isDisabled ? `${Colors.buttonDisabled} ${Colors.cursorDisabled}` : `${Colors.buttonPrimary} ${Colors.buttonPrimaryHover}`}`}
                disabled={isDisabled}>
                Krok
            </button>
            <button
                onClick={handleRun}
                className={`px-4 py-2 rounded ${isDisabled ? `${Colors.buttonDisabled} ${Colors.cursorDisabled}` : `${Colors.buttonPrimary} ${Colors.buttonPrimaryHover}`}`}
                disabled={isDisabled}>
                Spusti
            </button>
            <button
                onClick={handleReset}
                className={`px-4 py-2 rounded ${Colors.buttonSecondary} ${Colors.buttonSecondaryHover}`}>
                Reset
            </button>
        </div>
    );
}

export default ButtonPanel;
