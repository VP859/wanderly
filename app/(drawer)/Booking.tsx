import { Ionicons } from "@expo/vector-icons";
import Entypo from '@expo/vector-icons/Entypo';
import { Link } from 'expo-router';
import React from 'react';
import { ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { places } from "../../constans";

export default function About(){
  const [isFocused, setIsFocused] = React.useState(false);
  const [searchText, setSearchText] = React.useState<String>();

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
          onChangeText={(text) => setSearchText(text)}
          value={searchText?.toString()}
          placeholder="Szukaj..."
        />
        </View>
         {places.filter(place => place.name.toLowerCase().includes(searchText?.toLowerCase() || "")).map((place,index)=>(
           <Link
           key={index}
          href={`/miejsca/${place.name.toLocaleLowerCase()}`}>
      <ImageBackground
        source={place.image[0]} 
        style={[oferta.container, { borderRadius: 10, overflow: 'hidden'},]}
        imageStyle={{ borderRadius: 15 }}
        resizeMode="cover"
      >
      <View style={oferta.text}>
        <View style={{flexDirection:'row', alignItems:'center',justifyContent:"space-between", gap:2}}>
          <Text style={{fontSize:26,paddingTop:5,paddingLeft:5}}>{place.name}</Text>
          <View style={{flexDirection:'row', alignItems:'center', gap:2}}>
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
    width: 370,
    height: 250,
    borderRadius: 10,
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
    width: 340,
    height: 80,
    borderRadius: 10,
    marginBottom: 10,
  }
})