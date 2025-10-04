import { Link } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { generateText } from "../lib/gemini";

export default function Chat() {
  const [prompt, setPrompt] = useState(
    "Napisz krótkie powitanie po polsku dla aplikacji podróżniczej."
  );
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setError("");
    setResponse("");

    try {
      const result = await generateText(prompt);
      setResponse(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Wystąpił błąd");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white", padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 16 }}>
        Chat z Gemini
      </Text>

      <TextInput
        value={prompt}
        onChangeText={setPrompt}
        placeholder="Wpisz swój prompt..."
        multiline
        numberOfLines={4}
        style={{
          borderWidth: 1,
          borderColor: "#ddd",
          borderRadius: 8,
          padding: 12,
          marginBottom: 16,
          textAlignVertical: "top",
        }}
      />

      <TouchableOpacity
        onPress={handleGenerate}
        disabled={loading}
        style={{
          backgroundColor: loading ? "#ccc" : "#007AFF",
          padding: 12,
          borderRadius: 8,
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>
          {loading ? "Generowanie..." : "Generuj odpowiedź"}
        </Text>
      </TouchableOpacity>

      {loading && (
        <ActivityIndicator
          size="large"
          color="#007AFF"
          style={{ marginBottom: 16 }}
        />
      )}

      {error ? (
        <Text style={{ color: "red", marginBottom: 16 }}>{error}</Text>
      ) : null}

      {response ? (
        <ScrollView
          style={{
            flex: 1,
            borderWidth: 1,
            borderColor: "#eee",
            borderRadius: 8,
            padding: 12,
          }}
        >
          <Text style={{ fontSize: 16, lineHeight: 24 }}>{response}</Text>
        </ScrollView>
      ) : null}

      <View style={{ marginTop: 20 }}>
        <Link href="/">
          <Text style={{ color: "#007AFF" }}>Powrót do strony głównej</Text>
        </Link>
      </View>
    </View>
  );
}