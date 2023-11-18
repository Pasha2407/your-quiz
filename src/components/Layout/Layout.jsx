import { NavLink, Outlet } from "react-router-dom";
import css from "./Layout.module.css";

export const Layout = () => {
  return (
    <div>
      <header className={css.Header}>
        <nav>
          <NavLink
            to="/"
            style={({ isActive }) => ({
              border: isActive ? "ridge white" : "",
            })}
          >
            HOME
          </NavLink>
          <NavLink
            to="/result"
            style={({ isActive }) => ({
              border: isActive ? "ridge white" : "",
            })}
          >
            RESULTS
          </NavLink>
        </nav>
      </header>
      <main className={css.Main}>
        <Outlet />
      </main>
    </div>
  );
};
