import { StyleSheet, Text, View } from "react-native";
import PlacesList from "../components/Places/PlacesList";

function AllPlaces() {
    const places = [];
    return(
        <View>
            <PlacesList places={places}  />
        </View>
    )
}

export default AllPlaces;

const styles = StyleSheet.create({
    
})