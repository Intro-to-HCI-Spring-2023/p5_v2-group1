import { COLORS, SIZES, FONT } from "../../constants";
import { useRouter, Stack } from "expo-router";
import { View, ScrollView, SafeAreaView, Text, Image, StyleSheet, ImageBackground, TouchableOpacity } from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import MapView from 'react-native-maps';
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
                ref={ mapViewRef }
                style={styles.map} 
                initialRegion={currentLocation}
            />
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
                <Text>
                    {user}
                </Text>

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
});

export default Map;