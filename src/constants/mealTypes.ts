export type MealType = "desayuno" | "almuerzo" | "cena" | "snack";

export const MEAL_TYPES: {
  value: MealType;
  label: string;
  emoji: string;
}[] = [
  {
    value: "desayuno",
    label: "Desayuno",
    emoji: "🍳",
  },
  {
    value: "almuerzo",
    label: "Almuerzo",
    emoji: "🍲",
  },
  {
    value: "cena",
    label: "Cena",
    emoji: "🍝",
  },
  {
    value: "snack",
    label: "Snack",
    emoji: "🥜",
  },
];
