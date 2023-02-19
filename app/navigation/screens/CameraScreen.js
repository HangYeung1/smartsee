import { StyleSheet, Text, View } from 'react-native';

export default function CameraScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Text
        onPress={() => alert('This is the camera screen.')}
        style={styles.body}
        >Camera Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    fontSize: 26,
    fontWeight: 'bold',
  },
});
