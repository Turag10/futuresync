import { Link } from "react-router-dom";
import Logo from "./Logo";

export default function TopAuth() {
  return (
    <header className="public-topbar">
      <Logo />
      <div className="auth-actions">
        <Link className="ghost-btn small" to="/login">Login</Link>
        <Link className="gradient-btn small" to="/signup">Sign Up</Link>
      </div>
    </header>
  );
}