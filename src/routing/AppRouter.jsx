import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LanguageLayout from "./LanguageLayout.jsx";
import App from "../App.jsx";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<LanguageLayout />}>
          <Route path="*" element={<App />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

