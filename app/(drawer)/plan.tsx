import { GEMINI_API_KEY } from "@env";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity
} from "react-native";
export default function GenerateScreen() {
  const params = useLocalSearchParams<{ placename: string }>();
  const [outputText, setOutputText] = useState("");
  const [loading, setLoading] = useState(false);
  const placeName = params.placename;

  useEffect(() => {
    if (!placeName) {
      setOutputText("");
      setLoading(false);
      return;
    }

    const userPrompt = `Wygeneruj tylko plan podróży do ${placeName} na 3 dni. Nie dodawaj żadnych powitań, wyjaśnień ani podsumowań. Każdy dzień zaczynaj od nagłówka "Dzień X:" i wypisz atrakcje w punktach. Odpowiedź ma być wyłącznie planem, bez żadnych dodatkowych komentarzy.`;

    const callGeminiApi = async (prompt: string) => {
      setLoading(true);
      try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
        });

        if (!response.ok) {
          throw new Error(
            `Gemini API error: ${response.status} - ${await response.text()}`
          );
        }

        const data = await response.json();
        const geminiResponse =
          data.candidates?.[0]?.content?.parts?.[0]?.text || "Brak odpowiedzi od Gemini";
        setOutputText(geminiResponse.replace(/\*/g, ""));
      } catch (error: any) {
        console.error('Error calling Gemini API:', error);
      } finally {
        setLoading(false);
      }
    };

    callGeminiApi(userPrompt);
  }, [placeName]);

  const renderContent = () => {
    if (loading) {
      return <ActivityIndicator size="large" color="#007AFF" />;
    }
    if (!placeName) {
      return <Text style={styles.text}>Nie wybrano miejsca. Wróć i wybierz miejsce, aby wygenerować plan podróży.</Text>;
    }
    if (outputText) {
      return <Text style={styles.text}>{outputText}</Text>;
    }
    return null;
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {renderContent()}
      <TouchableOpacity style={{
        backgroundColor: '#000',
        padding: 15,
        borderRadius: 10,
        marginTop: 20}}>
        <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }} onPress={() => console.log('Pressed')
        }>Udostepnij plan</Text>
        </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  text: { fontSize: 16,  textAlign: "left", width: "100%",fontWeight: '700'},
});
