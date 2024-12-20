import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/Home.tsx";
import ProtectedRoute from "./layouts/ProtectedRoute.tsx";
import Profile from "./pages/Profile.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* if you wanna know how routing works, refer to https://reactrouter.com/start/library/routing */}
    <BrowserRouter>
      <Routes>
        {/* root path */}
        <Route index element={<Home />} />

        {/* routes that need users to be authenticated */}
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
