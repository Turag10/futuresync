import { FormEvent, useState } from "react";
import { Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import type { User } from "../App";

type Props = { onLogin: (user: User) => void };

export default function Login({ onLogin }: Props) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!email || !password) return setError("Please enter your email and password.");
    onLogin({ name: email.split("@")[0] || "Raihan", email });
    navigate("/dashboard");
  };

  return (
    <div className="auth-page">
      <div className="auth-visual">
        <Logo />
        <div className="auth-visual-content">
          <div className="eyebrow">FUTURESYNC</div>
          <h1>Sync Your Future</h1>
          <p>Discover your career path, build your skills, and connect with opportunities that shape your future.</p>
        </div>
      </div>
      <div className="auth-panel">
        <Link className="back-home" to="/">← Back to home</Link>
        <form className="auth-card" onSubmit={submit}>
          <div className="auth-title">
            <span className="mini-star">✦</span>
            <div><h2>Welcome Back!</h2><p>Login to continue to FutureSync</p></div>
          </div>
          <label>Email Address</label>
          <div className="input-wrap"><Mail size={17} /><input type="email" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} /></div>
          <label>Password</label>
          <div className="input-wrap"><LockKeyhole size={17} /><input type={show ? "text" : "password"} placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} /><button type="button" className="input-icon-btn" onClick={() => setShow(!show)}>{show ? <EyeOff size={17}/> : <Eye size={17}/>}</button></div>
          <div className="auth-row"><label className="remember"><input type="checkbox" defaultChecked /> Remember me</label><a href="#forgot">Forgot Password?</a></div>
          {error && <div className="form-error">{error}</div>}
          <button className="gradient-btn full" type="submit">Login</button>
          <div className="or"><span>Or</span></div>
          <p className="switch-auth">Don't have an account? <Link to="/signup">Sign Up</Link></p>
        </form>
      </div>
    </div>
  );
}