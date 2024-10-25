import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoutes({ canActive, redirectedPath = '/' }) {
  if (!canActive) return <Navigate to={redirectedPath} replace />

  return <Outlet />
}