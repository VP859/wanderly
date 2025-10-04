import { Link } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';


export default function Chat(){
  return(
    <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'white'}}>
      <Text>Your fav places</Text>
      <Link href="/">
      <Text>go to home page</Text></Link>
      <Link href="/Booking">
      <Text>go to blog page</Text></Link>
    </View>
  )
}