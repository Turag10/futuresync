import { FormEvent, useState } from "react";
import { Eye, EyeOff, LockKeyhole, Mail, UserRound } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import type { User } from "../App";

type Props = { onSignup: (user: User) => void };

export default function Signup({ onSignup }: Props) {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password || !confirm) return setError("Please complete all fields.");
    if (password !== confirm) return setError("Passwords do not match.");
    onSignup({ name, email });
    navigate("/dashboard");
  };

  return (
    <div className="auth-page">
      <div className="auth-visual">
        <Logo />
        <div className="auth-visual-content">
          <div className="eyebrow">START TODAY</div>
          <h1>Sync Your Future</h1>
          <p>Create your FutureSync account and turn your goals, habits and daily actions into measurable progress.</p>
        </div>
      </div>
      <div className="auth-panel">
        <Link className="back-home" to="/">← Back to home</Link>
        <form className="auth-card signup-card" onSubmit={submit}>
          <div className="auth-title"><span className="mini-star">✦</span><div><h2>Create Your Account</h2><p>Join FutureSync and start your journey.</p></div></div>
          <label>Full Name</label>
          <div className="input-wrap"><UserRound size={17}/><input value={name} onChange={e=>setName(e.target.value)} placeholder="Enter your full name"/></div>
          <label>Email Address</label>
          <div className="input-wrap"><Mail size={17}/><input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Enter your email"/></div>
          <label>Password</label>
          <div className="input-wrap"><LockKeyhole size={17}/><input type={showPassword ? "text" : "password"} value={password} onChange={e=>setPassword(e.target.value)} placeholder="Enter your password"/><button type="button" className="input-icon-btn" onClick={()=>setShowPassword(!showPassword)}>{showPassword?<EyeOff size={17}/>:<Eye size={17}/>}</button></div>
          <label>Confirm Password</label>
          <div className="input-wrap"><LockKeyhole size={17}/><input type={showConfirmPassword ? "text" : "password"} value={confirm} onChange={e=>setConfirm(e.target.value)} placeholder="Confirm your password"/><button type="button" className="input-icon-btn" onClick={()=>setShowConfirmPassword(!showConfirmPassword)}>{showConfirmPassword?<EyeOff size={17}/>:<Eye size={17}/>}</button></div>
          {error && <div className="form-error">{error}</div>}
          <button className="gradient-btn full" type="submit">Create Account</button>
          <p className="switch-auth">Already have an account? <Link to="/login">Login</Link></p>
        </form>
      </div>
    </div>
  );
}