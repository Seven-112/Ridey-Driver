import React from 'react';
import {
    VehicleScreen,
    AddVehicleScreen,
} from '../../Screens';
import RouteNames from '../routeNames';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const VehicleStack = () => (
    <Stack.Navigator headerMode="none">
        <Stack.Screen name={RouteNames.Vehicle} component={VehicleScreen} />
        <Stack.Screen name={RouteNames.AddVehicle} component={AddVehicleScreen} />
    </Stack.Navigator>
)
export default VehicleStack;
