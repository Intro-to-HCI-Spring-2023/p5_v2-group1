import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList, Image, TextInput } from 'react-native';
import { COLORS } from '../../constants';
import Dialog from "react-native-dialog";
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { locations, coordinates, requested, accepted, searchResults, searchDictionary, completed } from '../../constants/data';
import { Picker } from '@react-native-picker/picker';
// import DatePicker from 'react-native-date-picker'
import DateTimePicker from '@react-native-community/datetimepicker';
import { MaterialIcons } from '@expo/vector-icons';

const formatTime = (time) => { 
    const options = {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        timeZoneName: 'short',
    };

    return time.toLocaleTimeString("en-US", options);
}

const Request = ({ userType, search = false }) => {
    // driver functionality
    const [view, setView] = useState("new");
    const [requestedRides, setRequestedRides] = useState(requested);
    const [acceptedRides, setAcceptedRides] = useState(accepted);
    const [isOpen, setIsOpen] = useState(false);
    const [dialogTitle, setDialogTitle] = useState("");
    const [dialogBody, setDialogBody] = useState("");
    const [lastItem, setLastItem] = useState({});
    const [lastAction, setLastAction] = useState("");

    // rider functionality
    const [start, setStart] = useState({});
    const [end, setEnd] = useState({});
    const [searchState, setSearchState] = useState(search);
    const [startQuery, setStartQuery] = useState("");
    const [endQuery, setEndQuery] = useState("");
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());
    const [isDateOpen, setIsDateOpen] = useState(false);
    const [isTimeOpen, setIsTimeOpen] = useState(false);
    const [riderState, setRiderState] = useState("upcoming");

    const handleDateChange = (event, selectedDate) => {
        // Update the selected date/time
        const currentDate = selectedDate || date;
        setIsDateOpen(false);
        setDate(currentDate);
    };

    const handleTimeChange = (event, selectedTime) => {
        // Update the selected date/time
        const currentTime = selectedTime || time;
        setIsTimeOpen(false);
        setTime(currentTime);
    };

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
        setDialogBody("You have removed a ride that you have previously confirmed :( We will notify the rider(s) immediately.");
        setAcceptedRides(acceptedRides.filter((ride) => ride.requester !== item.requester));
        setRequestedRides([...requestedRides, item]);
        setView("new");
        setLastItem(item);
        setLastAction("remove");
        setIsOpen(true);
    }

    const handleRiderRemove = (item) => {
        setDialogTitle("You have removed a ride!");
        setDialogBody("You have removed a ride that you have previously confirmed :( We will notify the driver immediately.");
        setAcceptedRides(acceptedRides.filter((ride) => ride.requester !== item.requester));
        // setRequestedRides([...requestedRides, item]);
        setRiderState("upcoming");
        setLastItem(item);
        setLastAction("remove");
        setIsOpen(true);
    }

    const handleRiderReject = (item) => {
        setDialogTitle("Ride Removed!");
        setDialogBody("You have removed this pending ride:(");
        setRequestedRides(requestedRides.filter((ride) => ride.requester !== item.requester));
        setLastItem(item);
        setLastAction("reject");
        setIsOpen(true);
    }

    const handleUndo = () => {
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

    const handleSearch = ({ start, end, date, time }) => {
        setRiderState("requested");
        const newItem = {
            requester: "Current User",
            pickUpName: start,
            pickUpLocation: coordinates[start],
            dropOff: end,
            dropOffLocation: coordinates[end],
            date: date.toDateString(),
            time: formatTime(time),
        }
        setRequestedRides([newItem, ...requestedRides, ]);


        setDialogTitle("Ride Requested!");
        setDialogBody("You have requested this ride. You will be notified when a driver accepts.");
        // setView("accepted");
        setRiderState("requested");
        setLastItem(newItem);
        setLastAction("remove");
        setSearchState(false);
        setIsOpen(true);
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
            </>
        ) : (
            // Rider functionality
            searchState ? (
                <View style={styles.container}>
                    <Text>
                        PickUp Location
                    </Text>
                    <Picker
                        selectedValue={startQuery}
                        onValueChange={(itemValue, itemIndex) => setStartQuery(itemValue)}
                        style={styles.picker}
                    >
                        {
                            // if item != endQuery, then render
                            searchResults
                                .filter(item => item !== endQuery || endQuery === "")
                                .map(item => (
                                    <Picker.Item label={item} value={item} key={item} />
                            ))
                        }
                    </Picker>

                    <Text>
                        Destination
                    </Text>
                    <Picker
                        selectedValue={endQuery}
                        onValueChange={(itemValue, itemIndex) => setEndQuery(itemValue)}
                        style={styles.picker}
                    >
                        {
                            // if item != endQuery, then render
                            searchResults
                                .filter(item => item !== startQuery || startQuery === "")
                                .map(item => (
                                    <Picker.Item label={item} value={item} key={item} />
                            ))
                        }
                    </Picker>

                    <View style={styles.dateTimeContainer}>
                        <TouchableOpacity
                            style={{...styles.buttonSecondary, marginBottom: 20, alignSelf: null}}
                            onPress={() => {
                                setIsDateOpen(true);
                            }}
                        >
                            <Text style={styles.buttonSecondaryText}>
                                Select Date
                            </Text>
                        </TouchableOpacity>

                        {/* DISPLAY DATE */}
                        <Text style={{ padding:10 }}>
                            {date.toDateString()}
                        </Text>
                    </View>

                    <View style={styles.dateTimeContainer}>
                        <TouchableOpacity
                            style={{...styles.buttonSecondary, marginBottom: 20, alignSelf: null}}
                            onPress={() => {
                                setIsTimeOpen(true);
                            }}
                        >
                            <Text style={styles.buttonSecondaryText}>
                                Select Time
                            </Text>
                        </TouchableOpacity>

                        {/* DISPLAY TIME */}
                        <Text style={{ padding:10 }}>
                            {formatTime(time)}
                        </Text>
                    </View>

                    {
                        isDateOpen && (
                            <DateTimePicker
                                // isVisible={isDateOpen}
                                mode="date" 
                                value={date}
                                onChange={handleDateChange}
                                minimumDate={new Date()}
                                // onCancel={hideDateTimePicker}
                            />
                        )
                    }
                    

                    {
                        isTimeOpen && (
                            <DateTimePicker
                                // isVisible={isTimeOpen}
                                mode="time"
                                value={time}
                                onChange={handleTimeChange}
                                // onCancel={hideDateTimePicker}
                            />
                        )
                    }

                    {/* DISPLAY CREATE EVENT BUTTON */}
                    { startQuery !== "" && endQuery !== "" && (
                        <TouchableOpacity
                            style={styles.buttonPrimary}
                            onPress={() => handleSearch({ start: startQuery, end: endQuery, date, time })}
                        >
                            <Text style={styles.buttonPrimaryText}>
                                Create Event
                            </Text>
                        </TouchableOpacity>
                    )}

                    

                </View>
            ) : (
                
                <>
                {/* BUTTONS */}
                <View style={{...styles.buttonConatiner, justifyContent:"space-between"}}>
                    <TouchableOpacity
                        style={riderState === "upcoming" ? styles.buttonPrimary : styles.buttonSecondary}
                        onPress={() => setRiderState("upcoming")}
                    >
                        <Text style={riderState === "upcoming" ? styles.buttonPrimaryText : styles.buttonSecondaryText}>
                            Upcoming
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={riderState === "requested" ? styles.buttonPrimary : styles.buttonSecondary}
                        onPress={() => setRiderState("requested")}
                    >
                        <Text style={riderState === "requested" ? styles.buttonPrimaryText : styles.buttonSecondaryText}>
                            Requested
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={riderState === "completed" ? styles.buttonPrimary : styles.buttonSecondary}
                        onPress={() => setRiderState("completed")}
                    >
                        <Text style={riderState === "completed" ? styles.buttonPrimaryText : styles.buttonSecondaryText}>
                            Completed
                        </Text>
                    </TouchableOpacity>
                </View>


                
                {riderState === "upcoming" ? (
                    <FlatList
                        data={acceptedRides}
                        renderItem={({ item }) => (
                            <View style={styles.listContainer}>
                                <View style={styles.imageContainer}>
                                    <Image source={require('../../assets/driver.png')} style={styles.image} />
                                </View>
                                <View style={styles.textContainer}>
                                    <Text style={styles.listHeader}>{item.driverName}</Text>
                                    <Text style={styles.listTitle}>{"   "}{item.driverRating} stars</Text>
                                    <Text style={styles.listTitle}>PICK UP / DROP OFF</Text>
                                    <Text style={styles.listText}>{"    "}{item.pickUpName} / {item.dropOff}</Text>
                                    <Text style={styles.listTitle}>DATE / TIME</Text>
                                    <Text style={styles.listText}>{"    "}{item.date} / {item.time}</Text>
                                    <Text style={styles.listTitle}>EST DURATION / DISTANCE</Text>
                                    <Text style={styles.listText}>{"    "}15 min / 2 mi</Text>
                                    <View style={{marginTop: 2, ...styles.buttonConatiner}}>
                                        <TouchableOpacity style={styles.acceptContainer} onPress={() => handleRiderRemove(item)}>
                                            <Text style={styles.acceptText}>X</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        )}
                        keyExtractor={item => item.requester}
                    />
                ) : (
                    riderState === "requested" ? (
                    <FlatList
                        data={requestedRides}
                        renderItem={({ item }) => ( 
                            <View style={styles.listContainer}>
                                <View style={styles.imageContainer}>
                                    <Image source={require('../../assets/driver.png')} style={styles.image} />
                                </View>
                                <View style={styles.textContainer}>
                                    <Text style={styles.listTitle}>PICK UP / DROP OFF</Text>
                                    <Text style={styles.listText}>{"    "}{item.pickUpName} / {item.dropOff}</Text>
                                    <Text style={styles.listTitle}>DATE / TIME</Text>
                                    <Text style={styles.listText}>{"    "}{item.date} / {item.time}</Text>
                                    <Text style={styles.listTitle}>EST DURATION / DISTANCE</Text>
                                    <Text style={styles.listText}>{"    "}15 min / 2 mi</Text>
                                    <View style={{marginTop: 2, ...styles.buttonConatiner}}>

                                        <TouchableOpacity style={styles.rejectContainer} onPress={() => handleRiderReject(item)}>
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
                            data={completed}
                            renderItem={({ item }) => (
                                <View style={styles.listContainer}>
                                    <View style={styles.imageContainer}>
                                        <Image source={require('../../assets/driver.png')} style={styles.image} />
                                    </View>
                                    <View style={styles.textContainer}>
                                        <Text style={styles.listHeader}>{item.driverName}</Text>
                                        <Text style={styles.listTitle}>{"   "}{item.driverRating} stars</Text>
                                        <Text style={styles.listTitle}>PICK UP / DROP OFF</Text>
                                        <Text style={styles.listText}>{"    "}{item.pickUpName} / {item.dropOff}</Text>
                                        <Text style={styles.listTitle}>DATE / TIME</Text>
                                        <Text style={styles.listText}>{"    "}{item.date} / {item.time}</Text>
                                        <Text style={styles.listTitle}>EST DURATION / DISTANCE</Text>
                                        <Text style={styles.listText}>{"    "}15 min / 2 mi</Text>
                                        <View style={{marginTop: 2, ...styles.buttonConatiner}}>
                                            <TouchableOpacity>
                                                <MaterialIcons name="rate-review" size={24} color="gray" />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            )}
                            keyExtractor={item => item.requester}
                        />

                    )
                )}
                </>
            )
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
    input : {
        height: 40,
        width: "100%",
        marginBottom: 12,
        borderWidth: 2,
        padding: 10,
        borderRadius: 10,
    },
    picker : {
        width: "100%",
        backgroundColor: COLORS.quaternary,
        marginBottom: 30,
    },
    dateTimeContainer: {
        flexDirection: 'row',
    },

});

export default Request;