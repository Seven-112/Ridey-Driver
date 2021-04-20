import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ActivityIndicator, ScrollView, KeyboardAvoidingView } from 'react-native';
import styles from './SignUp.styles';
import { TextInput, Button, Image as CustomImage } from '..'
import COLORS from '../../Constants/Theme/Color';
import loginImage from '../../assets/images/undraw_Login_re_4vu2.png';
import { requestCameraPermission, requestExternalWritePermission } from '../../utils/PickerUtility';
import editProfile from '../../assets/images/editProfile.png';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';




const handleSignUpCall = async (actions, profileUrl, navigation, phoneNumber, name, nicNumber, liscenceNumber, liscenceImage, nicImage, setLoading) => {
    if (!profileUrl) return;
    let driverImages = [];

    const uploadImage = [profileUrl, nicImage, liscenceImage];
    setLoading(true)

    for (let i = 0; i <= 2; i++) {
        const data = {
            file: uploadImage[i]
        }
        actions.user
            .uploadImage(data)
            .then((responseData) => {
                console.log(responseData)
                driverImages.push(responseData.data.Url);
                if (driverImages.length == 3) {
                    const signUpdata = {
                        name,
                        phoneNumber,
                        nicNumber,
                        liscenceNumber,
                        profileImg: driverImages[0],
                        nicImage: driverImages[1],
                        liscenceImage: driverImages[2]
                    }
                    actions.user
                        .signUp(signUpdata)
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
}

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





const captureImage = async (setProfileUrl, setVisible) => {
    let options = {
        mediaType: 'photo',
    }
    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();
    if (isCameraPermitted && isStoragePermitted) {
        launchCamera(options, (response) => {
            AlertControl(response)
            if (!response.didCancel) {
                console.log(response);
                setProfileUrl(response.uri);
                setVisible(false)
            }

        });
    }
};


const chooseFilefromGallery = async (setProfileUrl, setVisible) => {
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
                setProfileUrl(response.uri);
                setVisible(false)
            }

        });
    }
};








const SignUp = ({ navigation, actions, userError, userStatus, uploadData, uploadStatus }) => {

    const [phoneNumber, setPhoneNumber] = useState('');
    const [name, setName] = useState('');
    const [nicNumber, setNicNumber] = useState('');
    const [nicImage, setNicImage] = useState('');
    const [profileUrl, setProfileUrl] = useState('');
    const [liscenceNumber, setLiscenceNumber] = useState('');
    const [liscenceImage, setLiscenceImage] = useState('');
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSignUp = () => {
        handleSignUpCall(actions, profileUrl, navigation, phoneNumber, name, nicNumber, liscenceNumber, liscenceImage, nicImage, setLoading)
    }



    return (
        <ScrollView>
            <KeyboardAvoidingView  behavior="padding" keyboardVerticalOffset={80} style={styles.container}>
                <View style={styles.topContainer}>
                    <Image style={styles.image} resizeMode="contain" source={loginImage} />
                </View>
                <View style={visible ? { ...styles.centerContainer, height: '80%' } : styles.centerContainer}>
                    <View style={styles.headerContainer}>
                        <Text style={styles.header}>SIGNUP</Text>
                    </View>
                    <View style={styles.contentContainer}>
                        <TouchableOpacity onPress={() => setVisible(true)} style={styles.profileImageContainer}>
                            <Image source={profileUrl ? { uri: profileUrl } : editProfile} style={styles.profileImage} />
                        </TouchableOpacity>
                        {
                            visible && <View style={styles.pickerView}>
                                <TouchableOpacity style={styles.pickerButton} onPress={() => captureImage(setProfileUrl, setVisible)}>
                                    <Text>Camera</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.pickerButton} onPress={() => chooseFilefromGallery(setProfileUrl, setVisible)}>
                                    <Text>Gallery</Text>
                                </TouchableOpacity>
                            </View>

                        }
                        <TextInput text={name} setText={(text) => setName(text)} style={styles.input} placeholder="Name" />
                        <TextInput text={phoneNumber} setText={(text) => setPhoneNumber(text)} style={styles.input} placeholder="Mobile Number" />
                        <TextInput text={nicNumber} setText={(text) => setNicNumber(text)} style={styles.input} placeholder="Nic Number without Dashes" />
                        <TextInput text={liscenceNumber} setText={(text) => setLiscenceNumber(text)} style={styles.input} placeholder="Liscence Number without Dashes" />
                        <View style={styles.imageContainer}>
                            <TouchableOpacity onPress={() => chooseFilefromGallery(setLiscenceImage, setVisible)} style={styles.pickedContainer}>
                                <Image source={liscenceImage ?
                                    { uri: liscenceImage } :
                                    require('../../assets/images/failed-placeholder.png')}
                                    style={styles.pickedImage}
                                />
                                <Text style={{ fontSize: 10 }}>Liscence Image</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => chooseFilefromGallery(setNicImage, setVisible)} style={styles.pickedContainer}>
                                <Image source={
                                    nicImage ?
                                        { uri: nicImage } :
                                        require('../../assets/images/failed-placeholder.png')}
                                    style={styles.pickedImage}
                                />
                                <Text style={{ fontSize: 10 }}>Nic Image</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={() => handleSignUp()}
                            style={styles.button}>
                            {
                                loading ?
                                    <ActivityIndicator size="large" color="white" />
                                    :
                                    <Text style={styles.buttonText}>SignUp</Text>
                            }
                        </TouchableOpacity>
                    </View>

                    <View style={styles.bottomContainer}>
                        <Text>Already have an account </Text>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Text style={styles.loginbutton}>Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View>
                    <Text style={{ textAlign: 'center', margin: 10, color: COLORS.DISABLED_TEXT_GREY }}>By clicking you agree to our terms and conditions</Text>
                </View>
            </KeyboardAvoidingView>
        </ScrollView>
    )
}

export default SignUp;