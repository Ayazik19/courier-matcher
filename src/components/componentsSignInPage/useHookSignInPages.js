import { useContext, createContext, useState } from "react";

const HookSignInPagesContext = createContext();

export const useHookSignInPagesContext = () => {
    return useContext(HookSignInPagesContext);
}

export const HookSignInPagesProvider = ({children}) => {
    const [isRedirectSignInOnlyPassPage, setIsRedirectSignInOnlyPassPage] = useState(false);

    const setIsRedirectHomePageValue = (value) => {
        setIsRedirectSignInOnlyPassPage(value);
    };

    return(
        <HookSignInPagesContext.Provider value={{isRedirectSignInOnlyPassPage, setIsRedirectSignInOnlyPassPage, setIsRedirectHomePageValue}}>
            {children}
        </HookSignInPagesContext.Provider>
    )
}