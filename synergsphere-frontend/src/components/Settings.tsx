import { useState } from 'react';
import {
  User as UserIcon,
  Shield,
  Bell,
  Palette,
  Briefcase,
  Users,
  Settings as SettingsIcon,
  LogOut,
  Download,
  Trash2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { currentUser } from '@/lib/userMockData';
import { cn } from '@/lib/utils';

type SettingsTab =
  | 'profile'
  | 'security'
  | 'notifications'
  | 'preferences'
  | 'project-settings'
  | 'account';

const navItems = {
  general: [
    { id: 'profile', name: 'Profile', icon: UserIcon },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'preferences', name: 'Preferences', icon: Palette },
  ],
  admin: [
    { id: 'project-settings', name: 'Project Settings', icon: Briefcase },
  ],
  other: [
    { id: 'account', name: 'Account', icon: SettingsIcon },
  ],
};

const SettingsSidebar = ({ activeTab, onTabChange, isAdmin }: { activeTab: SettingsTab; onTabChange: (tab: SettingsTab) => void; isAdmin: boolean; }) => (
  <nav className="flex flex-col space-y-2 p-4 border-r bg-white">
    <h3 className="text-lg font-semibold mb-2">General</h3>
    {navItems.general.map((item) => {
      const Icon = item.icon;
      const isActive = activeTab === item.id;
      return (
        <Button
          key={item.id}
          variant="ghost"
          className={cn(
            "w-full justify-start space-x-3",
            isActive && "bg-blue-500 text-white hover:bg-blue-600"
          )}
          onClick={() => onTabChange(item.id as SettingsTab)}
        >
          <Icon className="w-5 h-5" />
          <span>{item.name}</span>
        </Button>
      );
    })}

    {isAdmin && (
      <>
        <Separator className="my-2" />
        <h3 className="text-lg font-semibold mb-2">Admin Only</h3>
        {navItems.admin.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <Button
              key={item.id}
              variant="ghost"
              className={cn(
                "w-full justify-start space-x-3",
                isActive && "bg-blue-500 text-white hover:bg-blue-600"
              )}
              onClick={() => onTabChange(item.id as SettingsTab)}
            >
              <Icon className="w-5 h-5" />
              <span>{item.name}</span>
            </Button>
          );
        })}
      </>
    )}
    
    <Separator className="my-2" />
    <h3 className="text-lg font-semibold mb-2">Other</h3>
    {navItems.other.map((item) => {
      const Icon = item.icon;
      const isActive = activeTab === item.id;
      return (
        <Button
          key={item.id}
          variant="ghost"
          className={cn(
            "w-full justify-start space-x-3",
            isActive && "bg-blue-500 text-white hover:bg-blue-600"
          )}
          onClick={() => onTabChange(item.id as SettingsTab)}
        >
          <Icon className="w-5 h-5" />
          <span>{item.name}</span>
        </Button>
      );
    })}
  </nav>
);

const ProfileSettings = () => (
  <Card>
    <CardHeader>
      <CardTitle>Profile Settings</CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input id="name" placeholder="Alex Johnson" defaultValue={currentUser.name} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <Input id="email" type="email" placeholder="alex@synergysphere.com" defaultValue={currentUser.email} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number</Label>
        <Input id="phone" type="tel" placeholder="(123) 456-7890" />
      </div>
      <Button>Save Profile</Button>
    </CardContent>
  </Card>
);

const SecuritySettings = () => (
  <Card>
    <CardHeader>
      <CardTitle>Security</CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="old-password">Current Password</Label>
        <Input id="old-password" type="password" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="new-password">New Password</Label>
        <Input id="new-password" type="password" />
      </div>
      <Button>Change Password</Button>
      <Separator />
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="font-medium">Two-Factor Authentication (2FA)</p>
          <p className="text-sm text-muted-foreground">Add an extra layer of security to your account.</p>
        </div>
        <Switch />
      </div>
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="font-medium">Manage Devices</p>
          <p className="text-sm text-muted-foreground">View and log out of active sessions.</p>
        </div>
        <Button variant="outline">View Devices</Button>
      </div>
    </CardContent>
  </Card>
);

const NotificationSettings = () => (
  <Card>
    <CardHeader>
      <CardTitle>Notifications</CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="font-medium">Email Notifications</p>
          <p className="text-sm text-muted-foreground">Receive email alerts for important updates.</p>
        </div>
        <Switch />
      </div>
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="font-medium">In-app Notifications</p>
          <p className="text-sm text-muted-foreground">Get real-time alerts within the application.</p>
        </div>
        <Switch defaultChecked />
      </div>
      <div className="space-y-2">
        <Label>Reminder Frequency</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Daily" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="daily">Daily</SelectItem>
            <SelectItem value="weekly">Weekly</SelectItem>
            <SelectItem value="custom">Custom</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </CardContent>
  </Card>
);

const PreferencesSettings = () => (
  <Card>
    <CardHeader>
      <CardTitle>Preferences</CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="font-medium">Dark Mode</p>
          <p className="text-sm text-muted-foreground">Toggle between light and dark themes.</p>
        </div>
        <Switch />
      </div>
      <div className="space-y-2">
        <Label>Language</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="English" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="es">Spanish</SelectItem>
            <SelectItem value="fr">French</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </CardContent>
  </Card>
);

const AdminSettings = () => (
  <Card>
    <CardHeader>
      <CardTitle>Admin Settings</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-gray-500">Admin-specific settings and tools. This section will contain features to manage all projects, team roles, and company details. </p>
    </CardContent>
  </Card>
);

const AccountManagement = () => (
  <Card>
    <CardHeader>
      <CardTitle>Account Management</CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
        <div className="space-y-1">
          <p className="font-medium">Export Profile Data</p>
          <p className="text-sm text-muted-foreground">Download your personal data and activity logs.</p>
        </div>
        <Button variant="outline" size="sm">
          <Download className="w-4 h-4 mr-2" />
          Export
        </Button>
      </div>
      <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
        <div className="space-y-1">
          <p className="font-medium text-red-600">Delete Account</p>
          <p className="text-sm text-muted-foreground">Permanently delete your account and all associated data.</p>
        </div>
        <Button variant="destructive" size="sm">
          <Trash2 className="w-4 h-4 mr-2" />
          Delete
        </Button>
      </div>
    </CardContent>
  </Card>
);

export default function Settings() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile');
  const isAdmin = currentUser.role === 'admin';

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileSettings />;
      case 'security':
        return <SecuritySettings />;
      case 'notifications':
        return <NotificationSettings />;
      case 'preferences':
        return <PreferencesSettings />;
      case 'project-settings':
        return isAdmin ? <AdminSettings /> : null;
      case 'account':
        return <AccountManagement />;
      default:
        return null;
    }
  };

  return (
    <div className="p-6 flex space-x-6">
      <div className="w-64 flex-shrink-0">
        <SettingsSidebar activeTab={activeTab} onTabChange={setActiveTab} isAdmin={isAdmin} />
      </div>
      <div className="flex-1">
        {renderContent()}
      </div>
    </div>
  );
}