import { useFavoritesStore } from "@/app/store";
import { Entypo } from "@expo/vector-icons";
import { Link } from "expo-router";
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

interface Place {
  name: string;
  image: any[];
  price: number;
  location1: string;
  location2: string;
}

const FavoritePlaceCard = ({ place }: { place: Place }) => (
  <Link href={`/miejsca/${place.name.toLowerCase()}`}>
    <ImageBackground
      source={place.image[0]}
      style={[styles.cardContainer, { borderRadius: 10, overflow: "hidden" }]}
      imageStyle={{ borderRadius: 15 }}
      resizeMode="cover"
    >
      <View style={styles.cardTextContainer}>
        <View style={styles.cardHeader}>
          <Text style={styles.placeName}>{place.name}</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>${place.price}</Text>
            <Text style={styles.pricePerDay}>/day</Text>
          </View>
        </View>
        <View style={styles.locationContainer}>
          <Entypo name="location-pin" size={24} color="#b7b7b7ff" />
          <Text style={styles.locationText}>{place.location1},</Text>
          <Text style={styles.locationText}> {place.location2}</Text>
        </View>
      </View>
    </ImageBackground>
  </Link>
);

export default function FavPlaces() {
  const favorites = useFavoritesStore((state) => state.favorites as Place[]);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Image
        source={require("@/assets/images/mapa1.png")}
        style={styles.headerImage}
      />
      {favorites.length === 0 ? (
        <Text style={styles.emptyText}>Brak ulubionych miejsc</Text>
      ) : (
        <>
          <Text style={styles.title}>Twoje ulubione miejsca</Text>
          {favorites.map((place) => (
            <FavoritePlaceCard key={place.name} place={place} />
          ))}
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  contentContainer: {
    alignItems: "center",
    gap: 15,
    paddingBottom: 30,
  },
  headerImage: {
    width: "100%",
    height: 300,
  },
  emptyText: {
    fontSize: 30,
    marginTop: 50,
    fontWeight: "700",
    color: "gray",
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
    color: "black",
  },
  cardContainer: {
    width: 370,
    height: 250,
    justifyContent: "flex-end",
  },
  cardTextContainer: {
    backgroundColor: "white",
    width: 340,
    height: 80,
    borderRadius: 10,
    marginBottom: 10,
    alignSelf: "center",
    paddingLeft: 17,
    paddingRight: 17,
    paddingBottom: 10,
    justifyContent: "center",
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  placeName: {
    fontSize: 26,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 2,
  },
  price: {
    fontSize: 20,
    fontWeight: "700",
  },
  pricePerDay: {
    fontSize: 17,
    fontWeight: "400",
    color: "gray",
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  locationText: {
    fontSize: 16,
    color: "#b7b7b7ff",
  },
});