import { supabase } from "./supabase";

export type DashboardStats = {
  workouts: number;
  calories: number;
  protein: number;
  progress: string;
};

export async function getDashboardStats(
  userId: string
): Promise<DashboardStats> {
  const { data: workoutSessions, error: workoutError } =
    await supabase
      .from("workout_sessions")
      .select("id")
      .eq("user_id", userId);

  if (workoutError) {
    throw workoutError;
  }

  const { data: nutritionLogs, error: nutritionError } =
    await supabase
      .from("nutrition_logs")
      .select("calories, protein")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(1);

  if (nutritionError) {
    throw nutritionError;
  }

  const latestNutrition = nutritionLogs?.[0];

  return {
    workouts: workoutSessions?.length ?? 0,
    calories: latestNutrition?.calories ?? 0,
    protein: latestNutrition?.protein ?? 0,
    progress: "+4%",
  };
}