import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { Layout, LogOut, User } from 'lucide-react';

const Header: React.FC = () => {
  const { designer, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Layout className="h-8 w-8 text-indigo-600" />
            <span className="ml-2 text-xl font-semibold text-gray-900">FurnishVision</span>
          </div>
          
          {designer && (
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <div className="flex items-center justify-center rounded-full bg-indigo-100 w-8 h-8">
                  <User className="h-5 w-5 text-indigo-600" />
                </div>
                <span className="ml-2 text-sm font-medium text-gray-700">
                  {designer.name}
                </span>
              </div>
              
              <button
                onClick={handleLogout}
                className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <LogOut className="h-5 w-5 mr-1" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;