import { Link } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';

export default function Page(){
  return(
    <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'white'}}>
      <Text>Index</Text>
      <Link href="/(drawer)/fav_places">
      <Text>go to fav_places page</Text></Link>
      <Link href="/(drawer)/book">
      <Text>go to booking page</Text></Link>
    </View>
  )
}