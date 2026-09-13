import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Target, 
  CheckSquare, 
  RotateCcw, 
  BarChart2, 
  Cpu, 
  Bot, 
  Bell, 
  ChevronDown 
} from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'goals', label: 'Goals', icon: Target },
  { id: 'tasks', label: 'Tasks', icon: CheckSquare },
  { id: 'habits', label: 'Habits', icon: RotateCcw },
  { id: 'analytics', label: 'Analytics', icon: BarChart2 },
  { id: 'simulator', label: 'Simulator', icon: Cpu },
  { id: 'ai', label: 'AI', icon: Bot },
];

export const Navbar: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('overview');

  return (
    <aside className="w-64 h-screen bg-slate-900 text-slate-300 border-r border-slate-800 flex flex-col justify-between p-4">
      <div>
        {/* Brand Header */}
        <div className="flex items-center gap-2 mb-8 px-2">
          <div className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse" />
          <h1 className="text-xl font-bold tracking-wider text-white">FUTURESYNC</h1>
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30'
                    : 'hover:bg-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Header Profile / Controls Section */}
      <div className="pt-4 border-t border-slate-800 flex items-center justify-between px-2">
        <button className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-500 rounded-full" />
        </button>

        <button className="flex items-center gap-2 text-sm font-medium text-slate-200 hover:bg-slate-800 px-2 py-1.5 rounded-lg transition-colors">
          <span>Aatish</span>
          <ChevronDown className="w-4 h-4 text-slate-400" />
        </button>
      </div>
    </aside>
  );
};

export default Navbar;