import { useState } from "react";
import { LineChart as ChartIcon, TrendingUp, Sparkles } from "lucide-react";

type TimeRange = "7" | "30";
type ActiveSeries = "both" | "productivity" | "future";

interface ChartDataPoint {
  label: string;
  productivity: number;
  futureScore: number;
  note: string;
}

const DATA_7_DAYS: ChartDataPoint[] = [
  { label: "Mon", productivity: 45, futureScore: 68, note: "Week kickoff • 3 tasks completed" },
  { label: "Tue", productivity: 72, futureScore: 70, note: "TypeScript study + 30m workout" },
  { label: "Wed", productivity: 60, futureScore: 72, note: "Recovery & review session" },
  { label: "Thu", productivity: 85, futureScore: 76, note: "Peak sprint • 4 tasks + zero impulse spend" },
  { label: "Fri", productivity: 75, futureScore: 78, note: "System design sprint completed" },
  { label: "Sat", productivity: 92, futureScore: 82, note: "Optimal focus & high habit streak" },
  { label: "Sun", productivity: 86, futureScore: 84, note: "Weekly goals planning & reflection" },
];

const DATA_30_DAYS: ChartDataPoint[] = [
  { label: "Day 1", productivity: 48, futureScore: 62, note: "Baseline habit start" },
  { label: "Day 6", productivity: 58, futureScore: 66, note: "Consistent coding drills" },
  { label: "Day 12", productivity: 66, futureScore: 71, note: "Spaced repetition milestone" },
  { label: "Day 18", productivity: 75, futureScore: 75, note: "Fitness + Study synergy peak" },
  { label: "Day 24", productivity: 84, futureScore: 80, note: "Runway cushion expansion" },
  { label: "Day 30", productivity: 91, futureScore: 85, note: "Target trajectory achieved" },
];

export default function ProductivityChart() {
  const [range, setRange] = useState<TimeRange>("7");
  const [activeSeries, setActiveSeries] = useState<ActiveSeries>("both");
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const dataset = range === "7" ? DATA_7_DAYS : DATA_30_DAYS;
  const numPoints = dataset.length;

  // Chart dimensions in viewBox space
  const svgWidth = 660;
  const svgHeight = 160;
  const paddingX = 20;
  const paddingY = 20;
  const usableW = svgWidth - paddingX * 2;
  const usableH = svgHeight - paddingY * 2;

  // Coordinate helper: maps index and 0-100 score to SVG (x, y)
  const getCoordinates = (index: number, score: number) => {
    const x = paddingX + (index / (numPoints - 1)) * usableW;
    const y = paddingY + (1 - score / 100) * usableH;
    return { x, y };
  };

  // Generate smooth cubic bezier SVG path
  const makeSmoothPath = (values: number[]) => {
    if (values.length === 0) return "";
    const pts = values.map((v, i) => getCoordinates(i, v));
    let d = `M ${pts[0].x},${pts[0].y}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i];
      const p1 = pts[i + 1];
      const mx = (p0.x + p1.x) / 2;
      d += ` C ${mx},${p0.y} ${mx},${p1.y} ${p1.x},${p1.y}`;
    }
    return d;
  };

  const prodValues = dataset.map((d) => d.productivity);
  const futureValues = dataset.map((d) => d.futureScore);

  const prodLine = makeSmoothPath(prodValues);
  const futureLine = makeSmoothPath(futureValues);

  const lastX = paddingX + usableW;
  const firstX = paddingX;
  const baseY = svgHeight;

  const prodArea = `${prodLine} L ${lastX},${baseY} L ${firstX},${baseY} Z`;
  const futureArea = `${futureLine} L ${lastX},${baseY} L ${firstX},${baseY} Z`;

  // Calculated stats
  const avgProd = Math.round(prodValues.reduce((a, b) => a + b, 0) / numPoints);
  const peakProd = Math.max(...prodValues);
  const latestFuture = futureValues[futureValues.length - 1];

  const activeHover = hoveredIdx !== null ? dataset[hoveredIdx] : null;

  return (
    <section className="panel productivity-interactive">
      <div className="panel-head">
        <div className="chart-heading">
          <h2>
            <ChartIcon size={20} /> Productivity & Future Score
          </h2>
          <span className="live-trend-pill">
            <TrendingUp size={12} /> +14% Trajectory
          </span>
        </div>

        <div className="chart-controls-right">
          {/* Series Toggle Filters */}
          <div className="series-toggles">
            <button
              className={`series-pill prod ${activeSeries === "both" || activeSeries === "productivity" ? "active" : ""}`}
              onClick={() =>
                setActiveSeries(activeSeries === "productivity" ? "both" : "productivity")
              }
              title="Click to toggle Productivity curve"
            >
              <span className="dot prod" /> Productivity
            </button>
            <button
              className={`series-pill future ${activeSeries === "both" || activeSeries === "future" ? "active" : ""}`}
              onClick={() =>
                setActiveSeries(activeSeries === "future" ? "both" : "future")
              }
              title="Click to toggle Future Score curve"
            >
              <span className="dot future" /> Future Score
            </button>
          </div>

          {/* Timeframe Selector */}
          <select
            value={range}
            onChange={(e) => {
              setRange(e.target.value as TimeRange);
              setHoveredIdx(null);
            }}
            className="chart-timeframe-select"
          >
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
          </select>
        </div>
      </div>

      {/* Live Calculated Stats Header */}
      <div className="chart-metrics-row">
        <div className="chart-metric-item">
          <span>Avg Productivity</span>
          <strong>{avgProd}%</strong>
        </div>
        <div className="chart-metric-item">
          <span>Period Peak</span>
          <strong>{peakProd}%</strong>
        </div>
        <div className="chart-metric-item">
          <span>Future Sync Index</span>
          <strong style={{ color: "#34d399" }}>{latestFuture}%</strong>
        </div>
        <div className="chart-metric-item">
          <span>Consistency Rank</span>
          <strong style={{ color: "#38bdf8" }}>Tier Alpha</strong>
        </div>
      </div>

      {/* Main Interactive Chart */}
      <div className="chart">
        <div className="chart-y">
          <span>100</span>
          <span>75</span>
          <span>50</span>
          <span>25</span>
          <span>0</span>
        </div>

        <div className="chart-main">
          <div className="grid-lines">
            {[1, 2, 3, 4, 5].map((n) => (
              <i key={n} />
            ))}
          </div>

          <svg
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            preserveAspectRatio="none"
            className="line-chart interactive-svg"
            onMouseLeave={() => setHoveredIdx(null)}
          >
            <defs>
              <linearGradient id="prodAreaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity=".38" />
                <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
              </linearGradient>

              <linearGradient id="futureAreaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#34d399" stopOpacity=".28" />
                <stop offset="100%" stopColor="#34d399" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Vertical hover guide */}
            {hoveredIdx !== null && (
              <line
                x1={getCoordinates(hoveredIdx, 0).x}
                y1={0}
                x2={getCoordinates(hoveredIdx, 0).x}
                y2={svgHeight}
                stroke="rgba(255, 255, 255, 0.25)"
                strokeDasharray="4 4"
                strokeWidth="1.5"
              />
            )}

            {/* Productivity Series Area & Line */}
            {(activeSeries === "both" || activeSeries === "productivity") && (
              <>
                <path d={prodArea} fill="url(#prodAreaGrad)" />
                <path
                  d={prodLine}
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
                {prodValues.map((val, idx) => {
                  const { x, y } = getCoordinates(idx, val);
                  const isHovered = hoveredIdx === idx;
                  return (
                    <circle
                      key={`prod-${idx}`}
                      cx={x}
                      cy={y}
                      r={isHovered ? 7 : 4.5}
                      fill={isHovered ? "#ffffff" : "#38bdf8"}
                      stroke="#081426"
                      strokeWidth={isHovered ? 3 : 2}
                      className="chart-circle"
                      onMouseEnter={() => setHoveredIdx(idx)}
                    />
                  );
                })}
              </>
            )}

            {/* Future Score Series Area & Line */}
            {(activeSeries === "both" || activeSeries === "future") && (
              <>
                <path d={futureArea} fill="url(#futureAreaGrad)" />
                <path
                  d={futureLine}
                  fill="none"
                  stroke="#34d399"
                  strokeWidth="2.5"
                  strokeDasharray="5 3"
                  strokeLinecap="round"
                />
                {futureValues.map((val, idx) => {
                  const { x, y } = getCoordinates(idx, val);
                  const isHovered = hoveredIdx === idx;
                  return (
                    <circle
                      key={`future-${idx}`}
                      cx={x}
                      cy={y}
                      r={isHovered ? 6 : 3.5}
                      fill={isHovered ? "#ffffff" : "#34d399"}
                      stroke="#081426"
                      strokeWidth={2}
                      className="chart-circle"
                      onMouseEnter={() => setHoveredIdx(idx)}
                    />
                  );
                })}
              </>
            )}
          </svg>

          {/* X Axis Labels */}
          <div className="chart-x">
            {dataset.map((d, i) => (
              <span
                key={i}
                className={hoveredIdx === i ? "chart-x-active" : ""}
                onClick={() => setHoveredIdx(i)}
                style={{ cursor: "pointer" }}
              >
                {d.label}
              </span>
            ))}
          </div>

          {/* Interactive Floating Hover Tooltip */}
          {activeHover && hoveredIdx !== null && (
            <div
              className="chart-hover-tooltip"
              style={{
                left: `${(hoveredIdx / (numPoints - 1)) * 92 + 4}%`,
              }}
            >
              <div className="tooltip-header">
                <strong>{activeHover.label}</strong>
                <Sparkles size={11} color="#38bdf8" />
              </div>
              <div className="tooltip-stat">
                <span className="dot prod" />
                <span>Productivity: <strong>{activeHover.productivity}%</strong></span>
              </div>
              <div className="tooltip-stat">
                <span className="dot future" />
                <span>Future Score: <strong>{activeHover.futureScore}%</strong></span>
              </div>
              <div className="tooltip-note">{activeHover.note}</div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
