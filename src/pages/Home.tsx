import { Brain, Flame, Goal, LineChart } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "../components/Logo";
import TopAuth from "../components/TopAuth";

export default function Home() {
  return (
    <div className="home-page">
      <TopAuth />
      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow">WELCOME TO FUTURESYNC</div>
          <h1>Your Goals. Your Habits.<br />A <span>Smarter Future.</span></h1>
          <p>FutureSync is your AI-powered personal companion, helping you plan, track and achieve your goals — step by step, every day.</p>
          <div className="hero-actions">
            <Link className="gradient-btn" to="/signup">Get Started</Link>
            <a className="ghost-btn" href="#features">Learn More</a>
          </div>
        </div>
        <div className="hero-art">
          <div className="hero-art-overlay" />
          <div className="hero-note">Better<br />Habits<br />Bigger<br />Dreams</div>
        </div>
      </section>

      <section id="features" className="features-section">
        <div className="section-heading">
          <div className="eyebrow">BUILT FOR YOUR FUTURE</div>
          <h2>Why Choose FutureSync?</h2>
          <p>Everything you need to turn your plans into consistent progress.</p>
        </div>
        <div className="feature-grid">
          {[
            [Goal, "Set Your Goals", "Turn your dreams into clear, actionable goals."],
            [Flame, "Build Good Habits", "Small steps, big changes over time."],
            [LineChart, "Track Progress", "See your growth with real insights."],
            [Brain, "AI Support", "Get personalized advice from your AI companion."],
          ].map(([Icon, title, text]) => {
            const C = Icon as typeof Goal;
            return <article className="feature-card" key={title as string}><div className="feature-icon"><C size={23} /></div><h3>{title as string}</h3><p>{text as string}</p></article>;
          })}
        </div>
      </section>
      <footer className="public-footer"><Logo /><span>Plan. Practice. Progress.</span></footer>
    </div>
  );
}