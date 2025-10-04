import Feather from '@expo/vector-icons/Feather';
import React, { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { generateText } from "../lib/gemini";

interface Message {
  role: "user" | "model";
  text: string;
}

export default function Chat() {
  const [prompt, setPrompt] = useState(
    "Jak najlepiej dostać się do Krakowa na Tauron Arenę?"
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    const newMessages: Message[] = [...messages, { role: "user", text: prompt }];
    setMessages(newMessages);
    const currentPrompt = prompt;
    setPrompt(""); // Wyczyść pole tekstowe od razu
    setLoading(true);
    setError("");

    try {
      const result = await generateText(currentPrompt);
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "model", text: result },
      ]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Wystąpił błąd");
    } finally {
      setLoading(false);
    }
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
      keyboardVerticalOffset={100}
    >
      <ScrollView style={styles.messagesContainer}>
        {messages.map((msg, index) => (
          <View
            key={index}
            style={[
              styles.messageBubble,
              msg.role === "user" ? styles.userBubble : styles.modelBubble,
            ]}
          >
            <Text
              style={
                msg.role === "user" ? styles.userText : styles.modelText
              }
            >
              {msg.text}
            </Text>
          </View>
        ))}
        {loading && <ActivityIndicator size="large" color="#007AFF" />}
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
        value={prompt}
        onChangeText={setPrompt}
        placeholder="Jak możemy ci pomóc?"
        multiline
        style={styles.textInput}
        />
        <TouchableOpacity
        onPress={handleGenerate}
        disabled={loading}
        style={[styles.sendButton, { backgroundColor: loading ? "#ccc" : "#007AFF" }]}
      >
        <Text style={styles.sendButtonText}>
          <Feather name="send" size={24} color="white" />
        </Text>
      </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  messagesContainer: {
    flex: 1,
    padding: 10,
  },
  messageBubble: {
    borderRadius: 20,
    padding: 15,
    marginBottom: 10,
    maxWidth: "80%",
    shadowColor: "#000",
    fontWeight: "600",
  },
  userBubble: {
    backgroundColor: "#007AFF",
    alignSelf: "flex-end",
    fontWeight: "600",
  },
  modelBubble: {
    backgroundColor: "#E5E5EA",
    alignSelf: "flex-start",
  },
  userText: {
    color: "white",
  },
  modelText: {
    color: "black",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    margin: 10,
  },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "white",
    alignItems: "center",
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    maxHeight: 100,
    fontSize: 16,
    fontWeight: "600",
  },
  sendButton: {
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    width: 50,
      height: 50,
    borderRadius: 10,
  },
  sendButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});