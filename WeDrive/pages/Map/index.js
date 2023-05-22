import { COLORS, SIZES, FONT } from "../../constants";
import { useRouter, Stack } from "expo-router";
import { View, ScrollView, SafeAreaView, Text, Image, StyleSheet, ImageBackground, TouchableOpacity } from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import MapView, { Marker } from 'react-native-maps';
import { FlatList } from "react-native";
import { useRef } from "react/cjs/react.development";
import { locations, coordinates, requested, accepted } from "../../constants/data";

const Map = ({ userType }) => {
    const user = userType;
    const navigation = useNavigation();

    const [currentLocation, setCurrentLocation] = useState(coordinates.hanover);
    const handleLocation = (location) => {
        setCurrentLocation(coordinates[location]);
        mapViewRef.current.animateToRegion(coordinates[location], 1000);
    }

    const mapViewRef = useRef(null);

    return (
        <View style={styles.container}>
            <MapView 
                ref={mapViewRef}
                style={styles.map} 
                initialRegion={currentLocation}
            >
                {/* for each request in requested, create a marker */}
                {requested.map((request) => (
                    <>
                        <Marker
                            coordinate={request.pickUpLocation}
                            title={request.pickUpName}
                            description={request.dropOff}
                            markerStyle={styles.marker}
                        />
                    </>
                    
                ))}
            </MapView>
            <View style={styles.overlayContainer}>
                {/* for each location in locations */}
                <FlatList
                    data={locations}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={currentLocation === coordinates[item] ? styles.locationSelected : styles.locationDefault}
                            onPress={() => handleLocation(item)}
                        >
                            <Text style={currentLocation === coordinates[item] ? styles.locationSelectedText : styles.locationDefaultText}>
                                {item}
                            </Text>
                        </TouchableOpacity>
                    )}
                    keyExtractor={item => item}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                />
                </View>
                <>
                    {user === "driver" ? (
                        <View style={styles.requestedBoxContainer}>
                        <FlatList
                            data={requested}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={
                                    () => navigation.navigate('Request', { userType: user })
                                }>
                                    <View style={styles.requestedBox}>
                                        <Text style={styles.requestedBoxTextTitle}>
                                            Requester: 
                                        </Text>
                                        <Text style={styles.requestedBoxText}>
                                            {"  "}{item.requester} 
                                        </Text>
                                        <Text style={styles.requestedBoxTextTitle}>
                                            Pick Up / Drop Off:
                                        </Text>
                                        <Text style={styles.requestedBoxText}>
                                            {"  "}{item.pickUpName} / {item.dropOff}
                                        </Text>
                                        <Text style={styles.requestedBoxTextTitle}>
                                            Date / Time:
                                        </Text>
                                        <Text style={styles.requestedBoxText}>
                                            {"  "}{item.date} / {item.time}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            )}
                            keyExtractor={item => item.driverName}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                        />
                        </View> 
                    ) : (
                             
                        <View style={styles.requestedBoxContainer}>

                            <TouchableOpacity onPress={() => navigation.navigate('Request', { userType: user, search: true })}>
                                <View style={{...styles.locationDefault, width: 40}}>
                                    <Text style={styles.locationDefaultText}>+</Text>
                                </View>
                            </TouchableOpacity>
                            
                            <FlatList
                                data={accepted}
                                renderItem={({ item }) => (
                                    <TouchableOpacity onPress={
                                        () => navigation.navigate('Request', { userType: user })
                                    }>
                                        <View style={styles.requestedBox}>
                                            <Text style={styles.requestedBoxTextTitle}>
                                                Driver: 
                                            </Text>
                                            <Text style={styles.requestedBoxText}>
                                                {"  "}{item.driverName} 
                                            </Text>
                                            <Text style={styles.requestedBoxTextTitle}>
                                                Requestor: 
                                            </Text>
                                            <Text style={styles.requestedBoxText}>
                                                {"  "}{item.requester} 
                                            </Text>
                                            <Text style={styles.requestedBoxTextTitle}>
                                                Pick Up / Drop Off:
                                            </Text>
                                            <Text style={styles.requestedBoxText}>
                                                {"  "}{item.pickUpName} / {item.dropOff}
                                            </Text>
                                            <Text style={styles.requestedBoxTextTitle}>
                                                Date / Time:
                                            </Text>
                                            <Text style={styles.requestedBoxText}>
                                                {"  "}{item.date} / {item.time}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                )}
                                keyExtractor={item => item.requester}
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                            />
                            
                            
                        </View> 
                    )}
                </>
                
        </View>
        
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
    },
    bottomHeader: {
        padding: 10,
        backgroundColor: COLORS.septenary,
    },
    overlayContainer: {
        position: 'absolute',
        margin: 20,
        // backgroundColor: 'rgba(255, 255, 255, 0.7)',
        padding: 10,
        borderRadius: 10,
    },
    locationSelected: {
        borderRadius: 12,
        backgroundColor: COLORS.septenary,
        borderColor: "white",
        borderWidth: 2,
        padding: 5,
        width: 120,
        marginRight: 10,
    },
    locationSelectedText: {
        color: "white",
        fontSize: 15,
        alignSelf: "center",
    },
    locationDefault: {
        borderRadius: 12,
        backgroundColor: "white",
        borderColor: COLORS.septenary,
        borderWidth: 2,
        padding: 5,
        width: 120,
        marginRight: 10,
    },
    locationDefaultText: {
        color: COLORS.septenary,
        fontSize: 15,
        alignSelf: "center",
    },
    requestedBoxContainer: {
        position: 'absolute',
        bottom: 0,
        right: 20,
        marginLeft: 20,
        marginBottom: 20,
        paddingLeft: 10,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    requestedBox: {
        backgroundColor: "#33362D",
        borderRadius: 16,
        padding: 10,
        marginRight: 10,
    },
    requestedBoxTextTitle: {
        color: "white",
        fontSize: 12,
        fontWeight: "bold",
    },
    requestedBoxText: {
        color: "white",
        fontSize: 12,
    },
    marker: {
        borderColor: 'green',
        borderWidth: 2,
        borderRadius: 10,
        backgroundColor: 'white',
    },
});

export default Map;