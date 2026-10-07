import { ArrowUpRight, Brain, CheckSquare, Goal, LineChart } from "lucide-react";
import type { User } from "../App";
import DashboardShell from "../components/DashboardShell";

type Props = { user: User; onLogout: () => void };

const points = [22, 45, 32, 43, 49, 75, 54, 75, 68, 88];

export default function Dashboard({ user, onLogout }: Props) {
  return (
    <DashboardShell user={user} onLogout={onLogout}>
      <div className="dashboard-welcome">
        <div><div className="eyebrow">WELCOME TO FUTURESYNC</div><h1>Good evening, {user.name} 👋</h1><p>Keep going. Your future is built by what you do today.</p></div>
      </div>

      <section className="dashboard-hero">
        <div className="dashboard-hero-copy">
          <div className="eyebrow">YOUR GOALS. YOUR HABITS.</div>
          <h2>A <span>Smarter Future.</span></h2>
          <p>Plan your day, build better habits, and keep every important goal moving forward.</p>
          <button className="gradient-btn">Get Started <ArrowUpRight size={16}/></button>
        </div>
      </section>

      <div className="stats-grid">
        <Stat icon={<Goal/>} title="Goals" value="04" change="↑ 1 this week" cls="blue" />
        <Stat icon={<CheckSquare/>} title="Tasks" value="12" change="↑ 3 completed" cls="purple" />
        <Stat icon={<LineChart/>} title="Future" value="78%" change="↑ 12% this month" cls="green" />
      </div>

      <div className="dashboard-grid">
        <section className="panel productivity">
          <div className="panel-head"><h2><LineChart size={22}/> Productivity</h2><select defaultValue="7"><option value="7">Last 7 days</option><option value="30">Last 30 days</option></select></div>
          <div className="chart">
            <div className="chart-y"><span>100</span><span>75</span><span>50</span><span>25</span><span>0</span></div>
            <div className="chart-main">
              <div className="grid-lines">{[1,2,3,4,5].map(n=><i key={n}/>)}</div>
              <svg viewBox="0 0 700 240" preserveAspectRatio="none" className="line-chart">
                <defs><linearGradient id="area" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#3b82f6" stopOpacity=".38"/><stop offset="100%" stopColor="#3b82f6" stopOpacity="0"/></linearGradient></defs>
                <path d="M0,190 C70,140 100,145 155,165 S240,110 310,125 S380,80 430,105 S500,135 555,85 S630,120 700,45 L700,240 L0,240Z" fill="url(#area)" />
                <path d="M0,190 C70,140 100,145 155,165 S240,110 310,125 S380,80 430,105 S500,135 555,85 S630,120 700,45" fill="none" stroke="#5b8cff" strokeWidth="4" />
                {points.map((_,i)=><circle key={i} cx={i*77.7} cy={[190,140,165,110,125,80,105,135,85,45][i]} r="5" fill="#7aa2ff" />)}
              </svg>
              <div className="chart-x">{["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map(d=><span key={d}>{d}</span>)}</div>
            </div>
          </div>
        </section>

        <section className="panel ai-panel">
          <h2><Brain size={23}/> AI Recommendation</h2>
          <div className="recommendation"><p>Focus on your <strong>TypeScript</strong> goal...</p><p>Build a small project, practice consistently, and track your progress. You’re closer than you think! 🚀</p></div>
          <button className="ghost-btn">View Suggestions <ArrowUpRight size={16}/></button>
        </section>
      </div>
    </DashboardShell>
  );
}

function Stat({icon,title,value,change,cls}:{icon:React.ReactNode,title:string,value:string,change:string,cls:string}) {
  return <article className={`stat-card ${cls}`}><div className="stat-icon">{icon}</div><div><p>{title}</p><h3>{value}</h3><span>{change}</span></div></article>;
}