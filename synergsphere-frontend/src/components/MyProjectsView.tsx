import { Eye, Calendar, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { userProjects } from '@/lib/userMockData';
import { format } from 'date-fns';

interface MyProjectsViewProps {
  onProjectSelect: (projectId: string) => void;
}

const statusColors = {
  planning: 'bg-gray-100 text-gray-700',
  active: 'bg-green-100 text-green-700',
  'on-hold': 'bg-amber-100 text-amber-700',
  completed: 'bg-blue-100 text-blue-700'
};

export default function MyProjectsView({ onProjectSelect }: MyProjectsViewProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Active Projects</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {userProjects.map((project) => (
            <Card key={project.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{project.name}</h3>
                      <p className="text-sm text-gray-600 line-clamp-2">{project.description}</p>
                    </div>
                    <Badge className={statusColors[project.status]}>
                      {project.status}
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-medium">{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-2" />
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{project.members.length} members</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span className="capitalize">{project.role}</span>
                    </div>
                  </div>

                  {project.nextDeadline && (
                    <div className="flex items-center space-x-1 text-sm text-amber-600">
                      <Calendar className="w-4 h-4" />
                      <span>Due {format(new Date(project.nextDeadline), 'MMM dd')}</span>
                    </div>
                  )}

                  <Button 
                    className="w-full" 
                    variant="outline"
                    onClick={() => onProjectSelect(project.id)}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View Project
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}