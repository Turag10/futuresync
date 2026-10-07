import { useState } from "react";
import { Bell, ChevronDown, LogOut, UserRound } from "lucide-react";
import type { User } from "../App";

type Props = { user: User; onLogout: () => void };

export default function ProfileMenu({ user, onLogout }: Props) {
  const [open, setOpen] = useState(false);
  const initial = user.name.trim().charAt(0).toUpperCase() || "R";

  return (
    <div className="profile-wrap">
      <button className="icon-btn" aria-label="Notifications"><Bell size={18} /></button>
      <button className="profile-trigger" onClick={() => setOpen(!open)}>
        <span className="avatar">{initial}</span>
        <span className="profile-name">{user.name}</span>
        <ChevronDown size={15} className={open ? "rotate" : ""} />
      </button>

      {open && (
        <div className="profile-menu">
          <div className="profile-menu-head">
            <span className="avatar large">{initial}</span>
            <div>
              <strong>{user.name}</strong>
              <small>{user.email}</small>
            </div>
          </div>
          <div className="profile-line"><UserRound size={16} /> <span>Account information</span></div>
          <button className="logout-item" onClick={onLogout}><LogOut size={16} /> Logout</button>
        </div>
      )}
    </div>
  );
}