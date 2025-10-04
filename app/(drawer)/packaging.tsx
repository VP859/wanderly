import { Link } from 'expo-router';
import React, { useState } from 'react';
import { Text, View, StyleSheet, ScrollView, Platform, Switch } from 'react-native';

export default function About() {
  const items = [
    "Paszport",
    "Bilety lotnicze",
    "Karty płatnicze i pieniądze",
    "Ubania",
    "Buty",
    "Szczoteczka do zębów",
    "Kosmetyki",
    "Lekarstwa",
    "Słuchawki",
    "Ładowarka",
  ];

  const [checkedItems, setCheckedItems] = useState<boolean[]>(Array(items.length).fill(false));

  const toggleItem = (index: number) => {
    const newChecked = [...checkedItems];
    newChecked[index] = !newChecked[index];
    setCheckedItems(newChecked);
  };

  const progress = checkedItems.filter(Boolean).length / items.length;

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
          </View>
        ))}
      </View>
      <Text style={{ fontSize: 16, marginTop: 20 }}>Postęp pakowania:</Text>
      <Text style={{ marginTop: 5 }}>{Math.round(progress * 100)}%</Text>
    <View
        style={{
            height: 16,
            width: '100%',
            backgroundColor: '#e2e8f0',
            borderRadius: 8,
            marginTop: 8,
            overflow: 'hidden',
        }}
    >
        <View
            style={{
                height: '100%',
                width: `${Math.round(progress * 100)}%`,
                backgroundColor: '#38a169',
                borderRadius: 8,
            }}
        />
    </View>
      
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
    },
    listElementName: {
        fontSize: 18,
        color: '#374151',
        fontWeight: '500',
        letterSpacing: 0.5,
    },
    progressBar: {
        color: '#38a169',
        alignSelf: 'center',        
        marginTop: 8,
        letterSpacing: 1,
        overflow: 'hidden',
        flexWrap: 'nowrap',
    },
});
