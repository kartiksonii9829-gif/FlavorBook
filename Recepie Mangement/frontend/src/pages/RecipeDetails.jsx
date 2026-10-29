import { Link, useParams } from "react-router-dom";
import { useRecipes } from "../context/useRecipes";

export default function RecipeDetails() {
  const { recipeId } = useParams();
  const { recipes } = useRecipes();
  const recipe = recipes.find((item) => item.id === recipeId);

  if (!recipe) {
    return (
      <div className="page-width empty-state missing-recipe">
        <span className="empty-icon" aria-hidden="true">🍽️</span>
        <h2>We couldn't find that recipe</h2>
        <p>It may have been removed or the link may be incorrect.</p>
        <Link className="button button-primary" to="/recipes">Back to recipes</Link>
      </div>
    );
  }

  return (
    <article className="page-width detail-page">
      <Link to="/recipes" className="back-link">← Back to recipes</Link>
      <div className="detail-hero">
        <img src={recipe.image || "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=85"} alt={recipe.title} />
        <div className="detail-heading">
          <span className="category-pill detail-category">{recipe.category}</span>
          <h1>{recipe.title}</h1>
          <p>{recipe.description}</p>
          <div className="detail-meta"><span>◷ {recipe.time} min</span><span>✦ {recipe.difficulty}</span><span>♧ {recipe.servings} servings</span></div>
        </div>
      </div>
      <div className="detail-columns">
        <section className="detail-section">
          <span className="eyebrow">Gather around</span><h2>Ingredients</h2>
          <ul className="ingredient-list">{recipe.ingredients.map((ingredient, index) => <li key={`${ingredient}-${index}`}><span className="ingredient-check">✓</span>{ingredient}</li>)}</ul>
        </section>
        <section className="detail-section">
          <span className="eyebrow">Let's get cooking</span><h2>Instructions</h2>
          <ol className="instruction-list">{recipe.steps.map((step, index) => <li key={`${step}-${index}`}><span>{String(index + 1).padStart(2, "0")}</span><p>{step}</p></li>)}</ol>
        </section>
      </div>
    </article>
  );
}