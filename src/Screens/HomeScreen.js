import React from 'react';
import Home from '../Components/Home';
import { useSelector, useDispatch } from 'react-redux';
import * as Selectors from '../Store/Selectors';
import STORE from '../Store'

const HomeScreen = (props) => {
    const dispatch = useDispatch();
    const actionCreateTrip = (data) =>dispatch(STORE.actions.actionCreateTrip(data));
    const actionAcceptTrip = (data)=>dispatch(STORE.actions.actionAcceptTrip(data))
    const actionChangeStatus = (data) => dispatch(STORE.actions.ActionClearPaymentError(data));
    const actionMakeDriverOnline = (data) => dispatch(STORE.actions.actionMakeOnlineDriver(data));
    const actionMakeDriverOffline= (data)=>dispatch(STORE.actions.actionMakeOfflineDriver(data));
    const actionGetRequests = ()=>dispatch(STORE.actions.actionGetAllRequest());
    const userData = useSelector(Selectors.getLoginData);
    const selectedVehicle = useSelector(Selectors.getSelectedVehicle);
    const requests = useSelector(Selectors.getRequestData);
    const tripData = useSelector(Selectors.getTripData)
    console.log('req',requests)
    const enhancedProps = {
        actions: {
            user: {
                actionChangeStatus,
                actionMakeDriverOnline,
                actionMakeDriverOffline,
                actionGetRequests,
                actionCreateTrip,
                actionAcceptTrip
            }
        },
        userData,
        navigation: props.navigation,
        selectedVehicle,
        requests,
        tripData
    }

    return <Home {...enhancedProps} />
}

export default HomeScreen