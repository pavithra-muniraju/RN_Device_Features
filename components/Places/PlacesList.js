import { FlatList, StyleSheet, Text, View } from "react-native";
import PlaceItem from "./PlaceItem";
import { Colors } from "../../constants/colors";

function PlacesList({ places }) {
    console.log(places.length, 11)
    function onPlaceSelect() {

    }

    if (places.length == 0) {
        return <View style={styles.fallbackContainer}>
            <Text style={styles.fallbackText}>No Placess Added</Text>
            </View>
    }
    return (
        <FlatList data={places}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <PlaceItem place={item} onSelect={onPlaceSelect} />} />
    )
}

export default PlacesList;

const styles = StyleSheet.create({
    fallbackContainer: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        margin: 34
    },
    fallbackText: {
        fontSize: 20,
        color: Colors.primary200
    }
})