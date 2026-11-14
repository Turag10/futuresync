
import { Link } from "react-router-dom";

export default function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link
      className={`brand ${compact ? "brand-compact" : ""}`}
      to="/dashboard"
      aria-label="FutureSync dashboard"
    >
      <img src="/images/futuresync-logo.png" alt="FutureSync" />
    </Link>
  );
}
