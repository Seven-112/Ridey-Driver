import Constants from '../../Constants/appConstants/Global';

export const getUrl = (type) => {
    let url = '';

    switch (type) {
        case 'login':
            return url = `${Constants.URL}/driver/login`;
        case 'signup':
            return url = `${Constants.URL}/driver/signup`
        case 'fileUpload':
            return url = `${Constants.URL}/fileUpload/upload`
        case 'forgetPassword':
            return url = `${Constants.URL}/user/login`
        case 'online':
            return url = `${Constants.URL}/driver/online`
        case 'offline':
            return url = `${Constants.URL}/driver/offline`
        case 'getRequest':
            return url = `${Constants.URL}/request/getRequest`
        case 'getUserRequest':
            return url = `${Constants.URL}/request/getRequest/user`
        case 'getAllUserRequest':
            return url = `${Constants.URL}/request/getRequest/user`
        case 'getNearBy':
            return url = `${Constants.URL}/driver/getNearByDriver/`
        case 'createTrip':
            return url = `${Constants.URL}/trip/addTrip`
        case 'acceptTrip':
            return url = `${Constants.URL}/trip/acceptTrip`
        case 'getTrip':
            return url = `${Constants.URL}/trip/getTrip/driver`
        case 'getCurrentTrip':
                return url = `${Constants.URL}/trip/getTrip/specific`
        case 'completeTrip':
            return url = `${Constants.URL}/trip/completeTrip`
        case 'addCard':
            return url = `${Constants.URL}/card/registerPaymentCard`
        case 'getCard':
            return url = `${Constants.URL}/card/getPaymentCard`
        case 'deletePaymetCard':
            return url = `${Constants.URL}/card/deletePaymentCard`
        case 'makeTransaction':
            return url = `${Constants.URL}/Transaction/makeTransaction`
        case 'getTransaction':
            return url = `${Constants.URL}/Transaction/getTransaction`
        case 'createVehicle':
            return url = `${Constants.URL}/vehicle/newVehicle`
        case 'getVehicle':
            return url = `${Constants.URL}/vehicle/getVehicle/driver`
        case 'getVehicleByRegNo':
            return url = `${Constants.URL}/vehicle/getVehicle/RegNo`
        default:
            break;
    }
};
