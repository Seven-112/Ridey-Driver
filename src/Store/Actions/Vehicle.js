import actions from '../../api'
export const CREATE_VEHICLE = 'CREATE_VEHICLE';
export const GET_VEHICLE = 'GET_VEHICLE';
export const GET_VEHICLE_BY_REGNO = 'GET_VEHICLE_BY_REGNO';
export const CLEAR_VEHICLE_ERROR = 'CLEAR_VEHICLE_ERROR';
export const SELECT_VEHICLE = 'SELECT_VEHICLE';




export const actionCreateVehicle = (data) => {
    return async dispatch => {
        const response = await actions.createNetworkRequest('POST', 'createVehicle', data);
        dispatch({ 
            type: CREATE_VEHICLE,
            error:response.message,
            success:response.success,
            data:response.data 
        })
    }
}
export const actionSelectVehicle = (data) => {
    return async dispatch => {
        dispatch({ 
            type: SELECT_VEHICLE,
            data:data 
        })
    }
}






export const actionGetUserVehicle = (data) => {
    return async dispatch => {
        const response = await actions.createNetworkRequest('POST', 'getVehicle', data);
        dispatch({ 
            type: GET_VEHICLE,
            data:response.data,
            error:response.message,
            success:response.success 
        })
    }
}

export const actionGetVehiclebyRegNo = (data) => {
    return async dispatch => {
        const response = await actions.createNetworkRequest('POST', 'getVehicleByRegNo', data);
        dispatch({ 
            type: GET_VEHICLE_BY_REGNO,
            data:response.data,
            error:response.message,
            success:response.success 
        })
    }
}


export const clearVehicleError = () => {
    return async dispatch => {
        dispatch({ 
            type: CLEAR_VEHICLE_ERROR,
        })
    }
}


