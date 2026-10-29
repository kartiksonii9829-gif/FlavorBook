import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import RecipeCard from "../components/RecipeCard";
import { useRecipes } from "../context/useRecipes";

const categories = ["All", "Breakfast", "Lunch", "Dinner", "Dessert", "Snack", "Drinks"];

function LandingPage() {
  return (
    <div className="page-width landing-page">
      <section className="hero-section">
        <div className="hero-copy">
          <span className="eyebrow"><span className="eyebrow-dot" /> Your little kitchen companion</span>
          <h1>Good food.<br /><em>Good mood.</em></h1>
          <p>Keep your favorite recipes close, discover your next meal, and make every day a little more delicious.</p>
          <div className="hero-actions">
            <Link to="/recipes" className="button button-primary">Explore recipes <span aria-hidden="true">→</span></Link>
            <Link to="/add" className="hero-secondary">Share a recipe <span aria-hidden="true">↗</span></Link>
          </div>
          <div className="hero-note"><span>✦</span> A little inspiration for your next meal</div>
        </div>
        <div className="hero-visual">
          <div className="hero-image-frame">
            <img
              src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=90"
              alt="A colorful bowl of fresh vegetables and grains"
            />
          </div>
          <span className="hero-sparkle sparkle-one" aria-hidden="true">✳</span>
          <span className="hero-sparkle sparkle-two" aria-hidden="true">✦</span>
          <div className="floating-note"><span>♡</span><div><strong>Made with love</strong><small>and a pinch of joy</small></div></div>
        </div>
      </section>
      <section className="landing-feature">
        <div><span className="eyebrow">A collection that feels like home</span><h2>Your next favorite is just a recipe away.</h2></div>
        <Link to="/recipes" className="text-link">Browse the collection <span>→</span></Link>
      </section>
    </div>
  );
}

function RecipeExplorer() {
  const { recipes } = useRecipes();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const filteredRecipes = useMemo(() => recipes.filter((recipe) => {
    const query = search.trim().toLowerCase();
    const matchesSearch = !query || [recipe.title, recipe.description, ...(recipe.ingredients || [])]
      .join(" ").toLowerCase().includes(query);
    return matchesSearch && (category === "All" || recipe.category === category);
  }), [category, recipes, search]);

  return (
    <div className="page-width explorer-page">
      <div className="explorer-heading">
        <div><span className="eyebrow">Find something lovely</span><h1>Find your next <em>favorite.</em></h1></div>
        <span className="recipe-count">{recipes.length} {recipes.length === 1 ? "recipe" : "recipes"} and counting</span>
      </div>
      <div className="explorer-controls">
        <label className="search-box">
          <span aria-hidden="true">⌕</span>
          <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search recipes or ingredients..." aria-label="Search recipes or ingredients" />
          {search && <button type="button" onClick={() => setSearch("")} aria-label="Clear search">×</button>}
        </label>
        <div className="category-list" aria-label="Filter by category">
          {categories.map((item) => (
            <button type="button" key={item} className={`category-filter${category === item ? " selected" : ""}`} onClick={() => setCategory(item)} aria-pressed={category === item}>{item}</button>
          ))}
        </div>
      </div>
      {filteredRecipes.length ? (
        <div className="recipe-grid">{filteredRecipes.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} />)}</div>
      ) : (
        <div className="empty-state">
          <span className="empty-icon" aria-hidden="true">🍲</span>
          <h2>No recipes found</h2>
          <p>Try another search or category, or add a new recipe to your collection.</p>
          <Link className="button button-primary" to="/add">Add a recipe <span aria-hidden="true">→</span></Link>
        </div>
      )}
    </div>
  );
}

export default function Home({ landing = false }) {
  return landing ? <LandingPage /> : <RecipeExplorer />;
}