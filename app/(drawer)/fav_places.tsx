import {View,Text} from 'react-native';
import React from 'react';
import {Link  } from 'expo-router';


export default function About(){
  return(
    <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'white'}}>
      <Text>Your fav places</Text>
      <Link href="/">
      <Text>go to home page</Text></Link>
      <Link href="/book">
      <Text>go to blog page</Text></Link>
    </View>
  )
}