import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text } from 'react-native';
import Home from './src/screens/Home';
import RestaurantDetails from './src/screens/RestaurantDetails';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Home/>
      {/* <RestaurantDetails/> */}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F7F4',
    paddingTop: 30, 
    padding: 20,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
