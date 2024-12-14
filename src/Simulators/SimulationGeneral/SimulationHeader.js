import React from 'react';
import ButtonsPanel from './SimulationButtonsPanel';
import Colors from '../../Main/Colors';

function SimulationHeader({
                              handleGoBack,
                              title,
                              handleStep,
                              handleRun,
                              handleReset,
                              isDisabled
                            }) {
    return (
        <div className="flex w-full h-full p-4 bg-white rounded-lg mb-4">
            <button
                onClick={handleGoBack}
                className={`${Colors.buttonSecondary} ${Colors.buttonSecondaryHover} px-4 py-2 rounded`}>
                Späť
            </button>
            <h2 className={`text-lg font-semibold ${Colors.textPrimary} flex-grow text-center`}>
                {title}
            </h2>
            <div className="ml-auto">
                <ButtonsPanel
                    handleStep={handleStep}
                    handleRun={handleRun}
                    handleReset={handleReset}
                    isDisabled={isDisabled}
                />
            </div>
        </div>
    );
}

export default SimulationHeader;
