import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, ActivityIndicator } from 'react-native';
import styles from './Vehicle.styles';
import MenuIcon from '../../assets/images/menu.png';
import CarIcon from '../../assets/images/icons8-car-30.png';
import RouteNames from '../../Navigation/routeNames';
import PlusIcon from '../../assets/images/plus.png';


const handleSelectVehicle = (actions, data, setLoading) => {
    setLoading(true)
    actions.user
        .handleSelectVehicle(data)
        .then(() => {
            setLoading(false)
        })
        .catch((e) => console.log(e))
        .then(() => { });
}

const VehicleItem = ({ item, selected, actions, setLoading }) => {
    return (
        <TouchableOpacity onPress={() => handleSelectVehicle(actions, item, setLoading)} style={selected ? styles.selectedItem : styles.notificationItem} key={item.vehicleId}>
            <View style={styles.notificationContent}>
                <View style={styles.imageIconContainer}>
                    <Image resizeMode="contain" style={styles.imageIcon} source={CarIcon} />
                </View>
                <View style={{ width: '90%', marginTop: 5 }}>
                    <View style={styles.notificationHeader}>
                        <Text style={styles.itemHeaderText} >{`VID: ${item.vehicleId}`}</Text>
                        <Text style={styles.itemHeaderTime}>{`Engine: ${item.vehicleEngineCC}`}</Text>
                    </View>
                    <View style={styles.notificationHeader}>
                        <Text style={styles.itemHeaderDisabled} ><Text style={styles.disabledText}>Reg No: </Text>{item.vehicleRegNumber}</Text>
                        <Text style={styles.itemHeaderDisabled} ><Text style={styles.disabledText}>Sitting Capacity: </Text>{item.vehicleSittingCapacity}</Text>
                    </View>
                </View>
            </View>


        </TouchableOpacity>
    )
}
const handleGetUserVehicle = (actions, driverId, setLoading) => {

    const data = {
        driverId: driverId
    }
    setLoading(true)
    actions.user
        .handleGetVehicle(data)
        .then(() => {
            setLoading(false)
        })
        .catch((e) => console.log(e))
        .then(() => { });
}

// handleSelectVehicle



const Vehicle = ({ actions, navigation, vehicleData, userId, selectedVehicle }) => {
    const [loading, setLoading] = useState(false);
    let data = vehicleData ? vehicleData : [];
    useEffect(() => {
        handleGetUserVehicle(actions, userId, setLoading)
    }, [])


    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => { navigation.toggleDrawer() }} style={styles.menuContainer}>
                    <Image resizeMode="contain" source={MenuIcon} style={styles.menu} />
                </TouchableOpacity>
                <Text style={styles.headerText}>Vehicles</Text>
            </View>
            <View style={styles.contentContainer}>

                <ScrollView >
                    {loading ?
                        <View style={{ justifyContent: 'center', alignItems: 'center',height:500 }}>
                            <ActivityIndicator size="large" color="red" />
                        </View>
                        :
                        data.map((item, index) => <VehicleItem item={item} setLoading={setLoading} key={index} actions={actions} selected={selectedVehicle ? selectedVehicle.vehicleId === item.vehicleId : false} />)}
                </ScrollView>

            </View>
            <View style={styles.botContainer}>
                <View style={styles.botContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate(RouteNames.AddVehicle)} style={styles.addContainer}>
                        <Image style={styles.addButtonText} source={PlusIcon} />
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    )
}

export default Vehicle;