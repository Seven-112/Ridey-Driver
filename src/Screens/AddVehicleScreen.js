import React from 'react';
import AddVehicle from '../Components/AddVehicle';
import { useSelector, useDispatch } from 'react-redux';
import * as Selectors from '../Store/Selectors';
import STORE from '../Store'



const VehicleScreen = (props) => {
    const dispatch = useDispatch();
    const handleUploadImage = (data)=>dispatch(STORE.actions.actionFileUpload(data))
    const handleCreateVehicle = (data) => dispatch(STORE.actions.actionCreateVehicle(data))
    const vehicleError = useSelector(Selectors.getVehicleErrors);
    const userId = useSelector(Selectors.getUserId);
    const enhancedProps = {
        actions: {
            user: {
                handleCreateVehicle,
                handleUploadImage
            }
        },
        navigation: props.navigation,
        vehicleError,
        userId
    }
    return <AddVehicle {...enhancedProps} />
}

export default VehicleScreen;