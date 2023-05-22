import { COLORS, SIZES, FONT } from "../../constants";
import { useRouter, Stack } from "expo-router";
import { View, ScrollView, SafeAreaView, Text, Image, StyleSheet, ImageBackground, TouchableOpacity } from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import MapView, { Marker } from 'react-native-maps';
import { FlatList } from "react-native";
import { useRef } from "react/cjs/react.development";

const latitudeDelta = 0.0922;
const longitudeDelta = 0.0421;

const locations = [
    "hanover", "lebanon", "wrj", "montpelier",
]

const coordinates = {
    "hanover" : {
        latitude: 43.700860,
        longitude: -72.289400,
        latitudeDelta: latitudeDelta,
        longitudeDelta: longitudeDelta,
    },
    "lebanon" : {
        latitude: 43.642567,
        longitude: -72.251991,
        latitudeDelta: latitudeDelta,
        longitudeDelta: longitudeDelta,
    },
    'wrj' : {
        latitude: 43.6467,
        longitude: -72.3197,
        latitudeDelta: latitudeDelta,
        longitudeDelta: longitudeDelta,
    },
    'montpelier' : {
        latitude: 44.2601,
        longitude: -72.5754,
        latitudeDelta: latitudeDelta,
        longitudeDelta: longitudeDelta,
    },

}

const requested = [
    {
        driverName: "John Doe",
        driverRating: 4,
        driverCar: "Toyota Prius",
        driverPlate: "ABC123",
        pickUpName: "Umpleby's",
        pickUpLocation: {
            latitude: 43.700860,
            longitude: -72.289400,
        },
        dropOff: "Lucky's @ Lebanon",
        dropOffLocation: {
            latitude: 43.642567,
            longitude: -72.251991,
        },
        date: "5/22/2023",
        time: "12:00 PM",
    },
    {
        driverName: "Jane Doe",
        driverRating: 4.5,
        driverCar: "Lexus GS300",
        driverPlate: "ZYX987",
        pickUpName: "Dartmouth Hall",
        pickUpLocation: {
            latitude: 43.7044,
            longitude: -72.2887,
        },
        dropOff: "WRJ",
        dropOffLocation: {
            latitude: 43.6467,
            longitude: -72.3197,
        },
        date: "5/22/2023",
        time: "12:00 PM",
    },
    {
        driverName: "Ben Jerry",
        driverRating: 5,
        driverCar: "Ford F-150",
        driverPlate: "XYZ789",
        pickUpName: "Nugget Theater",
        pickUpLocation: {
            latitude: 43.7029,
            longitude: -72.2895,
        },
        dropOff: "DHMC",
        dropOffLocation: {
            latitude: 43.642567,
            longitude: -72.251991,
        },
        date: "5/22/2023",
        time: "12:00 PM",
    },

]

const Map = ({ userType }) => {
    const user = userType;

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
                <View style={styles.requestedBoxContainer}>
                    <FlatList
                        data={requested}
                        renderItem={({ item }) => (
                            <View style={styles.requestedBox}>
                                <Text style={styles.requestedBoxTextTitle}>
                                    Driver: 
                                </Text>
                                <Text style={styles.requestedBoxText}>
                                    {"  "}{item.driverName} ({item.driverRating} Stars)
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
                        )}
                        keyExtractor={item => item.driverName}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    />
                </View> 
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
        left: 0,
        right: 0,
        margin: 20,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'flex-end',
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