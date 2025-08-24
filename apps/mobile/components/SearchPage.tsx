import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function SearchPage() {
  const [query, setQuery] = useState("cairo");
  const [results, setResults] = useState<any[]>([]);
  const navigation = useNavigation<any>();

  const searchCities = async (value: string) => {
    setQuery(value);

    if (value.length < 2) {
      setResults([]);
      return;
    }

    try {
      const res = await fetch(
        `https://samples.openweathermap.org/data/2.5/direct?q=${value}&limit=5&appid=b6907d289e10d714a6e88b30761fae22`
      );
      const data = await res.json();
      setResults(data);
    } catch (err) {
      console.error("Error fetching cities", err);
    }
  };

  const handleSelect = (city: any) => {
    const cityName = city.name;
    const country = city.country;
    navigation.navigate("DetailPage", { city: `${cityName},${country}` });
  };
  console.log(results);

  return (
    <ImageBackground
      source={require("@repo/assets/images/background.png")}
      style={styles.bg}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.title}>Weather Search</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter city"
          value={query}
          onChangeText={(text) => searchCities(text)}
        />

        {results.length > 0 && (
          <FlatList
            data={results}
            keyExtractor={(item, idx) => idx.toString()}
            style={styles.list}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handleSelect(item)}
                style={styles.listItem}
              >
                <Text>
                  {item.name}, {item.state ? item.state + ", " : ""}
                  {item.country}
                </Text>
              </TouchableOpacity>
            )}
          />
        )}

        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate("DetailPage", { city: query || "Montreal" })
          }
        >
          <Text style={styles.buttonText}>See Weather</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1, // full screen background
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
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
