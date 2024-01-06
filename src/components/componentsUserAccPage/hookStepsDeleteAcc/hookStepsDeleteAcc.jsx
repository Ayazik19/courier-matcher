import React, { createContext, useContext, useState } from 'react';

const HookStepsRedirectContext = createContext();

export const useHookStepsRedirectContext = () => {
    return useContext(HookStepsRedirectContext);
};

export const HookStepsRedirectProvider = ({ children }) => {
    const [isStepTwo, setStepTwo] = useState(false);

    const setStepValueTwo = (value) => {
        setStepTwo(value);
    };

    return (
        <HookStepsRedirectContext.Provider value={{ valueStepTwo: isStepTwo, setStepValueTwo }}>
            {children}
        </HookStepsRedirectContext.Provider>
    );
};