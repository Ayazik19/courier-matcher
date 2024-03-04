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
    const isDisplay = lengthHistory / 5 > 0;

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
            }
        }
        setUpdDataArrHistoryNot(sliceArrayNots);
    }, [notificationsHistory])

    const [eventClickTracking, setEventClickTracking] = useState(1);
    const [isShowAttribFilters, setShowAttribFilters] = useState(false);

    // hover effects to actions, where have been nots
    const [hoverEffectActSs, setHoverEffectActSs] = useState(false);
    const [hoverEffectActAdmin, setHoverEffectActAdmin] = useState(false);
    const [hoverEffectActCouriers, setHoverEffectActCouriers] = useState(false);

    const handleShowContAddFilters = (typeNot) => {
        if (typeNot !== undefined) {
            if (typeNot === 'SS Coorchik') {
                setHoverEffectActSs(true);
            }
            else if (typeNot === 'Coorchik') {
                setHoverEffectActAdmin(true);
            }
            else if (typeNot === 'Couriers') {
                setHoverEffectActCouriers(true);
            }
        }
        setShowAttribFilters(true);
        setEventClickTracking(eventClickTracking + 1);
        if (isShowAttribFilters) {
            if (eventClickTracking % 2 == 0) {
                setShowAttribFilters(false);
                setHoverEffectActSs(false);
                setHoverEffectActAdmin(false);
                setHoverEffectActCouriers(false);
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

    const arrActionHistoryType = ['SS Coorchik', 'Coorchik', 'Couriers'];
    let dataTypeNotsUserArr = [];
    for (let i = 0; i < arrActionHistoryType.length; i++) {
        const dataNameSenderNot = arrActionHistoryType[i];
        const findFilterTypeNotArr = notificationsHistory.find(items => items.payload.senderNotification === `${dataNameSenderNot}`);
        if (findFilterTypeNotArr !== undefined) {
            dataTypeNotsUserArr.push(findFilterTypeNotArr);
        }
    }
    const displayDataTypeNotsUser = dataTypeNotsUserArr.map((typesNotsHided, index) => {
        const typeNot = typesNotsHided.payload.senderNotification;
        return (
            <span key={index} className='type-filter-nots-user open-cont-add-attr' onClick={() => handleShowContAddFilters(typeNot)}>
                "{typeNot}",
            </span>
        );
    });



    useEffect(() => {
        adaptivFilterCount(arrActionFilteredNots.length);
    }, [adaptivFilterCount, arrActionFilteredNots.length]);

    const handleDispatchRemoveAllFilters = () => {
        dispatch(setRemoveFilterActs());
    }
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

    const [footerContHistoryNotSliceOne, setFooterContHistoryNotSliceOne] = useState(false);
    const [footerContHistoryNotSliceTwo, setFooterContHistoryNotSliceTwo] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);

    const handleShowListPage = (i) => {
        const isSelectedItem = selectedPage === i ? selectedPage + i : i;
        if (isSelectedItem === 0) {
            setShowPageOneNot(true);
            setShowPageTwoNot(false);
            setShowPageThreeNot(false);
            setShowPageFourNot(false);
            setShowPageFiveNot(false);
            setShowPageSixNot(false);
            setShowPageSevenNot(false);
            setShowPageEightNot(false);
        }
        else if (isSelectedItem === 1) {
            setShowPageOneNot(false);
            setShowPageTwoNot(true);
            setShowPageThreeNot(false);
            setShowPageFourNot(false);
            setShowPageFiveNot(false);
            setShowPageSixNot(false);
            setShowPageSevenNot(false);
            setShowPageEightNot(false);
        }
        else if (isSelectedItem === 2) {
            setShowPageOneNot(false);
            setShowPageTwoNot(false);
            setShowPageThreeNot(true);
            setShowPageFourNot(false);
            setShowPageFiveNot(false);
            setShowPageSixNot(false);
            setShowPageSevenNot(false);
            setShowPageEightNot(false);
        }
        else if (isSelectedItem === 3) {
            setShowPageOneNot(false);
            setShowPageTwoNot(false);
            setShowPageThreeNot(false);
            setShowPageFourNot(true);
            setShowPageFiveNot(false);
            setShowPageSixNot(false);
            setShowPageSevenNot(false);
            setShowPageEightNot(false);
        }
        else if (isSelectedItem === 4) {
            setShowPageOneNot(false);
            setShowPageTwoNot(false);
            setShowPageThreeNot(false);
            setShowPageFourNot(false);
            setShowPageFiveNot(true);
            setShowPageSixNot(false);
            setShowPageSevenNot(false);
            setShowPageEightNot(false);
        }
        else if (isSelectedItem === 5) {
            setShowPageOneNot(false);
            setShowPageTwoNot(false);
            setShowPageThreeNot(false);
            setShowPageFourNot(false);
            setShowPageFiveNot(false);
            setShowPageSixNot(true);
            setShowPageSevenNot(false);
            setShowPageEightNot(false);
        }
        else if (isSelectedItem === 6) {
            setShowPageOneNot(false);
            setShowPageTwoNot(false);
            setShowPageThreeNot(false);
            setShowPageFourNot(false);
            setShowPageFiveNot(false);
            setShowPageSixNot(false);
            setShowPageSevenNot(true);
            setShowPageEightNot(false);
        }
        else if (isSelectedItem === 7) {
            setShowPageOneNot(false);
            setShowPageTwoNot(false);
            setShowPageThreeNot(false);
            setShowPageFourNot(false);
            setShowPageFiveNot(false);
            setShowPageSixNot(false);
            setShowPageSevenNot(false);
            setShowPageEightNot(true);
        }
        setSelectedPage(undefined);
        setCurrentPage(i);
    }

    const handleNextPage = () => {
        setSelectedPage(currentPage + 1);
        handleShowListPage(currentPage + 1);
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
    const getIsSelectedPage = useCallback((i) => {
        return (
            (showPageOneNot && i === 0) ||
            (showPageTwoNot && i === 1) ||
            (showPageThreeNot && i === 2) ||
            (showPageFourNot && i === 3) ||
            (showPageFiveNot && i === 4) ||
            (showPageSixNot && i === 5) ||
            (showPageSevenNot && i === 6) ||
            (showPageEightNot && i === 7)
        );
    }, [showPageOneNot, showPageTwoNot, showPageThreeNot, showPageFourNot, showPageFiveNot, showPageSixNot, showPageSevenNot, showPageEightNot])

    useEffect(() => {
        if (lengthHistory / 5 > 1) {
            const pagesOne = [];
            const pagesTwo = [];
            const sliceCountPagesDisplay = roundingCountSlice >= 4 && 7 >= roundingCountSlice ? true : false;
            if (sliceCountPagesDisplay) {
                for (let i = 4; i < roundingCountSlice; i++) {
                    const isSelectedPage = getIsSelectedPage(i);
                    pagesTwo.push(
                        <div key={i} className={isSelectedPage ? `count-${i + 1} pager-cont_choosen` : `count-${i + 1} pager-cont`} onClick={() => handleShowListPage(i)}>
                            <span className='text-list-item-pager'>
                                {i + 1}
                            </span>
                        </div>
                    );
                }
            }
            for (let i = 0; i < roundingCountSlice; i++) {
                const isSelectedPage = getIsSelectedPage(i);
                pagesOne.push(
                    <div key={i} className={isSelectedPage ? `count-${i + 1} pager-cont_choosen` : `count-${i + 1} pager-cont`} onClick={() => handleShowListPage(i)}>
                        <span className='text-list-item-pager'>
                            {i + 1}
                        </span>
                    </div>
                );
            }
            setFooterContHistoryNotSliceOne(pagesOne);
            setFooterContHistoryNotSliceTwo(pagesTwo);
        }
    }, [isDisplay, countPagesDisplay, getIsSelectedPage]);

    return (
        <div>
            <div className="history-nots-cont">
                <div className="header-cont">
                    <span className="header-text_left">
                        History notifications
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
                                            <li
                                                className={hoverEffectActSs ? 'attr-actions-type-one_type-nots-true' : 'attr-actions-type-one'}
                                                onClick={handleAddTypeFilterSs}
                                            >
                                                <span className={hoverEffectActSs ? 'text-attributes-filter_anim-true' : 'text-attributes-filter'}>SS Coorchik</span>
                                            </li>
                                            <li
                                                className={hoverEffectActAdmin ? 'attr-actions-type-two_type-nots-true' : 'attr-actions-type-two'}
                                                onClick={handleAddTypeFilterAdmin}
                                            >
                                                <span className={hoverEffectActAdmin ? 'text-attributes-filter_anim-true' : 'text-attributes-filter'}>Coorchik</span>
                                            </li>
                                            <li
                                                className={hoverEffectActCouriers ? 'attr-actions-type-three_type-nots-true' : 'attr-actions-type-three'}
                                                onClick={handleAddTypeFilterCouriers}
                                            >
                                                <span className={hoverEffectActCouriers ? 'text-attributes-filter_anim-true' : 'text-attributes-filter'}>Couriers</span>
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
                {arrActionFilteredNots.length > 0 ?
                    <div className='history-nots'>
                        <DisplayPagesNots />
                    </div>
                    :
                    <div className='history-nots_false'>
                        {dataTypeNotsUserArr && notificationsHistory > 0?
                            <div className='items-filters-null'>
                                <span className='text-one-filters-null_action' onClick={handleShowContAddFilters}>
                                    Select a type filter{displayDataTypeNotsUser}
                                </span>
                                <br />
                                <span className='text-two-filters-null'>you have notifications</span>
                            </div>
                            :
                            <div className='notifications-null'>
                                <span className='text-notifications-null'>You don't have any notifications</span>
                            </div>
                        }
                    </div>
                }
                {arrActionFilteredNots.length !== 0 ?
                    <div className='footer-cont-pager-items'>
                        {!showPageFiveNot && 1 < updDataArrHistoryNot.length && updDataArrHistoryNot.length <= 4 ?
                            <>
                                {footerContHistoryNotSliceOne}
                                <div className='pager-cont-ii list-item_type-next' onClick={handleNextPage}>
                                    <span className='text-list-item-pager'>
                                        further
                                    </span>
                                </div>
                            </>
                            : null}
                        {updDataArrHistoryNot.length >= 5 && showPageFiveNot ?
                            <>
                                <div className='pager-cont-start list-item_type-start-redirect' onClick={() => handleShowListPage(0)}>
                                    <span className='text-list-item-pager'>
                                        for the start
                                    </span>
                                </div>
                                {footerContHistoryNotSliceTwo}
                                <div className='pager-cont-ii list-item_type-next' onClick={handleNextPage}>
                                    <span className='text-list-item-pager'>
                                        further
                                    </span>
                                </div>
                            </> : null}
                    </div>
                    :
                    null}
            </div>
            </div>
    );
}