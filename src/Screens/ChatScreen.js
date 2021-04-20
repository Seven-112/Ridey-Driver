import React from "react";
import Chat from "../Components/Chat";
import { useSelector } from "react-redux";
import * as Selectors from "../Store/Selectors";

const ChatScreen = (props) => {
  const driverData = useSelector(Selectors.getLoginData);
  const userData = props.route.params.connectedUser;
  const user = {
    _id: userData._id,
    driverId: userData.driverId,
    name: userData.name,
    avatar: userData.profileImg,
  };
  const driver = {
    _id: driverData._id,
    driverId: driverData.driverId,
    name: driverData.name,
    avatar: driverData.profileImg,
  };
  const enhancedProps = {
    navigation: props.navigation,
    user,
    driver,
  };

  return <Chat {...enhancedProps} />;
};

export default ChatScreen;
