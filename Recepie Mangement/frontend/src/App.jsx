import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import AddRecipe from "./pages/AddRecipe";
import Favorites from "./pages/Favorities";
import Home from "./pages/Home";
import RecipeDetails from "./pages/RecipeDetails";
import { RecipeProvider } from "./context/RecipeContext";
import "./styles/Global.css";
import "./styles/App.css";

export default function App() {
  return (
    <RecipeProvider>
      <div className="app-shell">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home landing />} />
            <Route path="/recipes" element={<Home />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/add" element={<AddRecipe />} />
            <Route path="/recipes/:recipeId" element={<RecipeDetails />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <footer className="site-footer">
          <span>🍑 RecipeBook</span>
          <span>Made with love, one meal at a time.</span>
        </footer>
      </div>
    </RecipeProvider>
  );
}
