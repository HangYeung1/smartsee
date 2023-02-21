import { StyleSheet, Text, View } from 'react-native';

export default function SearchScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Text
        onPress={() => navigation.navigate('Camera')}
        style={styles.body}
        >Search Screen</Text>
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