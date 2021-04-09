import { createStore, applyMiddleware, compose } from "redux";
import ReduxThunk from "redux-thunk";
import { reducer } from "./Reducers";
import createSocketIoMiddleware from "redux-socket.io";
import Constants from "../Constants/appConstants/Global";
import io from "socket.io-client/dist/socket.io";
const connectionConfig = {
  jsonp: false,
  reconnection: true,
  reconnectionDelay: 500,
  reconnectionAttempts: Infinity,
  upgrade:false,
  // transports: ['websocket'], 
  // you need to explicitly tell it to use websockets
};
export const socket = io(`${Constants.URL}`, connectionConfig);
// socket.connect();
socket.on('connect',(socketObj)=>{
  console.log('connected to Socket Server',socketObj)
})
// let socketIoMiddleware = createSocketIoMiddleware(socket, "server/");
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer,composeEnhancers(applyMiddleware(ReduxThunk)));
// const store = createStore(reducer,composeEnhancers(applyMiddleware(ReduxThunk, socketIoMiddleware)));
export default store;
