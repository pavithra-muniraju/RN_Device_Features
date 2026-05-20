import { useCallback, useLayoutEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import IconButton from "../components/UI/IconButton";

function Map({ navigation }) {
    const [selectedLocation, setSelectedLocation] = useState();
    const region = {
        latitude: 37.78,
        longitude: -122.43,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    }

    function selectLocationHandler(event) {
        const lat = event.nativeEvent.coordinate.latitude;
        const lng = event.nativeEvent.coordinate.longitude;

        setSelectedLocation({ lat: lat, lng: lng })
    }

    const savedPickedLocationHandler = useCallback(()=> {
        if (!selectedLocation) {
            Alert.alert('No Location picked', 'Please pick a location first');
            return;
        }
        // navigation.goBack();
        navigation.navigate('AddPlace', {
            pickedLat: selectedLocation.lat,
            pickedLng: selectedLocation.lng
        })
    },[navigation, selectedLocation]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: 
            ({tintColor }) => <IconButton name="save" size={24} color={tintColor} onPress={savedPickedLocationHandler} />
        })
    },[navigation, savedPickedLocationHandler])
    return (
        <MapView initialRegion={region} style={styles.container} onPress={selectLocationHandler}>
            {selectedLocation && (
                <Marker
                    title="Picked Location"
                    coordinate={{ latitude: selectedLocation.lat, longitude: selectedLocation.lng }}
                />
            )}
        </MapView>
    )
}

export default Map;

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})