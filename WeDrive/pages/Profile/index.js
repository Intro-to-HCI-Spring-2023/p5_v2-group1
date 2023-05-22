import { View, Text, Image, StyleSheet, ScrollView, TextInput } from "react-native";
import { COLORS } from "../../constants";
import { useState } from "react";
import {Picker} from '@react-native-picker/picker';
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';


const Profile = ({ userType }) => {
    const [user, setUser] = useState(userType);

    const navigation = useNavigation();
    const handleUserType = (type) => {
        setUser(type);
        navigation.navigate('Home', { screen:"Profile", userType: type })
    }

    return (
        <ScrollView>
            {userType === "driver" ? (
                <View style={styles.container}>
                    <Text style={styles.title}>DRIVER PROFILE</Text>
                    <Image source={require('../../assets/driver.png')} style={styles.image} />
                    <Text style={styles.username}>John Doe</Text>
                    <Text style={styles.secondaryTitle}>YOU'RE CURRENTLY...</Text>
                    <Picker
                        selectedValue={user}
                        onValueChange={(itemValue, itemIndex) => handleUserType(itemValue)}
                        style={styles.picker}
                    >
                        <Picker.Item label="Driver" value="driver" />
                        <Picker.Item label="Rider" value="rider" />
                    </Picker>

                    <Text style={styles.secondaryTitle}>RATING (5 Stars)</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Ionicons name="star" size={20} color="gold" />
                        <Ionicons name="star" size={20} color="gold" />
                        <Ionicons name="star" size={20} color="gold" />
                        <Ionicons name="star" size={20} color="gold" />
                        <Ionicons name="star" size={20} color="gold" />
                    </View>
                    {/* <Text style={styles.username}>5</Text> */}
                    <Text style={styles.secondaryTitle}>YOUR LICENSE</Text>
                    <Image source={require('../../assets/license.png')} style={styles.license} />
                    <Text style={styles.secondaryTitle}>CAR INFO</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Car Make"
                        placeholderTextColor={COLORS.septenary}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Car Model"
                        placeholderTextColor={COLORS.septenary}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Car Year"
                        placeholderTextColor={COLORS.septenary}
                    />

                </View>
            ) : (
                <View style={styles.container}>
                    <Text style={styles.title}>RIDER PROFILE</Text>
                    <Image source={require('../../assets/rider.png')} style={styles.image} />
                    <Text style={styles.username}>John Doe</Text>
                    <Text style={styles.secondaryTitle}>YOU'RE CURRENTLY...</Text>
                    <Picker
                        selectedValue={user}
                        onValueChange={(itemValue, itemIndex) => handleUserType(itemValue)}
                        style={styles.picker}
                    >
                        <Picker.Item label="Driver" value="driver" />
                        <Picker.Item label="Rider" value="rider" />
                    </Picker>
                    <Text style={styles.secondaryTitle}>YOUR STUDENT ID</Text>
                    <Image source={require('../../assets/studentID.png')} style={styles.license} />

                </View>
            )}
        </ScrollView>
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
    picker : {
        width: 200,
        backgroundColor: COLORS.quaternary,
        marginBottom: 30,
    },
    license: {
        width: 308,
        height: 170,
        alignSelf: 'center',
        marginTop: 10,
        marginBottom: 10,
    },
    input: {
        width: 308,
        height: 40,
        backgroundColor: COLORS.octonary,
        borderRadius: 10,
        marginBottom: 10,
        padding: 10,
    },
});


export default Profile;