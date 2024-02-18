import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TechReviewPage from "./pages/TechReview";
import SpecGuidePage from "./pages/SpecGuide";
import SpecReviewPage from "./pages/SpecReview";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/tech_review" element={<TechReviewPage />} />
        <Route path="/spec_guide" element={<SpecGuidePage />} />
        <Route path="/spec_review" element={<SpecReviewPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
