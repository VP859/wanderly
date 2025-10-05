import { useRouter } from "expo-router";
import React from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function App() {
  const router = useRouter();
  const [steps, setSteps] = React.useState(0);
  return (
    
    <View style={styles.container}>
      {/* Tło z obrazkiem */}

      <Image
        source={require("@/assets/images/logo.jpg")}
        style={{
          width: 45,
          height: 45,
          position: "absolute",
          top: 10,
          left: 20,
          zIndex: 10,
          borderRadius: 10,
        }}
      />
      <Text
        style={{
          position: "absolute",
          top: 20,
          left: 80,
          fontSize: 24,
          fontWeight: "900",
          color: "black",
          fontFamily: "Nunito",
          zIndex: 10,
        }}
      >
        Wanderly
      </Text>

      <ImageBackground
        source={require("@/assets/images/droga.jpg")}
        style={styles.image}
      >
        <Text
          style={{
            position: "absolute",
            top: 180,
            left: 20,
            fontSize: 70,
            fontWeight: "700",
            color: "white",
            fontFamily: "Nunito",
          }}
        >
          Podróżuj łatwo i bezpiecznie z Nami!
        </Text>
        {/* Panel dolny z tekstem */}
        <View style={styles.card}>
          <Text style={styles.title}>Bold Styles, Brilliant Life Designs</Text>
          <Text style={styles.subtitle}>
            With just a few clicks, you’re on your way to discovering your dream
            style
          </Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("/Booking")}
          >
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    marginHorizontal: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#000",
  },
  subtitle: {
    fontSize: 14,
    color: "#555",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#FFB300", // żółty przycisk
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
});
