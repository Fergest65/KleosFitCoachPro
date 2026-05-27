import React from "react";

import {
  View,
  Text,
  StyleSheet,
} from "react-native";

import { colors } from "../theme/colors";

type Props = {
  label: string;
  value: string;
  target: string;
  progress: number;
};

export default function NutritionCard({
  label,
  value,
  target,
  progress,
}: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>

      <View style={styles.progressBar}>
        <View
          style={[
            styles.progressFill,
            { width: `${progress}%` },
          ]}
        />
      </View>

      <Text style={styles.target}>
        Target: {target}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 24,
    padding: 20,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: colors.border,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },

  label: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "900",
  },

  value: {
    color: colors.lime,
    fontSize: 22,
    fontWeight: "900",
  },

  progressBar: {
    height: 10,
    backgroundColor: "#1B1B1F",
    borderRadius: 999,
    overflow: "hidden",
    marginBottom: 12,
  },

  progressFill: {
    height: "100%",
    backgroundColor: colors.lime,
    borderRadius: 999,
  },

  target: {
    color: colors.gray,
    fontSize: 14,
  },
});