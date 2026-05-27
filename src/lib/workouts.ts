import { supabase } from "./supabase";

export async function saveWorkoutSession(
  userId: string,
  workoutTitle: string
) {
  const { data, error } = await supabase
    .from("workout_sessions")
    .insert({
      user_id: userId,
      workout_title: workoutTitle,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function getWorkoutSessions(userId: string) {
  const { data, error } = await supabase
    .from("workout_sessions")
    .select("*")
    .eq("user_id", userId)
    .order("completed_at", { ascending: false });

  if (error) {
    throw error;
  }

  return data;
}