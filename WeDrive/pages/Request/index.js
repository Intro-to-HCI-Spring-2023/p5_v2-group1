import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList, Image } from 'react-native';
import { COLORS } from '../../constants';
import Dialog from "react-native-dialog";
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { locations, coordinates, requested, accepted } from '../../constants/data';

const Request = ({ userType }) => {
    const [view, setView] = useState("new");
    const [requestedRides, setRequestedRides] = useState(requested);
    const [acceptedRides, setAcceptedRides] = useState(accepted);
    const [isOpen, setIsOpen] = useState(false);
    const [dialogTitle, setDialogTitle] = useState("");
    const [dialogBody, setDialogBody] = useState("");
    const [lastItem, setLastItem] = useState({});
    const [lastAction, setLastAction] = useState("");

    const handleAccept = (item) => {
        setAcceptedRides([...acceptedRides, item]);
        setRequestedRides(requestedRides.filter((ride) => ride.requester !== item.requester));
        setDialogTitle("Ride Accepted!");
        setDialogBody("You have accepted this ride. Please contact the rider for further details.");
        setView("accepted");
        setLastItem(item);
        setLastAction("accept");
        setIsOpen(true);
    }

    const handleReject = (item) => {
        setDialogTitle("Ride Rejceted!");
        setDialogBody("You have rejected this ride:(");
        setRequestedRides(requestedRides.filter((ride) => ride.requester !== item.requester));
        setLastItem(item);
        setLastAction("reject");
        setIsOpen(true);
    }

    const handleRemove = (item) => {
        setDialogTitle("You have removed a ride!");
        setDialogBody("You have removed a ride that you have previously confirmed :( We will notify the rider(s) immediately .");
        setAcceptedRides(acceptedRides.filter((ride) => ride.requester !== item.requester));
        setRequestedRides([...requestedRides, item]);
        setView("new");
        setLastItem(item);
        setLastAction("remove");
        setIsOpen(true);
    }

    handleUndo = () => {
        if (lastAction === "accept") {
            setAcceptedRides(acceptedRides.filter((ride) => ride.requester !== lastItem.requester));
            setRequestedRides([...requestedRides, lastItem]);
        } else if (lastAction === "reject") {
            setRequestedRides([...requestedRides, lastItem]);
        } else if (lastAction === "remove") {
            setAcceptedRides([...acceptedRides, lastItem]);
            setRequestedRides(requestedRides.filter((ride) => ride.requester !== lastItem.requester));
        }
        setLastItem({});
        setDialogTitle("You undid your last action!");
        setDialogBody("You have undone your last action. Please be more careful next time!");
    }

    return (
      <View style={styles.container}>
        {userType === "driver" ? (
            <>
            {/* BUTTONS */}
            <View style={styles.buttonConatiner}>
                <TouchableOpacity
                    style={view === "new" ? styles.buttonPrimary : styles.buttonSecondary}
                    onPress={() => setView("new")}
                >
                    <Text style={view === "new" ? styles.buttonPrimaryText : styles.buttonSecondaryText}>
                        New
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={view === "accepted" ? styles.buttonPrimary : styles.buttonSecondary}
                    onPress={() => setView("accepted")}
                >
                    <Text style={view === "accepted" ? styles.buttonPrimaryText : styles.buttonSecondaryText}>
                        Accepted
                    </Text>
                </TouchableOpacity>
            </View>

            {/* LIST */}
            <ScrollView>
                {view === "new" ? (
                    <FlatList
                        data={requestedRides}
                        renderItem={({ item }) => (
                            <View style={styles.listContainer}>
                                <View style={styles.imageContainer}>
                                    <Image source={require('../../assets/rider.png')} style={styles.image} />
                                </View>
                                <View style={styles.textContainer}>
                                    <Text style={styles.listHeader}>{item.requester}</Text>
                                    <Text style={styles.listTitle}>PICK UP / DROP OFF</Text>
                                    <Text style={styles.listText}>{"    "}{item.pickUpName} / {item.dropOff}</Text>
                                    <Text style={styles.listTitle}>DATE / TIME</Text>
                                    <Text style={styles.listText}>{"    "}{item.date} / {item.time}</Text>
                                    <Text style={styles.listTitle}>EST DURATION / DISTANCE</Text>
                                    <Text style={styles.listText}>{"    "}15 min / 2 mi</Text>
                                    <View style={{marginTop: 2, ...styles.buttonConatiner}}>
                                        <TouchableOpacity style={styles.acceptContainer} onPress={() => handleAccept(item)}>
                                            <Text style={styles.acceptText}>✓</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.rejectContainer} onPress={() => handleReject(item)}>
                                            <Text style={styles.rejectText}>X</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        )}
                        keyExtractor={item => item.requester}
                    />
                ) : (
                    <FlatList
                        data={acceptedRides}
                        renderItem={({ item }) => (
                            <View style={styles.listContainer}>
                                <View style={styles.imageContainer}>
                                    <Image source={require('../../assets/rider.png')} style={styles.image} />
                                </View>
                                <View style={styles.textContainer}>
                                    <Text style={styles.listHeader}>{item.requester}</Text>
                                    <Text style={styles.listTitle}>PICK UP / DROP OFF</Text>
                                    <Text style={styles.listText}>{"    "}{item.pickUpName} / {item.dropOff}</Text>
                                    <Text style={styles.listTitle}>DATE / TIME</Text>
                                    <Text style={styles.listText}>{"    "}{item.date} / {item.time}</Text>
                                    <Text style={styles.listTitle}>EST DURATION / DISTANCE</Text>
                                    <Text style={styles.listText}>{"    "}15 min / 2 mi</Text>
                                    <View style={{marginTop: 2, ...styles.buttonConatiner}}>
                                        <TouchableOpacity style={styles.acceptContainer} onPress={() => handleRemove(item)}>
                                            <Text style={styles.acceptText}>X</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        )}
                        keyExtractor={item => item.requester}
                    />
                )}                
            </ScrollView>
            </>
        ) : (
            <Text>Request Screen for {userType}</Text>
        )}
        <Dialog.Container visible={isOpen}>
            <Dialog.Title>{dialogTitle}</Dialog.Title>
            <Dialog.Description>
                {dialogBody}
            </Dialog.Description>
            <Dialog.Button label="Close" onPress={() => {
                setIsOpen(false);
                setDialogTitle("");
                setDialogBody("");
                setLastAction("");
                setLastItem({});
            }}/>
            {lastItem !== {} && dialogTitle !== "You undid your last action!" ? (
                <Dialog.Button label="Undo" onPress={() => handleUndo()}/>
            ) : (
                <></>
            )}
        </Dialog.Container>       
      </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 30,
        marginBottom: 30,
        marginLeft: 20,
        marginRight: 20, 
    },
    buttonConatiner : {
        flexDirection: 'row',
        // justifyContent: 'space-between',
    },
    buttonPrimary: {
        backgroundColor: COLORS.septenary,
        borderRadius: 10,
        width: 100,
        height: 40,
        alignSelf: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    buttonPrimaryText: {
        color: 'white',
        fontSize: 15,
        alignSelf: 'center',
    },
    buttonSecondary: {
        backgroundColor: "white",
        borderRadius: 10,
        width: 100,
        height: 40,
        alignSelf: 'center',
        justifyContent: 'center',
        marginRight: 10,
        borderColor: COLORS.septenary,
        borderWidth: 2,
    },
    buttonSecondaryText: {
        color: COLORS.septenary,
        fontSize: 15,
        alignSelf: 'center',
    },
    // LIST
    listContainer: {
        marginTop: 20,
        backgroundColor: "white",
        borderRadius: 20,
        borderColor: COLORS.septenary,
        borderWidth: 2,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        padding: 10,
    },
    imageContainer: {
        marginRight: 10,
        justifyContent: 'center',
    },
    listHeader: {
        fontSize: 15,
        fontWeight: "bold",
    },
    listTitle: {
        fontSize: 12,
        fontWeight: "semibold",
    }, 
    listText: {
        fontSize: 12,
    },
    rejectContainer: {
        backgroundColor: "white",
        borderRadius: 10,
        width: 40,
        height: 40,
        alignSelf: 'center',
        justifyContent: 'center',
        marginRight: 10,
        borderColor: COLORS.septenary,
        borderWidth: 2,
    }, 
    acceptContainer: {
        backgroundColor: COLORS.septenary,
        borderRadius: 10,
        width: 40,
        height: 40,
        alignSelf: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    rejectText: {
        color: COLORS.septenary,
        fontSize: 15,
        alignSelf: 'center',
    },
    acceptText: {
        color: 'white',
        fontSize: 15,
        alignSelf: 'center',
    },

});

export default Request;