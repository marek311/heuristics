import React from 'react';
import {useNavigate} from "react-router-dom";
import ButtonsPanel from './ButtonPanel';
import Colors from '../../Main/Colors';

function Header({
                              handleGoBack,
                              title,
                              handleStep,
                              handleRun,
                              handleReset,
                              isDisabled
                            }) {
    const navigate = useNavigate();

    return (
        <div className="flex w-full h-full p-4 bg-white rounded-lg mb-2">
            <div>
                <button
                    onClick={() => navigate("/")}
                    className={`${Colors.buttonThird} ${Colors.buttonThirdHover} mr-2 px-4 py-2 rounded`}>
                    🏠︎
                </button>
                <button
                    onClick={handleGoBack}
                    className={`${Colors.buttonSecondary} ${Colors.buttonSecondaryHover} mr-2 px-4 py-2 rounded`}>
                    Back
                </button>
            </div>
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

export default Header;
