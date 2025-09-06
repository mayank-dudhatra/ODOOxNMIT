import { useState, useEffect } from 'react';
import { TrendingUp, CheckSquare, Clock, Mail, Settings as SettingsIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import MainNav from '@/components/MainNav';
import { useAuth } from '@/hooks/use-auth'; 
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import ProjectInvitations from '@/components/ProjectInvitations';
import MyProjectsView from '@/components/MyProjectsView';
import MyTasksPage from '@/components/MyTasksPage';
import NotificationsCenter from '@/components/NotificationsCenter';
import ProjectDetailView from '@/components/ProjectDetailView';
import Settings from '@/components/Settings';
import { userDashboardStats } from '@/lib/userMockData';

const userNavigation = [
  { id: 'dashboard', name: 'Dashboard', icon: TrendingUp },
  { id: 'projects', name: 'My Projects', icon: TrendingUp },
  { id: 'tasks', name: 'My Tasks', icon: CheckSquare },
  { id: 'notifications', name: 'Notifications', icon: Mail },
  { id: 'settings', name: 'Settings', icon: Clock },
];

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  // Navigation items based on user role
  const userNavigation = [
    { id: 'dashboard', name: 'Dashboard', icon: TrendingUp },
    { id: 'projects', name: 'My Projects', icon: TrendingUp },
    { id: 'tasks', name: 'My Tasks', icon: CheckSquare },
    { id: 'notifications', name: 'Notifications', icon: Mail },
  ];

  if (user?.role === 'admin') {
    userNavigation.push({ id: 'admin', name: 'Admin', icon: SettingsIcon });
  }

  const handleProjectSelect = (projectId: string) => {
    setSelectedProjectId(projectId);
    setActiveTab('project-detail');
  };

  const handleBackToProjects = () => {
    setSelectedProjectId(null);
    setActiveTab('projects');
  };

  const renderDashboardContent = () => {
    return (
      <div className="p-6">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Projects Joined</p>
                  <p className="text-3xl font-bold text-gray-900">{userDashboardStats.totalProjectsJoined}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Tasks</p>
                  <p className="text-3xl font-bold text-gray-900">{userDashboardStats.activeTasks}</p>
                </div>
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-amber-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Completed Tasks</p>
                  <p className="text-3xl font-bold text-gray-900">{userDashboardStats.completedTasks}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckSquare className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Upcoming Deadlines</p>
                  <p className="text-3xl font-bold text-gray-900">{userDashboardStats.upcomingDeadlines}</p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Project Invitations */}
        <ProjectInvitations />

        {/* My Projects */}
        <MyProjectsView onProjectSelect={handleProjectSelect} />
      </div>
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return renderDashboardContent();
      case 'projects':
        return (
          <div className="p-6">
            <MyProjectsView onProjectSelect={handleProjectSelect} />
          </div>
        );
      case 'tasks':
        return <MyTasksPage />;
      case 'notifications':
        return <NotificationsCenter />;
      case 'project-detail':
        return selectedProjectId ? (
          <ProjectDetailView 
            projectId={selectedProjectId} 
            onBack={handleBackToProjects}
          />
        ) : renderDashboardContent();
      case 'settings':
        return <Settings />;
      default:
        return renderDashboardContent();
    }
  };

  // Create a modified sidebar component for user navigation
  const UserSidebar = ({ 
    activeTab, 
    onTabChange, 
    navItems 
  }: { 
    activeTab: string; 
    onTabChange: (tab: string) => void;
    navItems: Array<{
      id: string;
      name: string;
      icon: React.ComponentType<{ className?: string }>;
    }>;
  }) => {
    return (
      <div className="bg-white border-r border-gray-200 w-64">
        <div className="p-4">
          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              
              return (
                <button
                  key={item.id}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    isActive 
                      ? 'bg-blue-500 text-white' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => onTabChange(item.id)}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    );
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <MainNav />
      <div className="flex">
        <UserSidebar 
          activeTab={activeTab} 
          onTabChange={(tab) => {
            if (tab === 'admin') {
              navigate('/admin/dashboard');
              return;
            }
            setActiveTab(tab);
          }} 
          navItems={userNavigation} 
        />
        <main className="flex-1">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}