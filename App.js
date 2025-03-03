// Libraries
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
// Navigation & Screens
import AuthNavigation from "./src/navigation/AuthNavigation/AuthNavigation";
import HomeS from "./src/screens/HomeS";
import RestaurantDetails from "./src/screens/RestaurantDetails";
import HomeNavigation from "./src/navigation/HomeNavigation/HomeNavigation";
import MainNavigation from "./src/navigation/MainNavigation/MainNavigation";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { useEffect, useState } from "react";
import UserContext from "./src/context/UserContext";
import { CartProvider } from "./src/context/CartContext";
const queryClient = new QueryClient();

export default function App() {
  /*
  const [isAuth, setIsAuth] = useState(false);
  const checkToken = async () => {
    // get the token
    const token = await getToken();
    if (token) {
      // token ? getIsAuth(true)
      setIsAuth(true);
    }
  };

  useEffect(() => {
    checkToken();
  });
  */

  return (
    <View style={styles.container}>
      <QueryClientProvider client={queryClient}>
        <CartProvider>
          <NavigationContainer>
            {/* <UserContext.Provider value={{ isAuth, setIsAuth }}>
            {isAuth ? <MainNavigation /> : <AuthNavigation />} */}
            {/* <HomeS /> */}
            {/* <RestaurantDetails /> */}
            {/* <HomeNavigation /> */}

            {/* </UserContext.Provider>*/}
            <MainNavigation />
          </NavigationContainer>
        </CartProvider>
      </QueryClientProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#282A36",
    paddingTop: 10,
  },
});
