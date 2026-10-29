import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecipes } from "../context/useRecipes";

const initialForm = {
  title: "",
  category: "Dinner",
  difficulty: "Easy",
  time: "",
  servings: "",
  image: "",
  description: "",
  ingredients: "",
  steps: "",
};

export default function RecipeForm() {
  const [form, setForm] = useState(initialForm);
  const { addRecipe } = useRecipes();
  const navigate = useNavigate();

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const recipe = addRecipe({
      ...form,
      time: Number(form.time),
      servings: Number(form.servings),
      ingredients: form.ingredients.split("\n").map((item) => item.trim()).filter(Boolean),
      steps: form.steps.split("\n").map((item) => item.trim()).filter(Boolean),
    });
    navigate(`/recipes/${recipe}`);
  }

  function handleClear() {
    setForm(initialForm);
  }

  return (
    <form className="recipe-form" onSubmit={handleSubmit}>
      <section className="form-section">
        <div className="form-section-heading">
          <span className="section-icon" aria-hidden="true">✎</span>
          <div>
            <h2>Recipe details</h2>
            <p>Fields marked with * are required.</p>
          </div>
        </div>
        <label className="field field-full">
          Recipe name *
          <input
            autoFocus
            name="title"
            placeholder="e.g. Creamy tomato pasta"
            value={form.title}
            onChange={updateField}
            required
            maxLength={80}
          />
        </label>
        <div className="field-grid">
          <label className="field">
            Category
            <select name="category" value={form.category} onChange={updateField}>
              {["Breakfast", "Lunch", "Dinner", "Dessert", "Snack", "Drinks"].map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <label className="field">
            Difficulty
            <select name="difficulty" value={form.difficulty} onChange={updateField}>
              {["Easy", "Medium", "Hard"].map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>
          <label className="field">
            Prep time (minutes)
            <input name="time" type="number" min="1" max="1440" placeholder="20" value={form.time} onChange={updateField} required />
          </label>
          <label className="field">
            Servings
            <input name="servings" type="number" min="1" max="100" placeholder="2" value={form.servings} onChange={updateField} required />
          </label>
        </div>
        <label className="field field-full">
          Image URL <span className="optional">(optional)</span>
          <input name="image" type="url" placeholder="https://example.com/recipe.jpg" value={form.image} onChange={updateField} />
        </label>
        <label className="field field-full">
          Short description *
          <textarea name="description" rows="3" placeholder="What makes this recipe special?" value={form.description} onChange={updateField} required />
        </label>
      </section>

      <section className="form-section form-section-lists">
        <label className="field">
          Ingredients *
          <span className="field-hint">Add one ingredient per line.</span>
          <textarea name="ingredients" rows="6" placeholder={"2 cups flour\n1 cup milk\nA pinch of salt"} value={form.ingredients} onChange={updateField} required />
        </label>
        <label className="field">
          Instructions *
          <span className="field-hint">Add one cooking step per line.</span>
          <textarea name="steps" rows="6" placeholder={"Mix everything together.\nCook until golden.\nServe and enjoy."} value={form.steps} onChange={updateField} required />
        </label>
      </section>
      <div className="form-actions">
        <button type="button" className="button button-quiet" onClick={handleClear}>Clear form</button>
        <button type="submit" className="button button-primary">Save recipe <span aria-hidden="true">→</span></button>
      </div>
    </form>
  );
}