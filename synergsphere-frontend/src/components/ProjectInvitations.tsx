import { useState } from 'react';
import { Check, X, Calendar, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockInvitations, ProjectInvitation } from '@/lib/userMockData';
import { format } from 'date-fns';

export default function ProjectInvitations() {
  const [invitations, setInvitations] = useState(mockInvitations);
  const pendingInvitations = invitations.filter(inv => inv.status === 'pending');

  const handleInvitationResponse = (invitationId: string, response: 'accepted' | 'declined') => {
    setInvitations(prev => prev.map(inv => 
      inv.id === invitationId ? { ...inv, status: response } : inv
    ));
    
    if (response === 'accepted') {
      // In a real app, this would store the passkey and add user to project
      console.log('Project joined, passkey stored');
    }
  };

  if (pendingInvitations.length === 0) {
    return null;
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <span>Pending Invitations</span>
            <Badge variant="secondary" className="bg-blue-100 text-blue-700">
              {pendingInvitations.length}
            </Badge>
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {pendingInvitations.map((invitation) => (
            <div
              key={invitation.id}
              className="flex items-center justify-between p-4 border rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-semibold text-gray-900">{invitation.projectName}</h4>
                    <p className="text-sm text-gray-600 mt-1">{invitation.projectDescription}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <User className="w-4 h-4" />
                    <span>Invited by {invitation.invitedBy.name}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{format(new Date(invitation.invitedAt), 'MMM dd, yyyy')}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="font-mono text-xs bg-gray-200 px-2 py-1 rounded">
                      {invitation.passkey}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 ml-4">
                <Button
                  size="sm"
                  onClick={() => handleInvitationResponse(invitation.id, 'accepted')}
                  className="bg-green-500 hover:bg-green-600 text-white"
                >
                  <Check className="w-4 h-4 mr-1" />
                  Accept
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleInvitationResponse(invitation.id, 'declined')}
                  className="border-red-300 text-red-600 hover:bg-red-50"
                >
                  <X className="w-4 h-4 mr-1" />
                  Decline
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}