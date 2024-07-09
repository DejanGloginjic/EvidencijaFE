import { Outlet } from "react-router-dom";
import Navigation from "../components/Navigation/Navigation";
import classes from "./Layout.module.scss";

export default function Layout() {
  return (
    <div className={classes.container}>
      <Navigation />
      <main className={classes.content}>
        <Outlet />
      </main>
    </div>
  );
}
