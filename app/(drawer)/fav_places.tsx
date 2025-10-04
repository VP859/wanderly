import { useFavoritesStore } from "@/app/store";
import { Entypo } from "@expo/vector-icons";
import { Link } from "expo-router";
import { ImageBackground, StyleSheet, Text, View } from "react-native";

export default function FavPlaces() {
  const favorites = useFavoritesStore(state => state.favorites);

  return (
    <View style={{flex:1,backgroundColor:'white', alignItems:'center', gap:15}} >
      {favorites.length === 0 ? (
        <Text>Brak ulubionych miejsc</Text>
      ) : (
        favorites.map((place:any,) => (
          <Link
           key={place.name}
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
        ))
      )}
    </View>
  );
};

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