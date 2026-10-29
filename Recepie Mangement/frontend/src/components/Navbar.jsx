import { NavLink, Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="site-header">
      <nav className="navbar page-width" aria-label="Main navigation">
        <Link className="brand" to="/" aria-label="RecipeBook home">
          <span className="brand-mark" aria-hidden="true">🍑</span>
          <span>recipe<span className="brand-accent">book</span></span>
        </Link>
        <div className="nav-actions">
          <NavLink
            to="/recipes"
            className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}
          >
            Explore
          </NavLink>
          <NavLink
            to="/favorites"
            className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}
          >
            Favorites
          </NavLink>
          <Link className="button button-primary nav-add" to="/add">
            <span aria-hidden="true">＋</span> Add recipe
          </Link>
        </div>
      </nav>
    </header>
  );
}