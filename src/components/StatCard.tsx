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
};

export default function StatCard({
  label,
  value,
}: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.value}>
        {value}
      </Text>

      <Text style={styles.label}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 22,
    padding: 20,
    width: "48%",
    borderWidth: 1,
    borderColor: colors.border,
  },

  value: {
    color: colors.lime,
    fontSize: 28,
    fontWeight: "900",
    marginBottom: 8,
  },

  label: {
    color: colors.gray,
    fontSize: 14,
  },
});