import { View, Text, Image, StyleSheet } from "react-native";
import { COLORS } from "../../constants";
import { useState } from "react";

const Profile = ({ userType }) => {
    const [user, setUser] = useState(userType);

    return (
        userType === "driver" ? (
            <View style={styles.container}>
                <Text style={styles.title}>DRIVER PROFILE</Text>
                <Image source={require('../../assets/driver.png')} style={styles.image} />
                <Text style={styles.username}>John Doe</Text>
                <Text style={styles.secondaryTitle}>YOU'RE CURRENTLY...</Text>
                
            </View>
        ) : (
            <View style={styles.container}>
                <Text>Profile Screen for Rider</Text>
            </View>
        )
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 40,
        paddingLeft: 25,
        paddingRight: 25,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: COLORS.primary,
    },
    image: {
        width: 118,
        height: 121.54,
        alignSelf: 'center',
        borderColor: COLORS.septenary,
        borderWidth: 2,
        borderRadius: 60,
        marginTop: 10,
        marginBottom: 10,
    },
    username: {
        fontSize: 18,
        color: COLORS.septenary,
        marginBottom: 30,
    },
    secondaryTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.primary,
        marginBottom: 10,
        alignSelf: 'flex-start',
    },
});


export default Profile;