import { useState } from 'react';
import { Plus, TrendingUp, Users, CheckSquare, Clock, MoreHorizontal, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import ProjectModal from '@/components/ProjectModal';
import KanbanBoard from '@/components/KanbanBoard';
import TeamManagement from '@/components/TeamManagement';
import Settings from '@/components/Settings';
import { mockProjects, dashboardStats } from '@/lib/mockData';
import { format } from 'date-fns';

const statusColors = {
  planning: 'bg-gray-100 text-gray-700',
  active: 'bg-green-100 text-green-700',
  'on-hold': 'bg-amber-100 text-amber-700',
  completed: 'bg-blue-100 text-blue-700'
};

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

  const renderDashboardContent = () => {
    return (
      <div className="p-6">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Projects</p>
                  <p className="text-3xl font-bold text-gray-900">{dashboardStats.totalProjects}</p>
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
                  <p className="text-sm font-medium text-gray-600">Active Users</p>
                  <p className="text-3xl font-bold text-gray-900">{dashboardStats.activeUsers}</p>
                </div>
                <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-teal-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Tasks Progress</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {dashboardStats.completedTasks}/{dashboardStats.totalTasks}
                  </p>
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
                  <p className="text-3xl font-bold text-gray-900">{dashboardStats.upcomingDeadlines}</p>
                </div>
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-amber-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Projects Section */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Projects</CardTitle>
              <Button 
                onClick={() => setIsProjectModalOpen(true)}
                className="bg-blue-500 hover:bg-blue-600"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Project
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Project Name</TableHead>
                  <TableHead>Manager</TableHead>
                  <TableHead>Members</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockProjects.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium text-gray-900">{project.name}</p>
                        <p className="text-sm text-gray-500">{project.description}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-medium text-xs">{project.manager.avatar}</span>
                        </div>
                        <span className="text-sm">{project.manager.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex -space-x-2">
                        {project.members.slice(0, 3).map((member) => (
                          <div
                            key={member.id}
                            className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center border-2 border-white"
                          >
                            <span className="text-white font-medium text-xs">{member.avatar}</span>
                          </div>
                        ))}
                        {project.members.length > 3 && (
                          <div className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center border-2 border-white">
                            <span className="text-white font-medium text-xs">+{project.members.length - 3}</span>
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>{project.progress}%</span>
                        </div>
                        <Progress value={project.progress} className="w-20" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={statusColors[project.status]}>
                        {project.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {format(new Date(project.endDate), 'MMM dd, yyyy')}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            Edit Project
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            Delete Project
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Timeline Preview */}
        <Card>
          <CardHeader>
            <CardTitle>Project Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockProjects.map((project) => (
                <div key={project.id} className="flex items-center space-x-4">
                  <div className="w-32 text-sm font-medium text-gray-900 truncate">
                    {project.name}
                  </div>
                  <div className="flex-1 bg-gray-200 rounded-full h-6 relative">
                    <div 
                      className="bg-blue-500 h-6 rounded-full flex items-center justify-end pr-2"
                      style={{ width: `${project.progress}%` }}
                    >
                      <span className="text-white text-xs font-medium">{project.progress}%</span>
                    </div>
                  </div>
                  <div className="w-24 text-sm text-gray-600">
                    {format(new Date(project.endDate), 'MMM dd')}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return renderDashboardContent();
      case 'projects':
        return renderDashboardContent(); // Same as dashboard for MVP
      case 'team':
        return <TeamManagement />;
      case 'tasks':
        return <KanbanBoard />;
      case 'reports':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Reports & Analytics</h2>
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-gray-500">Reports and analytics coming soon...</p>
              </CardContent>
            </Card>
          </div>
        );
      case 'settings':
        return <Settings />;
      default:
        return renderDashboardContent();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
        <main className="flex-1">
          {renderContent()}
        </main>
      </div>
      <ProjectModal 
        open={isProjectModalOpen} 
        onOpenChange={setIsProjectModalOpen} 
      />
    </div>
  );
}