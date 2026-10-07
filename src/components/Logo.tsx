import { Link } from "react-router-dom";

export default function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link className={`brand ${compact ? "brand-compact" : ""}`} to="/" aria-label="FutureSync home">
      <img src="/images/futuresync-logo.png" alt="FutureSync" />
    </Link>
  );
}
