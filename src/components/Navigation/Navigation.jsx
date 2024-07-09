import { NavLink } from "react-router-dom";
import classes from "./Navigation.module.scss";

export default function Navigation() {
  return (
    <header className={classes.header}>
      <nav className={classes.nav}>
        <ul>
          <NavLink
            to=""
            className={({ isActive }) => (isActive ? classes.active : "")}
            end
          >
            Grobna mjesta
          </NavLink>
          <NavLink
            to="odrzavanje"
            className={({ isActive }) => (isActive ? classes.active : "")}
          >
            Održavanje
          </NavLink>
          <div>
            <div className={classes.background} />
            <div className={classes.footer} />
          </div>
        </ul>
      </nav>
    </header>
  );
}
