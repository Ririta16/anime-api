import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import Detail from "./pages/Detail.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/all" replace />} />
        <Route element={<App />} path="/:season" />
        <Route element={<Detail />} path="/detail/:id" />
      </Routes>
    </HashRouter>
  </StrictMode>
);
