import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Switch,
  Alert,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
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

const RenderRequest = ({
  item,
  actions,
  setLoading,
  vehicle,
  userData,
  setAccepted,
}) => {
  item = item ? item : {};
  if (item) {
    console.log("item",item.user)
    return (
      <View style={styles.bottomRequestView}>
        <View style={styles.topbar} />
        <View style={styles.topContainer}>
          <View style={styles.profileImage}>
            <Image style={{ width: 50, height: 50 }} source={dummyUser} />
          </View>
          <View style={styles.headingContainer}>
            <View style={styles.headContainer}>
              <Text style={styles.topHeading}>{item.user.name}</Text>
              <Text style={styles.topHeading}>{`${item.distance} Km`}</Text>
            </View>
            <View style={styles.headContainer}>
              <Text style={styles.botHeading}>{item.date}</Text>
              <Text style={styles.botHeading}>{item.status}</Text>
            </View>
          </View>
        </View>
        <View style={styles.botRequestContainer}>
          <View style={styles.detailRequestContainer}>
            <Text style={styles.detailHeading}>Source Address</Text>
            <Text style={styles.detailbotRequest}>{item.source}</Text>
          </View>
          <View style={styles.detailRequestContainer}>
            <Text style={styles.detailHeading}>Destination Address</Text>
            <Text style={styles.detailbotRequest}>{item.destination}</Text>
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
                userData,
                vehicle,
                setLoading,
                setAccepted,
                item
              )
            }
          >
            <Text>Accept</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
};

const handelOffline = (actions, userData, setLoading, setOnline,setAccepted) => {
  const data = {
    driverId: userData.driverId,
  };
  setLoading(true);
  actions.user
    .actionMakeDriverOffline(data)
    .then(() => {
      setLoading(false);
      setOnline(false);
      setAccepted(false)
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
      latitude: "31.4515431",
      longitude: "74.3949027",
      location: "test",
      vehicle: selectedVehicle,
      driver: userData,
    };
    setLoading(true);
    actions.user
      .actionMakeDriverOnline(data)
      .then(() => {
        // setLoading(false);
        // setOnline(true);
        actions.user.actionGetRequests().then(() => {
          setLoading(false);
          setOnline(true);
        });
      })
      .catch((e) => console.log(e))
      .then(() => {});
  }
};
const handleAccepRequest = (
  actions,
  driver,
  vehicle,
  setLoading,
  setAccepted,
  item
) => {
  // actionCreateTrip,
  // actionAcceptTrip
  const data = {
    driverId: driver.driverId,
    fare: "33",
    status: "Accepted",
    vehicle: vehicle,
    driver: driver,
    userId: item.userId,
  };
  setLoading(true);
  actions.user
    .actionCreateTrip(data)
    .then(() => {
      socket.emit("AcceptRequest", data);
      // setAccepted(true);
      // setLoading(false);
      actions.user.actionAcceptTrip(data).then(() => {
        socket.emit("AcceptRequest", data);
        setLoading(false);
        setAccepted(true);
      });
    })
    .catch((e) => console.log(e))
    .then(() => {});
};

const Home = ({ navigation, actions, userData, selectedVehicle, requests }) => {

  useEffect(() => {

      socket.on("IncomingRequest", (incoming) => {
        console.log("incoming data", incoming);
        setRideRequest(incoming);
        console.log(rideRequest);
      });
    
    
  
    // socket.on("pendingRequest", (socketObj) => {
    //   console.log("inconming data", socketObj);
    // });
    //   socket.on("IncomingRequest", (requestData) => {
    //     console.log("inconming data", requestData);
    //     requests = [...requestData]
    //   });
    //   socket.on("pendingRequest", (pendingData) => {
    //     console.log("pending data", pendingData);
    //   });
  });

  Geocoder.init("AIzaSyBTfypSbx_zNMhWSBXMTA2BJBMQO7_9_T8", { language: "en" });
  const requestData = requests ? requests : [];
  console.log(requestData)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [location, setLocation] = useState();
  const [accepted, setAccepted] = useState(false);
  const [rideRequest, setRideRequest] = useState(null);
  const [region, setRegion] = useState({
    latitude: 31.481084,
    longitude: 74.311172,
  });


  const [online, setOnline] = useState(false);
  let mapRef = useRef(null);

  const onUserLocationChange = async (event) => {
    const { latitude, longitude, heading } = event.nativeEvent.coordinate;
    try {
      setLocation({
        latitude,
        longitude,
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        loadingEnabled={true}
        ref={(mapref) => (mapRef = mapref)}
        minZoomLevel={16}
        maxZoomLevel={20}
        onUserLocationChange={onUserLocationChange}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        showsScale={true}
        initialRegion={{
          latitude: location ? location.latitude : region.latitude,
          longitude: location ? location.longitude : region.longitude,
          latitudeDelta: 1,
          longitudeDelta: 1,
        }}
        customMapStyle={mapStyle}
      >
        {!loading && (
          <Marker
            coordinate={{
              latitude: region.latitude,
              longitude: region.longitude,
            }}
            title="Current Location"
            tracksViewChanges={false}
            icon={MapPin}
          ></Marker>
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
              : () => handelOffline(actions, userData, setLoading, setOnline,setAccepted)
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
        onPress={() => mapRef.animateCamera({ center: region })}
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
      {!accepted && online && requestData.length > 0 ? (
        requestData.map((item)=> <RenderRequest
        actions={actions}
        userData={userData}
        vehicle={selectedVehicle}
        setLoading={setLoading}
        setAccepted={setAccepted}
        item={item}
      />)
       
      ) : accepted && online && requestData.length > 0  ? (
        <View style={styles.bottomView}>
          <View style={styles.topbar} />
          <View style={styles.topContainer}>
            <View style={styles.headingContainer}>
              <View style={styles.headContainer}>
                <Text style={styles.topHeading}>{userData.name}</Text>
                <Text style={styles.topHeading}>CONNECTING WITH USER</Text>
              </View>
              <View style={styles.headContainer}>
                <Text style={styles.botHeading}>Basic Level</Text>
                <Text style={styles.botHeading}>Earned</Text>
              </View>
            </View>
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
