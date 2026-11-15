import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

import {
  Activity,
  BarChart3,
  BookOpen,
  Brain,
  Check,
  CheckSquare,
  Clock,
  DollarSign,
  Dumbbell,
  Flame,
  Goal,
  HeartPulse,
  Plus,
  RotateCcw,
  Sparkles,
  Trash2,
  Wallet,
  Zap,
} from "lucide-react";

import type { User } from "../App";
import DashboardShell from "../components/DashboardShell";

type Props = {
  user: User;
  onLogout: () => void;
};

type GoalItem = {
  id: number;
  title: string;
  progress: number;
};

type TaskItem = {
  id: number;
  title: string;
  completed: boolean;
};

type HabitItem = {
  id: number;
  title: string;
  streak: number;
  checked: boolean;
};

const data: Record<
  string,
  {
    title: string;
    desc: string;
    icon: React.ReactNode;
  }
> = {
  goals: {
    title: "Goals",
    desc: "Create clear goals and keep your long-term direction visible.",
    icon: <Goal />,
  },

  tasks: {
    title: "Tasks",
    desc: "Organize your daily actions and keep your important work moving.",
    icon: <CheckSquare />,
  },

  study: {
    title: "Study & Skills",
    desc: "Master skills, manage spaced repetition, and accelerate learning.",
    icon: <BookOpen />,
  },

  fitness: {
    title: "Fitness & Bio-Energy",
    desc: "Track physical readiness, workouts, and energy alignment.",
    icon: <Dumbbell />,
  },

  finances: {
    title: "Smart Finances",
    desc: "Protect your runway, track daily cash flow, and avoid impulse waste.",
    icon: <Wallet />,
  },

  habits: {
    title: "Habits",
    desc: "Build small routines that become meaningful progress over time.",
    icon: <Flame />,
  },

  analytics: {
    title: "Analytics",
    desc: "Understand your consistency and see how your progress changes.",
    icon: <BarChart3 />,
  },

  simulator: {
    title: "Future Simulator",
    desc: "Explore how your daily choices can shape your future progress.",
    icon: <Activity />,
  },

  ai: {
    title: "AI Companion",
    desc: "Get practical suggestions to plan, practice and improve.",
    icon: <Brain />,
  },
};

export default function FeaturePage({ user, onLogout }: Props) {
  const location = useLocation();
  const key = location.pathname.slice(1);

  return (
    <DashboardShell user={user} onLogout={onLogout}>
      <div className="feature-page">
        {key === "goals" && <GoalsPage />}
        {key === "tasks" && <TasksPage />}
        {key === "study" && <StudyPage />}
        {key === "fitness" && <FitnessPage />}
        {key === "finances" && <FinancesPage />}
        {key === "habits" && <HabitsPage />}
        {key === "analytics" && <AnalyticsPage />}
        {key === "simulator" && <SimulatorPage />}
        {key === "ai" && <AIPage />}

        {!data[key] && <GoalsPage />}
      </div>
    </DashboardShell>
  );
}

/* =====================================================
   GOALS
===================================================== */

function GoalsPage() {
  const [goals, setGoals] = useState<GoalItem[]>([
    {
      id: 1,
      title: "Learn TypeScript",
      progress: 70,
    },
    {
      id: 2,
      title: "Build FutureSync",
      progress: 45,
    },
    {
      id: 3,
      title: "Improve React Skills",
      progress: 80,
    },
  ]);

  const [newGoal, setNewGoal] = useState("");

  const addGoal = () => {
    if (!newGoal.trim()) return;

    setGoals([
      ...goals,
      {
        id: Date.now(),
        title: newGoal,
        progress: 0,
      },
    ]);

    setNewGoal("");
  };

  const deleteGoal = (id: number) => {
    setGoals(goals.filter((goal) => goal.id !== id));
  };

  const increaseProgress = (id: number) => {
    setGoals(
      goals.map((goal) =>
        goal.id === id
          ? {
              ...goal,
              progress: Math.min(goal.progress + 10, 100),
            }
          : goal
      )
    );
  };

  return (
    <>
      <FeatureHeader
        icon={<Goal />}
        title="Goals"
        desc="Turn your ideas into measurable progress."
      />

      <div className="feature-content-grid">
        <section className="panel large-feature">
          <h2>Your Goals</h2>

          <div className="feature-input-row">
            <input
              type="text"
              placeholder="Enter a new goal..."
              value={newGoal}
              onChange={(e) => setNewGoal(e.target.value)}
            />

            <button className="gradient-btn" onClick={addGoal}>
              <Plus size={17} />
              Add Goal
            </button>
          </div>

          <div className="goal-list">
            {goals.map((goal) => (
              <div className="goal-item" key={goal.id}>
                <div className="goal-item-top">
                  <strong>{goal.title}</strong>

                  <button
                    className="icon-btn"
                    onClick={() => deleteGoal(goal.id)}
                  >
                    <Trash2 size={17} />
                  </button>
                </div>

                <div className="progress-bar">
                  <span style={{ width: `${goal.progress}%` }} />
                </div>

                <div className="progress-label">
                  <span>{goal.progress}% completed</span>

                  <button
                    className="small-action"
                    onClick={() => increaseProgress(goal.id)}
                  >
                    +10%
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="panel">
          <h2>Goal Overview</h2>

          <div className="insight-row">
            <span>Total goals</span>
            <strong>{goals.length}</strong>
          </div>

          <div className="insight-row">
            <span>Completed goals</span>
            <strong>
              {goals.filter((goal) => goal.progress === 100).length}
            </strong>
          </div>

          <div className="insight-row">
            <span>Average progress</span>
            <strong>
              {goals.length
                ? Math.round(
                    goals.reduce((sum, goal) => sum + goal.progress, 0) /
                      goals.length
                  )
                : 0}
              %
            </strong>
          </div>
        </section>
      </div>
    </>
  );
}

/* =====================================================
   TASKS
===================================================== */

function TasksPage() {
  const [tasks, setTasks] = useState<TaskItem[]>([
    { id: 1, title: "Practice TypeScript", completed: false },
    { id: 2, title: "Work on FutureSync UI", completed: true },
    { id: 3, title: "Review React concepts", completed: false },
  ]);

  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (!newTask.trim()) return;

    setTasks([
      ...tasks,
      {
        id: Date.now(),
        title: newTask,
        completed: false,
      },
    ]);

    setNewTask("");
  };

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <>
      <FeatureHeader
        icon={<CheckSquare />}
        title="Tasks"
        desc="Manage today's actions and keep moving forward."
      />

      <section className="panel large-feature">
        <h2>Today's Tasks</h2>

        <div className="feature-input-row">
          <input
            type="text"
            placeholder="Add a new task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />

          <button className="gradient-btn" onClick={addTask}>
            <Plus size={17} />
            Add Task
          </button>
        </div>

        <div className="task-list">
          {tasks.map((task) => (
            <div
              className={`task-item ${task.completed ? "completed" : ""}`}
              key={task.id}
            >
              <button
                className="task-check"
                onClick={() => toggleTask(task.id)}
              >
                {task.completed && <Check size={15} />}
              </button>

              <span>{task.title}</span>

              <button
                className="icon-btn"
                onClick={() => deleteTask(task.id)}
              >
                <Trash2 size={17} />
              </button>
            </div>
          ))}
        </div>

        <div className="task-summary">
          <strong>
            {tasks.filter((task) => task.completed).length}
          </strong>{" "}
          of {tasks.length} tasks completed
        </div>
      </section>
    </>
  );
}

/* =====================================================
   STUDY & SKILLS MATRIX
===================================================== */

type SkillTopic = {
  id: number;
  title: string;
  category: string;
  progress: number;
  reviewDue: string;
};

function StudyPage() {
  const [topics, setTopics] = useState<SkillTopic[]>([
    {
      id: 1,
      title: "TypeScript Generics & Utility Types",
      category: "Frontend",
      progress: 75,
      reviewDue: "Today",
    },
    {
      id: 2,
      title: "React 19 & Server Components",
      category: "Frontend",
      progress: 60,
      reviewDue: "In 2 days",
    },
    {
      id: 3,
      title: "System Design: Caching & WebSockets",
      category: "Architecture",
      progress: 40,
      reviewDue: "Today",
    },
    {
      id: 4,
      title: "DSA: Graph Traversal & DFS/BFS",
      category: "Algorithms",
      progress: 50,
      reviewDue: "Tomorrow",
    },
  ]);

  const [newTitle, setNewTitle] = useState("");
  const [category, setCategory] = useState("Frontend");

  const addTopic = () => {
    if (!newTitle.trim()) return;
    setTopics([
      ...topics,
      {
        id: Date.now(),
        title: newTitle,
        category,
        progress: 0,
        reviewDue: "Today",
      },
    ]);
    setNewTitle("");
  };

  const deleteTopic = (id: number) => {
    setTopics(topics.filter((t) => t.id !== id));
  };

  const increaseTopicProgress = (id: number) => {
    setTopics(
      topics.map((t) =>
        t.id === id ? { ...t, progress: Math.min(100, t.progress + 15) } : t
      )
    );
  };

  const avgProgress = Math.round(
    topics.reduce((acc, t) => acc + t.progress, 0) / (topics.length || 1)
  );

  return (
    <>
      <FeatureHeader
        icon={<BookOpen />}
        title="Study & Skills Matrix"
        desc="Master technologies, maintain spaced repetition, and accelerate learning velocity."
      />

      <div className="stats-grid">
        <StatCard title="Active Topics" value={`${topics.length}`} to="/study" />
        <StatCard title="Avg Skill Level" value={`${avgProgress}%`} to="/study" />
        <StatCard
          title="Reviews Due"
          value={`${topics.filter((t) => t.reviewDue === "Today").length}`}
          to="/study"
        />
      </div>

      <div className="feature-content-grid">
        <section className="panel large-feature">
          <h2>Skill Trees & Topics</h2>

          <div className="feature-input-row">
            <input
              type="text"
              placeholder="Add skill or topic (e.g. Next.js App Router)..."
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="styled-select"
            >
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="Architecture">Architecture</option>
              <option value="Algorithms">Algorithms</option>
              <option value="AI / ML">AI / ML</option>
            </select>
            <button className="gradient-btn" onClick={addTopic}>
              <Plus size={17} />
              Add Topic
            </button>
          </div>

          <div className="goal-list">
            {topics.map((topic) => (
              <div className="goal-item" key={topic.id}>
                <div className="goal-item-top">
                  <div>
                    <span className="topic-badge">{topic.category}</span>
                    <strong style={{ marginLeft: 8 }}>{topic.title}</strong>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span className="due-pill">Spaced Repetition: {topic.reviewDue}</span>
                    <button
                      className="icon-btn"
                      onClick={() => deleteTopic(topic.id)}
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>
                </div>

                <div className="progress-bar">
                  <span style={{ width: `${topic.progress}%` }} />
                </div>

                <div className="progress-label">
                  <span>{topic.progress}% Mastery</span>
                  <button
                    className="small-action"
                    onClick={() => increaseTopicProgress(topic.id)}
                  >
                    +15% Practice Session
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="panel">
          <h2>Knowledge Retention Protocol</h2>
          <div className="insight-row">
            <span>Cognitive Absorption</span>
            <strong>Optimal (92%)</strong>
          </div>
          <div className="insight-row">
            <span>Retention Multiplier</span>
            <strong>1.8x Spaced Recall</strong>
          </div>
          <div className="insight-row">
            <span>Mastered Topics</span>
            <strong>{topics.filter((t) => t.progress >= 90).length}</strong>
          </div>

          <div className="synergy-box" style={{ marginTop: 20 }}>
            <p>
              💡 <strong>AI Study Tip:</strong> Schedule difficult coding topics
              during your morning 9:00 AM - 12:00 PM cognitive peak for 40%
              faster retention.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}

/* =====================================================
   FITNESS & BIO-ENERGY ENGINE
===================================================== */

type WorkoutEntry = {
  id: number;
  activity: string;
  duration: number;
  intensity: "Light" | "Moderate" | "High";
  time: string;
};

function FitnessPage() {
  const [energy, setEnergy] = useState(85);
  const [sleep, setSleep] = useState(7.5);
  const [workouts, setWorkouts] = useState<WorkoutEntry[]>([
    {
      id: 1,
      activity: "Calisthenics & Core Sprint",
      duration: 30,
      intensity: "Moderate",
      time: "Today 08:00 AM",
    },
    {
      id: 2,
      activity: "5km Tempo Run",
      duration: 26,
      intensity: "High",
      time: "Yesterday 06:30 PM",
    },
  ]);

  const [newActivity, setNewActivity] = useState("");
  const [duration, setDuration] = useState(30);
  const [intensity, setIntensity] = useState<"Light" | "Moderate" | "High">("Moderate");

  const addWorkout = () => {
    if (!newActivity.trim()) return;
    setWorkouts([
      {
        id: Date.now(),
        activity: newActivity,
        duration: Number(duration),
        intensity,
        time: "Just now",
      },
      ...workouts,
    ]);
    setNewActivity("");
    setEnergy((prev) => Math.min(100, prev + 10));
  };

  return (
    <>
      <FeatureHeader
        icon={<Dumbbell />}
        title="Fitness & Bio-Energy Engine"
        desc="Sync physical vitality with cognitive output. A strong body powers a sharp mind."
      />

      <div className="stats-grid">
        <StatCard title="Bio-Energy Readiness" value={`${energy}%`} to="/fitness" />
        <StatCard title="Restorative Sleep" value={`${sleep} hrs`} to="/fitness" />
        <StatCard title="Total Sessions" value={`${workouts.length}`} to="/fitness" />
      </div>

      <div className="feature-content-grid">
        <section className="panel large-feature">
          <h2>Log Physical Activity</h2>

          <div className="feature-input-row">
            <input
              type="text"
              placeholder="Workout name (e.g. Upper Body Hypertrophy)..."
              value={newActivity}
              onChange={(e) => setNewActivity(e.target.value)}
            />
            <input
              type="number"
              placeholder="Minutes"
              style={{ width: 90 }}
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
            />
            <select
              value={intensity}
              onChange={(e) =>
                setIntensity(e.target.value as "Light" | "Moderate" | "High")
              }
              className="styled-select"
            >
              <option value="Light">Light</option>
              <option value="Moderate">Moderate</option>
              <option value="High">High</option>
            </select>
            <button className="gradient-btn" onClick={addWorkout}>
              <Plus size={17} />
              Log Workout
            </button>
          </div>

          <div className="task-list">
            {workouts.map((w) => (
              <div className="task-item" key={w.id} style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div className="activity-icon-badge">
                    <HeartPulse size={16} />
                  </div>
                  <div>
                    <strong>{w.activity}</strong>
                    <div style={{ fontSize: 11, color: "#9eacc3" }}>
                      {w.duration} mins • {w.intensity} Intensity • {w.time}
                    </div>
                  </div>
                </div>

                <button
                  className="icon-btn"
                  onClick={() =>
                    setWorkouts(workouts.filter((item) => item.id !== w.id))
                  }
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="panel">
          <h2>Bio-Rhythm Controls</h2>
          
          <div className="simulator-control">
            <label>
              Daily Energy Level
              <strong>{energy}%</strong>
            </label>
            <input
              type="range"
              min="10"
              max="100"
              value={energy}
              onChange={(e) => setEnergy(Number(e.target.value))}
            />
          </div>

          <div className="simulator-control">
            <label>
              Last Night Sleep
              <strong>{sleep} hrs</strong>
            </label>
            <input
              type="range"
              min="4"
              max="12"
              step="0.5"
              value={sleep}
              onChange={(e) => setSleep(Number(e.target.value))}
            />
          </div>

          <div className="synergy-box" style={{ marginTop: 20 }}>
            <p>
              ⚡ <strong>Digital Twin Synergy:</strong> Your {energy}% energy level
              unlocks high-capacity sprint tasks on your Dashboard Next-Action
              Predictor.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}

/* =====================================================
   SMART FINANCES & RUNWAY RADAR
===================================================== */

type ExpenseRecord = {
  id: number;
  title: string;
  amount: number;
  category: string;
};

function FinancesPage() {
  const [savings, setSavings] = useState(14500);
  const [monthlyBurn, setMonthlyBurn] = useState(2100);
  const [expenses, setExpenses] = useState<ExpenseRecord[]>([
    { id: 1, title: "Cloud APIs & Server Hosting", amount: 35, category: "Tech & Work" },
    { id: 2, title: "High-Protein Nutrition", amount: 85, category: "Health" },
    { id: 3, title: "Online Course Subscription", amount: 29, category: "Education" },
  ]);

  const [newExpTitle, setNewExpTitle] = useState("");
  const [newExpAmount, setNewExpAmount] = useState("");
  const [impulseCheck, setImpulseCheck] = useState(150);

  const runwayMonths = (savings / (monthlyBurn || 1)).toFixed(1);
  const hourlyWage = 30; // $30/hour baseline
  const workHoursToEarn = (impulseCheck / hourlyWage).toFixed(1);
  const goalDelayDays = Math.round(impulseCheck / 25);

  const addExpense = () => {
    if (!newExpTitle.trim() || !newExpAmount) return;
    setExpenses([
      {
        id: Date.now(),
        title: newExpTitle,
        amount: Number(newExpAmount),
        category: "General",
      },
      ...expenses,
    ]);
    setSavings((prev) => Math.max(0, prev - Number(newExpAmount)));
    setNewExpTitle("");
    setNewExpAmount("");
  };

  return (
    <>
      <FeatureHeader
        icon={<Wallet />}
        title="Smart Finances & Runway Radar"
        desc="Turn financial stability into life freedom. Track runway and eliminate impulse spending."
      />

      <div className="stats-grid">
        <StatCard title="Total Liquid Cushion" value={`$${savings.toLocaleString()}`} to="/finances" />
        <StatCard title="Financial Runway" value={`${runwayMonths} Months`} to="/finances" />
        <StatCard title="Est. Monthly Burn" value={`$${monthlyBurn}`} to="/finances" />
      </div>

      <div className="feature-content-grid">
        <section className="panel large-feature">
          <h2>Cash Flow & Investments</h2>

          <div className="feature-input-row">
            <input
              type="text"
              placeholder="Expense or purchase description..."
              value={newExpTitle}
              onChange={(e) => setNewExpTitle(e.target.value)}
            />
            <input
              type="number"
              placeholder="Amount ($)"
              style={{ width: 110 }}
              value={newExpAmount}
              onChange={(e) => setNewExpAmount(e.target.value)}
            />
            <button className="gradient-btn" onClick={addExpense}>
              <Plus size={17} />
              Log Spend
            </button>
          </div>

          <div className="task-list">
            {expenses.map((exp) => (
              <div className="task-item" key={exp.id} style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <strong>{exp.title}</strong>
                  <div style={{ fontSize: 11, color: "#9eacc3" }}>{exp.category}</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ fontWeight: 700, color: "#ff6b8b" }}>-${exp.amount}</span>
                  <button
                    className="icon-btn"
                    onClick={() =>
                      setExpenses(expenses.filter((e) => e.id !== exp.id))
                    }
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="panel">
          <h2>Impulse Purchase Simulator</h2>
          <p style={{ fontSize: 12, color: "#9eacc3", margin: "0 0 12px" }}>
            Test a potential purchase before spending to see the true life cost.
          </p>

          <div className="simulator-control">
            <label>
              Potential Purchase Cost:
              <strong>${impulseCheck}</strong>
            </label>
            <input
              type="range"
              min="10"
              max="1500"
              step="10"
              value={impulseCheck}
              onChange={(e) => setImpulseCheck(Number(e.target.value))}
            />
          </div>

          <div className="insight-row">
            <span>Cost in Work Hours</span>
            <strong style={{ color: "#facc15" }}>{workHoursToEarn} Hours</strong>
          </div>
          <div className="insight-row">
            <span>Goal Horizon Delay</span>
            <strong style={{ color: "#ff6b8b" }}>+{goalDelayDays} Days</strong>
          </div>

          <div className="synergy-box" style={{ marginTop: 20 }}>
            <p>
              💰 <strong>Runway Protection:</strong> Skipping impulse buys below
              \$200 compounds your investment runway by up to 2.4 months per year.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}

/* =====================================================
   HABITS
===================================================== */

function HabitsPage() {
  const [habits, setHabits] = useState<HabitItem[]>([
    {
      id: 1,
      title: "Code for 1 hour",
      streak: 7,
      checked: false,
    },
    {
      id: 2,
      title: "Read documentation",
      streak: 4,
      checked: false,
    },
    {
      id: 3,
      title: "Exercise",
      streak: 10,
      checked: true,
    },
  ]);

  const toggleHabit = (id: number) => {
    setHabits(
      habits.map((habit) =>
        habit.id === id
          ? {
              ...habit,
              checked: !habit.checked,
              streak: habit.checked
                ? Math.max(0, habit.streak - 1)
                : habit.streak + 1,
            }
          : habit
      )
    );
  };

  return (
    <>
      <FeatureHeader
        icon={<Flame />}
        title="Habits"
        desc="Small actions repeated consistently create big changes."
      />

      <section className="panel large-feature">
        <h2>Daily Habits</h2>

        <div className="habit-list">
          {habits.map((habit) => (
            <div className="habit-item" key={habit.id}>
              <button
                className={`habit-check ${
                  habit.checked ? "checked" : ""
                }`}
                onClick={() => toggleHabit(habit.id)}
              >
                {habit.checked && <Check size={17} />}
              </button>

              <div className="habit-info">
                <strong>{habit.title}</strong>
                <span>
                  🔥 {habit.streak} day streak
                </span>
              </div>

              <span>
                {habit.checked ? "Done" : "Check in"}
              </span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

/* =====================================================
   ANALYTICS
===================================================== */

function AnalyticsPage() {
  const [period, setPeriod] = useState("week");

  const values =
    period === "week"
      ? [45, 65, 40, 80, 60, 90, 75]
      : [55, 70, 62, 88, 76, 92, 85];

  const average = Math.round(
    values.reduce((a, b) => a + b, 0) / values.length
  );

  return (
    <>
      <FeatureHeader
        icon={<BarChart3 />}
        title="Analytics"
        desc="See how consistently you are moving toward your future."
      />

    <div className="stats-grid">
  <StatCard
    title="Average Productivity"
    value={`${average}%`}
    to="/analytics"
  />

  <StatCard
    title="Best Day"
    value={`${Math.max(...values)}%`}
    to="/analytics"
  />

  <StatCard
    title="Consistency"
    value="82%"
    to="/analytics"
  />
</div>
      <section className="panel analytics-panel">
        <div className="panel-head">
          <h2>Productivity Analytics</h2>

          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
        </div>

        <div className="analytics-chart">
          {values.map((value, index) => (
            <div className="bar-column" key={index}>
              <div
                className="analytics-bar"
                style={{ height: `${value}%` }}
              />
              <span>
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][index]}
              </span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

/* =====================================================
   SIMULATOR
===================================================== */

function SimulatorPage() {
  const [hours, setHours] = useState(2);
  const [consistency, setConsistency] = useState(70);

  const score = Math.min(
    100,
    Math.round(hours * 8 + consistency * 0.8)
  );

  return (
    <>
      <FeatureHeader
        icon={<Activity />}
        title="Future Simulator"
        desc="Change your habits and see how your future score responds."
      />

      <section className="panel simulator-panel">
        <h2>What If?</h2>

        <div className="simulator-control">
          <label>
            Daily productive hours
            <strong>{hours} hours</strong>
          </label>

          <input
            type="range"
            min="0"
            max="8"
            value={hours}
            onChange={(e) => setHours(Number(e.target.value))}
          />
        </div>

        <div className="simulator-control">
          <label>
            Consistency
            <strong>{consistency}%</strong>
          </label>

          <input
            type="range"
            min="0"
            max="100"
            value={consistency}
            onChange={(e) => setConsistency(Number(e.target.value))}
          />
        </div>

        <div className="future-score">
          <span>Projected Future Score</span>
          <strong>{score}%</strong>
        </div>

        <p className="simulator-message">
          {score >= 80
            ? "🚀 Excellent! Your current habits are creating strong future momentum."
            : score >= 60
            ? "📈 You're on the right path. Increase consistency to improve your score."
            : "🌱 Small daily improvements can significantly change your future."}
        </p>
      </section>
    </>
  );
}

/* =====================================================
   AI
===================================================== */

function AIPage() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState(
    "Hello! I'm your FutureSync AI Companion. Tell me what you want to improve today."
  );
  const [loading, setLoading] = useState(false);

  const generateResponse = () => {
    if (!message.trim()) {
      setResponse("Tell me something first. For example: \"How can I improve my productivity?\"");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const text = message.toLowerCase();

      let answer = "";

      if (
        text.includes("study") ||
        text.includes("learn") ||
        text.includes("coding") ||
        text.includes("typescript") ||
        text.includes("react")
      ) {
        answer =
          "📚 I recommend a focused 60-minute session. Spend 40 minutes learning, 15 minutes practicing, and 5 minutes reviewing what you learned. Consistency is more important than studying for many hours.";
      } else if (
        text.includes("task") ||
        text.includes("productivity") ||
        text.includes("productive")
      ) {
        answer =
          "⚡ Start with your most important task. Work on it for 25–45 minutes without distractions, then take a short break. Completing one important task is better than starting five tasks and finishing none.";
      } else if (
        text.includes("goal") ||
        text.includes("future")
      ) {
        answer =
          "🎯 Break your big goal into smaller weekly milestones. Your Future Score improves when you consistently complete small actions instead of relying on occasional bursts of motivation.";
      } else if (
        text.includes("habit") ||
        text.includes("routine")
      ) {
        answer =
          "🔥 Choose one habit and make it easy enough to repeat every day. For example, instead of 'study more', set a goal of 'study for 30 minutes every evening'. Repetition creates momentum.";
      } else if (
        text.includes("exercise") ||
        text.includes("fitness") ||
        text.includes("workout")
      ) {
        answer =
          "💪 Try to make exercise part of your daily routine. Even 20–30 minutes of consistent activity can build a strong habit. Track your sessions in FutureSync so you can see your progress.";
      } else {
        answer =
          "🤖 Based on your message, I'd suggest turning your idea into one small action today. Start with something you can finish within 30–60 minutes, then track the result in FutureSync.";
      }

      setResponse(answer);
      setLoading(false);
    }, 900);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      generateResponse();
    }
  };

  return (
    <>
      <FeatureHeader
        icon={<Brain />}
        title="AI Companion"
        desc="Your intelligent productivity assistant."
      />

      <section className="panel ai-feature-panel">

        <div className="ai-icon">
          <Sparkles size={32} />
        </div>

        <h2>FutureSync AI</h2>

        <p className="ai-subtitle">
          Ask me about your goals, tasks, habits, study plan or productivity.
        </p>

        {/* AI RESPONSE */}
        <div className="ai-chat-box">
          <div className="ai-avatar">
            <Brain size={16} />
          </div>

          <div className="ai-response">
            {loading ? (
              <div className="ai-thinking">
                <span />
                <span />
                <span />
                Thinking...
              </div>
            ) : (
              response
            )}
          </div>
        </div>

        {/* USER INPUT */}
        <div className="ai-input-area">

          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask FutureSync AI something..."
          />

          <button
            className="gradient-btn"
            onClick={generateResponse}
            disabled={loading}
          >
            <Sparkles size={16} />

            {loading ? "Thinking..." : "Ask AI"}
          </button>

        </div>

        {/* QUICK QUESTIONS */}
        <div className="ai-quick-actions">

          <button
            onClick={() => {
              setMessage("How can I improve my productivity?");
            }}
          >
            Improve productivity
          </button>

          <button
            onClick={() => {
              setMessage("How should I study TypeScript?");
            }}
          >
            Study plan
          </button>

          <button
            onClick={() => {
              setMessage("How can I build better habits?");
            }}
          >
            Build habits
          </button>

          <button
            onClick={() => {
              setMessage("How can I reach my goals?");
            }}
          >
            Reach my goals
          </button>

        </div>

      </section>
    </>
  );
}
/* =====================================================
   SHARED COMPONENTS
===================================================== */

function FeatureHeader({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="feature-title">
      <div className="feature-title-icon">{icon}</div>

      <div>
        <div className="eyebrow">FUTURESYNC</div>
        <h1>{title}</h1>
        <p>{desc}</p>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  to,
}: {
  title: string;
  value: string;
  to: string;
}) {
  return (
    <Link to={to} className="stat-card blue">
      <div>
        <p>{title}</p>
        <h3>{value}</h3>
      </div>
    </Link>
  );
}