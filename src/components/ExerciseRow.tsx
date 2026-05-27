import React, { useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import {
  Check,
  Play,
} from "lucide-react-native";

import { colors } from "../theme/colors";

type Props = {
  name: string;
  sets: string;
  reps: string;
  weight: string;
  onTimerPress?: () => void;
};

export default function ExerciseRow({
  name,
  sets,
  reps,
  weight,
  onTimerPress,
}: Props) {
  const [completed, setCompleted] = useState(false);

  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>
            {name}
          </Text>

          <Text style={styles.details}>
            {sets} sets • {reps} reps • {weight}
          </Text>
        </View>

        <TouchableOpacity
          style={[
            styles.checkButton,
            completed && styles.checkButtonActive,
          ]}
          onPress={() => setCompleted(!completed)}
        >
          <Check
            color={
              completed ? "#000" : colors.white
            }
            size={20}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.timerButton}
        onPress={onTimerPress}
      >
        <Play color="#000" size={18} />

        <Text style={styles.timerText}>
          TIMER
        </Text>
      </TouchableOpacity>
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

  topRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },

  name: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "900",
    marginBottom: 8,
  },

  details: {
    color: colors.gray,
    fontSize: 14,
  },

  checkButton: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: "#1B1B1F",
    justifyContent: "center",
    alignItems: "center",
  },

  checkButtonActive: {
    backgroundColor: colors.lime,
  },

  timerButton: {
    backgroundColor: colors.lime,
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 10,
  },

  timerText: {
    color: "#000",
    fontWeight: "900",
    letterSpacing: 1,
  },
});