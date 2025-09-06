import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { currentUser } from '@/lib/userMockData';
import { updateUser } from '@/lib/mockData';

interface ProfileModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ProfileModal({ open, onOpenChange }: ProfileModalProps) {
  const [profileData, setProfileData] = useState({
    name: currentUser.name,
    email: currentUser.email,
    avatar: currentUser.avatar,
  });

  const handleSave = () => {
    updateUser(currentUser.id, profileData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Avatar className="h-9 w-9">
              <AvatarFallback>{profileData.avatar}</AvatarFallback>
            </Avatar>
            <span>My Profile</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={profileData.name}
              onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={profileData.email}
              onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="avatar">Avatar Initials</Label>
            <Input
              id="avatar"
              value={profileData.avatar}
              onChange={(e) => setProfileData(prev => ({ ...prev, avatar: e.target.value.toUpperCase() }))}
              maxLength={2}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}