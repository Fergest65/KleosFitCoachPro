import React from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import {
  User,
  Target,
  Flame,
  Dumbbell,
  LogOut,
} from "lucide-react-native";

import { colors } from "../theme/colors";
import { useAuth } from "../context/AuthContext";

function SettingCard({
  icon,
  title,
  value,
}: any) {
  return (
    <View style={styles.card}>
      <View style={styles.cardLeft}>
        {icon}

        <View>
          <Text style={styles.cardTitle}>
            {title}
          </Text>

          <Text style={styles.cardValue}>
            {value}
          </Text>
        </View>
      </View>
    </View>
  );
}

export default function ProfileScreen() {
  const { user, signOut } = useAuth();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.logo}>KLEOS</Text>

      <View style={styles.avatar}>
        <User color={colors.lime} size={46} />
      </View>

      <Text style={styles.name}>
        {user?.email ?? "Kleos Athlete"}
      </Text>

      <Text style={styles.subtitle}>
        Elite Fitness Profile
      </Text>

      <View style={styles.cards}>
        <SettingCard
          icon={
            <Target
              color={colors.lime}
              size={24}
            />
          }
          title="Goal"
          value="Hypertrophy"
        />

        <SettingCard
          icon={
            <Flame
              color={colors.lime}
              size={24}
            />
          }
          title="Calories Target"
          value="2450 kcal"
        />

        <SettingCard
          icon={
            <Dumbbell
              color={colors.lime}
              size={24}
            />
          }
          title="Training Split"
          value="Push Pull Legs"
        />
      </View>

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={signOut}
      >
        <LogOut color="#000" size={20} />

        <Text style={styles.logoutText}>
          LOGOUT
        </Text>
      </TouchableOpacity>
    </ScrollView>
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
    alignItems: "center",
  },

  logo: {
    color: colors.lime,
    fontSize: 14,
    fontWeight: "900",
    letterSpacing: 4,
    alignSelf: "flex-start",
    marginBottom: 40,
  },

  avatar: {
    width: 110,
    height: 110,
    borderRadius: 999,
    backgroundColor: colors.card,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 24,
  },

  name: {
    color: colors.white,
    fontSize: 28,
    fontWeight: "900",
  },

  subtitle: {
    color: colors.gray,
    fontSize: 15,
    marginTop: 8,
    marginBottom: 34,
  },

  cards: {
    width: "100%",
  },

  card: {
    backgroundColor: colors.card,
    borderRadius: 24,
    padding: 22,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: colors.border,
  },

  cardLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  cardTitle: {
    color: colors.gray,
    fontSize: 14,
    marginLeft: 16,
    marginBottom: 6,
  },

  cardValue: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "800",
    marginLeft: 16,
  },

  logoutButton: {
    backgroundColor: colors.lime,
    borderRadius: 22,
    paddingVertical: 18,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 10,
    width: "100%",
    marginTop: 20,
  },

  logoutText: {
    color: "#000",
    fontSize: 15,
    fontWeight: "900",
    letterSpacing: 1,
  },
});