import { Link, Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <div>
      <header>
        <nav>
          <Link to="/" end>
            Home
          </Link>
          <Link to="/result">Result</Link>
        </nav>
      </header>
      <Outlet />
    </div>
  );
};
