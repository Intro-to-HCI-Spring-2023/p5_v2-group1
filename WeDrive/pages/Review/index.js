import { Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Review = ({ userType, item, review }) => {
    const navigation = useNavigation();
    // don't allow drivers to see this route
    if (userType === "driver") {
        navigation.navigate('Home', { screen: "Map" });
    }

    return (
        <Text>
            Review Page
        </Text>
    )
}

export default Review;