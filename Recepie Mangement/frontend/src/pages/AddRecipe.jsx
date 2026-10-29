import RecipeForm from "../components/RecipeForm";

export default function AddRecipe() {
  return (
    <div className="page-width">
      <section className="page-intro add-intro">
        <span className="eyebrow">Add something delicious</span>
        <h1>Share a recipe <em>with your future self.</em></h1>
        <p>Save the ingredients and steps so your next cooking session is easy.</p>
      </section>
      <RecipeForm />
    </div>
  );
}