import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Switch,
  Alert,
  Dimensions,
  Platform,
} from "react-native";
import MapView, {
  Marker,
  PROVIDER_GOOGLE,
  AnimatedRegion,
} from "react-native-maps";
import GeoLocation from "@react-native-community/geolocation";
import styles from "./Home.styles";
import COLORS from "../../Constants/Theme/Color";
import vehicleIcon from "../../assets/images/icons8-car-30.png";
import clock from "../../assets/images/icons8-clock-24.png";
import document from "../../assets/images/icons8-regular-document-24.png";
import MapPin from "../../assets/images/mapPin.png";
import dummyUser from "../../assets/images/dummyUser.jpg";
import CurrentLocation from "../../assets/images/current-location.png";
import MenuIcon from "../../assets/images/menu.png";
import Geocoder from "react-native-geocoding";
import Constants from "../../Constants/appConstants/Global";
import { mapStyle } from "../../utils/mapStyle";
import { socket } from "../../Store/store";
import RouteNames from "../../Navigation/routeNames";
import useLocation from "../../hooks/UseLocation";

//requestData
//  date:`${new Date().getDay()}-${new Date().getMonth()}-${new Date().getFullYear()}`,
//  userId:user.userId,
//  user:user,
//  source:requestData.address.pickup,
//  destination:requestData.address.destination,
//  distance:requestData.selected.distance,
//  status:'Pending'
const screen = Dimensions.get("window");
const AspectRatio = screen.width / screen.height;
const latitudeDelta = 0.9222;
const longitudeDelta = latitudeDelta * AspectRatio;
const RenderRequest = ({
  driverData,
  requestData,
  actions,
  setLoading,
  vehicle,
  userData,
  setAccepted,
  location,
}) => {
  return (
    <View style={styles.bottomRequestView}>
      <View style={styles.topbar} />
      <View style={styles.topContainer}>
        <View style={styles.profileImage}>
          <Image
            style={{ width: 50, height: 50 }}
            source={requestData.user.profileImg}
          />
        </View>
        <View style={styles.headingContainer}>
          <View style={styles.headContainer}>
            <Text style={styles.topHeading}>{requestData.user.name}</Text>
            <Text
              style={styles.topHeading}
            >{`${requestData.distance} Km`}</Text>
          </View>
          <View style={styles.headContainer}>
            <Text style={styles.botHeading}>{requestData.date}</Text>
            <Text style={styles.botHeading}>{requestData.status}</Text>
          </View>
        </View>
      </View>
      <View style={styles.botRequestContainer}>
        <View style={styles.detailRequestContainer}>
          <Text style={styles.detailHeading}>Source Address</Text>
          <Text style={styles.detailbotRequest}>{requestData.source}</Text>
        </View>
        <View style={styles.detailRequestContainer}>
          <Text style={styles.detailHeading}>Destination Address</Text>
          <Text style={styles.detailbotRequest}>{requestData.destination}</Text>
        </View>
      </View>
      <View style={styles.botButtonContainer}>
        <TouchableOpacity style={styles.rejectButton} onPress={() => {}}>
          <Text>Reject</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.acceptButton}
          onPress={() =>
            handleAccepRequest(
              actions,
              driverData,
              vehicle,
              setLoading,
              setAccepted,
              requestData,
              userData,
              location
            )
          }
        >
          <Text>Accept</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const handelOffline = (
  actions,
  userData,
  setLoading,
  setOnline,
  setAccepted
) => {
  const data = {
    driverId: userData.driverId,
  };
  setLoading(true);
  actions.user
    .actionMakeDriverOffline(data)
    .then(() => {
      setLoading(false);
      setOnline(false);
      setAccepted(false);
    })
    .catch((e) => console.log(e))
    .then(() => {});
};

const handleOnline = (
  selectedVehicle,
  userData,
  actions,
  setOnline,
  online,
  setLoading
) => {
  if (!selectedVehicle) {
    Alert.alert("Kindly Select Vehicle to Go Online With");
  } else {
    const data = {
      driverId: userData.driverId,
      vehicleId: selectedVehicle.vehicleId,
      latitude: '31.4515431',
      longitude: '74.3949027',
      location: "test",
      vehicle: selectedVehicle,
      driver: userData,
    };
    setLoading(true);
    actions.user
      .actionMakeDriverOnline(data)
      .then(() => {
        setLoading(false);
        setOnline(true);
        // actions.user.actionGetRequests().then(() => {
        //   setLoading(false);
        //   setOnline(true);
        // });
      })
      .catch((e) => console.log(e))
      .then(() => {});
  }
};
const handleAccepRequest = async (
  actions,
  driver,
  vehicle,
  setLoading,
  setAccepted,
  item,
  userData,
  location
) => {
 
  const data = {
    driverId: driver[0].driverId,
    fare: "33",
    status: "Accepted",
    vehicle: vehicle,
    driver: driver[0].driver,
    userId: item.userId,
    driverLat: location.latitude,
    driverLong: location.longitude,
    userLat: item.sourcelocation.latitude,
    userLong: item.sourcelocation.longitude,
  };
  console.log("trip Accept Data", data);
  setLoading(true);
  actions.user.actionGetAcceptingRequest({userId:item.userId}).then(()=>{
    actions.user
    .actionCreateTrip(data)
    .then(() => {
      
      socket.emit("AcceptRequest", {...data,userData,item});
      setLoading(false);
      setAccepted(true);
      // actions.user.actionAcceptTrip(data).then(() => {
      // socket.emit("AcceptRequest", data);
      //   setLoading(false);
      //   setAccepted(true);
      // });
    })
    .catch((e) => console.log(e))
    .then(() => {});
  }).catch((e) => console.log(e))
    .then(() => {});

};

const Home = ({
  navigation,
  actions,
  userData,
  selectedVehicle,
  requests,
  tripData,
}) => {
  Geocoder.init("AIzaSyBTfypSbx_zNMhWSBXMTA2BJBMQO7_9_T8", { language: "en" });
  const requestData = requests ? requests : [];
  console.log(requestData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [location, setLocation] = useState();
  const [accepted, setAccepted] = useState(false);
  const [rideRequest, setRideRequest] = useState(null);
  const [region, setRegion] = useState({
    latitude: 31.481084,
    longitude: 74.311172,
    latitudeDelta: latitudeDelta,
    longitudeDelta: longitudeDelta,
  });
  const [online, setOnline] = useState(false);
  let mapRef = useRef(null);
  let markerRef = useRef(null);

  const onUserLocationChange = async (event) => {
    const { latitude, longitude, heading } = event.nativeEvent.coordinate;
    try {
      setLocation({
        latitude,
        longitude,
      });
      setRegion({
        latitude,
        longitude,
        latitudeDelta,
        longitudeDelta,
      });
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    socket.on("IncomingRequest", (incoming) => {
      console.log("incoming data", incoming);
      setRideRequest(incoming);
    });
    socket.on("roomConnected", (data) => {
      console.log(data);
      const userInfo = {
        roomId: data.roomId,
        userLat: data.tripData.userLat,
        userLng: data.tripData.userLong,
      };
      setRideRequest(null);
      setAccepted(false);
      setOnline(false);
      navigation.navigate(RouteNames.Tracking, {
        userInfo: userInfo,
      });
    });
    return ()=>{
      socket.off("IncomingRequest")
    }
  });
  const handleSuccess = (position) => {
    const { latitude, longitude } = position.coords;
    mapRef.current.animateCamera(
      {
        center: {
          latitude: latitude,
          longitude: longitude,
        },
        zoom: 16,
      },
      { duration: 500 }
    );
    setLocation({
      latitude: longitude,
      longitude: longitude,
    });
    setRegion({
      latitude,
      longitude,
      latitudeDelta,
      longitudeDelta,
    });
    console.log("location", position.coords);

  };

  const handleError = (error) => {
    console.log(error)
    // setLocationError(error.message);
  };
  const geolocationOptions = {
    enableHighAccuracy: true,
    timeout: 60000, // 1 min (1000 ms * 60 sec * 1 minute = 60 000ms)
    maximumAge: 1000 * 3600 * 24, // 24 hour
  };

  useEffect(() => {
    GeoLocation.getCurrentPosition(
      handleSuccess,
      handleError,
      geolocationOptions
    );
  
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        loadingEnabled={true}
        ref={mapRef}
         minZoomLevel={16}
        // maxZoomLevel={20}
        onUserLocationChange={onUserLocationChange}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        showsScale={true}
        initialRegion={region}
        customMapStyle={mapStyle}
        showsUserLocation={true}
      >
        {!loading && (
          <Marker.Animated
            ref={markerRef}
            coordinate={{
              latitude: region.latitude,
              longitude: region.longitude,
            }}
            title="Current Location"
            tracksViewChanges={false}
          >
            <Image source={MapPin} style={{width:60,height:60}}/>
          </Marker.Animated>
        )}
      </MapView>
      <View style={styles.profileContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.toggleDrawer();
          }}
          style={styles.menuContainer}
        >
          <Image resizeMode="contain" source={MenuIcon} style={styles.menu} />
        </TouchableOpacity>
        <Switch
          trackColor={{ false: COLORS.WHITE, true: COLORS.SECONDARY_ORANGE }}
          thumbColor={online ? COLORS.WHITE : COLORS.BLACK}
          onValueChange={
            !online
              ? () =>
                  handleOnline(
                    selectedVehicle,
                    userData,
                    actions,
                    setOnline,
                    online,
                    setLoading
                  )
              : () =>
                  handelOffline(
                    actions,
                    userData,
                    setLoading,
                    setOnline,
                    setAccepted
                  )
          }
          value={online}
        />
      </View>
      {loading && (
        <View style={{ justifyContent: "center", flex: 1 }}>
          <ActivityIndicator size="large" color={COLORS.SECONDARY_ORANGE} />
        </View>
      )}
      <TouchableOpacity
        onPress={() =>
          mapRef.current.animateCamera({})
          // mapRef.current.animateCamera({center:region})
        }
        style={styles.currentLocation}
      >
        <Image
          style={{
            height: 25,
            width: 25,
            backgroundColor: "white",
            padding: 10,
          }}
          source={CurrentLocation}
        />
      </TouchableOpacity>
      {/* requestData: requestData,
      userData:user,
      driverData:driverData */}
      {!accepted && online && rideRequest ? (
        <RenderRequest
          actions={actions}
          vehicle={selectedVehicle}
          setLoading={setLoading}
          setAccepted={setAccepted}
          userData={rideRequest.userData}
          driverData={rideRequest.driverData}
          requestData={rideRequest.requestData}
          location={location}
        />
      ) : accepted && online && rideRequest ? (
        <View style={styles.bottomView}>
          <View style={styles.topbar} />
          <View style={styles.topContainer}>
          <View style={styles.profileImage}>
              <Image style={{ width: 50, height: 50 }} source={dummyUser} />
            </View>
            <View style={styles.headingContainer}>
              <View style={styles.headContainer}>
                <Text style={styles.topHeading}>{userData.name}</Text>
              </View>
              <View style={styles.headContainer}>
                <Text style={styles.botHeading}>Basic Level</Text>
              </View>
            
            </View>
          
          </View>
          <View style={styles.headNextContainer}>
                <Text style={styles.topHeadingUser}>CONNECTING WITH USER</Text>
                <ActivityIndicator size="large" color={COLORS.SECONDARY_ORANGE
                }/>
              </View>
        </View>
      ) : (
        <View style={styles.bottomView}>
          <View style={styles.topbar} />
          <View style={styles.topContainer}>
            <View style={styles.profileImage}>
              <Image style={{ width: 50, height: 50 }} source={dummyUser} />
            </View>
            <View style={styles.headingContainer}>
              <View style={styles.headContainer}>
                <Text style={styles.topHeading}>{userData.name}</Text>
                <Text style={styles.topHeading}>$325</Text>
              </View>
              <View style={styles.headContainer}>
                <Text style={styles.botHeading}>Basic Level</Text>
                <Text style={styles.botHeading}>Earned</Text>
              </View>
            </View>
          </View>
          <View style={styles.botContainer}>
            <View style={styles.detailContainer}>
              <Image style={styles.detailImage} source={clock} />
              <Text style={styles.detailHeading}>20.3</Text>
              <Text style={styles.detailbot}>HOURS</Text>
            </View>
            <View style={styles.detailContainer}>
              <Image style={styles.detailImageCar} source={vehicleIcon} />
              <Text style={styles.detailHeading}>2</Text>
              <Text style={styles.detailbot}>VEHCILES</Text>
            </View>
            <View style={styles.detailContainer}>
              <Image style={styles.detailImage} source={document} />
              <Text style={styles.detailHeading}>3</Text>
              <Text style={styles.detailbot}>JOBS</Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default Home;
