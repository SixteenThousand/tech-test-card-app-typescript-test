import React, { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import AllEntries from "./routes/AllEntries";
import EditEntry from "./routes/EditEntry";
import NewEntry from "./routes/NewEntry";
import { EntryProvider } from "./utilities/globalContext";

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  function toggleDarkMode() {
    setIsDarkMode((currentMode) => {
      return !currentMode;
    });
  }

  return (
    <div className={isDarkMode ? "dark" : "light"}>
      <section className="bg-white h-screen w-screen dark:bg-black">
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
        <button
          id="dark-mode-toggle"
          onClick={toggleDarkMode}
          className="
            bg-slate-200
            dark:bg-slate-500
            text-3xl text-black
            dark:text-slate-100
            h-12 w-12 rounded-xl px-1
            dark:pb-2
          "
        >
          {isDarkMode ? "☼" : "☽"}
        </button>
      </section>
    </div>
  );
}
