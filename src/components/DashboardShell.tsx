import type { ReactNode } from "react";
import type { User } from "../App";
import Sidebar from "./Sidebar";
import ProfileMenu from "./ProfileMenu";

type Props = { children: ReactNode; user: User; onLogout: () => void };

export default function DashboardShell({ children, user, onLogout }: Props) {
  return (
    <div className="app-shell">
      <Sidebar />
      <main className="main-area">
        <header className="app-topbar">
          <div className="mobile-brand">FutureSync</div>
          <ProfileMenu user={user} onLogout={onLogout} />
        </header>
        <div className="page-content">{children}</div>
      </main>
    </div>
  );
}