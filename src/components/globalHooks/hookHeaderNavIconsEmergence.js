import { createContext, useContext, useState } from "react";

const HookHeaderIconsEmergenceContext = createContext();

export const useHookHeaderIconsEmergenceContext = () => {
    return useContext(HookHeaderIconsEmergenceContext);
}

export const HookHeaderIconsEmergenceProvider = ({ children }) => {
    const [hideIconAddCourier, setHideIconAddCourier] = useState(true);

    const [hideContIconUserAcc, setHideContUserAcc] = useState(true);
    const [hideNotificationIcon, setHideNotificationIcon] = useState(true);

    return(
        <HookHeaderIconsEmergenceContext.Provider 
            value = {{ 
                hideIconAddCourier,
                hideContIconUserAcc,
                hideNotificationIcon,
                setHideIconAddCourier,
                setHideContUserAcc,
                setHideNotificationIcon
            }}
        >
            {children}
        </HookHeaderIconsEmergenceContext.Provider>
    );
}