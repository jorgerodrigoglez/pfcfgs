import { Routes, Route, Navigate } from "react-router-dom";
import { AuthPage } from "../auth/pages";
import { MainRoutes } from "./MainRoutes";

export const AppRouter = () => {
  const authAuthenticated = "authenticated"; //'authenticated'

  return (
    <Routes>
      {authAuthenticated === "not-authenticated" ? (
        <Route path="/auth/*" element={<AuthPage />} />
      ) : (
        <Route path="/*" element={<MainRoutes />} />
      )}

      <Route path="/*" element={<Navigate to="/auth/login" />} />
    </Routes>
  );
};
