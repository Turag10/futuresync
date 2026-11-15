import {
  ArrowUpRight,
  BookOpen,
  Brain,
  CheckSquare,
  Dumbbell,
  Flame,
  Goal,
  Wallet,
} from "lucide-react";
import { Link } from "react-router-dom";
import type { User } from "../App";
import DashboardShell from "../components/DashboardShell";
import NextActionPredictor from "../components/NextActionPredictor";
import ProductivityChart from "../components/ProductivityChart";

type Props = { user: User; onLogout: () => void };

export default function Dashboard({ user, onLogout }: Props) {
  return (
    <DashboardShell user={user} onLogout={onLogout}>

      {/* Hero Banner — background image restored */}
      <section className="dashboard-hero">
        <div className="dashboard-hero-copy">
          <div className="eyebrow">WELCOME TO FUTURESYNC • DIGITAL TWIN OS</div>
          <h2>Welcome back, <span>{user.name}</span> 👋</h2>
          <p>Your AI-powered life synchronizer — tracking goals, study, fitness &amp; finances in real time.</p>
          <button
            className="gradient-btn"
            onClick={() =>
              document.querySelector(".next-action-card")?.scrollIntoView({ behavior: "smooth", block: "start" })
            }
          >
            Go to Command Centre <ArrowUpRight size={16} />
          </button>
        </div>
      </section>

      {/* Autonomous Next-Action Predictor & Focus HUD */}
      <NextActionPredictor />

      {/* Digital Twin 6-Pillar Ecosystem Grid */}
      <div className="section-subtitle-row">
        <h3>Digital Twin Synchronization Matrix</h3>
        <span className="live-status-pill">● All 6 Life Systems Active</span>
      </div>

      <div className="stats-grid digital-twin-grid">
        <Stat
          icon={<Goal />}
          title="Goals"
          value="04"
          change="↑ 1 milestone this week"
          cls="blue"
          to="/goals"
        />

        <Stat
          icon={<CheckSquare />}
          title="Tasks"
          value="12"
          change="↑ 3 completed today"
          cls="purple"
          to="/tasks"
        />

        <Stat
          icon={<BookOpen />}
          title="Study & Skills"
          value="2.5h"
          change="↑ 75% TypeScript mastery"
          cls="blue"
          to="/study"
        />

        <Stat
          icon={<Dumbbell />}
          title="Bio-Energy"
          value="85%"
          change="Optimal cognitive readiness"
          cls="green"
          to="/fitness"
        />

        <Stat
          icon={<Wallet />}
          title="Finances"
          value="$14.5k"
          change="6.8 mo emergency runway"
          cls="purple"
          to="/finances"
        />

        <Stat
          icon={<Flame />}
          title="Habits"
          value="7 Days"
          change="↑ 82% weekly consistency"
          cls="green"
          to="/habits"
        />
      </div>

      <div className="dashboard-grid">
        {/* Interactive Productivity & Future Score Chart */}
        <ProductivityChart />

        <section className="panel ai-panel">
          <h2><Brain size={23}/> AI Synergy Companion</h2>
          <div className="recommendation">
            <p><strong>Synergy Insight:</strong> Your high 85% bio-energy is multiplying your focus stamina.</p>
            <p>Keep tonight's sleep schedule intact to protect tomorrow's planned 3-hour deep work block. You're building serious momentum! 🚀</p>
          </div>
          <Link to="/ai" className="ghost-btn">View Suggestions <ArrowUpRight size={16}/></Link>
        </section>
      </div>
    </DashboardShell>
  );
}

function Stat({
  icon,
  title,
  value,
  change,
  cls,
  to,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  change: string;
  cls: string;
  to: string;
}) {
  return (
    <Link to={to} className={`stat-card ${cls}`}>
      <div className="stat-icon">{icon}</div>

      <div>
        <p>{title}</p>
        <h3>{value}</h3>
        <span>{change}</span>
      </div>
    </Link>
  );
}