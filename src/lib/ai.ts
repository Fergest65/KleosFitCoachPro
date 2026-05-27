export async function askAICoach(
  userId: string,
  message: string
) {
  await new Promise((resolve) =>
    setTimeout(resolve, 1200)
  );

  const lower = message.toLowerCase();

  if (
    lower.includes("addome") ||
    lower.includes("abs")
  ) {
    return `
Programma Addome Premium:

• Crunch machine — 4x15
• Hanging leg raises — 4x12
• Cable crunch — 4x15
• Plank — 3x60 sec

Recupero:
45-60 sec

Frequenza:
3 volte settimana.
`;
  }

  if (
    lower.includes("petto") ||
    lower.includes("chest")
  ) {
    return `
Workout Petto Massa:

• Bench Press — 4x8
• Incline DB Press — 4x10
• Chest Press Machine — 3x12
• Cable Fly — 3x15

Focus:
progressive overload + controllo eccentrica.
`;
  }

  if (
    lower.includes("proteine") ||
    lower.includes("protein")
  ) {
    return `
Per ipertrofia:

• 1.8g - 2.2g proteine per kg corporeo

Esempio:
80kg → 160g proteine circa.
`;
  }

  return `
Consiglio Kleos AI Coach:

• Mantieni progressione carichi
• Dormi 7-8 ore
• Proteine elevate
• Allenati con intensità controllata

Posso creare:
- workout
- dieta
- massa
- definizione
- addome
- forza
- cardio
`;
}