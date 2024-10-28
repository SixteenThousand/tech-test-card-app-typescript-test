import { NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <nav className="flex justify-center gap-5">
      <NavLink
        className="
          m-3 p-4
          bg-blue-light dark:bg-blue-dark
          hover:bg-blue-alt dark:hover:bg-blue-alt
          rounded-md
          text-xl font-medium text-white
        "
        to={"/"}
      >
        All Entries
      </NavLink>
      <NavLink
        className="
          m-3 p-4
          bg-blue-light dark:bg-blue-dark
          hover:bg-blue-alt dark:hover:bg-blue-alt
          rounded-md
          text-xl font-medium text-white
        "
        to={"/create"}
      >
        New Entry
      </NavLink>
    </nav>
  );
}
