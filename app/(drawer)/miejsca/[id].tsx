import { Ionicons } from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import React, { useState } from "react";
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { ReadMoreText } from "../../../components/readmore";

const CityScreen = () => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };
  return (
    <ScrollView style={styles.container}>
      {/* Tło - główne zdjęcie */}
      <Image
        source={require("../../../assets/images/szyszkow.jpg")}
        style={styles.headerImage}
      />

      {/* Sekcja miasta */}
      <View style={styles.card}>
        <View style={styles.cityHeader}>
          <Text style={styles.cityTitle}>Rio de Janeiro</Text>
          <FontAwesome
            name={isFavorite ? "heart" : "heart-o"}
            size={24}
            color={isFavorite ? "red" : "black"}
            onClick={toggleFavorite}
            style={{ cursor: "pointer" }}
          />
        </View>

        <Text style={styles.subText}>🇧🇷 Brazil</Text>
        <TouchableOpacity>
          <Text style={styles.reviews}>⭐ 5.0 · 143 reviews</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <ReadMoreText numberOfLines={3} style={styles.readMore}>
            Rio de Janeiro to słynne miasto w Brazylii, znane z pięknych plaż
            (jak Copacabana i Ipanema), słynnej góry Sugarloaf oraz ogromnej
            statuy Chrystusa Odkupiciela na wzgórzu Corcovado. To miejsce
            tętniące życiem, pełne kultury, muzyki (zwłaszcza samby) i barwnych
            karnawałów, które przyciągają turystów z całego świata. Rio jest też
            ważnym ośrodkiem gospodarczym i turystycznym Brazylii.
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
        {/* Przykładowa wycieczka */}
        <View style={styles.tourCard}>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
            }}
            style={styles.tourImage}
          />
          <TouchableOpacity style={styles.heartIcon}>
            <Ionicons name="heart-outline" size={18} color="#000" />
          </TouchableOpacity>
          <Text style={styles.tourName}>Iconic Brazil</Text>
          <Text style={styles.tourDetails}>8 days · from $659/person</Text>
          <Text style={styles.tourRating}>⭐ 4.6 · 56 reviews</Text>
        </View>

        {/* Druga wycieczka – dodaj więcej jeśli chcesz */}
        <View style={styles.tourCard}>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1",
            }}
            style={styles.tourImage}
          />
          <TouchableOpacity style={styles.heartIcon}>
            <Ionicons name="heart-outline" size={18} color="#000" />
          </TouchableOpacity>
          <Text style={styles.tourName}>Beach Adventure</Text>
          <Text style={styles.tourDetails}>6 days · from $599/person</Text>
          <Text style={styles.tourRating}>⭐ 4.8 · 64 reviews</Text>
        </View>
      </ScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
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
});

export default CityScreen;
