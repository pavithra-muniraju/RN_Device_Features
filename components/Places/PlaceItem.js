import { Image, Pressable, StyleSheet, Text, View } from "react-native";

function PlaceItem({ place,onSelect }) {
    return (
        <Pressable onPress={onSelect}>
            <Image source={place.imageURI} />
            <View>
                
                <Text>{place.title}</Text>
                <Text>{place.address}</Text>

            </View>
        </Pressable>
    )
}

export default PlaceItem;

const styles = StyleSheet.create({

})