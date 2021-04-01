import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import styles from './AddVehcile.styles';
import { TextInput } from '..'
import BackIcon from '../../assets/images/backBlack.png';
import PlusIcon from '../../assets/images/plus.png';
import { launchImageLibrary } from 'react-native-image-picker';
import { requestCameraPermission, requestExternalWritePermission } from '../../utils/PickerUtility';



const AlertControl = (response) => {
    if (response.didCancel) {
        return;
    } else if (response.errorCode == 'camera_unavailable') {
        alert('UnAvailable Camera');
        return;
    } else if (response.errorCode == 'permission') {
        alert('Permissions not granted');
        return;
    } else if (response.errorCode == 'others') {
        alert('hello others');
        return;
    }
}
const handleSelect = async (setCertificateImg) => {
    let options = {
        mediaType: 'photo',
        maxWidth: 300,
        maxHeight: 550,
        quality: 1,
    };
    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();
    if (isCameraPermitted && isStoragePermitted) {
        launchImageLibrary(options, (response) => {
            AlertControl(response)
            if (!response.didCancel) {
                console.log(response);
                setCertificateImg(response.uri);
            }

        });
    }
}




const handleAddvehicle = async (actions, navigation, setLoading, userId, certificateImg, vehicleRegNumber, vehicleSittingCapacity, vehicleEngineCC) => {
    if (!certificateImg) return;
    let driverImages = [];


    setLoading(true)


    const data = {
        file: certificateImg
    }
    actions.user
        .handleUploadImage(data)
        .then((responseData) => {
            console.log(responseData)
            driverImages.push(responseData.data.Url);
            if (driverImages.length > 0) {
                const createdata = {
                    driverId: userId,
                    vehicleRegNumber,
                    vehicleEngineCC,
                    vehicleSittingCapacity,
                    vehicleRegCertificateImg: responseData.data.Url,
                }
                actions.user
                    .handleCreateVehicle(createdata)
                    .then(() => {
                        setLoading(false)
                        navigation.goBack()
                    })
                    .catch((e) => console.log(e))
                    .then(() => { });
            }
        })
        .catch((e) => console.log(e))
        .then(() => { });

}

const AddVehicle = ({ actions, navigation, userId }) => {

    const [loading, setLoading] = useState(false);
    const [certificateImg, setCertificateImg] = useState(null);
    const [vehicleRegNumber, setVehicleRegNumber] = useState('');
    const [vehicleSittingCapacity, setVehicleSittingCapacity] = useState('');
    const [vehicleEngineCC, setVehicleEngineCC] = useState('');

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                {/* <Image source={backIcon}/> */}
                <TouchableOpacity onPress={() => { navigation.pop() }} style={styles.menuContainer}>
                    <Image resizeMode="contain" source={BackIcon} style={styles.menu} />
                </TouchableOpacity>
                <Text style={styles.headerText}>Add Vehicles</Text>
            </View>
            <View style={styles.contentContainer}>
                <Text style={styles.inputTopLabel}>Vehicle Reg No</Text>
                <TextInput text={vehicleRegNumber} setText={(text) => setVehicleRegNumber(text)} style={styles.input} placeholder="ABC-1234" />
                <Text style={styles.inputLabel} >Sitting Capacity</Text>
                <TextInput text={vehicleSittingCapacity} setText={(text) => setVehicleSittingCapacity(text)} style={styles.input} placeholder="4" />
                <Text style={styles.inputLabel}>Vehicle Engine Capacity</Text>
                <TextInput text={vehicleEngineCC} setText={(text) => setVehicleEngineCC(text)} style={styles.input} placeholder="1200" />
                <Text style={styles.inputLabel}>Select Vehicle Reg Certficate</Text>
                <TouchableOpacity onPress={() => handleSelect(setCertificateImg)} style={styles.uploadContainer}>
                    {!certificateImg ?
                        <Image style={styles.plusIcon} source={PlusIcon} />
                        :
                        <Image style={styles.certificateImg} source={{ uri: certificateImg }} />
                    }
                </TouchableOpacity>
            </View>
            <View style={styles.botContainer}>
                <TouchableOpacity onPress={() => handleAddvehicle(actions, navigation, setLoading, userId, certificateImg, vehicleRegNumber, vehicleSittingCapacity, vehicleEngineCC)} style={styles.addContainer}>
                    {loading ?
                        <ActivityIndicator size="large" color="red" />
                        :
                        <Text style={styles.addButtonText}>SUBMIT</Text>}
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default AddVehicle;