import { Ionicons } from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import { ImageBackground } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ReadMoreText } from "../../../components/readmore";
import { places, tourList } from "../../../constans";
interface TourCardProps {
  cover: string;
  name: string;
  days: number;
  price: number;
  rating: number;
  reviews: number;
}

const TourCard = ({ cover, name, days, price, rating, reviews }: TourCardProps) => (
  <View style={styles.tourCard}>
    <Image
      source={{
        uri: cover,
      }}
      style={styles.tourImage}
    />
    <TouchableOpacity style={styles.heartIcon}>
      <Ionicons name="heart-outline" size={18} color="#000" />
    </TouchableOpacity>
    <Text style={styles.tourName}>{name}</Text>
    <Text style={styles.tourDetails}>{days} days · from ${price}/person</Text>
    <Text style={styles.tourRating}>⭐ {rating} · {reviews} reviews</Text>
  </View>
);

const CityScreen = ({ params }: Readonly<{ params: { id: string } }>) => {
    const { id } = useLocalSearchParams();
  const [isFavorite, setIsFavorite] = useState(false);
 const [currentPlace, setCurrentPlace] = useState(places.find(place => place.name.toLowerCase() === id?.toString().toLowerCase()) );
  useEffect(() => {
    const place = places.find(place => place.name.toLowerCase() === id?.toString().toLowerCase());
    setCurrentPlace(place);
  }, [id]);

  console.log(currentPlace);
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };
  return (
    <ScrollView style={styles.container}>
      {/* Tło - główne zdjęcie */}
      <Image
        source={currentPlace?.image}
        style={styles.headerImage}
      />
      {/* Sekcja miasta */}
      <View style={styles.card}>
        <View style={styles.cityHeader}>
          <Text style={styles.cityTitle}>{currentPlace?.location1}</Text>
          <FontAwesome
            name={isFavorite ? "heart" : "heart-o"}
            size={24}
            color={isFavorite ? "red" : "black"}
            onClick={toggleFavorite}
            style={{ cursor: "pointer" }}
          />
        </View>

        <Text style={styles.subText}>{currentPlace?.cr} {currentPlace?.country}</Text>
        <TouchableOpacity>
          <Text style={styles.reviews}>⭐ 5.0 · 143 reviews</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <ReadMoreText numberOfLines={3} >
            {currentPlace?.description}
          </ReadMoreText>
        </TouchableOpacity>
      </View>

      {/* Upcoming Tours */}
      <View style={styles.tourHeader}>
        <Text style={styles.tourTitle}>Upcoming tours</Text>
        <TouchableOpacity>
          <Text style={styles.seeAll}>See all</Text>
        </TouchableOpacity>
      </View>

      {/* Lista wycieczek */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.tourList}
      >
        
        {tourList.map((tour, index) => (
            <TourCard
              key={index}
              cover={tour.image}
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
        source={require('@/assets/images/mapa.png')} 
        style={[styles.mapsContainer, { borderRadius: 30, overflow: 'hidden'},]}
        imageStyle={{ borderRadius: 30 }}
        resizeMode="cover"
      >
      
    </ImageBackground>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    paddingBottom:30
  },
  headerImage: {
    position: "relative",
    width: "100%",
    height: 250,
  },
  card: {
    padding: 20,
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
    marginBottom:30
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
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection:"column",
    width: 360,
    height: 250,
    borderRadius: 200,
    marginTop: 10,
    margin:"auto"
  },
});

export default CityScreen;
