import * as Notifications from "expo-notifications";
import * as Device from "expo-device";

export async function registerForPushNotifications() {
  if (!Device.isDevice) {
    return;
  }

  const { status: existingStatus } =
    await Notifications.getPermissionsAsync();

  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } =
      await Notifications.requestPermissionsAsync();

    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    return;
  }

  await Notifications.setNotificationChannelAsync(
    "default",
    {
      name: "default",
      importance:
        Notifications.AndroidImportance.MAX,
    }
  );
}

export async function scheduleWorkoutReminder() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "KLEOS AI COACH",
      body: "È il momento del tuo workout.",
    },

    trigger: {
      seconds: 10,
    },
  });
}

export async function scheduleNutritionReminder() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "KLEOS Nutrition",
      body: "Ricorda proteine e idratazione.",
    },

    trigger: {
      seconds: 15,
    },
  });
}