import React, { useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";

import {
  ArrowLeft,
  CheckCircle2,
} from "lucide-react-native";

import ExerciseRow from "../components/ExerciseRow";
import TimerModal from "../components/TimerModal";
import { colors } from "../theme/colors";
import { useAuth } from "../context/AuthContext";
import { saveWorkoutSession } from "../lib/workouts";

type Props = {
  title: string;
  onBack: () => void;
};

const exercises = [
  { name: "Bench Press", sets: "4", reps: "8", weight: "80 kg" },
  { name: "Incline Dumbbell Press", sets: "3", reps: "10", weight: "28 kg" },
  { name: "Shoulder Press", sets: "4", reps: "8", weight: "50 kg" },
  { name: "Triceps Pushdown", sets: "3", reps: "12", weight: "35 kg" },
];

export default function WorkoutDetailScreen({
  title,
  onBack,
}: Props) {
  const { user } = useAuth();

  const [timerVisible, setTimerVisible] = useState(false);
  const [saving, setSaving] = useState(false);

  async function completeWorkout() {
    try {
      if (!user?.id) {
        Alert.alert(
          "DEV mode",
          "Workout completato localmente. Per salvarlo nel database devi essere loggato."
        );
        onBack();
        return;
      }

      setSaving(true);

      await saveWorkoutSession(user.id, title);

      Alert.alert(
        "Workout salvato",
        "Ottimo lavoro. La sessione è stata salvata nel database.",
        [
          {
            text: "OK",
            onPress: onBack,
          },
        ]
      );
    } catch (error: any) {
      Alert.alert(
        "Errore salvataggio",
        error.message ?? "Impossibile salvare il workout."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={onBack}
        >
          <ArrowLeft color={colors.white} size={24} />
        </TouchableOpacity>

        <Text style={styles.logo}>KLEOS</Text>

        <Text style={styles.title}>{title}</Text>

        <Text style={styles.subtitle}>
          Completa gli esercizi e gestisci i recuperi.
        </Text>

        <View style={styles.progressCard}>
          <Text style={styles.progressLabel}>
            SESSION PROGRESS
          </Text>

          <View style={styles.progressBar}>
            <View style={styles.progressFill} />
          </View>

          <Text style={styles.progressText}>
            4 esercizi programmati
          </Text>
        </View>

        <View style={styles.exerciseList}>
          {exercises.map((exercise) => (
            <ExerciseRow
              key={exercise.name}
              name={exercise.name}
              sets={exercise.sets}
              reps={exercise.reps}
              weight={exercise.weight}
              onTimerPress={() => setTimerVisible(true)}
            />
          ))}
        </View>

        <TouchableOpacity
          style={styles.completeButton}
          onPress={completeWorkout}
          disabled={saving}
        >
          <CheckCircle2 color="#000" size={22} />

          <Text style={styles.completeText}>
            {saving ? "SAVING..." : "COMPLETE WORKOUT"}
          </Text>
        </TouchableOpacity>
      </ScrollView>

      <TimerModal
        visible={timerVisible}
        seconds={90}
        onClose={() => setTimerVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },

  content: {
    padding: 24,
    paddingTop: 70,
    paddingBottom: 120,
  },

  backButton: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: colors.card,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 26,
    borderWidth: 1,
    borderColor: colors.border,
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
    fontSize: 36,
    fontWeight: "900",
    marginBottom: 12,
  },

  subtitle: {
    color: colors.gray,
    fontSize: 16,
    lineHeight: 24,
  },

  progressCard: {
    backgroundColor: colors.card,
    borderRadius: 24,
    padding: 20,
    marginTop: 28,
    borderWidth: 1,
    borderColor: colors.border,
  },

  progressLabel: {
    color: colors.lime,
    fontSize: 13,
    fontWeight: "900",
    letterSpacing: 2,
    marginBottom: 14,
  },

  progressBar: {
    height: 10,
    backgroundColor: "#1B1B1F",
    borderRadius: 999,
    overflow: "hidden",
    marginBottom: 12,
  },

  progressFill: {
    width: "65%",
    height: "100%",
    backgroundColor: colors.lime,
    borderRadius: 999,
  },

  progressText: {
    color: colors.gray,
    fontSize: 14,
  },

  exerciseList: {
    marginTop: 30,
  },

  completeButton: {
    backgroundColor: colors.lime,
    borderRadius: 22,
    paddingVertical: 18,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 10,
    marginTop: 12,
  },

  completeText: {
    color: "#000",
    fontSize: 15,
    fontWeight: "900",
    letterSpacing: 1,
  },
});