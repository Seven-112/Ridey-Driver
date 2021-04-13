import React from 'react';
import Tracking from '../Components/Tracking';
import { useDispatch, useSelector } from 'react-redux';
import * as userSelectors from '../Store/Selectors/';
import STORE from '../Store';
import * as Actions from '../Store/Actions';




const TrackingScreen = (props) => {
    const dispatch = useDispatch();
    const userInfo = props.route.params.userInfo;
    const tripData = useSelector(userSelectors.getTripData);
    const requestError = useSelector(userSelectors.getRequestErrors);
    const requestStatus = useSelector(userSelectors.getRequestStatus);
    const nearByDrivers = useSelector(userSelectors.getNearByDriverData);
    const user = useSelector(userSelectors.getLoginData);
    const getCurrentTrip = (data)=>dispatch(Actions.actionGetCurrentTrip(data))
    const enhancedProps = {
        actions:{
            getCurrentTrip
        },
        ...props,
        requestError,
        requestStatus,
        tripData,
        user,
        navigation: props.navigation,
        nearByDrivers,
        userInfo
    }
    return <Tracking {...enhancedProps} />
}

export default TrackingScreen