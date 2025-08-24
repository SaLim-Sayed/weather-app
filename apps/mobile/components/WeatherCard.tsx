import React from "react";
import { View, Text, Image, StyleSheet, ImageBackground } from "react-native";
import { Rectangle } from "@repo/assets";

type WeatherCardProps = {
  title: string;
  value: string | number;
  icon: any; // require/import
};

export function WeatherCard({ title, value, icon }: WeatherCardProps) {
  return (
    <ImageBackground
      source={Rectangle}
      style={styles.card}
      imageStyle={{ borderRadius: 16 }}
    >
      <Image source={icon} style={styles.icon} resizeMode="contain" />

      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 300,
    height: 160,
    borderRadius: 16,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  icon: {
    width: 90,
    height: 90,
    position: "absolute",
    top: -10,
    right: -10,
  },
  content: {
    alignItems: "center",
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    color: "#fff",
  },
  value: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 4,
  },
});
