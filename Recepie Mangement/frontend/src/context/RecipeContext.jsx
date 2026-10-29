import { useEffect, useState } from "react";
import { RecipeContext } from "./recipeContextValue";

const STORAGE_KEY = "recipebook-recipes";
const FAVORITES_KEY = "recipebook-favorites";

const starterRecipes = [
  {
    id: "creamy-tomato-pasta",
    title: "Creamy Tomato Pasta",
    category: "Dinner",
    difficulty: "Easy",
    time: 25,
    servings: 2,
    image:
      "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=1200&q=85",
    description:
      "A comforting pasta tossed in a silky tomato and cream sauce with fresh basil.",
    ingredients: ["200g pasta", "1 cup cherry tomatoes", "2 tbsp cream", "Fresh basil"],
    steps: ["Cook the pasta until al dente.", "Simmer tomatoes with cream.", "Toss together and finish with fresh basil."],
  },
  {
    id: "rainbow-buddha-bowl",
    title: "Rainbow Buddha Bowl",
    category: "Lunch",
    difficulty: "Medium",
    time: 30,
    servings: 2,
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=85",
    description:
      "A colorful, nourishing bowl with grains, crunchy vegetables, and a zesty dressing.",
    ingredients: ["1 cup cooked quinoa", "1 avocado", "1 cup chickpeas", "Fresh vegetables", "Lemon dressing"],
    steps: ["Prepare the quinoa and chickpeas.", "Slice the vegetables and avocado.", "Arrange everything in a bowl and drizzle with dressing."],
  },
];

function readStorage(key, fallback) {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch (error) {
    console.error(`Could not read ${key} from local storage.`, error);
    return fallback;
  }
}

export function RecipeProvider({ children }) {
  const [recipes, setRecipes] = useState(() =>
    readStorage(STORAGE_KEY, starterRecipes),
  );
  const [favorites, setFavorites] = useState(() =>
    readStorage(FAVORITES_KEY, []),
  );

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
  }, [recipes]);

  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  function addRecipe(recipe) {
    const newRecipe = { ...recipe, id: `${Date.now()}` };
    setRecipes((current) => [newRecipe, ...current]);
    return newRecipe.id;
  }

  function toggleFavorite(id) {
    setFavorites((current) =>
      current.includes(id)
        ? current.filter((favoriteId) => favoriteId !== id)
        : [...current, id],
    );
  }

  return (
    <RecipeContext.Provider
      value={{ recipes, favorites, addRecipe, toggleFavorite }}
    >
      {children}
    </RecipeContext.Provider>
  );
}