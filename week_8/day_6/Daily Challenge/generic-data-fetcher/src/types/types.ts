export type RequestStatus = "idle" | "loading" | "succeeded" | "failed";

export interface DataEntry {
  status: RequestStatus;
  error: string | null;
  data: unknown;
}

export interface DataState {
  entries: Record<string, DataEntry>;
}

export interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

export interface MealsResponse {
  meals: Meal[] | null;
}
