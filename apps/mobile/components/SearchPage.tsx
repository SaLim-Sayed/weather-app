import React, { useState } from "react";
import { View, TextInput, Button, FlatList, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function SearchPage() {
   const navigation = useNavigation<any>();

 

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <TextInput
        value={ ""}
        onChangeText={() => {}}
        placeholder="Search for a city"
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 10,
          marginBottom: 10,
          borderRadius: 6,
        }}
      />
      <Button title="Search" onPress={() => navigation.navigate("CityDetails", { city: "Montreal" })} />

      <FlatList
        data={[]}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("CityDetails", {
                city: "",
                lat: "",
                lon: "",
              })
            }
            style={{
              padding: 15,
              borderBottomWidth: 1,
              borderColor: "#eee",
            }}
          >
         
          </TouchableOpacity>
        )}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f9fafb",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    width: "100%",
    marginBottom: 10,
    backgroundColor: "white",
  },
  list: {
    width: "100%",
    maxHeight: 200,
    marginBottom: 10,
  },
  listItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  button: {
    backgroundColor: "#2563eb",
    padding: 14,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
