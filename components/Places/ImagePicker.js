import { launchCameraAsync, useCameraPermissions, PermissionStatus } from "expo-image-picker";
import { useState } from "react";
import { Alert, Button, Image, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/colors";

function ImagePicker() {
    const [cameraPermissionInfo, requestPermission] = useCameraPermissions();

    const [image, setImage] = useState()

    async function verifyPermissions() {
        if (cameraPermissionInfo.status === PermissionStatus.UNDETERMINED) {
            const permissionResp = await requestPermission();
            return permissionResp.granted;
        }

        if (cameraPermissionInfo.status === PermissionStatus.DENIED) {
            Alert.alert(
                'Insufficient Permission',
                'Please allow camera permission to take photo'
            );
            return false;
        }

        return true;
    }

    async function takeImageHandler() {
        const hasPermission = await verifyPermissions();
        if (!hasPermission) return;

        const image = await launchCameraAsync({
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.5,
        });
        console.log(image, 'image')
        setImage(image);
        if (!image.canceled) {
            console.log(image.assets[0].uri);
        }
    }

    let ImagePreview = <Text>No Image Taken Yet</Text>
    if(image) {
        ImagePreview =<Image style={styles.image} source={{uri: image.assets[0].uri}} />
    }
    return (
        <View>
            <View style={styles.ImagePreview}>
                {ImagePreview}
            </View>
            
            <Button
                title="Take Image"
                onPress={() => {
                    takeImageHandler();
                }}
            />
        </View>
    );
}

export default ImagePicker;

const styles = StyleSheet.create({
    ImagePreview: {
        fontSize: 24,
        backgroundColor: Colors.primary100,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        height: 200,
        width: '100%',
        marginVertical: 8,
    },
    image: {
        height: '100%',
        width: '100%',
    }
})