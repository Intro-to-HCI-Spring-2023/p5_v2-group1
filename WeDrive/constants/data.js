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

const completed = [
    {
        requester: "Rider 7",
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
        requester: "Rider 8",
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
]

const searchResults = [
    "",
    "Tuck School of Business",
    "Molly's Restaurant & Bar",
    "Hanover Inn",
    "Baker-Berry Library",
    "53 Commons",
    "Collis Center",
    "Leede Arena",
    "New Hampshire Hall",
    "Topliff Hall",
    "Ben & Jerry's Factory",
    "Vermont State House",
    "Montpelier City Hall",
    "Vermont College of Fine Arts",
    "The Skinny Pancake",
]

const searchDictionary = {
    "Tuck School of Business": {
        latitude: 43.7055,
        longitude: -72.294167,
    },
    "Molly's Restaurant & Bar": {
        latitude: 43.700947,
        longitude: -72.289778,
    },
    "Hanover Inn": {
        latitude: 43.702189,
        longitude: -72.288795,
    },
    "Baker-Berry Library": {
        latitude: 43.705097,
        longitude: -72.288729,
    },
    "53 Commons": {
        latitude: 43.703053,
        longitude: -72.291023,
    },
    "Collis Center": {
        latitude: 43.702668,
        longitude: -72.289845,
    },
    "Leede Arena": {
        latitude: 43.703,
        longitude: -72.282831,
    },
    "New Hampshire Hall": {
        latitude: 43.702458,
        longitude: -72.28678,
    },
    "Topliff Hall": {
        latitude: 43.702645,
        longitude: -72.286107,
    },
    "Ben & Jerry's Factory": {
        latitude: 44.479428,
        longitude: -73.212489,
    },
    "Vermont State House": {
        latitude: 44.26246,
        longitude: -72.580369,
    },
    "Montpelier City Hall": {
        latitude: 44.259182,
        longitude: -72.575522,
    },
    "Vermont College of Fine Arts": {
        latitude: 44.255193,
        longitude: -72.567624,
    },
    "The Skinny Pancake": {
        latitude: 44.260442,
        longitude: -72.57472,
    },
}

    

export { locations, coordinates, requested, accepted, searchResults, searchDictionary, completed };