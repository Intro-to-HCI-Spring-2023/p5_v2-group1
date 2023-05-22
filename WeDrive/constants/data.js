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
        requester: "Rider 1",
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
        requester: "Rider 2",
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
        requester: "Rider 3",
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

const accepted = [
    {
        requester: "Rider 4",
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
        requester: "Rider 5",
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
        requester: "Rider 6",
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

export { locations, coordinates, requested, accepted };