import { GEMINI_API_KEY } from "@env";
import { Button } from '@react-navigation/elements';
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from 'react';
import { Platform, ScrollView, StyleSheet, Switch, Text, TextInput, View } from 'react-native';


export default function About() {
  const [items, setItems] = useState<string[]>([]);
  const [checkedItems, setCheckedItems] = useState<boolean[]>(Array(10).fill(false));
  const [newItem, setNewItem] = useState<string>('');

  const toggleItem = (index: number) => {
    const newChecked = [...checkedItems];
    newChecked[index] = !newChecked[index];
    setCheckedItems(newChecked);
  }; 

  let progress = checkedItems.filter(Boolean).length / items.length;

  if (items.length === 0) {
    progress = 0;
  }

    const params = useLocalSearchParams<{ placename: string }>();
    const [placeName, setPlaceName] = useState<string>("");
    let [outputText, setOutputText] = useState('');
    const [loading, setLoading] = useState(false);

    
useEffect(() => {
  if (params.placename) {
    setPlaceName(params.placename);
  } else {
    const defaultItems = [
      "Paszport",
      "Bilety lotnicze",
      "Karty płatnicze i pieniądze",
      "Ubrania",
      "Buty",
      "Szczoteczka do zębów",
      "Kosmetyki",
      "Lekarstwa",
      "Słuchawki",
      "Ładowarka",
    ];
    setItems(defaultItems);
    setCheckedItems(Array(defaultItems.length).fill(false));
  }
}, [params.placename]); 

useEffect(() => {
  if (!placeName) return;

  const userPrompt = `Wygeneruj tylko listę rzeczy do spakowania na wyjazd do ${placeName} na 3 dni. Elementy listy powinny być odddzielone tylko znakiem ",". Lista może zawierać maksymalnie 10 elementów. Nie dodawaj żadnych powitań, wyjaśnień ani podsumowań.`;

  const callGeminiApi = async (prompt: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
        }
      );

      if (!response.ok) {
        throw new Error(`Gemini API error: ${response.status}`);
      }

      const data = await response.json();
      const geminiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
      setOutputText(geminiResponse);

      const generatedItems = geminiResponse
        .split(",")
        .map((i: string) => i.trim())
        .filter((i: string) => i.length > 0);

      setItems(generatedItems);
      setCheckedItems(Array(generatedItems.length).fill(false));
    } catch (error: any) {
      console.error("Error calling Gemini API:", error);
      setOutputText(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  callGeminiApi(userPrompt);
}, [placeName]);


  return (
    <ScrollView style={styles.container}>
        <Text style={styles.listHeader}>Lista przedmiotów do spakowania</Text>

        <View style={styles.listElement}>
        {items.map((item, index) => (
            <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                <Switch
                    value={checkedItems[index]}
                    onValueChange={() => toggleItem(index)}
                    style={{ marginRight: 15 }}
                />
                <Text style={styles.listElementName}>{item}</Text>
                <Button 
                    style={styles.removeBtn}
                    onPress={() => {
                        const newItems = items.filter((_, i) => i !== index);
                        const newChecked = checkedItems.filter((_, i) => i !== index);
                        setItems(newItems);
                        setCheckedItems(newChecked);
                    }}
                >
                    <Text style={{ color: '#fff', fontWeight: '600' }}>Usuń</Text>
                </Button>
            </View>
        ))}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 16 }}>
            <TextInput
                style={styles.itemInput}
                placeholder="Dodaj przedmiot..."
                value={newItem}
                onChangeText={setNewItem}
            />
            <Button style={styles.inputBtn}
                onPress={() => {
                    if (newItem.trim()) {
                        setItems([...items, newItem.trim()]);
                        setCheckedItems([...checkedItems, false]);
                        setNewItem('');
                    }
                }}
            >
                <Text style={{ color: '#fff', fontWeight: '600' }}>Dodaj</Text>
            </Button>
        </View>
        </View>
        <Text style={{ fontSize: 16, marginTop: 20 }}>Postęp pakowania:</Text>
        <Text style={{ marginTop: 5 }}>{Math.round(progress * 100)}%</Text>
        <View style={styles.itemInput}>
            <View
                style={{
                    height: '100%',
                    width: `${Math.round(progress * 100)}%`,
                    backgroundColor: '#38a169',
                    borderRadius: 8,
                }}
            />
        </View>
      <Button style={styles.inputBtn}   
            >
                <Text style={{ color: '#fff', fontWeight: '600' }}>Drukuj</Text>
            </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: '#f7f9fc',
        paddingBottom: 36,
        paddingTop: Platform.OS === 'android' ? 32 : 12,
    },
    listHeader: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 24,
        color: '#2d3748',
        textAlign: 'center',
        letterSpacing: 1,
    },
    listElement: {
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.07,
        shadowRadius: 4,
        elevation: 2,
        marginBottom: 16,
        width: '100%',
    },
    listElementName: {
        fontSize: 18,
        color: '#374151',
        fontWeight: '500',
        letterSpacing: 0.5,
        width: '95%',
    },
    progressBar: {
        color: '#38a169',
        alignSelf: 'center',        
        marginTop: 8,
        letterSpacing: 1,
        overflow: 'hidden',
        flexWrap: 'nowrap',
    },
    itemInput: {
        height: 40,
        width: '100%',
        backgroundColor: '#e2e8f0',
        borderRadius: 8,
        marginTop: 8,
        overflow: 'hidden',
        padding:10,
    },
    inputBtn: {
        backgroundColor: '#3b82f6',
        paddingVertical: 10,
        paddingLeft:20,
        paddingRight:20,
        borderRadius: 12,
        alignSelf:'flex-end',
        alignItems: 'center',
        width: "10%",
        marginLeft: 15,
        minWidth: 60,
        marginTop: 8,
    },
    removeBtn: {
        marginLeft: 10,
        fontSize: 12,
        backgroundColor: '#ef4444',
        borderColor: 'black',
        borderWidth: 1,
        paddingHorizontal: 3,
        paddingVertical: 6,
        borderRadius: 12,
        alignSelf: "flex-end",
        width: "4%",
        minWidth: 60,
    }
});
