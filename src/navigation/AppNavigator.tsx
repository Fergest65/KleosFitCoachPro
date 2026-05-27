import React, { useEffect, useState } from "react";
import { getDashboardStats } from "../lib/dashboard";
import NutritionCard from "../components/NutritionCard";
import TimerModal from "../components/TimerModal";
import WorkoutDetailScreen from "../screens/WorkoutDetailScreen";
import AICoachScreen from "../screens/AICoachScreen";
import ProgressCard from "../components/ProgressCard";
import WeightChart from "../components/WeightChart";
import { User } from "lucide-react-native";
import ProfileScreen from "../screens/ProfileScreen";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import {
  Home,
  Dumbbell,
  Apple,
  TrendingUp,
  Bot,
  LogOut,
} from "lucide-react-native";

import { colors } from "../theme/colors";
import { useAuth } from "../context/AuthContext";
import StatCard from "../components/StatCard";
import WorkoutCard from "../components/WorkoutCard";

const Tab = createBottomTabNavigator();

function HomeScreen() {
  const { signOut, user } = useAuth();

  const [stats, setStats] = useState({
    workouts: 0,
    calories: 0,
    protein: 0,
    progress: "+0%",
  });

  useEffect(() => {
    async function loadStats() {
      if (!user?.id) return;

      const data = await getDashboardStats(user.id);
      setStats(data);
    }

    loadStats();
  }, [user?.id]);

  return (
    <View style={styles.screen}>
      <Text style={styles.logo}>KLEOS</Text>

      <Text style={styles.welcome}>Bentornato</Text>

      <Text style={styles.userEmail}>
        {user?.email ?? "DEV MODE"}
      </Text>

      <View style={styles.statsRow}>
        <StatCard label="Workout" value={`${stats.workouts}`} />
        <StatCard label="Calories" value={`${stats.calories}`} />
      </View>

      <View style={styles.statsRow}>
        <StatCard label="Protein" value={`${stats.protein}g`} />
        <StatCard label="Progress" value={stats.progress} />
      </View>

      <View style={styles.aiCard}>
        <Text style={styles.aiTitle}>AI COACH</Text>

        <Text style={styles.aiSubtitle}>
          I tuoi dati live sono pronti per generare consigli personalizzati.
        </Text>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={signOut}>
        <LogOut color="#000" size={20} />
        <Text style={styles.logoutText}>LOGOUT</Text>
      </TouchableOpacity>
    </View>
  );
}

function Screen({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <View style={styles.screen}>
      <Text style={styles.logo}>KLEOS</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}

function WorkoutScreen() {
  const [selectedWorkout, setSelectedWorkout] =
    useState<string | null>(null);

  if (selectedWorkout) {
    return (
      <WorkoutDetailScreen
        title={selectedWorkout}
        onBack={() => setSelectedWorkout(null)}
      />
    );
  }

  return (
    <View style={styles.screen}>
      <Text style={styles.logo}>KLEOS</Text>

      <Text style={styles.title}>
        Workout
      </Text>

      <Text style={styles.subtitle}>
        Scegli la sessione di oggi.
      </Text>

      <View style={styles.workoutList}>
        <WorkoutCard
          title="Push Day"
          exercises={6}
          duration="55 min"
          calories="420 kcal"
          onPress={() =>
            setSelectedWorkout("Push Day")
          }
        />

        <WorkoutCard
          title="Pull Day"
          exercises={7}
          duration="60 min"
          calories="480 kcal"
          onPress={() =>
            setSelectedWorkout("Pull Day")
          }
        />

        <WorkoutCard
          title="Leg Day"
          exercises={8}
          duration="70 min"
          calories="610 kcal"
          onPress={() =>
            setSelectedWorkout("Leg Day")
          }
        />
      </View>
    </View>
  );
}

function NutritionScreen() {
  return (
    <View style={styles.screen}>
      <Text style={styles.logo}>KLEOS</Text>

      <Text style={styles.title}>Nutrizione</Text>

      <Text style={styles.subtitle}>
        Monitora calorie e macro giornalieri.
      </Text>

      <View style={styles.nutritionList}>
        <NutritionCard
          label="Calorie"
          value="1850"
          target="2450 kcal"
          progress={75}
        />

        <NutritionCard
          label="Proteine"
          value="142g"
          target="180g"
          progress={78}
        />

        <NutritionCard
          label="Carboidrati"
          value="210g"
          target="300g"
          progress={70}
        />

        <NutritionCard
          label="Grassi"
          value="55g"
          target="80g"
          progress={68}
        />
      </View>
    </View>
  );
}

function ProgressScreen() {
  return (
    <ScrollView
      style={styles.scrollScreen}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.logo}>KLEOS</Text>

      <Text style={styles.title}>Progressi</Text>

      <Text style={styles.subtitle}>
        Monitora la tua evoluzione fisica.
      </Text>

      <View style={styles.chartWrapper}>
        <WeightChart />
      </View>

      <View style={styles.progressList}>
        <ProgressCard
          title="Peso corporeo"
          value="82.4 kg"
          trend="-1.2 kg questo mese"
          positive
        />

        <ProgressCard
          title="Body fat"
          value="14.8%"
          trend="-2.1% questo mese"
          positive
        />

        <ProgressCard
          title="Forza media"
          value="+8%"
          trend="Performance in crescita"
          positive
        />

        <ProgressCard
          title="Streak"
          value="6 giorni"
          trend="Allenamenti consecutivi"
          positive
        />
      </View>
    </ScrollView>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: styles.tabBar,
          tabBarActiveTintColor: colors.lime,
          tabBarInactiveTintColor: colors.gray,
          tabBarLabelStyle: styles.tabLabel,
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <Home color={color} size={22} />
            ),
          }}
        />

        <Tab.Screen
          name="Workout"
          component={WorkoutScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <Dumbbell color={color} size={22} />
            ),
          }}
        />

        <Tab.Screen
          name="Nutrition"
          component={NutritionScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <Apple color={color} size={22} />
            ),
          }}
        />

        <Tab.Screen
          name="Progress"
          component={ProgressScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <TrendingUp color={color} size={22} />
            ),
          }}
        />

        <Tab.Screen
          name="AI Coach"
          component={AICoachScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <Bot color={color} size={22} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <User color={color} size={22} />
    ),
  }}
/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.black,
    padding: 24,
    justifyContent: "center",
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
    fontSize: 34,
    fontWeight: "900",
    marginBottom: 12,
  },

  subtitle: {
    color: colors.gray,
    fontSize: 16,
    lineHeight: 24,
  },

  welcome: {
    color: colors.white,
    fontSize: 32,
    fontWeight: "900",
    marginTop: 10,
  },

  userEmail: {
    color: colors.gray,
    fontSize: 15,
    marginTop: 6,
    marginBottom: 30,
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },

  aiCard: {
    backgroundColor: colors.card,
    borderRadius: 24,
    padding: 24,
    marginTop: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },

  aiTitle: {
    color: colors.lime,
    fontSize: 16,
    fontWeight: "900",
    marginBottom: 10,
  },

  aiSubtitle: {
    color: colors.white,
    fontSize: 16,
    lineHeight: 24,
  },

  workoutList: {
    marginTop: 28,
  },

  logoutButton: {
    marginTop: 34,
    backgroundColor: colors.lime,
    borderRadius: 18,
    paddingVertical: 16,
    paddingHorizontal: 22,
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  logoutText: {
    color: "#000",
    fontWeight: "900",
    fontSize: 14,
    letterSpacing: 1,
  },

  tabBar: {
    backgroundColor: colors.dark,
    borderTopColor: colors.border,
    height: 76,
    paddingTop: 8,
    paddingBottom: 12,
  },
nutritionList: {
  marginTop: 28,
},
  tabLabel: {
    fontSize: 11,
    fontWeight: "700",
  },
  progressList: {
  marginTop: 28,
},
  chartWrapper: {
  marginTop: 28,
},
scrollScreen: {
  flex: 1,
  backgroundColor: colors.black,
},

scrollContent: {
  padding: 24,
  paddingTop: 70,
  paddingBottom: 120,
},
});