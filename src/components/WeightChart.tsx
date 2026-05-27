import React from "react";

import {
  View,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";

import { LineChart } from "react-native-chart-kit";

import { colors } from "../theme/colors";

const screenWidth = Dimensions.get("window").width;

export default function WeightChart() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Weight Progress
      </Text>

      <LineChart
        data={{
          labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
          datasets: [
            {
              data: [84, 83.7, 83.4, 83.2, 82.9, 82.4],
            },
          ],
        }}
        width={screenWidth - 48}
        height={220}
        yAxisSuffix="kg"
        withInnerLines={false}
        withOuterLines={false}
        withShadow={false}
        chartConfig={{
          backgroundGradientFrom: colors.card,
          backgroundGradientTo: colors.card,

          decimalPlaces: 1,

          color: () => colors.lime,

          labelColor: () => colors.gray,

          propsForDots: {
            r: "5",
            strokeWidth: "2",
            stroke: colors.lime,
          },
        }}
        bezier
        style={styles.chart}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.card,
    borderRadius: 28,
    paddingVertical: 22,
    paddingLeft: 8,
    marginBottom: 22,
    borderWidth: 1,
    borderColor: colors.border,
  },

  title: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "900",
    marginLeft: 18,
    marginBottom: 10,
  },

  chart: {
    borderRadius: 24,
  },
});