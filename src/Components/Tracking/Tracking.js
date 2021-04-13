import React, { useRef, useState, useEffect,useMemo } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import Geocoder from "react-native-geocoding";
import MapViewDirections from "react-native-maps-directions";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import styles from "./Tracking.styles";
import COLORS from "../../Constants/Theme/Color";
import kEYS from "../../Constants/appConstants/Global";
import RouteNames from "../../Navigation/routeNames";
import person from "../../assets/images/dummyUser.jpg";
import carImage from "../../assets/images/cars/UberX.jpeg";
import StarIcon from "../../assets/images/star.png";
import chatIcon from "../../assets/images/chat.png";
import callIcon from "../../assets/images/call.png";
import MapPin from "../../assets/images/mapPin.png";
import LocationIcon from "../../assets/images/current-location.png";
import { socket } from "../../Store/store";
import GeoLocation from "react-native-geolocation-service";

const getCurrentTrip = (actions, request, setLoading) => {
  console.log('request',request)
  const data = {
    tripId: request.requestId,
  };
  actions
    .actionGetCurrentTrip(data)
    .then(() => {
      setLoading(false);
    })
    .catch((e) => console.log(e))
    .then(() => {});
};

const Tracking = ({
  navigation,
  requestData,
  requestError,
  requestStatus,
  tripData,
  actions,
  userInfo
}) => {
  // const userInfo = {
  //   roomId: data.roomId,
  //   userLat: data.tripData.userLat,
  //   userLng: data.tripData.userLong,
  // };
  console.log("request data from tracking", tripData);
  const destinationAddress = tripData &&  tripData.destination ? tripData.destination : '';
  const sourceAddress = tripData && tripData.destination ? tripData.source : '';

  const source = tripData &&  tripData.driverInitialCoords.latitude ? tripData.driverInitialCoords.latitude: {};
  const destinaton = tripData && tripData.driverInitialCoords.longitude
    ? tripData.driverInitialCoords.longitude
    : {};
  const mapRegion = tripData ?  {
    latitude:userInfo.userLat,
    longitude:userInfo.userLng,
    latitudeDelta:1,
    longitudeDelta:1
  }:{
  
    latitude:userInfo.userLat,
    longitude:userInfo.userLng,
    latitudeDelta:1,
    longitudeDelta:1
  }
  const selectedItem = requestData &&  requestData.selected ? requestData.selected : {};
  const distance = tripData.distance ? tripData.distance : 0;
  const time = tripData.time ? tripData.time : 10;
  const fare = tripData.fare ? tripData.fare : 0;
  let mapRef = useRef(null);

  Geocoder.init(kEYS.GEO_CODER_KEY, { language: "en" });
  31.470739629384877, 74.27279481051957;
  const [sourcelocation, setSourceLocation] = useState({
    latitude: source.latitude || 31.470739629384877,
    longitude: source.longitude || 74.27279481051957,
  });
  const [destinatonlocation, setDestinationLocation] = useState({
    latitude: userInfo.userLat || 31.470739629384877,
    longitude: userInfo.userLng || 74.27279481051957,
  });

  const [tripCompleted, setTripCompleted] = useState(false);
  const [region, setRegion] = useState(mapRegion);
  const [loading, setLoading] = useState(false);
  useEffect(()=>{
   ()=> getCurrentTrip(actions,requestData,setLoading)
  },[requestData])
  useEffect(()=>{
    const sendLiveLocation = setInterval(()=>{
      GeoLocation.getCurrentPosition((position)=>{
        const { latitude, longitude } = position.coords;
        const data = {
          latitude:latitude,
          longitude:longitude
        }
   socket.emit('location',data)
      },(error)=>{console.log(error)},{  
        enableHighAccuracy: true,
        timeout: 60000, // 1 min (1000 ms * 60 sec * 1 minute = 60 000ms)
        maximumAge: 1000 * 3600 * 24, // 24 hour})
    },10000)
   
  })
  return ()=>sendLiveLocation;
})

  return (
    <View style={styles.container}>
      <MapView
        pitchEnabled={true}
        ref={mapRef}
        showsCompass={true}
        showsUserLocation={true}
        provider={PROVIDER_GOOGLE}
        followsUserLocation={true}
        style={styles.map}
        initialRegion={region}
      >
        <Marker
          coordinate={{
            latitude: sourcelocation.latitude,
            longitude: sourcelocation.longitude,
          }}
          title="source Location"
          icon={LocationIcon}
        ></Marker>
        <Marker
          coordinate={{
            latitude: destinatonlocation.latitude,
            longitude: destinatonlocation.longitude,
          }}
          title="destination Location"
          icon={MapPin}
        ></Marker>
        <MapViewDirections
          origin={sourcelocation}
          destination={destinatonlocation}
          apikey={"AIzaSyBTfypSbx_zNMhWSBXMTA2BJBMQO7_9_T8"}
          strokeWidth={4}
          strokeColor={COLORS.SECONDARY_BLACK}
          precision="high"
          lineCap="butt"
        />
      </MapView>
      {loading ? (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" color="red" />
        </View>
      ) : (
        <View style={styles.bottomContainer}>
          <View style={styles.headerBottom}>
            <View style={styles.profileImageContainer}>
              <Image
                resizeMode="contain"
                style={{ width: 60, height: 60 }}
                source={person}
              />
            </View>
            <View style={styles.profileContent}>
              <Text style={styles.headerText}>{tripData.driver.name}</Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image style={styles.icons} source={StarIcon} />
                <Text style={{ marginHorizontal: 2 }}>4.9</Text>
              </View>
            </View>
            <View style={{ flexDirection: "row" }}>
              <View style={styles.chatContainer}>
                <Image style={styles.icons} source={chatIcon} />
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate(RouteNames.Call)}
                style={styles.callContainer}
              >
                <Image style={styles.icons} source={callIcon} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.bottomContent}>
            <View style={styles.pointContainer}>
              <View style={styles.locationShowContainer}>
                <Image style={styles.icons} source={LocationIcon} />
                <Text style={{ marginHorizontal: 10, fontSize: 15 }}>
                  {sourceAddress}
                </Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.locationShowContainer}>
                <Image style={styles.mapPin} source={MapPin} />
                <Text style={{ marginHorizontal: 10 }}>
                  {destinationAddress}
                </Text>
              </View>
              <View style={styles.divider} />
            </View>
            <View style={styles.carContainer}>
              <Image
                resizeMode="contain"
                style={styles.carImage}
                source={carImage}
              />
              <View style={styles.textContentContainer}>
                <View style={styles.textContainer}>
                  <Text style={{ color: COLORS.DISABLED_TEXT_GREY }}>
                    DISTANCE
                  </Text>
                  <Text>{`${parseInt(distance)} KM`}</Text>
                </View>
                <View style={styles.textContainer}>
                  <Text style={{ color: COLORS.DISABLED_TEXT_GREY }}>TIME</Text>
                  <Text>{`${parseInt(time)} min`}</Text>
                </View>
                <View style={styles.textContainer}>
                  <Text style={{ color: COLORS.DISABLED_TEXT_GREY }}>
                    PRICE
                  </Text>
                  <Text>{`${fare}`}</Text>
                </View>
              </View>
            </View>
          </View>
          <TouchableOpacity
            // onPress={() => navigation.pop(3)}
            // onPress={() => navigation.navigate(RouteNames.Payment)}
            style={styles.buttonContainer}
          >
            <Text style={{ fontSize: 18 }}>Directions</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};
export default Tracking;
