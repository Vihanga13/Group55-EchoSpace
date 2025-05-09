import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/common/Header';
import { useAuthStore } from '../store/authStore';
import { useDesignStore } from '../store/designStore';
import { PlusCircle, FolderPlus, Edit2, Layout, Home, Palette, Clock, ArrowRight } from 'lucide-react';

const DashboardPage: React.FC = () => {
  const { designer } = useAuthStore();
  const { rooms, designs, setCurrentRoom, setCurrentDesign } = useDesignStore();
  const navigate = useNavigate();
  
  const [newDesignName, setNewDesignName] = useState('');
  const [selectedRoomId, setSelectedRoomId] = useState('');
  const [showNewDesignForm, setShowNewDesignForm] = useState(false);
  
  const handleCreateRoom = () => {
    navigate('/room-config');
  };
  
  const handleCreateNewDesign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDesignName || !selectedRoomId || !designer) return;
    
    const room = rooms.find(r => r.id === selectedRoomId);
    if (room) {
      setCurrentRoom(room);
    }
    
    useDesignStore.getState().createDesign(
      newDesignName,
      selectedRoomId,
      designer.id
    );
    
    navigate('/design-editor');
  };
  
  const handleOpenDesign = (designId: string) => {
    const design = designs.find(d => d.id === designId);
    if (design) {
      setCurrentDesign(design);
      
      const room = rooms.find(r => r.id === design.roomId);
      if (room) {
        setCurrentRoom(room);
      }
      
      navigate('/design-editor');
    }
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Welcome Section */}
          <div className="mb-8">
          <h1 className="text-3xl font-bold text-text mb-2">
            Welcome back, {designer?.name}
          </h1>

            <p className="text-muted">Manage your rooms and designs</p>
          </div>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-light/50 hover:shadow-primary/5 transition-all duration-300">
              <div className="flex items-center">
                <div className="p-3 rounded-xl bg-yellow-500/20 ">
                  <Home className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted">Total Rooms</p>
                  <p className="text-2xl font-semibold text-text">{rooms.length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-light/50 hover:shadow-primary/5 transition-all duration-300">
              <div className="flex items-center">
                <div className="p-3 rounded-xl bg-yellow-500/20">
                  <Palette className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted">Total Designs</p>
                  <p className="text-2xl font-semibold text-text">{designs.length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-light/50 hover:shadow-primary/5 transition-all duration-300">
              <div className="flex items-center">
                <div className="p-3 rounded-xl bg-yellow-500/20">
                  <Clock className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted">Recent Activity</p>
                  <p className="text-2xl font-semibold text-text">
                    {designs.length > 0 ? 'Active' : 'None'}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Quick Actions */}
          <div className="flex flex-wrap gap-4 mb-8">
            <button
              onClick={handleCreateRoom}
              className="inline-flex items-center px-6 py-3 border border-transparent rounded-xl shadow-lg text-sm font-medium text-white bg-amber-700 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-700 transition-all duration-200 hover:scale-105"
            >
              <PlusCircle className="h-5 w-5 mr-2" />
              New Room
            </button>
            
            <button
              onClick={() => setShowNewDesignForm(true)}
              className="inline-flex items-center px-6 py-3 border border-transparent rounded-xl shadow-lg text-sm font-medium text-white bg-yellow-900 hover:bg-yellow-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:yellow-900 transition-all duration-200 hover:scale-105"
            >
              <FolderPlus className="h-5 w-5 mr-2" />
              New Design
            </button>
          </div>
          
          {/* New Design Form */}
          {showNewDesignForm && (
            <div className="mb-8 bg-white shadow-2xl rounded-2xl overflow-hidden border border-light/50">
              <div className="px-8 py-6 border-b border-light/50 bg-light/30">
                <h3 className="text-xl font-semibold text-text">
                  Create New Design
                </h3>
              </div>
              <div className="p-8">
                <form className="space-y-6" onSubmit={handleCreateNewDesign}>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="design-name" className="block text-sm font-medium text-text mb-2">
                        Design Name
                      </label>
                      <input
                        type="text"
                        name="design-name"
                        id="design-name"
                        required
                        className="block w-full rounded-xl border-light shadow-sm focus:yellow-600 focus:yellow-600 sm:text-sm transition-colors duration-200"
                        placeholder="Kitchen Redesign"
                        value={newDesignName}
                        onChange={(e) => setNewDesignName(e.target.value)}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="room-select" className="block text-sm font-medium text-text mb-2">
                        Select Room
                      </label>
                      <select
                        id="room-select"
                        name="room-select"
                        required
                        className="block w-full rounded-xl border-light shadow-sm focus:yellow-900 focus:ring-yellow-900 sm:text-sm transition-colors duration-200"
                        value={selectedRoomId}
                        onChange={(e) => setSelectedRoomId(e.target.value)}
                      >
                        <option value="">Select a room</option>
                        {rooms.map((room) => (
                          <option key={room.id} value={room.id}>
                            {room.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => setShowNewDesignForm(false)}
                      className="px-4 py-2 border border-light rounded-xl text-sm font-medium text-text bg-white hover:bg-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:yellow-900 transition-colors duration-200"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 border border-transparent rounded-xl text-sm font-medium text-white bg-yellow-900 hover:yellow-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:yellow-900 transition-colors duration-200"
                    >
                      Create Design
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
          
          {/* Main Content */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Rooms Section */}
            <div className="lg:col-span-1">
              <div className="bg-white shadow-2xl rounded-2xl overflow-hidden border border-light/50 hover:shadow-primary/5 transition-shadow duration-300">
                <div className="px-8 py-6 border-b border-light/50 bg-light/30">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Layout className="h-5 w-5 text-yellow-900 mr-2" />
                      <h3 className="text-xl font-semibold text-text">Your Rooms</h3>
                    </div>
                    <span className="text-sm text-muted">{rooms.length} rooms</span>
                  </div>
                </div>
                <div className="p-6">
                  {rooms.length > 0 ? (
                    <ul className="space-y-4">
                      {rooms.map((room) => (
                        <li key={room.id} className="group">
                          <div className="bg-light/30 rounded-xl p-4 hover:bg-light/50 transition-all duration-200 border border-light/50">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm font-medium text-text group-hover:text-yellow-900 transition-colors duration-200">
                                  {room.name}
                                </p>
                                <p className="text-sm text-muted mt-1">
                                  {room.width} × {room.length} × {room.height} inches
                                </p>
                              </div>
                              <button
                                onClick={() => {
                                  setCurrentRoom(room);
                                  navigate('/room-config');
                                }}
                                className="inline-flex items-center px-3 py-1.5 border border-light rounded-xl text-xs font-medium text-text bg-white hover:bg-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-900 transition-all duration-200 hover:scale-105"
                              >
                                <Edit2 className="h-3.5 w-3.5 mr-1" />
                                Edit
                              </button>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="text-center py-6">
                      <p className="text-sm text-muted">No rooms created yet</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Designs Section */}
            <div className="lg:col-span-2">
              <div className="bg-white shadow-2xl rounded-2xl overflow-hidden border border-light/50 hover:shadow-primary/5 transition-shadow duration-300">
                <div className="px-8 py-6 border-b border-light/50 bg-light/30">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FolderPlus className="h-5 w-5 text-yellow-900 mr-2" />
                      <h3 className="text-xl font-semibold text-text">Your Designs</h3>
                    </div>
                    <span className="text-sm text-muted">{designs.length} designs</span>
                  </div>
                </div>
                <div className="p-6">
                  {designs.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      {designs.map((design) => (
                        <div 
                          key={design.id} 
                          className="group bg-light/30 rounded-xl p-4 hover:bg-light/50 transition-all duration-200 border border-light/50 cursor-pointer"
                          onClick={() => handleOpenDesign(design.id)}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="text-sm font-medium text-text group-hover:text-yellow-900 transition-colors duration-200">
                                {design.name}
                              </h4>
                              <p className="text-xs text-muted mt-1">
                                {rooms.find(r => r.id === design.roomId)?.name || 'Unknown Room'}
                              </p>
                            </div>
                            <div className="flex items-center text-yellow-900 group-yellow-900:translate-x-1 transition-transform duration-200">
                              <ArrowRight className="h-4 w-4" />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <p className="text-sm text-muted">No designs created yet</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;