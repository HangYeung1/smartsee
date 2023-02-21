import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Text, View, Pressable, Button, StyleSheet } from "react-native";
import { Camera, CameraType } from "expo-camera";
import { useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";

function CameraView() {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  function takePicture() {}

  function openGallery() {}

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <Camera style={{ flex: 1 }} type={type}>
        <View style={styles.overlayContainer}>
          <View style={styles.topButtonsContainer}>
            <View style={styles.smallButton}>
              <Ionicons name="settings-outline" size={30} color="white" />
            </View>
          </View>

          <View style={styles.botButtonsContainer}>
            <Pressable>
              <View style={styles.smallButton}>
                <Ionicons name="images-outline" size={30} color="white" />
              </View>
            </Pressable>

            <Pressable>
              <View style={styles.largeButton}>
                <View style={styles.largeRing} />
              </View>
            </Pressable>

            <Pressable onPress={toggleCameraType}>
              <View style={styles.smallButton}>
                <Ionicons
                  name="camera-reverse-outline"
                  size={35}
                  color="white"
                />
              </View>
            </Pressable>
          </View>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  overlayContainer: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  smallButton: {
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    width: 50,
    borderRadius: 50,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  largeButton: {
    justifyContent: "center",
    alignItems: "center",
    height: 100,
    width: 100,
    borderRadius: 50,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  largeRing: {
    height: 75,
    width: 75,
    borderWidth: 8,
    borderRadius: 50,
    borderColor: "white",
  },
  topButtonsContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "flex-end",
    padding: 20,
  },
  botButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
    paddingBottom: 50,
  },
});

export default function CameraScreen({ navigation }) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
        paddingLeft: insets.left,
        paddingRight: insets.right,
        backgroundColor: "black",
      }}
    >
      <StatusBar style="light" />
      <CameraView />
    </View>
  );
}
