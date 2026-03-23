import { Alert, Image, StyleSheet, Text, View } from "react-native";
import OutlinedButton from "../UI/OutlinedButton";
import { Colors } from "../../constants/colors";
import { getCurrentPositionAsync, PermissionStatus, useForegroundPermissions } from "expo-location";
import { useState } from "react";
import { getMapPreview } from "../../util/location";
import { useNavigation } from "@react-navigation/native";

function LocationPicker() {

    const naviagtion = useNavigation();
    const [locationPermissionInfo, requestPermission] = useForegroundPermissions({})
    const [location, setLocation] = useState();
    async function verifyPermission() {
        if (locationPermissionInfo.status === PermissionStatus.UNDETERMINED) {
            const permissionResp = await requestPermission();
            return permissionResp.granted;
        }

        if (locationPermissionInfo.status === PermissionStatus.DENIED) {
            Alert.alert(
                'Insufficient Permission',
                'Please allow camera permission to take photo'
            );
            return false;
        }

        return true;
    }

    async function locationHandler() {
        const hasPermission = await verifyPermission()
        if(!hasPermission) {
            return;
        }
        const location = await getCurrentPositionAsync();
        setLocation({
            lat: location.coords.latitude,
            lng: location.coords.longitude
        });
        console.log(location)
    }

    function pickonMapHandler() {
        naviagtion.navigate("Map")
    }

    let locationPreview =  <Text>No Location Picked yet</Text> 
    if(location) {
        locationPreview = <Image style={styles.image} source={{uri: getMapPreview(location.lat, location.lng) }}/>
    }
    return (
        <View>
            <View style={styles.mapPreview}>
                {locationPreview}
            </View>
            <View style={styles.action}>
                <OutlinedButton icon="location" onPress={locationHandler}>Locate User</OutlinedButton>
                <OutlinedButton icon="map" onPress={pickonMapHandler}>Pick on Map</OutlinedButton>
            </View>

        </View>
    )
}

export default LocationPicker;

const styles = StyleSheet.create({
    mapPreview: {
        fontSize: 24,
        backgroundColor: Colors.primary100,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        height: 200,
        width: '100%',
        marginVertical: 8,
    },
    action: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    image: {
        height: '100%',
        width: '100%',
    }
    

})