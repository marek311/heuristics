import React from 'react';
import ButtonsPanel from './Simulation_ButtonsPanel';
import Colors from '../../Main/Colors';

function Simulation_Header({
                              handleGoBack,
                              title,
                              handleStep,
                              handleRun,
                              handleReset,
                              isDisabled
                            }) {
    return (
        <div className="flex w-full h-full p-4 bg-white rounded-lg mb-2">
            <button
                onClick={handleGoBack}
                className={`${Colors.buttonSecondary} ${Colors.buttonSecondaryHover} px-4 py-2 rounded`}>
                Back
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

export default Simulation_Header;
