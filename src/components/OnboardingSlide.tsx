import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";

import { colors } from "../theme/colors";

const { width, height } = Dimensions.get("window");

type Props = {
  title: string;
  subtitle: string;
  image: string;
};

export default function OnboardingSlide({
  title,
  subtitle,
  image,
}: Props) {
  return (
    <ImageBackground
      source={{ uri: image }}
      style={styles.container}
    >
      <LinearGradient
        colors={["transparent", "#050505"]}
        style={styles.overlay}
      >
        <Text style={styles.logo}>KLEOS</Text>

        <Text style={styles.title}>
          {title}
        </Text>

        <Text style={styles.subtitle}>
          {subtitle}
        </Text>
      </LinearGradient>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    width,
    height,
    justifyContent: "flex-end",
  },

  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    padding: 28,
    paddingBottom: 80,
  },

  logo: {
    color: colors.lime,
    fontSize: 14,
    fontWeight: "900",
    letterSpacing: 4,
    marginBottom: 16,
  },

  title: {
    color: colors.white,
    fontSize: 42,
    fontWeight: "900",
    marginBottom: 14,
  },

  subtitle: {
    color: colors.gray,
    fontSize: 18,
    lineHeight: 28,
  },
});