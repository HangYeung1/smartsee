import FocusAwareStatusBar from "../components/FocusAwareStatusBar";
import { auth } from "../firebaseConfig";
import { db } from "../firebaseConfig";
import { signInAnonymously } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { Pressable, Text, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AuthenticationScreen() {
  // Sign in anonymously
  const continueAsGuest = () => {
    signInAnonymously(auth)
      .then(() => {
        // Create a user document
        const createUserDoc = async () => {
          try {
            const userTemplate = {
              collections: {
                recentlyViewed: [],
                bookmarks: [],
                _displayMode: {
                  justAdded: true,
                  recentlyViewed: true,
                  bookmarks: true,
                },
              },
            };
            const userDoc = await setDoc(
              doc(db, "users", auth.currentUser.uid),
              userTemplate
            );
          } catch (err) {
            console.error(err);
          }
        };
        createUserDoc();
        console.log("Signed in as a guest.");
      })
      .catch((err) => {
        Alert.alert("Error", "An error occurred while signing in as a guest.");
        console.error(err);
      });
  };

  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-white">
      <FocusAwareStatusBar style="dark" />
      {/* Sign in as Guest */}
      <Pressable
        className="mb-4 flex h-12 w-64 flex-row items-center justify-center rounded-full bg-gray-500"
        onPress={continueAsGuest}
      >
        <Text className="text-white">Continue as Guest</Text>
      </Pressable>
    </SafeAreaView>
  );
}
