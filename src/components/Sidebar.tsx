import { NavLink } from "react-router-dom";
import {
  Activity, BarChart3, Brain, CheckSquare, Flame, Goal, Home, LineChart,
} from "lucide-react";
import Logo from "./Logo";

const items = [
  { to: "/dashboard", label: "Overview", icon: Home },
  { to: "/goals", label: "Goals", icon: Goal },
  { to: "/tasks", label: "Tasks", icon: CheckSquare },
  { to: "/habits", label: "Habits", icon: Flame },
  { to: "/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/simulator", label: "Simulator", icon: Activity },
  { to: "/ai", label: "AI", icon: Brain },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand"><Logo /></div>
      <nav className="side-nav">
        {items.map(({ to, label, icon: Icon }) => (
          <NavLink key={to} to={to} className={({ isActive }) => isActive ? "side-link active" : "side-link"}>
            <Icon size={22} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="sidebar-quote">
        <span />
        <p>A better you,<br />a brighter tomorrow.</p>
      </div>
    </aside>
  );
}