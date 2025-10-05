import { Ionicons } from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import { useFavoritesStore } from "@/app/store";
import { ReadMoreText } from "@/components/readmore";
import { places } from "@/constans";
import { ImageBackground } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Button } from "@react-navigation/elements";
import { GenerateScreen } from "../(drawer)/plan";

interface TourCardProps {
  cover: string;
  name: string;
  days: number;
  price: number;
  rating: number;
  reviews: number;
}

const TourCard = ({
  cover,
  name,
  days,
  price,
  rating,
  reviews,
}: TourCardProps) => {
  const router = useRouter();
  return (
    <TouchableOpacity
      style={styles.tourCard}
      onPress={() => {
        router.push(`/miejsca/${name.toLowerCase().replace(/\s+/g, "-")}`);
      }}
    >
      <Image
        source={typeof cover === "string" ? { uri: cover } : cover}
        style={styles.tourImage}
      />
      <TouchableOpacity style={styles.heartIcon}>
        <Ionicons name="heart-outline" size={18} color="#000" />
      </TouchableOpacity>
      <Text style={styles.tourName}>{name}</Text>
      <Text style={styles.tourDetails}>
        {days} days · from ${price}/person
      </Text>
      <Text style={styles.tourRating}>
        ⭐ {rating} · {reviews} reviews
      </Text>
    </TouchableOpacity>
  );
};

const CityScreen = ({ params }: Readonly<{ params: { id: string } }>) => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const currentPlace = places.find(
    (place) => place.name.toLowerCase() === id?.toString().toLowerCase()
  );

  const [index, setIndex] = useState(1);

  const favorites = useFavoritesStore((state: { favorites: any; }) => state.favorites);
  const toggleFavorite = useFavoritesStore((state: { toggleFavorite: any; }) => state.toggleFavorite);
  console.log(favorites);

  const goPrev = () => {
    setIndex((prev) =>
      prev === 0 ? (currentPlace?.image?.length || 1) - 1 : prev - 1
    );

  };

  const goNext = () => {
    setIndex((prev) =>
      prev === (currentPlace?.image?.length || 1) - 1 ? 0 : prev + 1
    );
  };


  return (
    <ScrollView style={styles.container}>
      {/* Tło - główne zdjęcie */}

      <Image source={currentPlace?.image[index]} style={carosel.image} />
      <TouchableOpacity
        onPress={goPrev}
        style={[
          carosel.arrowButton,
          { left: 0, position: "absolute", marginTop: 100 },
        ]}
      >
        <Text style={carosel.arrowText}>⬅️</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={goNext}
        style={[
          carosel.arrowButton,
          { right: 0, position: "absolute", marginTop: 100 },
        ]}
      >
        <Text style={[carosel.arrowText]}>➡️</Text>
      </TouchableOpacity>
      {/* Sekcja miasta */}
      <View style={styles.card}>
        <View style={styles.cityHeader}>
          <Text style={styles.cityTitle}>{currentPlace?.location1}</Text>
          <FontAwesome
            name={

              favorites.find((p: { name: string | undefined; }) => p.name === currentPlace?.name)
                ? "heart"
                : "heart-o"
            }
            size={24}
            color={
              favorites.find((p: { name: string | undefined; }) => p.name === currentPlace?.name) ? "red" : "black"
            }
            onPress={() => currentPlace && toggleFavorite(currentPlace)}
            style={{ cursor: "pointer" }}
          />
        </View>
        {/*Generate trip plan*/}
        <View>
            <Button 
              style={styles.planGen}
              title="Generate travel plan"
              onPress={() => router.push(`/(drawer)/plan?placename=${currentPlace?.name}`)}>
              <Text style={styles.planGenText}>Przejdź do planu podróży</Text>
            </Button>
          </View>
        <Text style={styles.subText}>
          {currentPlace?.cr} {currentPlace?.country}
        </Text>
        <TouchableOpacity>
          <Text style={styles.reviews}>⭐ 5.0 · 143 reviews</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <ReadMoreText numberOfLines={3}>
            {currentPlace?.description}
          </ReadMoreText>
        </TouchableOpacity>
      </View>

      {/* Upcoming Tours */}
      <View style={styles.tourHeader}>
        <Text style={styles.tourTitle}>Upcoming tours</Text>
        <TouchableOpacity onPress={() => router.push(`/(drawer)/Booking`)}>
          <Text style={styles.seeAll}>See all</Text>
        </TouchableOpacity>
      </View>

      {/* Lista wycieczek */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.tourList}
      >
        {places.map((tour, index) => (
          <TourCard
            key={index}
            cover={tour.image[0]}
            name={tour.name}
            days={tour.days}
            price={tour.price}
            rating={tour.rating}
            reviews={tour.reviews}
          />
        ))}
        {/* Przykładowe karty wycieczek */}
      </ScrollView>
      <ImageBackground
        source={require("@/assets/images/mapa.png")}
        style={[styles.mapsContainer, { borderRadius: 30, overflow: "hidden" }]}
        imageStyle={{ borderRadius: 30 }}
        resizeMode="cover"
      ></ImageBackground>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    paddingBottom: 30,
  },

  card: {
    padding: 15,
    backgroundColor: "#fff",
  },
  cityHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cityTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  subText: {
    alignItems: "center",
    marginTop: 4,
    fontSize: 14,
    color: "#666",
  },
  reviews: {
    marginTop: 6,
    fontSize: 14,
    color: "#444",
  },
  description: {
    marginTop: 10,
    fontSize: 14,
    color: "#333",
  },
  readMore: {
    marginTop: 6,
    color: "#1E90FF",
    fontWeight: "500",
  },
  tourHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  tourTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  seeAll: {
    color: "#1E90FF",
    fontWeight: "500",
  },
  tourList: {
    overflowX: "scroll",
    paddingHorizontal: 10,
    marginTop: 10,
  },
  tourCard: {
    width: 200,
    marginRight: 15,
    borderRadius: 12,
    backgroundColor: "#f8f8f8",
    paddingBottom: 10,
    overflow: "hidden",
    marginBottom: 30,
  },
  tourImage: {
    width: "100%",
    height: 120,
  },
  heartIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 4,
  },
  tourName: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 8,
    paddingHorizontal: 10,
  },
  tourDetails: {
    fontSize: 13,
    color: "#666",
    paddingHorizontal: 10,
  },
  tourRating: {
    fontSize: 13,
    color: "#444",
    paddingHorizontal: 10,
    marginTop: 4,
  },
  mapsContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    flexDirection: "column",
    width: 360,
    height: 250,
    borderRadius: 200,
    marginTop: 10,
    margin: "auto",
  },
  planGen: {
    padding: 10,
    backgroundColor: '#007AFF',
    color: 'white',
    width: "50%",
    borderRadius: 8,
    textAlign: 'center',
    marginTop: 10,
    alignSelf: 'center',
  },
  planGenText: {
    color: 'white',
    fontWeight: '500',
    textAlign: 'center',
  }
});

export default CityScreen;

const carosel = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 0,
  },
  arrowButton: {
    position: "absolute",
  },
  arrowText: {
    fontSize: 30,
  },
  image: {
    width: "100%",
    height: 230,
    borderRadius: 10,
  },
});
