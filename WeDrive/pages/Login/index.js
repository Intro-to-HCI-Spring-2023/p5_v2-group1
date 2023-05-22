
import { COLORS, SIZES, FONT } from "../../constants";
import { useRouter, Stack } from "expo-router";
import { View, ScrollView, SafeAreaView, Text, Image, StyleSheet, ImageBackground, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Login = () => {
    const navigation = useNavigation();
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.secondary }}>
            <ScrollView>
                <View style={styles.container}>

                    {/* LOGO */}
                    <ImageBackground
                        style={styles.ImageBackground}
                    >
                        <Image source={require('../../assets/login.png')} style={styles.image} />
                    </ImageBackground>

                    {/* BUTTONS */}
                    <TouchableOpacity 
                        style={styles.buttonSecondary}
                        onPress={() => navigation.navigate('Onboard')}                    
                    >
                        <Text style={styles.buttonSecondaryText}>
                            Prototype
                        </Text>
                    </TouchableOpacity>

                    {/* ONE-LINER & NAME */}
                    <View style={{
                        marginTop: 60,
                    }}>
                        <Text style={styles.textSecondary}>
                            Drive, Ride, Stress Free
                        </Text>
                        <Text style={styles.textPrimary}>
                            WeDrive
                        </Text>

                    </View>
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40,
    },
    image: {
        width: 322, 
        height: 322,
        alignSelf: 'center',
    },
    ImageBackground: {
        backgroundColor: COLORS.tertiary,
        width: 196,
        height: 270,
        alignSelf: 'center',
    },
    buttonPrimary: {
        backgroundColor: COLORS.secondary,
        alignItems: 'center',
        padding: 15,
        borderColor: COLORS.tertiary,
        borderWidth: 1,
        borderRadius: 25,
        marginTop: 60,
        alignSelf: 'center',
        width: 225,
        shadowColor: 'rgba(0,0,0, .4)', // IOS
        shadowOffset: { height: 3, width: 3 }, // IOS
        shadowOpacity: 1, // IOS
        elevation: 2, // Android
    }, 
    buttonPrimaryText: {
        color: COLORS.tertiary,
        fontSize: SIZES.header,
    },
    buttonSecondary: {
        backgroundColor: COLORS.tertiary,
        alignItems: 'center',
        padding: 15,
        borderColor: COLORS.tertiary,
        borderWidth: 1,
        borderRadius: 25,
        marginTop: 60,
        marginBottom: 90,
        alignSelf: 'center',
        width: 225,
        shadowColor: 'rgba(0,0,0, .4)', // IOS
        shadowOffset: { height: 3, width: 3 }, // IOS
        shadowOpacity: 1, // IOS
        elevation: 2, // Android
    },
    buttonSecondaryText: {
        color: COLORS.secondary,
        fontSize: SIZES.header,
    },
    textSecondary: {
        color: COLORS.tertiary,
        fontSize: 20,
        alignSelf: 'center',
    },
    textPrimary: {
        color: "white",
        fontSize: 32,
        alignSelf: 'center',
    },
});


export default Login;