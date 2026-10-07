import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import FeaturePage from "./pages/FeaturePage";

export type User = {
  name: string;
  email: string;
};

export default function App() {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("futuresync_user");
    return saved ? JSON.parse(saved) as User : null;
  });

  useEffect(() => {
    if (user) localStorage.setItem("futuresync_user", JSON.stringify(user));
    else localStorage.removeItem("futuresync_user");
  }, [user]);

  const logout = () => setUser(null);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={user ? <Navigate to="/dashboard" replace /> : <Login onLogin={setUser} />} />
      <Route path="/signup" element={user ? <Navigate to="/dashboard" replace /> : <Signup onSignup={setUser} />} />
      <Route
        path="/dashboard"
        element={user ? <Dashboard user={user} onLogout={logout} /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/:feature"
        element={user ? <FeaturePage user={user} onLogout={logout} /> : <Navigate to="/login" replace />}
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}