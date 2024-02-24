import { createContext, useContext, useState  } from "react";

const HookPagesNotsContext = createContext();

export const useHookPagesNots = () => {
    return useContext(HookPagesNotsContext);
}

export const HookPagesNotsProvider = ({children}) => {
    const [selectedPage, setSelectedPage] = useState();
    const [showPageOneNot, setShowPageOneNot] = useState(true);
    const [showPageTwoNot, setShowPageTwoNot] = useState(false);
    const [showPageThreeNot, setShowPageThreeNot] = useState(false);
    const [showPageFourNot, setShowPageFourNot] = useState(false);
    const [showPageFiveNot, setShowPageFiveNot] = useState(false);
    const [showPageSixNot, setShowPageSixNot] = useState(false);
    const [showPageSevenNot, setShowPageSevenNot] = useState(false);
    const [showPageEightNot, setShowPageEightNot] = useState(false);
    const [updDataArrHistoryNot, setUpdDataArrHistoryNot] = useState([]);

    return(
        <HookPagesNotsContext.Provider
            value = {{
                selectedPage,setSelectedPage,
                updDataArrHistoryNot, setUpdDataArrHistoryNot,
                showPageOneNot,
                showPageTwoNot,
                showPageThreeNot,
                showPageFourNot,
                showPageFiveNot,
                showPageSixNot,
                showPageSevenNot,
                showPageEightNot,
                setShowPageOneNot,
                setShowPageTwoNot,
                setShowPageThreeNot,
                setShowPageFourNot,
                setShowPageFiveNot,
                setShowPageSixNot,
                setShowPageSevenNot,
                setShowPageEightNot
            }}  
        >
            {children}
        </HookPagesNotsContext.Provider>
    );
}