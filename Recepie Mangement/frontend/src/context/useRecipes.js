import { useContext } from "react";
import { RecipeContext } from "./recipeContextValue";

export function useRecipes() {
  const context = useContext(RecipeContext);
  if (!context) {
    throw new Error("useRecipes must be used inside a RecipeProvider.");
  }
  return context;
}
