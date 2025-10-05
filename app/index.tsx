import { useRouter } from "expo-router";
import React from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function App() {
  const router = useRouter();
  const [steps, setSteps] = React.useState(0);
  const [authMode, setAuthMode] = React.useState<"login" | "register">("register");
  
  if (steps === 0) {
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
            onPress={() => setSteps(1)}
          >
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
      </View>
    );
  }

  if (steps === 1) {
    return (
      <View style={styles.container}>
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
          <View style={[styles.card, { paddingBottom: 30 }]}>
            <View style={styles.tabContainer}>
              <TouchableOpacity onPress={() => setAuthMode("login")}>
                <Text style={[styles.tabText, authMode === "login" && styles.activeTabText]}>
                  Zaloguj się
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setAuthMode("register")}>
                <Text style={[styles.tabText, authMode === "register" && styles.activeTabText]}>
                  Zarejestruj się
                </Text>
              </TouchableOpacity>
            </View>

            {authMode === "register" ? (
              <>
                <Text style={styles.title}>Dołącz do nas!</Text>
                <TextInput
                  placeholder="Wpisz swoje imię"
                  style={styles.input}
                  secureTextEntry
                />
                <TextInput placeholder="Wpisz swój e-mail" style={styles.input} />
                <TextInput
                  placeholder="Wpisz swoje hasło"
                  style={styles.input}
                  secureTextEntry
                />
                <TextInput
                  placeholder="Powtzórz swoje hasło"
                  style={styles.input}
                  secureTextEntry
                />
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => router.push("/(drawer)/Booking")}
                >
                  <Text style={styles.buttonText}>Zarejestruj się</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Text style={styles.title}>Witaj ponownie!</Text>
                <TextInput placeholder="Wpisz swój e-mail" style={styles.input} />
                <TextInput
                  placeholder="Wpisz swoje hasło"
                  style={styles.input}
                  secureTextEntry
                />
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => router.push("/(drawer)/Booking")}
                >
                  <Text style={styles.buttonText}>Zaloguj się</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </ImageBackground>
      </View>
    );
  }
  return null;
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
  card:{
     backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 30,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 20,
    color: "#000",
    paddingLeft:5,
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
  input: {
    height: 48,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  tabText: {
    fontSize: 18,
    color: "gray",
    paddingBottom: 5,
    fontWeight: "600",
  },
  activeTabText: {
    color: "black",
    borderBottomWidth: 2,
    borderBottomColor: "#FFB300",
    fontWeight: "bold",
  },
});
