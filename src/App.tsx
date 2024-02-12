import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TechReviewPage from "./pages/TechReview";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TechReviewPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
