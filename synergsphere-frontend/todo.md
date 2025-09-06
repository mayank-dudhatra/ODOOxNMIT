# SynergySphere Project Admin Dashboard - MVP Implementation Plan

## Core Files to Create/Modify (8 files max)

### 1. **index.html** - Update title and meta tags
- Change title to "SynergySphere - Project Admin Dashboard"
- Update meta description

### 2. **src/pages/Index.tsx** - Main Dashboard Layout
- Header with logo, search, notifications, profile dropdown
- Sidebar navigation (Dashboard, Projects, Team, Tasks, Reports, Settings)
- Main content area with overview cards
- Projects list table
- Timeline preview section

### 3. **src/components/Header.tsx** - Top Navigation Bar
- Logo + SynergySphere branding
- Search bar for projects/tasks
- Notification bell with badge
- Profile avatar dropdown menu

### 4. **src/components/Sidebar.tsx** - Left Navigation
- Navigation menu items with icons
- Active state styling
- Collapsible design

### 5. **src/components/ProjectModal.tsx** - Project Creation Modal
- Form fields: name, description, dates
- Member selection dropdown
- Generate passkey functionality
- Save/Cancel actions

### 6. **src/components/KanbanBoard.tsx** - Task Management
- Three columns: To-Do, In Progress, Done
- Task cards with assignee, due date, priority
- Add task functionality
- Drag and drop simulation

### 7. **src/components/TeamManagement.tsx** - Team Interface
- User list with status indicators
- Invite members functionality
- User management actions

### 8. **src/lib/mockData.ts** - Sample Data
- Mock projects, tasks, users, notifications
- Status enums and types
- Sample data for all components

## Key Features Implementation:
- ✅ Modern blue/teal/gray color scheme
- ✅ Responsive design (desktop-first, tablet adaptive)
- ✅ Overview cards with metrics
- ✅ Projects table with progress bars
- ✅ Kanban task board
- ✅ Team management
- ✅ Modal dialogs
- ✅ Clean typography and spacing
- ✅ Lucide icons throughout
- ✅ Hover states and animations

## Dependencies to Add:
- lucide-react (for icons)
- date-fns (for date formatting)

## Color Palette:
- Primary: Blue (#3B82F6)
- Secondary: Teal (#14B8A6)
- Neutral: Gray (#6B7280, #F3F4F6)
- Success: Green (#10B981)
- Warning: Amber (#F59E0B)
- Danger: Red (#EF4444)