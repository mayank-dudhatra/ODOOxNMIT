import { useState } from 'react';
import { Plus, Calendar, Flag, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { userTasks, UserTask } from '@/lib/userMockData';
import { format } from 'date-fns';

const columns = [
  { id: 'todo', title: 'To-Do', color: 'bg-gray-50' },
  { id: 'in-progress', title: 'In Progress', color: 'bg-blue-50' },
  { id: 'done', title: 'Done', color: 'bg-green-50' }
];

const priorityColors = {
  low: 'bg-gray-100 text-gray-700',
  medium: 'bg-amber-100 text-amber-700',
  high: 'bg-red-100 text-red-700'
};

export default function KanbanBoard() {
  const [tasks, setTasks] = useState(userTasks);

  const getTasksByStatus = (status: string) => {
    return tasks.filter(task => task.status === status);
  };
  
  const TaskCard = ({ task }: { task: UserTask }) => (
    <Card className="mb-3 hover:shadow-md transition-shadow cursor-pointer">
      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <h4 className="font-medium text-sm text-gray-900 leading-tight">
              {task.title}
            </h4>
            <Badge 
              variant="secondary" 
              className={`text-xs ${priorityColors[task.priority]}`}
            >
              <Flag className="w-3 h-3 mr-1" />
              {task.priority}
            </Badge>
          </div>
          
          <p className="text-xs text-gray-600 line-clamp-2">
            {task.description}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-medium text-xs">
                  {task.assignee.avatar}
                </span>
              </div>
              <span className="text-xs text-gray-600">{task.assignee.name}</span>
            </div>
            
            <div className="flex items-center space-x-1 text-xs text-gray-500">
              <Calendar className="w-3 h-3" />
              <span>{format(new Date(task.dueDate), 'MMM dd')}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Task Board</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {columns.map((column) => (
          <div key={column.id} className="space-y-4">
            <div className={`p-4 rounded-lg ${column.color}`}>
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">{column.title}</h3>
                <Badge variant="secondary" className="bg-white">
                  {getTasksByStatus(column.id).length}
                </Badge>
              </div>
            </div>
            
            <div className="space-y-3">
              {getTasksByStatus(column.id).map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
              
              {/* This button is now removed for regular users */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}