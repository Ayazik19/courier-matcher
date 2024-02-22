import { useCallback, useEffect, useState } from 'react';
import './operationDisplayHistoryNotifications.css';
import { useDispatch } from 'react-redux';
import { setActionFilteredNots, setFilterActionNots, setRemoveFilterActs } from '../store/slices/filteredHistoryNotSlice';
import { useFilteredOperations } from '../globalHooks/filteredOperations';
import { useAuth } from '../globalHooks/useauth';

export default function OperationDisplayHistoryNotifications() {
    const dispatch = useDispatch();
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
    const [saveData, setSaveData] = useState();

    const handleAddTypeFilterAdmin = () => {
        const isFilterAdminNull = arrActionFilteredNots.find(items => items.nameSenderNot === 'Coorchik') ? true : false;
        if (!isFilterAdminNull) {
            setSaveData(arrActionFilteredNots);
            dispatch(setRemoveFilterActs());
            const idAddedType = lengthActFilters + 1;
            for (let i = 0; i < lengthActFilters; i++) {
                const stateDataArr = arrActionFilteredNots[i].nameSenderNot;

                dispatch(setActionFilteredNots(
                    {
                        id: i + 1,
                        nameSenderNot: stateDataArr
                    }
                ))
            }
            dispatch(setActionFilteredNots(
                {
                    id: idAddedType,
                    nameSenderNot: 'Coorchik'
                }
            ))
            setSaveData();
        }
    }

    const handleAddTypeFilterSs = () => {
        const isFilterSsNull = arrActionFilteredNots.find(items => items.nameSenderNot === 'SS Coorchik') ? true : false;
        if (!isFilterSsNull) {
            setSaveData(arrActionFilteredNots);
            dispatch(setRemoveFilterActs());
            const idAddedType = lengthActFilters + 1;
            for (let i = 0; i < lengthActFilters; i++) {
                const stateDataArr = arrActionFilteredNots[i].nameSenderNot;

                dispatch(setActionFilteredNots(
                    {
                        id: i + 1,
                        nameSenderNot: stateDataArr
                    }
                ))
            }
            dispatch(setActionFilteredNots(
                {
                    id: idAddedType,
                    nameSenderNot: 'SS Coorchik'
                }
            ))
            setSaveData();
        }
    }
    const handleAddTypeFilterCouriers = () => {
        const isFilterCouriersNull = arrActionFilteredNots.find(items => items.nameSenderNot === 'Couriers') ? true : false;
        if (!isFilterCouriersNull) {
            setSaveData(arrActionFilteredNots);
            dispatch(setRemoveFilterActs());
            const idAddedType = lengthActFilters + 1;
            for (let i = 0; i < lengthActFilters; i++) {
                const stateDataArr = arrActionFilteredNots[i].nameSenderNot;

                dispatch(setActionFilteredNots(
                    {
                        id: i + 1,
                        nameSenderNot: stateDataArr
                    }
                ))
            }
            dispatch(setActionFilteredNots(
                {
                    id: idAddedType,
                    nameSenderNot: 'Couriers'
                }
            ))
            setSaveData();
        }
    }
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