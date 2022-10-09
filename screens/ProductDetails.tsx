import { View, Text, ImageBackground, ScrollView } from "react-native";
import { styles } from "../style/styles";
import { RootStackScreenProps } from "../types";

const ProductDetails = ({
  navigation,
  route,
}: RootStackScreenProps<"ProductDetails">) => {
  return (
    <View style={{ flex: 1 }}>
      <View
        style={[
          styles.container,
          {
            padding: 0,
            alignItems: "center",
            flex: 1,
            justifyContent: "space-between",
            backgroundColor: "#fff",
          },
        ]}
      >
        <ImageBackground
          source={{ uri: route.params.avatar }}
          style={{ width: 300, height: 300 }}
        ></ImageBackground>

        <ScrollView
          style={{
            backgroundColor: "#000",
            width: "100%",
            padding: 30,
            height: "100%",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: -20,
            },
            shadowOpacity: 0.58,
            shadowRadius: 16.0,
            borderRadius: 20,
            elevation: 24,
            marginTop: 75,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontSize: 20,
                fontWeight: "bold",
                maxWidth: 160,
              }}
            >
              {route.params.name}
            </Text>
            <Text style={{ color: "#fff", fontSize: 20, fontWeight: "bold" }}>
              {route.params.price}$
            </Text>
          </View>
          <Text
            style={{
              color: "#fff",
              marginTop: 20,
              marginBottom: 100,
              lineHeight: 25,
            }}
          >
            {route.params.description}
          </Text>
        </ScrollView>
      </View>
    </View>
  );
};

export default ProductDetails;
