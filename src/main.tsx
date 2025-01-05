import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Detail from "./pages/Detail.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/all" replace />} />
        <Route element={<App />} path="/:season" />
        <Route element={<Detail />} path="/detail/:id" />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
