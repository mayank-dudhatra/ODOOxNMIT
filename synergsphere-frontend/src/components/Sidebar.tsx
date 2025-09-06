import { useState } from 'react';
import { 
  LayoutDashboard, 
  FolderOpen, 
  Users, 
  CheckSquare, 
  BarChart3, 
  Settings,
  ChevronLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navigation = [
  { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
  { id: 'projects', name: 'Projects', icon: FolderOpen },
  { id: 'team', name: 'Team Members', icon: Users },
  { id: 'tasks', name: 'Tasks', icon: CheckSquare },
  { id: 'reports', name: 'Reports', icon: BarChart3 },
  { id: 'settings', name: 'Settings', icon: Settings },
];

export default function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={cn(
      "bg-white border-r border-gray-200 transition-all duration-300",
      collapsed ? "w-16" : "w-64"
    )}>
      <div className="p-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className="w-full justify-end mb-4"
        >
          <ChevronLeft className={cn(
            "w-4 h-4 transition-transform",
            collapsed && "rotate-180"
          )} />
        </Button>

        <nav className="space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <Button
                key={item.id}
                variant={isActive ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  collapsed ? "px-2" : "px-3",
                  isActive && "bg-blue-500 text-white hover:bg-blue-600"
                )}
                onClick={() => onTabChange(item.id)}
              >
                <Icon className={cn(
                  "w-5 h-5",
                  collapsed ? "mx-auto" : "mr-3"
                )} />
                {!collapsed && (
                  <span className="font-medium">{item.name}</span>
                )}
              </Button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}