import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Text } from 'react-native';
import AntDesign from "@expo/vector-icons/AntDesign";
import CategoryList from '../components/CategoryList';
import RestaurantList from '../components/RestaurantList';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';


const Home = () => {
 
  const [search, setSearch] = useState("")
  return (
    <View style={styles.container}>
      {/* Brand & Cart */}
<View
  style={{
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center", // Align items in the row
    justifyContent: "space-between", // Pushes brand to center & cart to end
  }}
>
  {/* Brand - Centered */}
  <View style={{ flex: 1,   }}>
    <Text style={{ fontFamily:"T", fontSize: 32, fontWeight: "bold", color:"#3C493F", paddingLeft:10, marginTop: 0}}>ВИВАРО</Text>
  </View>

  {/* Cart - Aligned Right */}
  <View style={{ position: "absolute", right: 0 }}>
    <FontAwesome6 name="cart-shopping" size={24} color="black" />
  </View>
</View>

      
      {/* Search */}
      <View
        style={{
          height: 100,
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          marginTop: -10
        }}
      >
        <View
          style={{
            width: "100%",
            padding: 1,
            borderRadius: 10,
            flexDirection: "row",
            backgroundColor: "#B3BFB8",
            justifyContent: "center",
          }}
        >
          <AntDesign name="search1" size={24} color="#3C493F" paddingTop={9} />
          <TextInput
            style={{
              fontSize: 20,
              width: "90%",
              padding: 10,
              flexDirection: "row",
              placeholderTextColor:"white",
            }}
            placeholder="Search food, groceries and more"
            placeholderTextColor="#7E8D85" 
            onChangeText={(text)=> {
              setSearch(text)
            }}
          />
        </View>
      </View>
      {/* CategoryItem */}
      <CategoryList filterByName={search}/>
      <RestaurantList filterByName={search}/>
      
      
      {/*  */}
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
});