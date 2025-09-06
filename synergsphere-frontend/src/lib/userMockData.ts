import { User, Project, Task } from './mockData';

export interface ProjectInvitation {
  id: string;
  projectId: string;
  projectName: string;
  projectDescription: string;
  invitedBy: User;
  invitedAt: string;
  passkey: string;
  status: 'pending' | 'accepted' | 'declined';
}

export interface UserProject extends Project {
  role: 'member' | 'manager';
  joinedAt: string;
  nextDeadline?: string;
}

export interface UserTask extends Task {
  projectName: string;
}

export interface ChatMessage {
  id: string;
  projectId: string;
  userId: string;
  user: User;
  message: string;
  timestamp: string;
  replyTo?: string;
}

export interface UserNotification {
  id: string;
  type: 'task_assigned' | 'deadline_approaching' | 'project_update' | 'mention' | 'invitation';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  projectId?: string;
  taskId?: string;
  actionRequired?: boolean;
}

// Current user (logged in user)
export const currentUser: User = {
  id: '1',
  name: 'Alex Johnson',
  email: 'alex@synergysphere.com',
  avatar: 'AJ',
  status: 'active',
  role: 'member'
};

// Mock Project Invitations
export const mockInvitations: ProjectInvitation[] = [
  {
    id: '1',
    projectId: '4',
    projectName: 'Marketing Campaign 2024',
    projectDescription: 'Q1 marketing campaign for product launch',
    invitedBy: {
      id: '2',
      name: 'Sarah Chen',
      email: 'sarah@synergysphere.com',
      avatar: 'SC',
      status: 'active',
      role: 'manager'
    },
    invitedAt: '2024-02-10T09:00:00Z',
    passkey: 'MKT2024',
    status: 'pending'
  },
  {
    id: '2',
    projectId: '5',
    projectName: 'Customer Support Portal',
    projectDescription: 'New help desk and ticketing system',
    invitedBy: {
      id: '3',
      name: 'Mike Rodriguez',
      email: 'mike@synergysphere.com',
      avatar: 'MR',
      status: 'active',
      role: 'manager'
    },
    invitedAt: '2024-02-09T14:30:00Z',
    passkey: 'CSP2024',
    status: 'pending'
  }
];

// User's Projects (projects they've joined)
export const userProjects: UserProject[] = [
  {
    id: '1',
    name: 'Website Redesign',
    description: 'Complete overhaul of company website with modern design',
    manager: {
      id: '2',
      name: 'Sarah Chen',
      email: 'sarah@synergysphere.com',
      avatar: 'SC',
      status: 'active',
      role: 'manager'
    },
    members: [
      currentUser,
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
      }
    ],
    progress: 75,
    status: 'active',
    startDate: '2024-01-15',
    endDate: '2024-03-30',
    passkey: 'WR2024',
    role: 'member',
    joinedAt: '2024-01-15T10:00:00Z',
    nextDeadline: '2024-02-20'
  },
  {
    id: '2',
    name: 'Mobile App Development',
    description: 'Native mobile application for iOS and Android',
    manager: currentUser,
    members: [
      currentUser,
      {
        id: '3',
        name: 'Mike Rodriguez',
        email: 'mike@synergysphere.com',
        avatar: 'MR',
        status: 'active',
        role: 'member'
      }
    ],
    progress: 45,
    status: 'active',
    startDate: '2024-02-01',
    endDate: '2024-06-15',
    passkey: 'MAD2024',
    role: 'manager',
    joinedAt: '2024-02-01T09:00:00Z',
    nextDeadline: '2024-03-10'
  }
];

// User's Tasks (tasks assigned to current user)
export const userTasks: UserTask[] = [
  {
    id: '1',
    title: 'Design Homepage Layout',
    description: 'Create wireframes and mockups for the new homepage',
    assignee: currentUser,
    dueDate: '2024-02-20',
    priority: 'high',
    status: 'in-progress',
    projectId: '1',
    projectName: 'Website Redesign'
  },
  {
    id: '2',
    title: 'API Integration Testing',
    description: 'Test all API endpoints for mobile app',
    assignee: currentUser,
    dueDate: '2024-03-10',
    priority: 'medium',
    status: 'todo',
    projectId: '2',
    projectName: 'Mobile App Development'
  },
  {
    id: '3',
    title: 'User Documentation',
    description: 'Write user guide for new features',
    assignee: currentUser,
    dueDate: '2024-02-15',
    priority: 'low',
    status: 'done',
    projectId: '1',
    projectName: 'Website Redesign'
  }
];

// Project Chat Messages
export const chatMessages: ChatMessage[] = [
  {
    id: '1',
    projectId: '1',
    userId: '2',
    user: {
      id: '2',
      name: 'Sarah Chen',
      email: 'sarah@synergysphere.com',
      avatar: 'SC',
      status: 'active',
      role: 'manager'
    },
    message: 'Great progress on the homepage design! The wireframes look fantastic.',
    timestamp: '2024-02-10T10:30:00Z'
  },
  {
    id: '2',
    projectId: '1',
    userId: '1',
    user: currentUser,
    message: 'Thanks! I\'ll have the mockups ready by tomorrow.',
    timestamp: '2024-02-10T10:35:00Z',
    replyTo: '1'
  },
  {
    id: '3',
    projectId: '1',
    userId: '3',
    user: {
      id: '3',
      name: 'Mike Rodriguez',
      email: 'mike@synergysphere.com',
      avatar: 'MR',
      status: 'active',
      role: 'member'
    },
    message: 'Should we schedule a review meeting for the designs?',
    timestamp: '2024-02-10T11:00:00Z'
  }
];

// User Notifications
export const userNotifications: UserNotification[] = [
  {
    id: '1',
    type: 'task_assigned',
    title: 'New Task Assigned',
    message: 'You have been assigned to "API Integration Testing"',
    timestamp: '2024-02-10T09:00:00Z',
    read: false,
    projectId: '2',
    taskId: '2',
    actionRequired: true
  },
  {
    id: '2',
    type: 'deadline_approaching',
    title: 'Deadline Approaching',
    message: 'Design Homepage Layout is due in 2 days',
    timestamp: '2024-02-10T08:00:00Z',
    read: false,
    projectId: '1',
    taskId: '1',
    actionRequired: true
  },
  {
    id: '3',
    type: 'mention',
    title: 'You were mentioned',
    message: 'Sarah mentioned you in Website Redesign project chat',
    timestamp: '2024-02-09T16:30:00Z',
    read: true,
    projectId: '1'
  },
  {
    id: '4',
    type: 'invitation',
    title: 'Project Invitation',
    message: 'You have been invited to join Marketing Campaign 2024',
    timestamp: '2024-02-09T09:00:00Z',
    read: false,
    actionRequired: true
  }
];

// User Dashboard Stats
export const userDashboardStats = {
  totalProjectsJoined: userProjects.length,
  activeTasks: userTasks.filter(t => t.status !== 'done').length,
  completedTasks: userTasks.filter(t => t.status === 'done').length,
  upcomingDeadlines: userTasks.filter(t => {
    const dueDate = new Date(t.dueDate);
    const today = new Date();
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7 && diffDays > 0;
  }).length,
  pendingInvitations: mockInvitations.filter(i => i.status === 'pending').length
};