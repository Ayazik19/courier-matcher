import { useState, useEffect, useContext, createContext } from 'react';

const HookMouseFunctionalityErrorsContext = createContext();

export const useHookMouseFunctionalityErrorsContext = () => {
    return useContext(HookMouseFunctionalityErrorsContext);
};

export const HookMouseFunctionalityErrorsProvider = ({ children }) => {
    const [selectedText, setSelectedText] = useState('');
    const [isSelectedElement, setSelectedElement] = useState(false);
    const [isSelectedElementStepTwo, setIsSelectedElementStepTwo] = useState(false);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);


    const handleKeyDown = (event) => {
        const selection = window.getSelection().toString();

        if (selection !== "" && event.keyCode === 77 && !isSelectedElement) {
            setSelectedText(selection);
            setSelectedElement(true);
        }
    };

    return (
        <HookMouseFunctionalityErrorsContext.Provider 
            value={{ 
                selectedText, 
                setSelectedText, 
                isSelectedElement, 
                setSelectedElement, 
                isSelectedElementStepTwo, 
                setIsSelectedElementStepTwo
            }}>
            {children}
        </HookMouseFunctionalityErrorsContext.Provider>
    );
};