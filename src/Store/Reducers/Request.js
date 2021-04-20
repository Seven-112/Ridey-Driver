import {
    GET_ALL_REQUEST,
    GET_REQUEST,
    CREATE_REQUEST,
    CLEAR_REQUEST_ERROR,
    GET_NEARBY_DRIVERS,
    MAKE_DRIVER_ONLINE,
    MAKE_DRIVER_OFFLINE,
    GET_ACCPEPTNG_ID
} from '../Actions/Request'

const initialState = {
    requestData: null,
    error: null,
    success: false,
    driverData:null,
    acceptingRequestId:null
};


export default (state = initialState, action) => {

    switch (action.type) {
        case MAKE_DRIVER_ONLINE: 
        return {
            ...state,
            error: action.error,
            success: action.success
        }
        case MAKE_DRIVER_OFFLINE: 
        return {
            ...state,
            error: action.error,
            success: action.success
        }

        case CREATE_REQUEST:
            return {
                ...state,
                error: action.error,
                success: action.success
            }
        case GET_REQUEST:
            return {
                ...state,
                requestData: action.requestData,
                error: action.error,
                success: action.success
            }
        case GET_ACCPEPTNG_ID:
            return {
                ...state,
                acceptingRequestId: action.requestData,
                error: action.error,
                success: action.success
            }
        case GET_ALL_REQUEST:
            return {
                ...state,
                requestData: action.data,
                error: action.error,
                success: action.success
            }
        case GET_NEARBY_DRIVERS:
            return {
                ...state,
                driverData: action.driverData,
                error: action.error,
                success: action.success
            }
        case CLEAR_REQUEST_ERROR:
            return {
                ...state,
                error: null

            }
        default:
            return state;
    }
}