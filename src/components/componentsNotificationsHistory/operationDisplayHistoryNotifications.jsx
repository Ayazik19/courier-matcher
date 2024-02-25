import { useCallback, useEffect, useState } from 'react';
import './operationDisplayHistoryNotifications.css';
import removeFilterIcon from './removeFilterIcon.png';
import hoverAddActFilterIcon from './hoverAddActFilterIcon.png';
import hoverClearActFiltersIcon from './hoverClearActFiltersIcon.png';
import { useDispatch } from 'react-redux';
import { setActionFilteredNots, setFilterActionNots, setRemoveFilterActs } from '../store/slices/filteredHistoryNotSlice';
import { useFilteredOperations } from '../globalHooks/filteredOperations';
import { useAuth } from '../globalHooks/useauth';
import { useHookPagesNots } from '../globalHooks/usePagesNots';
import DisplayPagesNots from './displayPagesNots';


export default function OperationDisplayHistoryNotifications() {
    const dispatch = useDispatch();
    const {
        arrActionFilteredNots
    } = useFilteredOperations();
    const {
        notificationsHistory
    } = useAuth();
    const {
        selectedPage, setSelectedPage,
        setUpdDataArrHistoryNot, updDataArrHistoryNot,
        showPageOneNot, setShowPageOneNot,
        showPageTwoNot, setShowPageTwoNot,
        showPageThreeNot, setShowPageThreeNot,
        showPageFourNot, setShowPageFourNot,
        showPageFiveNot, setShowPageFiveNot,
        showPageSixNot, setShowPageSixNot,
        showPageSevenNot, setShowPageSevenNot,
        showPageEightNot, setShowPageEightNot
    } = useHookPagesNots();


    const lengthHistory = notificationsHistory.length;
    const countPagesDisplay = lengthHistory / 5;
    const isDisplay = lengthHistory / 5 > 1;
    const roundingCountSlice = Math.ceil(countPagesDisplay);

    const removeFilterPayloadArr = [];
    useEffect(() => {
        let sliceArrayNots = [];
        for (let i = 0; i < notificationsHistory.length; i++) {
            const id = i;
            const dateNotification = notificationsHistory[i]?.payload.dateNotification;
            const textNotification = notificationsHistory[i]?.payload.textNotification;
            const senderNotification = notificationsHistory[i]?.payload.senderNotification;
            const categoryNotification = notificationsHistory[i]?.payload.categoryNotification;

            const removePayloadTypeObj = {
                id: id,
                dateNotification: dateNotification,
                textNotification: textNotification,
                senderNotification: senderNotification,
                categoryNotification: categoryNotification
            };
            removeFilterPayloadArr.push(removePayloadTypeObj);
        }
        if (isDisplay) {
            for (let i = 0; i < roundingCountSlice; i++) {
                const sliceNots = removeFilterPayloadArr.slice(i * 5, (i + 1) * 5);
                sliceArrayNots.push(sliceNots);
                console.log(sliceArrayNots);
            }
        }
        setUpdDataArrHistoryNot(sliceArrayNots);
    }, [notificationsHistory])

    const [eventClickTracking, setEventClickTracking] = useState(1);
    const [isShowAttribFilters, setShowAttribFilters] = useState(false);
    const handleShowContAddFilters = () => {
        setShowAttribFilters(true);
        setEventClickTracking(eventClickTracking + 1);
        if (isShowAttribFilters) {
            if (eventClickTracking % 2 == 0) {
                setShowAttribFilters(false);
            }
            else {
                setShowAttribFilters(true);
            }
        }
    }
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
    const filterActOperation = (arrActionFilteredNots && arrActionFilteredNots.map((actFilter, index) => {

        const handleRemoveFilterSenderNot = (idActFilter) => {
            dispatch(setFilterActionNots(idActFilter));
        }

        return (
            <div className={isSenderSs ? 'act-filter_sender-ss' : 'act-filter_admin'} key={index}>
                <span className='text-act-not'>
                    {actFilter.nameSenderNot}
                </span>
                <img
                    src={removeFilterIcon}
                    className='img-hide-filter-act'
                    onClick={() => handleRemoveFilterSenderNot(actFilter.id)}
                />
            </div>
        );
    }));
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
                <div className="filters-operartion-nots">
                    {isCountActOne ?
                        <div className={isSenderCouriers || isSenderAdmin ? 'display-act-filters_count-one_adaptiv-type-small' : 'display-act-filters_count-one_adaptiv-type-big'}>
                            {filterActOperation}
                        </div> : null}
                    {isCountActTwo ?
                        <div className='display-act-filters_count-two'>
                            {filterActOperation}
                        </div> : null}
                    {isCountActThree ?
                        <div className='display-act-filters_count-three'>
                            {filterActOperation}
                        </div> : null}
                    <div className='manage-filters-btns'>
                        <div className={isCountActNull ? 'filters-btns_filter-count-false' : "filters-btns_filter-count-true"}>
                            <div
                                className='filter-btn_type-add-filter'
                                {...(!isShowAttribFilters ? { 'data-title': 'Add filter type' } : null)}
                                onClick={handleShowContAddFilters}
                            >
                                {isShowAttribFilters ?
                                    <div className='cont-add-attribs-senders-nots-filter'>
                                        <div className='attributes-filters'>
                                            <li className='attr-actions-type-one' onClick={handleAddTypeFilterSs}>
                                                <span className='text-attributes-filter'>SS Coorchik</span>
                                            </li>
                                            <li className='attr-actions-type-two' onClick={handleAddTypeFilterAdmin}>
                                                <span className='text-attributes-filter'>Coorchik</span>
                                            </li>
                                            <li className='attr-actions-type-three' onClick={handleAddTypeFilterCouriers}>
                                                <span className='text-attributes-filter'>Couriers</span>
                                            </li>
                                        </div>
                                    </div> : null}
                                <img src={hoverAddActFilterIcon} className='icons-manage-filters' />
                            </div>
                            <div
                                className='filter-btn_type-remove-all-filters'
                                {...(!isShowAttribFilters ? { 'data-title': 'Clears the selected notification filters' } : null)}
                                onClick={handleDispatchRemoveAllFilters}
                            >
                                <img src={hoverClearActFiltersIcon} className='icons-manage-filters' />
                            </div>
                        </div>
                    </div>
                </div>
                    <div className='history-nots'>
                        <DisplayPagesNots />
                    </div>
            </div>
            </div>
    );
}