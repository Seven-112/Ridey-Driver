import actions from '../../api'
export const MAKE_DRIVER_ONLINE = 'MAKE_DRIVER_ONLINE';
export const MAKE_DRIVER_OFFLINE = 'MAKE_DRIVER_OFFLINE';
export const GET_REQUEST = 'GET_REQUEST';
export const GET_ALL_REQUEST = 'GET_ALL_REQUEST';
export const CLEAR_REQUEST_ERROR = 'CLEAR_REQUEST_ERROR';
export const GET_NEARBY_DRIVERS = 'GET_NEARBY_DRIVERS';
export const GET_ACCPEPTNG_ID = 'GET_ACCPEPTNG_ID';

export const actionCreateRequest = (data) => {
    return async dispatch => {
        const response = await actions.createNetworkRequest('POST', 'request', data);
        console.log(response);
        dispatch({ 
            type: CREATE_REQUEST,
            error:response.message,
            success:response.success 
        })
    }
}
export const actionMakeOnlineDriver = (data) => {
    return async dispatch => {
        const response = await actions.createNetworkRequest('POST', 'online', data);
        console.log(response);
        dispatch({ 
            type: MAKE_DRIVER_ONLINE,
            error:response.message,
            success:response.success 
        })
    }
}
export const actionMakeOfflineDriver = (data) => {
    return async dispatch => {
        const response = await actions.createNetworkRequest('POST', 'offline', data);
        console.log(response);
        dispatch({ 
            type: MAKE_DRIVER_OFFLINE,
            error:response.message,
            success:response.success 
        })
    }
}

export const actionGetNearByDriversRequest = (data) => {
    return async dispatch => {
        const response = await actions.createNetworkRequest('POST', 'getNearBy', data);
        console.log(response);
        dispatch({ 
            type: GET_NEARBY_DRIVERS,
            driverData:response.data,
            error:response.message,
            success:response.success 
        })
    }
}
export const actionGetUserRequest = (data) => {
    return async dispatch => {
        const response = await actions.createNetworkRequest('POST', 'getAllUserRequest', data);
        console.log(response);
        dispatch({ 
            type: GET_REQUEST,
            data:response.data[0],
            error:response.message,
            success:response.success 
        })
    }
}
export const actionGetAcceptingRequest = (data) => {
    return async dispatch => {
        const response = await actions.createNetworkRequest('POST', 'getAllUserRequest', data);
        console.log(response);
        dispatch({ 
            type: GET_ACCPEPTNG_ID,
            data:response.data[0],
            error:response.message,
            success:response.success 
        })
    }
}
export const actionGetAllRequest = (data) => {
    return async dispatch => {
        const response = await actions.createNetworkRequest('POST', 'getRequest', data);
        console.log(response);
        dispatch({ 
            type: GET_ALL_REQUEST,
            data:response.data,
            error:response.message,
            success:response.success 
        })
    }
}

export const clearRequestError = () => {
    return async dispatch => {
        dispatch({ 
            type: CLEAR_REQUEST_ERROR,
        })
    }
}


