import { useSelector } from "react-redux";

export function useFilteredOperations(){
    const {arrActionFilteredNots} = useSelector(state => state.filteredHistoryNot);

    return{
        arrActionFilteredNots
    };
}