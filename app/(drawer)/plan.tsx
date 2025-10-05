import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { GEMINI_API_KEY } from "@env";
import { useLocalSearchParams } from "expo-router";

export default function GenerateScreen() {
  const params = useLocalSearchParams<{ placename: string }>();
  const [placeName, setPlaceName] = useState<string>("");
  let [outputText, setOutputText] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (params.placename) setPlaceName(params.placename);
  }, [params]);

  useEffect(() => {
    if (!placeName) return; // wait until placeName is set

    const userPrompt = `Wygeneruj tylko plan podróży do ${placeName} na 3 dni. Nie dodawaj żadnych powitań, wyjaśnień ani podsumowań. Każdy dzień zaczynaj od nagłówka "Dzień X:" i wypisz atrakcje w punktach. Odpowiedź ma być wyłącznie planem, bez żadnych dodatkowych komentarzy.`;

    const callGeminiApi = async (prompt: string) => {
      setLoading(true);
      try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
        });

        if (!response.ok) {
          throw new Error(`Gemini API error: ${response.status} - ${await response.text()}`);
        }

        const data = await response.json();
        const geminiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;
        setOutputText(geminiResponse || 'No response from Gemini');
      } catch (error: any) {
        console.error('Error calling Gemini API:', error);
        setOutputText(`Error: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    callGeminiApi(userPrompt);
  }, [placeName]);

  outputText = outputText.replace("*", "");

  return (
    <View style={styles.container}>
      {loading ? <ActivityIndicator size="large" /> : <Text style={styles.text}>{outputText}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  text: { fontSize: 16, textAlign: "center" },
});
