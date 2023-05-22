import { COLORS, SIZES, FONT } from "../../constants";
import { useRouter, Stack } from "expo-router";
import { View, ScrollView, SafeAreaView, Text, Image, StyleSheet, ImageBackground, TouchableOpacity } from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

const Onboard = () => {
    const [userType, setUserType] = useState("");
    const navigation = useNavigation();

    const handleUserType = (type) => {
        setUserType(type);
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.quinary }}>
            <ScrollView>
                <View style={styles.container}>

                    {/* TITLE */}
                    <Text style={styles.titleHeader}>
                        Let's get started!
                    </Text>

                    {/* INSIDE CONTAINER -- WHITE */}
                    <View style={styles.insideContainer}>
                        <Text style={styles.insideContainerTitle}>
                            You are a...
                        </Text>

                        <View style={styles.buttonContainer}>
                            <View>
                                {/* if userType !== driver use default */}
                                { userType !== "driver" ? (
                                    <>
                                        <TouchableOpacity
                                            onPress={() => handleUserType("driver")}
                                        >
                                            <Image source={require('../../assets/driver.png')} style={styles.imageDefault} />
                                        </TouchableOpacity>

                                        <Text style={styles.imageTextTitleDefault}>
                                            Driver
                                        </Text>
                                        <Text style={styles.imageTextBodyDefault}>
                                            You have a car!
                                        </Text>
                                    </>
                                ) : (
                                    <>
                                        <View style={styles.imageSelectedContainer}>
                                            <TouchableOpacity
                                                onPress={() => handleUserType("driver")}
                                            >
                                                <Image source={require('../../assets/driver.png')} style={styles.imageSelected} />
                                                <View style={styles.badgeSelectedContainer}>
                                                    <View style={styles.badgeSelected}>
                                                        <Text style={styles.checkSelected}>✓</Text>
                                                    </View>
                                                </View>
                                            </TouchableOpacity>
                                        </View>

                                        <Text style={styles.imageTextTitleSelected}>
                                            Driver
                                        </Text>
                                        <Text style={styles.imageTextBodySelected}>
                                            You have a car!
                                        </Text>
                                    </>
                                )}
                                
                            </View>
                            <View>
                                { userType !== "rider" ? (
                                    <>
                                        <TouchableOpacity
                                            onPress={() => handleUserType("rider")}
                                        >
                                            <Image source={require('../../assets/rider.png')} style={styles.imageDefault} />
                                        </TouchableOpacity>

                                        <Text style={styles.imageTextTitleDefault}>
                                            Rider
                                        </Text>
                                        <Text style={styles.imageTextBodyDefault}>
                                            You're here for the ride!
                                        </Text>
                                    </>
                                ) : (
                                    <>
                                        <View style={styles.imageSelectedContainer}>
                                            <TouchableOpacity
                                                onPress={() => handleUserType("rider")}
                                            >
                                                <Image source={require('../../assets/rider.png')} style={styles.imageSelected} />
                                                <View style={styles.badgeSelectedContainer}>
                                                    <View style={styles.badgeSelected}>
                                                        <Text style={styles.checkSelected}>✓</Text>
                                                    </View>
                                                </View>
                                            </TouchableOpacity>

                                            <Text style={styles.imageTextTitleSelected}>
                                                Rider
                                            </Text>
                                            <Text style={styles.imageTextBodySelected}>
                                                You're here for the ride!
                                            </Text>
                                        </View>
                                    </>
                                )}
                            </View>
                        </View>
                    </View>

                    {/* NEXT BUTTON */}
                    {userType !== "" ? (
                        <TouchableOpacity
                            style={styles.buttonPrimary}
                            onPress={() => navigation.navigate('Home', { screen:"Map", userType })}
                        >
                            <Text style={styles.buttonPrimaryText}>
                            Next
                            </Text>
                        </TouchableOpacity>
                        ) : (
                        <></>
                    )}

                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 50,
        marginLeft: 30,
        marginRight: 30,
    },
    titleHeader: {
        fontSize: 27,
        fontWeight: "bold",
        color: COLORS.secondary,
    },
    insideContainer: {
        marginTop: 20,
        backgroundColor: "white",
        borderRadius: 20,
        paddingTop: 50, 
        paddingBottom: 70,
        paddingLeft: 15,
        paddingRight: 15,
    },
    insideContainerTitle: {
        fontSize: 25,
        fontWeight: "medium",
    },
    buttonContainer: {
        marginTop: 20,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    imageDefault: {
        width: 116,
        height: 134,   
        borderWidth: 2,
        borderColor: "#737B7D",
        borderRadius: 20,
    },
    imageTextTitleDefault: {
        fontSize: 20,
        fontWeight: "medium",
        color: "#33362D",
        marginTop: 5,
    },
    imageTextBodyDefault: {
        fontSize: 11,
        fontWeight: "medium",
        color: "#737B7D",
    },
    imageSelected: {
        width: 116,
        height: 134,
        borderWidth: 2,
        borderColor: COLORS.quaternary,
        borderRadius: 20,
    },
    imageTextTitleSelected: {
        fontSize: 20,
        fontWeight: "medium",
        color: COLORS.secondary,
        marginTop: 5,
    },
    imageTextBodySelected: {
        fontSize: 11,
        fontWeight: "medium",
        color: COLORS.secondary,
    },
    imageSelectedContainer: {
        position: 'relative',
    },
    badgeSelectedContainer: {
        position: 'absolute',
        top: 0,
        right: 0,
    },
    badgeSelected: {
        width: 30,
        height: 30,
        backgroundColor: COLORS.quaternary,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkSelected: {
        fontSize: 20,
        color: 'white',
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
}); 

export default Onboard;

// right here