export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  status: 'active' | 'invited' | 'removed';
  role: 'admin' | 'manager' | 'member';
}

export interface Task {
  id: string;
  title: string;
  description: string;
  assignee: User;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  status: 'todo' | 'in-progress' | 'done';
  projectId: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  manager: User;
  members: User[];
  progress: number;
  status: 'planning' | 'active' | 'on-hold' | 'completed';
  startDate: string;
  endDate: string;
  passkey: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  timestamp: string;
  read: boolean;
}

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    email: 'alex@synergysphere.com',
    avatar: 'AJ',
    status: 'active',
    role: 'admin'
  },
  {
    id: '2',
    name: 'Sarah Chen',
    email: 'sarah@synergysphere.com',
    avatar: 'SC',
    status: 'active',
    role: 'manager'
  },
  {
    id: '3',
    name: 'Mike Rodriguez',
    email: 'mike@synergysphere.com',
    avatar: 'MR',
    status: 'active',
    role: 'member'
  },
  {
    id: '4',
    name: 'Emily Davis',
    email: 'emily@synergysphere.com',
    avatar: 'ED',
    status: 'invited',
    role: 'member'
  }
];

// Mock Projects
export const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Website Redesign',
    description: 'Complete overhaul of company website with modern design',
    manager: mockUsers[1],
    members: [mockUsers[0], mockUsers[1], mockUsers[2]],
    progress: 75,
    status: 'active',
    startDate: '2024-01-15',
    endDate: '2024-03-30',
    passkey: 'WR2024'
  },
  {
    id: '2',
    name: 'Mobile App Development',
    description: 'Native mobile application for iOS and Android',
    manager: mockUsers[0],
    members: [mockUsers[0], mockUsers[2], mockUsers[3]],
    progress: 45,
    status: 'active',
    startDate: '2024-02-01',
    endDate: '2024-06-15',
    passkey: 'MAD2024'
  },
  {
    id: '3',
    name: 'Data Analytics Platform',
    description: 'Business intelligence dashboard for data visualization',
    manager: mockUsers[1],
    members: [mockUsers[1], mockUsers[2]],
    progress: 20,
    status: 'planning',
    startDate: '2024-03-01',
    endDate: '2024-08-30',
    passkey: 'DAP2024'
  }
];

// Mock Tasks
export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Design Homepage Layout',
    description: 'Create wireframes and mockups for the new homepage',
    assignee: mockUsers[2],
    dueDate: '2024-02-20',
    priority: 'high',
    status: 'in-progress',
    projectId: '1'
  },
  {
    id: '2',
    title: 'Set up Development Environment',
    description: 'Configure development tools and repositories',
    assignee: mockUsers[0],
    dueDate: '2024-02-15',
    priority: 'medium',
    status: 'done',
    projectId: '2'
  },
  {
    id: '3',
    title: 'User Research',
    description: 'Conduct interviews with target users',
    assignee: mockUsers[1],
    dueDate: '2024-02-25',
    priority: 'high',
    status: 'todo',
    projectId: '1'
  },
  {
    id: '4',
    title: 'API Integration',
    description: 'Integrate third-party APIs for data sources',
    assignee: mockUsers[2],
    dueDate: '2024-03-10',
    priority: 'medium',
    status: 'todo',
    projectId: '2'
  }
];

// Mock Notifications
export const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'New Task Assigned',
    message: 'You have been assigned to "Design Homepage Layout"',
    type: 'info',
    timestamp: '2024-02-10T10:30:00Z',
    read: false
  },
  {
    id: '2',
    title: 'Project Deadline Approaching',
    message: 'Website Redesign project deadline is in 2 weeks',
    type: 'warning',
    timestamp: '2024-02-09T14:15:00Z',
    read: false
  },
  {
    id: '3',
    title: 'Task Completed',
    message: 'Mike completed "Set up Development Environment"',
    type: 'success',
    timestamp: '2024-02-08T16:45:00Z',
    read: true
  }
];

export const dashboardStats = {
  totalProjects: mockProjects.length,
  activeUsers: mockUsers.filter(u => u.status === 'active').length,
  totalTasks: mockTasks.length,
  completedTasks: mockTasks.filter(t => t.status === 'done').length,
  inProgressTasks: mockTasks.filter(t => t.status === 'in-progress').length,
  todoTasks: mockTasks.filter(t => t.status === 'todo').length,
  upcomingDeadlines: 3
};