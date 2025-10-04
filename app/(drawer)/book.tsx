import { Ionicons } from "@expo/vector-icons";
import Entypo from '@expo/vector-icons/Entypo';
import { Link } from 'expo-router';
import React from 'react';
import { ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { places } from "../../constans";

export default function About(){
  const [isFocused, setIsFocused] = React.useState(false);

  return(
    <ScrollView style={{flex:1,backgroundColor:'white'}} contentContainerStyle={{alignItems:'center', gap:15}}>
        <View style={[
          styles.inputWrapper,
          { borderColor: isFocused ? "gray" : "#dededeff" }
        ]}>
          <Ionicons name="search" size={35} color="gray" style={styles.icon} />
             <TextInput
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          autoFocus={false}
          style={styles.input}
          placeholder="Szukaj..."
        />
        </View>
         {places.map((place,index)=>(
           <Link
           key={index}
          href={`/miejsca/${place.name.toLocaleLowerCase()}`}>
      <ImageBackground
        source={place.image} 
        style={[oferta.container, { borderRadius: 30, overflow: 'hidden'},]}
        imageStyle={{ borderRadius: 30 }}
        resizeMode="cover"
      >
      <View style={oferta.text}>
        <View style={{flexDirection:'row', alignItems:'center',justifyContent:"space-between", gap:2}}>
          <Text style={{fontSize:26,paddingTop:5,paddingLeft:5}}>{place.name}</Text>
          <View style={{flexDirection:'row', alignItems:'center', gap:2}}>
            <Text style={{fontSize:20,paddingTop:5,fontWeight:"700"}}>${place.price}</Text>
            <Text style={{fontSize:17,paddingTop:5,fontWeight:"400",color:"gray"}}>/day</Text>
          </View>
        </View>
        <View style={{flexDirection:'row', alignItems:'center', gap:2}}>
        <Entypo name="location-pin" size={24} color="#b7b7b7ff" />
        <Text style={{fontSize:16,color:"#b7b7b7ff"}}>{place.location1}</Text>
        <Text style={{fontSize:16,color:"#b7b7b7ff"}}>,
           {place.location2}</Text>
        </View>
      </View>
    </ImageBackground>
    </Link>
         ))}  
      <Link href="/">
      <Text>go to home page</Text></Link>
      <Link href="/fav_places">
      <Text>go to about page</Text></Link>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  },
  inputWrapper: {
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 25,
    paddingTop: 5,
    paddingBottom: 5,
    paddingHorizontal: 15,
    width: "95%",
    backgroundColor: "#f0f0f0",
  },
  icon: {
    marginRight: 8,
  },
  input: {
    paddingVertical: 10,
    width: "85%",
    outline: "none",
    backgroundColor: "transparent",
    fontSize:18
  },
});

const oferta = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection:"column",
    width: 380,
    height: 250,
    borderRadius: 200,
    marginTop: 10,
  },
  text: {
    color: 'black',
    fontSize: 26,
    fontWeight: 'semibold',
    paddingLeft: 17,
    paddingRight: 17,
    paddingBottom: 10,
    backgroundColor: 'white',
    width: 350,
    height: 80,
    borderRadius: 10,
    marginBottom: 10,
  }
})