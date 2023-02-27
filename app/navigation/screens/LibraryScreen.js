import { StyleSheet, Text, View, Pressable } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function LibraryScreen({ navigation }) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
        paddingLeft: insets.left,
        paddingRight: insets.right,
        backgroundColor: "white",
      }}
    >
      <StatusBar style="auto" />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingLeft: 30,
          paddingRight: 30,
          paddingTop: 30,
          paddingBottom: 10,
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 28, fontWeight: "bold" }}>Library</Text>
        <Pressable>
          <Ionicons name="settings-outline" size={30} color="black" />
        </Pressable>
      </View>
      <View>
        <Text style={styles.sectionTitle}>Just Updated</Text>
      </View>
      <View>
        <Text style={styles.sectionTitle}>Recently Viewed</Text>
      </View>
      <View>
        <Text style={styles.sectionTitle}>Favorites</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    paddingLeft: 30,
    marginTop: 30,
    paddingBottom: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
});
