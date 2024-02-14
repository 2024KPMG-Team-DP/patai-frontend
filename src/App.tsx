import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TechReviewPage from "./pages/TechReview";
import SpecGuidePage from "./pages/SpecGuide";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/tech_review" element={<TechReviewPage />} />
        <Route path="/spec_guide" element={<SpecGuidePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
