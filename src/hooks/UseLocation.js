import React, { useState, useEffect } from 'react';
import { PERMISSIONS, request, check, } from 'react-native-permissions';
import GeoLocation from '@react-native-community/geolocation';




const useLocation = () => {

    const [currentLocation, setCurrentLocation] = useState();
    const [locationError, setLocationError] = useState('');
    const [granted, setGranted] = useState(false);

    const handleLocationPermissions = async () => {
        const res = await check(PERMISSIONS.IOS.LOCATION_ALWAYS);
        if (res === 'granted') {
            setGranted(true)
        } else if (res === 'denied') {
            const res2 = await request(PERMISSIONS.IOS.LOCATION_ALWAYS);
            setGranted(false)
        }
    };

  
    const handleSuccess = position => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({
            latitude,
            longitude
        });
    };

    const handleError = error => {
        setLocationError(error.message);
    };

    const geolocationOptions = {
        enableHighAccuracy: true,
        timeout: 60000, // 1 min (1000 ms * 60 sec * 1 minute = 60 000ms)
        maximumAge: 1000 * 3600 * 24 // 24 hour
    };

    useEffect(() => {
        handleLocationPermissions()
    },[])
    // useEffect(() => {
    //     if (granted) {
    //         GeoLocation.getCurrentPosition(handleSuccess, handleError, geolocationOptions)
    //     }
       
    // }, [])

    // console.log("location use hook",currentLocation,locationError)
    // return { currentLocation, locationError }
};
export default useLocation;