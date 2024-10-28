import React, { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import AllEntries from "./routes/AllEntries";
import EditEntry from "./routes/EditEntry";
import NewEntry from "./routes/NewEntry";
import { EntryProvider } from "./utilities/globalContext";

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem("isDarkMode") === "true");
  function toggleDarkMode() {
    setIsDarkMode((currentMode) => {
      const newMode = !currentMode;
      localStorage.setItem("isDarkMode", newMode);
      return newMode;
    });
  }

  return (
    <div className={isDarkMode ? "dark" : "light"}>
      <section
        className="
          bg-white dark:bg-gray-vdark
          text-black dark:text-gray-vlight
          h-fit min-h-screen w-screen
        "
      >
        <button
          id="dark-mode-toggle"
          onClick={toggleDarkMode}
          className="
            relative m-3
            md:absolute md:top-3 md:right-3 md:m-0
            bg-gray-light dark:bg-gray-dark
            text-black dark:text-white
            text-3xl
            h-12 w-12 rounded-md px-1
            dark:pb-2
          "
        >
          {isDarkMode ? "☼" : "☽"}
        </button>
        <Router>
          <EntryProvider>
            <NavBar></NavBar>
            <Routes>
              <Route path="/" element={<AllEntries />}></Route>
              <Route path="create" element={<NewEntry />}></Route>
              <Route path="edit/:id" element={<EditEntry />}></Route>
            </Routes>
          </EntryProvider>
        </Router>
      </section>
    </div>
  );
}
