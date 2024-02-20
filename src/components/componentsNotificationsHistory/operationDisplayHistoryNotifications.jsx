import { useCallback, useEffect, useState } from 'react';
import './operationDisplayHistoryNotifications.css';
import { setActionFilteredNots, setFilterActionNots, setRemoveFilterActs } from '../store/slices/filteredHistoryNotSlice';
import { useFilteredOperations } from '../globalHooks/filteredOperations';

export default function OperationDisplayHistoryNotifications() {
    const {
        arrActionFilteredNots
    } = useFilteredOperations();
    const lengthActFilters = arrActionFilteredNots.length;
    //count nots
    const [isCountActNull, setIsCountActNull] = useState(false);
    const [isCountActOne, setIsCountActOne] = useState(false);
    const [isCountActTwo, setIsCountActTwo] = useState(false);
    const [isCountActThree, setIsCountActThree] = useState(false);
    //check sender not
    const [isSenderAdmin, setIsSenderAdmin] = useState(false);
    const [isSenderSs, setIsSenderSs] = useState(false);
    const [isSenderCouriers, setIsSenderCouriers] = useState(false);

    const adaptivFilterCount = useCallback(() => {
        setIsCountActNull(lengthActFilters === 0);
        setIsCountActOne(lengthActFilters === 1);
        setIsCountActTwo(lengthActFilters === 2);
        setIsCountActThree(lengthActFilters === 3);

        setIsSenderAdmin(arrActionFilteredNots.find(item => item.nameSenderNot === 'Coorchik'))
        setIsSenderSs(arrActionFilteredNots.find(item => item.nameSenderNot === 'SS Coorchik'))
        setIsSenderCouriers(arrActionFilteredNots.find(item => item.nameSenderNot === 'Couriers'))
    }, [lengthActFilters]);

    useEffect(() => {
        adaptivFilterCount(arrActionFilteredNots.length);
    }, [adaptivFilterCount, arrActionFilteredNots.length]);
    return (
        <div>
            <div className="history-nots-cont">
                <div className="header-cont">
                    <span className="header-text_left">
                        History notifications
                    </span>
                    <span className="header-text_right">
                        Settings
                    </span>
                </div>
            </div>
            </div>
    );
}