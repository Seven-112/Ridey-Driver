import React from 'react';
import Vehicle from '../Components/Vehicle';
import VehicleMock from '../Mocks/VehicleMocks'
import { useSelector, useDispatch } from 'react-redux';
import * as Selectors from '../Store/Selectors';
import STORE from '../Store'


const VehicleScreen = (props) => {
    const dispatch = useDispatch();
    const vehicleData = useSelector(Selectors.getVehicleData);
    const userId = useSelector(Selectors.getUserId);
    const selectedVehicle = useSelector(Selectors.getSelectedVehicle);
    const handleGetVehicle = (data) => dispatch(STORE.actions.actionGetUserVehicle(data));
    const handleSelectVehicle = (data) => dispatch(STORE.actions.actionSelectVehicle(data));
    const enhancedProps = {
        actions: {
            user: {
                handleGetVehicle,
                handleSelectVehicle
            }
        },
        navigation: props.navigation,
        vehicleData,
        userId,
        selectedVehicle
    }
    return <Vehicle {...enhancedProps} />
}

export default VehicleScreen;