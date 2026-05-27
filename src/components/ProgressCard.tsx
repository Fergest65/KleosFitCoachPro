import React from "react";

import {
  View,
  Text,
  StyleSheet,
} from "react-native";

import {
  TrendingUp,
  TrendingDown,
} from "lucide-react-native";

import { colors } from "../theme/colors";

type Props = {
  title: string;
  value: string;
  trend: string;
  positive?: boolean;
};

export default function ProgressCard({
  title,
  value,
  trend,
  positive = true,
}: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <Text style={styles.title}>
          {title}
        </Text>

        {positive ? (
          <TrendingUp
            color={colors.lime}
            size={20}
          />
        ) : (
          <TrendingDown
            color="#FF5A5A"
            size={20}
          />
        )}
      </View>

      <Text style={styles.value}>
        {value}
      </Text>

      <Text
        style={[
          styles.trend,
          {
            color: positive
              ? colors.lime
              : "#FF5A5A",
          },
        ]}
      >
        {trend}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 24,
    padding: 22,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: colors.border,
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },

  title: {
    color: colors.gray,
    fontSize: 15,
    fontWeight: "700",
  },

  value: {
    color: colors.white,
    fontSize: 34,
    fontWeight: "900",
    marginBottom: 10,
  },

  trend: {
    fontSize: 14,
    fontWeight: "700",
  },
});