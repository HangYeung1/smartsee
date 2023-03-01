import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import { COMPANIES } from "../../assets/companyinfo";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";

export default function BreakdownScreen({ route, navigation }) {
  const { id } = route.params;
  const insets = useSafeAreaInsets();

  const company = COMPANIES.find((company) => company.id === id);

  let tagsDisplay = company.tags.join(" • ");

  return (
    <>
      <StatusBar style="light" />
      <Image
        source={company.src}
        blurRadius={5}
        style={{
          resizeMode: "cover",
          width: "100%",
          height: 300,
        }}
      />
      <LinearGradient
        colors={["rgba(0,0,0,0.8)", "transparent"]}
        style={{ position: "absolute", width: "100%", height: 125 }}
      />
      <Pressable
        onPress={() => {
          navigation.goBack();
        }}
        style={{
          position: "absolute",
          justifyContent: "center",
          alignItems: "center",
          marginTop: insets.top + 30,
          marginLeft: 15,
          height: 40,
          width: 40,
          borderRadius: 50,
        }}
      >
        <Ionicons name="chevron-back-outline" size={35} color="white" />
      </Pressable>
      <View
        style={{
          marginTop: -20,
          paddingHorizontal: 30,
          paddingTop: 30,
          flex: 1,
          borderRadius: 15,
          backgroundColor: "white",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "white",
            marginBottom: 10,
          }}
        >
          <View>
            <Text style={{ fontSize: 14, fontWeight: "bold", color: "grey" }}>
              {company.cat}
            </Text>
            <Text
              style={{
                fontSize: 28,
                fontWeight: "bold",
                paddingTop: 5,
              }}
            >
              {company.name}
            </Text>
          </View>
          <Ionicons name="bookmark-outline" size={30} color="black" />
        </View>
        <Text
          style={{
            fontSize: 14,
            color: "grey",
          }}
        >
          {tagsDisplay}
        </Text>
        <View style={{ marginTop: 15, flexDirection: "row" }}>
          <View
            style={{
              height: 40,
              width: 40,
              backgroundColor: "#F2F2F2",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 50,
            }}
          >
            <Ionicons name="analytics-outline" size={30} color="black" />
          </View>
          <View style={{ marginLeft: 10 }}>
            <Text style={{ fontWeight: "bold", fontSize: "20" }}>Title</Text>
            <Text style={{ fontColor: "#F2F2F2" }}>Subtitle</Text>
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  body: {
    fontSize: 26,
    fontWeight: "bold",
  },
});
