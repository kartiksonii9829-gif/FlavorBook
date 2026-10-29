import { Link } from "react-router-dom";
import RecipeCard from "../components/RecipeCard";
import { useRecipes } from "../context/useRecipes";

export default function Favorites() {
  const { recipes, favorites } = useRecipes();
  const favoriteRecipes = recipes.filter((recipe) => favorites.includes(recipe.id));

  return (
    <div className="page-width favorites-page">
      <div className="explorer-heading">
        <div><span className="eyebrow">The recipes you love</span><h1>Your <em>favorites.</em></h1></div>
        <span className="recipe-count">{favoriteRecipes.length} saved</span>
      </div>
      {favoriteRecipes.length ? (
        <div className="recipe-grid">{favoriteRecipes.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} />)}</div>
      ) : (
        <div className="empty-state">
          <span className="empty-icon" aria-hidden="true">♡</span>
          <h2>Your favorites live here</h2>
          <p>Tap the heart on a recipe to keep it close for next time.</p>
          <Link className="button button-primary" to="/recipes">Explore recipes <span aria-hidden="true">→</span></Link>
        </div>
      )}
    </div>
  );
}