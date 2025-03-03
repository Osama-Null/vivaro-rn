import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AntDesign from "@expo/vector-icons/AntDesign";

const RestaurantItem = ({
  restaurantName,
  restaurantImage,
  restaurantRating,
  restaurantDeliveryTime,
  restaurantId,
}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("RestaurantDetails", {
          restaurantId: restaurantId,
        })
      }
    >
      <View
        style={{
          width: 83,
          gap: 5,
          marginTop: 15,
        }}
      >
        <View
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.11)",
            alignItems: "",
            padding: 10,
            width: 370,
            height: 130,
            flexDirection: "row",
            gap: 20,
          }}
        >
          {/* Img */}
          <View
            style={{
              justifyContent: "center",
            }}
          >
            <Image
              style={{
                width: 120,
                height: 100,
                borderRadius: 10,
              }}
              source={{ uri: restaurantImage }}
            />
          </View>
          {/* Text */}
          <View
            style={{
              gap: 10,
              marginTop: 5,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                color: "white",
                fontWeight: "bold",
                fontSize: 20,
              }}
            >
              {restaurantName}
            </Text>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                gap: 5,
              }}
            >
              <MaterialIcons
                name="delivery-dining"
                size={24}
                color="#A2E3C4"
                style={{
                  textShadowColor: "black",
                  textShadowOffset: { width: 0.5, height: 0.5 },
                  textShadowRadius: 2,
                }}
              />

              <Text style={{ fontSize: 16, color: "white", marginTop: 2 }}>
                {restaurantDeliveryTime}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                gap: 5,
              }}
            >
              <AntDesign
                name="star"
                size={20}
                color="#ffb300"
                style={{
                  textShadowColor: "black",
                  textShadowOffset: { width: 0.5, height: 0.5 },
                  textShadowRadius: 2,
                }}
              />

              <Text style={{ fontSize: 16, color: "white", }}>
                {" "}
                {restaurantRating}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RestaurantItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
