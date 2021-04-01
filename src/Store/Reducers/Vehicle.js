import {
    CLEAR_VEHICLE_ERROR,
    GET_VEHICLE,
    CREATE_VEHICLE,
    GET_VEHICLE_BY_REGNO,
    SELECT_VEHICLE
} from '../Actions/Vehicle'

const initialState = {
    vehicleData: null,
    specificVehicle: null,
    selectedVehicle: null,
    error: null,
    success: false,
};


export default (state = initialState, action) => {

    switch (action.type) {

        case CREATE_VEHICLE:
            return {
                ...state,
                vehicleData: action.data,
                error: action.error,
                success: action.success
            }

        case SELECT_VEHICLE:
            return {
                ...state,
                selectedVehicle: { ...action.data },
            }
        case GET_VEHICLE_BY_REGNO:
            return {
                ...state,
                specificVehicle: action.data,
                error: action.error,
                success: action.success
            }
        case GET_VEHICLE:
            return {
                ...state,
                vehicleData: action.data,
                error: action.error,
                success: action.success
            }
        case CLEAR_VEHICLE_ERROR:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}