import React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
} from "react-native";

import PagerView from "react-native-pager-view";

import OnboardingSlide from "../components/OnboardingSlide";

import { colors } from "../theme/colors";

const { width } = Dimensions.get("window");

const slides = [
  {
    title: "Train Smarter",
    subtitle: "Workout intelligence powered by AI.",
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438",
  },
  {
    title: "Track Progress",
    subtitle: "Analytics, body stats and evolution.",
    image:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48",
  },
  {
    title: "Unlock Your Prime",
    subtitle: "Nutrition, coaching and elite performance.",
    image:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a",
  },
];

type Props = {
  onFinish: () => void;
};

export default function OnboardingScreen({
  onFinish,
}: Props) {
  return (
    <View style={styles.container}>
      <PagerView style={styles.pager} initialPage={0}>
        {slides.map((slide, index) => (
          <View key={index}>
            <OnboardingSlide {...slide} />
          </View>
        ))}
      </PagerView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.button}
          onPress={onFinish}
        >
          <Text style={styles.buttonText}>
            START TRAINING
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },

  pager: {
    flex: 1,
  },

  footer: {
    position: "absolute",
    bottom: 40,
    width,
    alignItems: "center",
  },

  button: {
    backgroundColor: colors.lime,
    width: width * 0.86,
    paddingVertical: 18,
    borderRadius: 18,
    alignItems: "center",
  },

  buttonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "900",
    letterSpacing: 1,
  },
});