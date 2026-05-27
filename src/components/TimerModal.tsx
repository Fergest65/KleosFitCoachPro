import React, { useEffect, useState } from "react";

import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Vibration,
} from "react-native";

import {
  X,
  Play,
  Pause,
  RotateCcw,
} from "lucide-react-native";

import { colors } from "../theme/colors";

type Props = {
  visible: boolean;
  seconds: number;
  onClose: () => void;
};

export default function TimerModal({
  visible,
  seconds,
  onClose,
}: Props) {
  const [timeLeft, setTimeLeft] = useState(seconds);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    setTimeLeft(seconds);
    setIsRunning(false);
  }, [seconds, visible]);

  useEffect(() => {
    if (!isRunning) return;

    if (timeLeft <= 0) {
      setIsRunning(false);
      Vibration.vibrate(700);
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [isRunning, timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;

  const formattedTime = `${minutes}:${secs
    .toString()
    .padStart(2, "0")}`;

  function resetTimer() {
    setTimeLeft(seconds);
    setIsRunning(false);
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={onClose}
          >
            <X color={colors.gray} size={24} />
          </TouchableOpacity>

          <Text style={styles.label}>
            REST TIMER
          </Text>

          <Text style={styles.time}>
            {formattedTime}
          </Text>

          <Text style={styles.subtitle}>
            Recupera, respira e preparati al prossimo set.
          </Text>

          <View style={styles.controls}>
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={resetTimer}
            >
              <RotateCcw color={colors.white} size={22} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.mainButton}
              onPress={() => setIsRunning(!isRunning)}
            >
              {isRunning ? (
                <Pause color="#000" size={30} />
              ) : (
                <Play color="#000" size={30} />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.86)",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },

  modal: {
    width: "100%",
    backgroundColor: colors.card,
    borderRadius: 32,
    padding: 28,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
  },

  closeButton: {
    alignSelf: "flex-end",
  },

  label: {
    color: colors.lime,
    fontSize: 14,
    fontWeight: "900",
    letterSpacing: 3,
    marginTop: 8,
  },

  time: {
    color: colors.white,
    fontSize: 72,
    fontWeight: "900",
    marginTop: 22,
  },

  subtitle: {
    color: colors.gray,
    fontSize: 15,
    lineHeight: 22,
    textAlign: "center",
    marginTop: 10,
    marginBottom: 32,
  },

  controls: {
    flexDirection: "row",
    alignItems: "center",
    gap: 22,
  },

  secondaryButton: {
    width: 58,
    height: 58,
    borderRadius: 20,
    backgroundColor: "#1B1B1F",
    alignItems: "center",
    justifyContent: "center",
  },

  mainButton: {
    width: 82,
    height: 82,
    borderRadius: 28,
    backgroundColor: colors.lime,
    alignItems: "center",
    justifyContent: "center",
  },
});