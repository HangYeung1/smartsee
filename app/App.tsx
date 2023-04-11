import { auth } from "./firebaseConfig";
import AuthenticatedNavigator from "./navigators/AuthenticatedNavigator";
import UnauthenticatedNavigator from "./navigators/UnauthenticatedNavigator";
import { onAuthStateChanged } from "firebase/auth";
import { useState } from "react";

export default function App() {
  // Signed in state
  const [signedIn, setSignedIn] = useState<boolean>();

  // Listen for auth state changes
  onAuthStateChanged(auth, (user) => {
    // If the user is signed in, set signedIn to true
    if (user) {
      setSignedIn(true);
    } else {
      setSignedIn(false);
    }
  });

  // If signedIn is undefined, show nothing
  if (signedIn === undefined) return null;

  // Return the appropriate navigator
  return signedIn ? <AuthenticatedNavigator /> : <UnauthenticatedNavigator />;
}
