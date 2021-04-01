import { combineReducers } from 'redux';
import authReducer from './Auth';
import requestReducer from './Request';
import tripReducer from './Trip';
import paymentReducer from './Payment';
import vehicleReducer from './Vehicle';

export const reducer = combineReducers({
    auth: authReducer,
    request: requestReducer,
    trip: tripReducer,
    payment: paymentReducer,
    vehicle:vehicleReducer
})

