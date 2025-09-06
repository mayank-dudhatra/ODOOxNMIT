import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import { LogOut } from 'lucide-react';

const MainNav = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    logout();
    await new Promise(resolve => setTimeout(resolve, 0)); // Ensure state updates
    navigate('/');
  };

  return (
    <header className="border-b">
      <div className="flex h-16 items-center px-4">
        <div className="flex items-center space-x-4">
          <Link to={user?.role === 'admin' ? '/admin/dashboard' : '/dashboard'} className="font-bold">
            SynergySphere
          </Link>
          {user && (
            <nav className="hidden md:flex items-center space-x-6 text-sm">
              {user.role === 'admin' && (
                <Link to="/admin/dashboard" className="transition-colors hover:text-foreground/80">
                  Admin Dashboard
                </Link>
              )}
              <Link to="/dashboard" className="transition-colors hover:text-foreground/80">
                My Projects
              </Link>
              <Link to="/settings" className="transition-colors hover:text-foreground/80">
                Settings
              </Link>
            </nav>
          )}
        </div>
        <div className="ml-auto flex items-center space-x-4">
          {user ? (
            <>
              <span className="text-sm">Welcome, {user.name}</span>
              <Button variant="ghost" size="icon" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <Button asChild>
              <Link to="/">Sign In</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default MainNav;
