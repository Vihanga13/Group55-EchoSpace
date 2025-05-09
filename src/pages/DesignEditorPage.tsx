import React from 'react';
import Header from '../components/common/Header';
import DesignControls from '../components/design/DesignControls';
import FurniturePalette from '../components/design/FurniturePalette';
import DesignCanvas2D from '../components/design/DesignCanvas2D';
import DesignCanvas3D from '../components/design/DesignCanvas3D';
import { useDesignStore } from '../store/designStore';

const DesignEditorPage: React.FC = () => {
  const { currentRoom, currentDesign, viewMode } = useDesignStore();
  
  if (!currentRoom || !currentDesign) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
          <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-md w-full mx-4 border border-light/50">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-text mb-2">No Active Design</h2>
              <p className="text-muted">Please create or select a design from the dashboard to begin.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <div className="flex-1 overflow-hidden flex flex-col">
        <div className="bg-white shadow-lg border-b border-light/50">
          <DesignControls />
        </div>
        
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden p-4 gap-4">
          <aside className="w-full lg:w-72 bg-white shadow-2xl rounded-2xl overflow-hidden border border-light/50 hover:shadow-primary/5 transition-shadow duration-300">
            <div className="px-6 py-4 border-b border-light/50 bg-light/30">
              <h3 className="text-lg font-semibold text-text">Furniture Palette</h3>
            </div>
            <div className="p-4">
              <FurniturePalette />
            </div>
          </aside>
          
          <main className="flex-1 overflow-hidden">
            <div className="h-full bg-white shadow-2xl rounded-2xl overflow-hidden border border-light/50 hover:shadow-primary/5 transition-shadow duration-300">
              <div className="px-6 py-4 border-b border-light/50 bg-light/30">
                <h3 className="text-lg font-semibold text-text">
                  {viewMode.mode === '2d' ? '2D Design View' : '3D Design View'}
                </h3>
              </div>
              <div className="p-4 h-[calc(100%-4rem)]">
                <div className="h-full rounded-xl overflow-hidden flex items-center justify-center bg-light/30">
                  {viewMode.mode === '2d' ? (
                    <DesignCanvas2D />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full">
                      <DesignCanvas3D />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default DesignEditorPage;