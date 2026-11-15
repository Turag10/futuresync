import { useState, useEffect, useRef } from "react";
import {
  Sparkles,
  Zap,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  RefreshCw,
  Clock,
  CheckCircle,
  BookOpen,
  Dumbbell,
  Wallet,
  CheckSquare,
  ArrowUpRight,
} from "lucide-react";
import { Link } from "react-router-dom";

type EnergyLevel = "high" | "balanced" | "low";

interface ActionItem {
  id: string;
  title: string;
  category: "study" | "fitness" | "finance" | "task";
  durationMinutes: number;
  impact: string;
  reason: string;
  icon: typeof BookOpen;
  link: string;
}

const ACTION_DATABASE: Record<EnergyLevel, ActionItem[]> = {
  high: [
    {
      id: "h1",
      title: "Deep Code Sprint: TypeScript Architecture",
      category: "study",
      durationMinutes: 30,
      impact: "+20 FutureSync XP",
      reason: "Peak energy detected. Ideal window for high-friction cognitive problem solving.",
      icon: BookOpen,
      link: "/study",
    },
    {
      id: "h2",
      title: "High-Intensity Fitness: Core & Cardio Burst",
      category: "fitness",
      durationMinutes: 25,
      impact: "+25 Physical Energy",
      reason: "High bio-rhythm readiness. Physical exertion now will elevate neuroplasticity.",
      icon: Dumbbell,
      link: "/fitness",
    },
    {
      id: "h3",
      title: "Sprint Priority Task: Implement API Data Engine",
      category: "task",
      durationMinutes: 35,
      impact: "High Milestone Impact",
      reason: "Completes 33% of your active project goals. Best tackled with zero distractions.",
      icon: CheckSquare,
      link: "/tasks",
    },
  ],
  balanced: [
    {
      id: "b1",
      title: "Interactive Review: Study Spaced Repetition Cards",
      category: "study",
      durationMinutes: 20,
      impact: "+15 Knowledge Retention",
      reason: "Moderate energy level. Active recall strengthens long-term memory with low strain.",
      icon: BookOpen,
      link: "/study",
    },
    {
      id: "b2",
      title: "Smart Audit: Review Weekly Spending & Runway",
      category: "finance",
      durationMinutes: 15,
      impact: "+10 Financial Discipline",
      reason: "Quick 15-minute scan to check if your budget is aligned with your future target.",
      icon: Wallet,
      link: "/finances",
    },
    {
      id: "b3",
      title: "Check off 2 Pending Micro-Tasks",
      category: "task",
      durationMinutes: 15,
      impact: "+12 Productivity Points",
      reason: "Clears administrative drag from your backlog to free mental bandwidth.",
      icon: CheckSquare,
      link: "/tasks",
    },
  ],
  low: [
    {
      id: "l1",
      title: "Mobility Stretch & Hydration Recovery",
      category: "fitness",
      durationMinutes: 10,
      impact: "+15 Physical Recovery",
      reason: "Low battery detected. High cognitive tasks avoided. Re-center physical circulation.",
      icon: Dumbbell,
      link: "/fitness",
    },
    {
      id: "l2",
      title: "Micro Study: Read 1 Engineering Article / Doc",
      category: "study",
      durationMinutes: 10,
      impact: "+8 Knowledge Pulse",
      reason: "Gentle low-friction input keeps your daily habit streak alive without burnout.",
      icon: BookOpen,
      link: "/study",
    },
    {
      id: "l3",
      title: "Log Daily Finances & Plan Tomorrow's #1 Focus",
      category: "finance",
      durationMinutes: 5,
      impact: "+5 Mental Clarity",
      reason: "Closing out the day's open loops prepares your brain for restorative rest.",
      icon: Wallet,
      link: "/finances",
    },
  ],
};

export default function NextActionPredictor() {
  const [energy, setEnergy] = useState<EnergyLevel>("balanced");
  const [actionIndex, setActionIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  
  // Timer State
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(25 * 60);
  const [initialDuration, setInitialDuration] = useState(25 * 60);
  const [isCompleted, setIsCompleted] = useState(false);
  
  // Ambient Sound State
  const [soundEnabled, setSoundEnabled] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const noiseSourceRef = useRef<AudioBufferSourceNode | null>(null);

  // Clock tick
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Current action calculation
  const actionList = ACTION_DATABASE[energy];
  const currentAction = actionList[actionIndex % actionList.length];

  // Update timer duration when action changes
  useEffect(() => {
    const durationSec = currentAction.durationMinutes * 60;
    setInitialDuration(durationSec);
    setSecondsRemaining(durationSec);
    setIsTimerRunning(false);
    setIsCompleted(false);
  }, [currentAction.id]);

  // Focus Countdown
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isTimerRunning && secondsRemaining > 0) {
      interval = setInterval(() => {
        setSecondsRemaining((prev) => {
          if (prev <= 1) {
            setIsTimerRunning(false);
            setIsCompleted(true);
            stopAmbientSound();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, secondsRemaining]);

  // Circadian Phase Calculation
  const hours = currentTime.getHours();
  let circadianPhase = "Deep Recovery & Night Reset";
  let circadianTag = "🌙 Rest Phase";
  if (hours >= 6 && hours < 9) {
    circadianPhase = "Morning Priming & Focus Setup";
    circadianTag = "🌅 Priming Phase";
  } else if (hours >= 9 && hours < 13) {
    circadianPhase = "Peak Cognitive Deep Work Window";
    circadianTag = "⚡ Deep Work Zone";
  } else if (hours >= 13 && hours < 17) {
    circadianPhase = "Tactical Execution & Sprint Window";
    circadianTag = "🔨 Execution Phase";
  } else if (hours >= 17 && hours < 21) {
    circadianPhase = "Physical Activation & Knowledge Consolidation";
    circadianTag = "🏃 Activation Phase";
  } else if (hours >= 21 && hours < 24) {
    circadianPhase = "Wind-Down & Tomorrow Planning";
    circadianTag = "✨ Consolidation Phase";
  }

  // Web Audio API ambient brown noise generator (no external files!)
  const toggleAmbientSound = () => {
    if (soundEnabled) {
      stopAmbientSound();
      setSoundEnabled(false);
    } else {
      startAmbientSound();
      setSoundEnabled(true);
    }
  };

  const startAmbientSound = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      // Generate brown noise buffer
      const bufferSize = ctx.sampleRate * 2;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        data[i] = (lastOut + 0.02 * white) / 1.02;
        lastOut = data[i];
        data[i] *= 3.5;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      noise.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 350;

      const gain = ctx.createGain();
      gain.gain.value = 0.06;

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start();
      noiseSourceRef.current = noise;
    } catch {
      // Audio fallback graceful ignore
    }
  };

  const stopAmbientSound = () => {
    if (noiseSourceRef.current) {
      try {
        noiseSourceRef.current.stop();
        noiseSourceRef.current.disconnect();
      } catch {
        // Safe ignore
      }
      noiseSourceRef.current = null;
    }
  };

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      stopAmbientSound();
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const progressPct = ((initialDuration - secondsRemaining) / initialDuration) * 100;
  const CategoryIcon = currentAction.icon;

  return (
    <div className="next-action-card">
      {/* Top Chrono-Circadian Bar */}
      <div className="chrono-bar">
        <div className="chrono-live">
          <span className="live-pulse" />
          <Clock size={14} />
          <strong>
            {currentTime.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })}
          </strong>
          <span className="chrono-badge">{circadianTag}</span>
        </div>
        <div className="chrono-phase-desc">{circadianPhase}</div>
      </div>

      {/* Energy Level Selector */}
      <div className="energy-selector-row">
        <span className="energy-label">
          <Zap size={14} /> Digital Twin Energy:
        </span>
        <div className="energy-pills">
          <button
            className={`energy-pill ${energy === "high" ? "active high" : ""}`}
            onClick={() => {
              setEnergy("high");
              setActionIndex(0);
            }}
          >
            ⚡ High Focus (90-100%)
          </button>
          <button
            className={`energy-pill ${energy === "balanced" ? "active balanced" : ""}`}
            onClick={() => {
              setEnergy("balanced");
              setActionIndex(0);
            }}
          >
            🔋 Balanced (60-80%)
          </button>
          <button
            className={`energy-pill ${energy === "low" ? "active low" : ""}`}
            onClick={() => {
              setEnergy("low");
              setActionIndex(0);
            }}
          >
            🌙 Recovery (30-50%)
          </button>
        </div>
      </div>

      {/* Main Prediction Body */}
      <div className="prediction-main">
        <div className="prediction-header">
          <div className="prediction-eyebrow">
            <Sparkles size={14} className="sparkle-icon" />
            <span>AI AUTONOMOUS PREDICTION • WHAT TO DO NEXT</span>
          </div>

          <button
            className="recalc-btn"
            onClick={() => setActionIndex((prev) => prev + 1)}
            title="Recalculate alternative action"
          >
            <RefreshCw size={13} />
            <span>Alternate</span>
          </button>
        </div>

        <div className="action-details">
          <div className="action-icon-box">
            <CategoryIcon size={24} />
          </div>

          <div className="action-text-content">
            <div className="action-meta">
              <span className={`category-tag ${currentAction.category}`}>
                {currentAction.category.toUpperCase()}
              </span>
              <span className="duration-tag">
                ⏱ {currentAction.durationMinutes} Mins
              </span>
              <span className="impact-tag">{currentAction.impact}</span>
            </div>

            <h3 className="action-title">{currentAction.title}</h3>
            <p className="action-reason">{currentAction.reason}</p>
          </div>
        </div>

        {/* Live Focus Sprint Mode */}
        <div className="focus-hud">
          <div className="focus-timer-display">
            <div className="timer-digits">{formatTime(secondsRemaining)}</div>
            <div className="timer-progress-track">
              <div
                className="timer-progress-bar"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>

          <div className="focus-controls">
            {!isCompleted ? (
              <>
                <button
                  className="gradient-btn focus-action-btn"
                  onClick={() => setIsTimerRunning(!isTimerRunning)}
                >
                  {isTimerRunning ? (
                    <>
                      <Pause size={16} /> Pause Sprint
                    </>
                  ) : (
                    <>
                      <Play size={16} /> Start Focus Sprint
                    </>
                  )}
                </button>

                <button
                  className="icon-ghost-btn"
                  onClick={() => {
                    setIsTimerRunning(false);
                    setSecondsRemaining(initialDuration);
                  }}
                  title="Reset Timer"
                >
                  <RotateCcw size={16} />
                </button>

                <button
                  className={`icon-ghost-btn ${soundEnabled ? "sound-active" : ""}`}
                  onClick={toggleAmbientSound}
                  title={soundEnabled ? "Mute Ambient Focus Sound" : "Enable Ambient Focus Sound"}
                >
                  {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
                </button>
              </>
            ) : (
              <div className="completed-banner">
                <CheckCircle size={18} />
                <span>Sprint Finished! Digital Twin Synchronized (+20 XP)</span>
              </div>
            )}

            <Link to={currentAction.link} className="ghost-btn deep-dive-btn">
              Open Module <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
