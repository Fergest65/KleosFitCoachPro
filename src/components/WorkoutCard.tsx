import React from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import {
  Dumbbell,
  Clock3,
  Flame,
} from "lucide-react-native";

import { colors } from "../theme/colors";

type Props = {
  title: string;
  exercises: number;
  duration: string;
  calories: string;
  onPress?: () => void;
};

export default function WorkoutCard({
  title,
  exercises,
  duration,
  calories,
  onPress,
}: Props) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Dumbbell
            color={colors.lime}
            size={22}
          />
        </View>

        <Text style={styles.title}>
          {title}
        </Text>
      </View>

      <View style={styles.stats}>
        <View style={styles.statItem}>
          <Clock3
            color={colors.gray}
            size={16}
          />

          <Text style={styles.statText}>
            {duration}
          </Text>
        </View>

        <View style={styles.statItem}>
          <Flame
            color={colors.gray}
            size={16}
          />

          <Text style={styles.statText}>
            {calories}
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.exerciseText}>
          {exercises} esercizi
        </Text>

        <View style={styles.startButton}>
          <Text style={styles.startText}>
            START
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 28,
    padding: 22,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 22,
  },

  iconContainer: {
    width: 52,
    height: 52,
    borderRadius: 18,
    backgroundColor: "#1B1B1F",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  title: {
    color: colors.white,
    fontSize: 22,
    fontWeight: "900",
    flex: 1,
  },

  stats: {
    flexDirection: "row",
    marginBottom: 22,
  },

  statItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 22,
  },

  statText: {
    color: colors.gray,
    marginLeft: 8,
    fontSize: 14,
  },

  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  exerciseText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: "700",
  },

  startButton: {
    backgroundColor: colors.lime,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 14,
  },

  startText: {
    color: "#000",
    fontWeight: "900",
    letterSpacing: 1,
  },
});