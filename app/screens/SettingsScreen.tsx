import FocusAwareStatusBar from "../components/FocusAwareStatusBar";
import { auth, db } from "../firebaseConfig";
import { AppDispatch } from "../redux/store";
import { deleteUser } from "firebase/auth";
import { deleteDoc, doc } from "firebase/firestore";
import { View, Pressable, Text, Alert } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useDispatch } from "react-redux";

export default function SettingsScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch<AppDispatch>();

  const resetUser = () => {
    Alert.alert(
      "Confirm Reset",
      "Resetting your user will permanently delete all your data.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Reset",
          onPress: () => {
            deleteUser(auth.currentUser);
            deleteDoc(doc(db, "users", auth.currentUser.uid));
            dispatch({ type: "user/resetUser" });
            dispatch({ type: "companies/resetCompanies" });
          },
        },
      ]
    );
  };

  return (
    <View
      className="flex-1 bg-white"
      style={{
        paddingTop: insets.top,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
    >
      <FocusAwareStatusBar style="dark" />

      {/* Settings Header */}
      <View className="flex-row items-center justify-between px-8 pb-2.5 pt-8">
        <Text className="text-3xl font-bold">Settings</Text>
        <Pressable onPress={() => navigation.goBack()}>
          <Ionicons name="exit-outline" size={30} color="black" />
        </Pressable>
      </View>

      {/* Settings Body */}
      <View className="flex-1 items-center justify-center">
        {/* Reset User Button */}
        <Pressable
          className="mb-4 flex h-12 w-64 items-center justify-center rounded-full bg-red-500"
          onPress={resetUser}
        >
          <Text className="text-white">Reset User</Text>
        </Pressable>
      </View>
    </View>
  );
}
