import React, { useEffect, useState } from "react";
import {
View,
Text,
ActivityIndicator,
StyleSheet,
TextInput,
TouchableOpacity,
Image,
} from "react-native";
import * as Location from "expo-location";
import { OPEN_WEATHER_API_KEY } from "@env";

export default function Weather() {
const [data, setData] = useState(null);
const [loading, setLoading] = useState(true);
const [city, setCity] = useState("");
const [input, setInput] = useState("");
const [error, setError] = useState(null);

const DEFAULT_CITY = "Warsaw";

const fetchWeatherByCoords = async (lat, lon) => {
    try {
    setLoading(true);
    setError(null);
    const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${OPEN_WEATHER_API_KEY}`
    );
    const json = await res.json();
    if (res.ok) {
        setData(json);
        setCity(json.name);
    } else {
        setError("Failed to fetch weather");
    }
    } catch {
    setError("Network error");
    } finally {
    setLoading(false);
    }
};

const fetchWeatherByCity = async (cityName) => {
    if (!cityName) return;
    try {
    setLoading(true);
    setError(null);
    const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${OPEN_WEATHER_API_KEY}`
    );
    const json = await res.json();
    if (res.ok) {
        setData(json);
        setCity(json.name);
    } else {
        setError("City not found");
    }
    } catch {
    setError("Network error");
    } finally {
    setLoading(false);
    }
};

useEffect(() => {
    (async () => {
    try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
        setError("Location denied, showing default city");
        fetchWeatherByCity(DEFAULT_CITY);
        return;
        }

        const loc = await Location.getCurrentPositionAsync({});
        if (loc?.coords) {
        await fetchWeatherByCoords(loc.coords.latitude, loc.coords.longitude);
        } else {
        setError("Location unavailable, showing default city");
        fetchWeatherByCity(DEFAULT_CITY);
        }
    } catch {
        setError("Could not access location, showing default city");
        fetchWeatherByCity(DEFAULT_CITY);
    }
    })();
}, []);

return (
    <View style={styles.container}>
    <Text style={styles.title}>🌤️ Weather App</Text>

    {/* Input + Search */}
    <View style={styles.inputContainer}>
        <TextInput
        style={styles.input}
        placeholder="Enter city name..."
        value={input}
        onChangeText={setInput}
        onSubmitEditing={() => fetchWeatherByCity(input)}
        />
        <TouchableOpacity style={styles.button} onPress={() => fetchWeatherByCity(input)}>
        <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
    </View>

    {loading && <ActivityIndicator size="large" color="#000" style={{ marginTop: 20 }} />}
    {error && !loading && <Text style={styles.error}>{error}</Text>}

    {data && !loading && (
        <View style={{ alignItems: "center", marginTop: 30 }}>
        <Text style={styles.city}>{city}</Text>
        <Text style={styles.temp}>{Math.round(data.main.temp)}°C</Text>

        {/* Weather Icon */}
        <Image
            source={{
            uri: `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`,
            }}
            style={styles.icon}
        />

        <Text style={styles.desc}>{data.weather[0].description}</Text>
        </View>
    )}
    </View>
);
}

const styles = StyleSheet.create({
container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    backgroundColor: "#fff",
    justifyContent: "flex-start",
},
title: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 60,
    color: "#333",
},
inputContainer: {
    flexDirection: "row",
    marginTop: 20,
    width: "100%",
    justifyContent: "center",
},
input: {
    flex: 1,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    marginRight: 10,
},
button: {
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
},
buttonText: {
    color: "white",
    fontWeight: "bold",
},
city: {
    fontSize: 28,
    fontWeight: "bold",
    color: "black",
},
temp: {
    fontSize: 64,
    color: "black",
},
desc: {
    fontSize: 20,
    color: "black",
    textTransform: "capitalize",
    marginTop: 10,
},
icon: {
    width: 150,
    height: 150,
    marginVertical: 10,
},
error: {
    color: "red",
    marginTop: 20,
    fontSize: 16,
},
});
