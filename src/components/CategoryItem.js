import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const CategoryItem = ({categoryName, categoryImage}) => {
  return (
    
<View style={{
        width: 83,
        gap:5,
        marginTop: 15
      }}>
        
        <View style={{
          backgroundColor: "#E0E8E3",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 5,
          padding: 10,
          width: 80,
          height: 70
        }}>
          <Image style={{
            width: 50,
            height: 40,
            borderRadius: 5
          }} 
          source={{ uri: categoryImage }}
          />
        </View>
        <View style={{
          alignItems:"center"
        }}>
          <Text style={{fontSize: 16, color: "#3C493F"}}>{categoryName}</Text>
        </View>
        
      </View>
  )
}

export default CategoryItem

const styles = StyleSheet.create({
    container:{
        flex: 1,
    }
})