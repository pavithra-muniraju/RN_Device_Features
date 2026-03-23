import { Pressable, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons"
import { Colors } from "../../constants/colors";
function OutlinedButton({onPress, icon, children}) {
    return (
        <Pressable onPress={onPress} style={({pressed}) => [styles.button, pressed && styles.pressed]}>
            <Ionicons name={icon} color={Colors.primary500} size={18} style={styles.icon} />
            <Text style={styles.text}>{children}</Text>
        </Pressable>
    )
}

export default OutlinedButton;

const styles= StyleSheet.create({
    pressed: {
        opacity: 0.75
    },
    button: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        margin: 4,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.primary500
    },
    icon: {
        marginRight: 6
    },
    text: {
        color: Colors.primary500
    }
})