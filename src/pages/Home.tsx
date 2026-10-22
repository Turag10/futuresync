
import { Brain, Flame, Goal, LineChart } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "../components/Logo";
import TopAuth from "../components/TopAuth";

export default function Home() {
  const features = [
    {
      icon: Goal,
      title: "Set Your Goals",
      text: "Turn your dreams into clear, actionable goals.",
      path: "/goals",
    },
    {
      icon: Flame,
      title: "Build Good Habits",
      text: "Small steps, big changes over time.",
      path: "/habits",
    },
    {
      icon: LineChart,
      title: "Track Progress",
      text: "See your growth with real insights.",
      path: "/analytics",
    },
    {
      icon: Brain,
      title: "AI Support",
      text: "Get personalized advice from your AI companion.",
      path: "/ai",
    },
  ];

  return (
    <div className="home-page">

      <TopAuth />

      {/* HERO */}
      <section className="hero">

        <div className="hero-copy">

          <div className="eyebrow">
            WELCOME TO FUTURESYNC
          </div>

          <h1>
            Your Goals. Your Habits.
            <br />
            A <span>Smarter Future.</span>
          </h1>

          <p>
            FutureSync is your AI-powered personal companion,
            helping you plan, track and achieve your goals —
            step by step, every day.
          </p>

          <div className="hero-actions">

            <Link
              className="gradient-btn"
              to="/signup"
            >
              Get Started
            </Link>

            <a
              className="ghost-btn"
              href="#features"
            >
              Learn More
            </a>

          </div>

        </div>

        <div className="hero-art">

          <div className="hero-art-overlay" />

          <div className="hero-note">
            Better
            <br />
            Habits
            <br />
            Bigger
            <br />
            Dreams
          </div>

        </div>

      </section>


      {/* FEATURES */}
      <section
        id="features"
        className="features-section"
      >

        <div className="section-heading">

          <div className="eyebrow">
            BUILT FOR YOUR FUTURE
          </div>

          <h2>
            Why Choose FutureSync?
          </h2>

          <p>
            Everything you need to turn your plans
            into consistent progress.
          </p>

        </div>


        <div className="feature-grid">

          {features.map(
            ({ icon: Icon, title, text, path }) => (
<Link
  to={path}
  className="feature-card"
  key={title}
  onClick={() => console.log("CARD CLICKED:", path)}
>

                <div className="feature-icon">
                  <Icon size={23} />
                </div>

                <h3>
                  {title}
                </h3>

                <p>
                  {text}
                </p>

                <span className="feature-link">
                  Explore →
                </span>

              </Link>

            )
          )}

        </div>

      </section>


      {/* FOOTER */}
      <footer className="public-footer">

        <Logo />

        <span>
          Plan. Practice. Progress.
        </span>

      </footer>

    </div>
  );
}

