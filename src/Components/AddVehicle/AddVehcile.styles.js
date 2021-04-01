import { StyleSheet } from 'react-native';
import COLORS from '../../Constants/Theme/Color';

const styles = StyleSheet.create({
    addContainer: {
        backgroundColor: COLORS.SECONDARY_ORANGE,
        height: 50,
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    addButtonText: {
        fontSize: 18,
        fontWeight: '500'
    },
    botContainer: {
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    container: {
        flex: 1,
        backgroundColor: COLORS.WHITE
    },
    input: {
        backgroundColor: COLORS.TRANSPARENT_LIGHT_GREY,
        marginHorizontal: 20,
        borderWidth: 0.7,
        borderColor: COLORS.BORDER_GRAY,
        marginBottom: 5
    },
    inputLabel: {
        marginHorizontal: 20,
        marginTop: 10,
        fontSize: 17,
        fontWeight: '500',
        marginBottom: 5
    },
    inputTopLabel:{
        marginHorizontal: 20,
        marginTop: 30,
        fontSize: 17,
        fontWeight: '500',
        marginBottom: 5
    },
    contentContainer: {
        height: '72%',
    },
    headerContainer: {
        height: '18%',
        backgroundColor: COLORS.SECONDARY_ORANGE,
        justifyContent: 'flex-end'
    },
    headerText: {
        fontSize: 30,
        marginHorizontal: 20,
        fontWeight: '700',
        marginBottom: 20
    },
    notificationHeader: {
        flexDirection: 'row',
        marginHorizontal: 10,
        justifyContent: "space-between"
    },
    itemHeaderText: {
        fontSize: 13,
        fontWeight: '700',
        marginBottom: 2,
    },
    itemHeaderDisabled: {
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 2,
        color: COLORS.DISABLED_TEXT_GREY
    },
    disabledText: {
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 2,
        color: COLORS.BLACK
    },
    itemHeaderTime: {
        fontSize: 12,
        fontWeight: '500',
        color: COLORS.DISABLED_TEXT_GREY

    },
    itemDetails: {
        fontSize: 16,
        marginHorizontal: 10
    },
    notificationItem: {
        height: 80,
        backgroundColor: COLORS.SECONDARY_GREY,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.BORDER_GRAY,
        marginTop: 7,
        marginHorizontal: 10,
        borderRadius: 10
        // backgroundColor: 'red'

    },
    notificationContent: {
        width: '100%',
        flexDirection: 'row',
        height: 80,
        marginHorizontal: 10,
        marginVertical: 10,
    },
    imageIconContainer: {
        width: 30,
        height: 30,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: COLORS.TRANSPARENT,
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: COLORS.TRANSPARENT_LIGHT_GREY,
        marginTop: 10

    },
    imageIcon: {
        width: 25,
        height: 25,

    },
    menu: {
        width: 25,
        height: 25
    },
    menuContainer: {
        position: 'absolute',
        width: 50,
        height: 50,
        top: '20%',
        margin: 10,
        borderRadius: 25,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: COLORS.TRANSPARENT,
        justifyContent: "center",
        alignItems: 'center'
    },
    uploadContainer: {
        height:80,
        width:80,
        backgroundColor: COLORS.TRANSPARENT_LIGHT_GREY,
        borderRadius:10,
        marginHorizontal:20,
        justifyContent:"center",
        alignItems:'center',
        overflow:'hidden'
    },
    plusIcon:{
        height:40,
        width:40
    },
    certificateImg:{
        height:80,
        width:80
    }
})

export default styles;