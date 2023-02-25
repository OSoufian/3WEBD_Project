import { Link, Outlet } from "react-router-dom";

export default function Root() {
  return (
    <div>
      <NavBar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export function NavBar() {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "center",
        margin: 10,
        gap: 10,
      }}
    >
      <Link to="/">Accueil</Link>
      <Link to="/team">Team</Link>
      <Link to="/about">About</Link>
    </nav>
  );
}
