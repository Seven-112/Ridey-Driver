import { StyleSheet } from 'react-native';
import COLORS from '../../Constants/Theme/Color';


const styles = StyleSheet.create({
    acceptButton:{
        width:'40%',
        marginHorizontal:5,
        backgroundColor:COLORS.SECONDARY_ORANGE,
        height:45,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10
    },
    rejectButton:{
        width:'40%',
        marginHorizontal:5,
        height:45,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10,
        borderColor:COLORS.SECONDARY_ORANGE,
        borderWidth:1
    },
    bottomView: {
        position: 'relative',
        height: 250,
        backgroundColor: COLORS.WHITE,
        bottom: 0,
        borderWidth: 1,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderColor: COLORS.TRANSPARENT,
        shadowColor: COLORS.BLACK,
        shadowOffset: { width: 1, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 3,

    },
    bottomRequestView: {
        position: 'relative',
        height: 300,
        backgroundColor: COLORS.WHITE,
        bottom: 20,
        borderWidth: 1,
        borderRadius: 20,
        borderColor: COLORS.TRANSPARENT,
        shadowColor: COLORS.BLACK,
        shadowOffset: { width: 1, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 3,
        marginHorizontal:10

    },
    buttonContainer: {
        height: 45,
        backgroundColor: COLORS.SECONDARY_ORANGE,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
        borderRadius: 10
    },
    botButtonContainer:{
        height: 45,
        justifyContent: 'space-around',
        alignItems: "center",
        marginTop: 10,
        flexDirection:'row'
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '600'
    },
    container: {
        ...StyleSheet.absoluteFillObject,
        flex: 1,
        justifyContent: 'flex-end'

    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    currentLocation: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.WHITE,
        margin: 10,
        height: 40,
        width: 40,
        position: 'absolute',
        top: '64%',
        right: 0,
        borderRadius: 20,
    },
    markerView: {
        height: 200,
        width: 200,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.TRANSPARENT_LIGHT_YELLOW,
        borderWidth: 1,
        borderRadius: 100,
        borderColor: COLORS.TRANSPARENT,
    },
    marker: {
        width: 60,
        height: 60
    },
    pickUpContainer: {
        marginTop: 10,
        marginHorizontal: 20
    },
    profileContainer: {
        position: 'absolute',
        width: '95%',
        top: '5%',
        margin: 10,
        overflow: 'hidden',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 10,
        flexDirection: 'row'
    },
    menuContainer: {
        backgroundColor: COLORS.WHITE,
        width: 50,
        height: 50,
        margin: 10,
        borderRadius: 25,
        overflow: 'hidden',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: COLORS.TRANSPARENT
    },
    menu: {
        width: 25,
        height: 25
    },
    leftImageContainer: {
        flexDirection: 'row'
    },
    rightImageContainer: {
        flexDirection: 'row'
    },
    locationHeader: {
        fontSize: 16,
        color: COLORS.DISABLED_TEXT_GREY,
        marginHorizontal: 5,
        fontWeight: '600'
    },
    textLocation: {
        fontSize: 14,
        color: COLORS.BLACK,
        marginHorizontal: 5,
        marginVertical: 5
    },
    topbar: {
        borderWidth: 2,
        width: '15%',
        height: 1,
        alignSelf: 'center',
        margin: 10,
        borderRadius: 5,
        backgroundColor: COLORS.BORDER_GRAY,
        borderColor: COLORS.BORDER_GRAY
    },
    topContainer: {
        // backgroundColor:'red',
        flexDirection: 'row',
        marginHorizontal: 10
    },
    headContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    headingContainer: {
        marginHorizontal: 10,
        justifyContent: 'center',
        width: '82%'
    },
    profileImage: {
        height: 50,
        width: 50,
        borderRadius: 25,
        backgroundColor: 'red',
        overflow: 'hidden'
    },
    topHeading: {
        fontSize: 18,
        fontWeight: '600'
    },
    botHeading: {
        fontSize: 14,
        color: COLORS.DISABLED_TEXT_GREY
    },
    botContainer: {
        marginHorizontal: 10,
        backgroundColor: COLORS.SECONDARY_ORANGE,
        borderRadius: 10,
        height: 120,
        marginVertical: 20,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    botRequestContainer: {
        backgroundColor: COLORS.SECONDARY_GREY,
        height: 140,
        marginVertical: 10,
    },
    detailRequestContainer: {
         justifyContent: 'center',
         marginHorizontal:5,
         marginVertical:5
    },
    detailContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    detailImage: {
        height: 30,
        width: 30,
    },
    detailImageCar: {
        height: 30,
        width: 30,
    },
    detailHeading: {
        fontSize: 18,
        fontWeight: '500'
    },
    detailbot: {
        fontSize: 13,
        fontWeight: '300'
    },
    detailbotRequest: {
        fontSize: 12,
        fontWeight: '300',
        color:COLORS.SECONDARY_BLACK
    },
    
});

export default styles;