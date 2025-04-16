import React from 'react';
import { useDesignStore } from '../../store/designStore';
import { Eye, Save, Trash2, Palette, Maximize, Minimize, Download } from 'lucide-react';
import { toPng } from 'html-to-image';

const DesignControls: React.FC = () => {
  const { 
    viewMode, 
    toggleViewMode, 
    currentDesign, 
    saveDesign,
    updateFurniture,
    removeFurniture
  } = useDesignStore();
  
  const selectedItem = currentDesign?.furniture.find(item => item.selected);
  
  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedItem) {
      updateFurniture(selectedItem.id, { color: e.target.value });
    }
  };
  
  const handleScaleIncrease = () => {
    if (selectedItem) {
      updateFurniture(selectedItem.id, { scale: selectedItem.scale + 0.1 });
    }
  };
  
  const handleScaleDecrease = () => {
    if (selectedItem && selectedItem.scale > 0.2) {
      updateFurniture(selectedItem.id, { scale: selectedItem.scale - 0.1 });
    }
  };
  
  const handleDeleteItem = () => {
    if (selectedItem) {
      removeFurniture(selectedItem.id);
    }
  };

  const handleDownloadImage = async () => {
    const element = document.querySelector('.design-canvas-container');
    if (!element || !currentDesign) return;

    try {
      const dataUrl = await toPng(element, {
        backgroundColor: '#f9fafb',
        quality: 1.0,
        pixelRatio: 2,
      });
      
      const link = document.createElement('a');
      link.download = `${currentDesign.name}-${viewMode.mode}-view.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Error downloading image:', err);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between bg-white border-b px-4 py-2">
      <div className="flex items-center space-x-2">
        <button
          onClick={toggleViewMode}
          className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Eye className="mr-1.5 h-4 w-4" />
          {viewMode.mode === '2d' ? 'Switch to 3D' : 'Switch to 2D'}
        </button>
        
        <button
          onClick={saveDesign}
          className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          <Save className="mr-1.5 h-4 w-4" />
          Save Design
        </button>

        <button
          onClick={handleDownloadImage}
          className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-purple-700 bg-purple-100 hover:bg-purple-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
        >
          <Download className="mr-1.5 h-4 w-4" />
          Download {viewMode.mode.toUpperCase()} View
        </button>
      </div>
      
      {selectedItem && (
        <div className="flex items-center space-x-4 mt-2 sm:mt-0">
          <div className="flex items-center">
            <span className="text-xs text-gray-500 mr-2">Color</span>
            <div className="flex rounded-md shadow-sm">
              <input
                type="color"
                value={selectedItem.color}
                onChange={handleColorChange}
                className="h-8 w-8 rounded cursor-pointer"
                title="Change color"
              />
            </div>
          </div>
          
          <div className="flex items-center">
            <span className="text-xs text-gray-500 mr-2">Scale</span>
            <div className="flex items-center">
              <button
                onClick={handleScaleDecrease}
                className="p-1 rounded-full hover:bg-gray-100"
                title="Decrease size"
              >
                <Minimize className="h-4 w-4 text-gray-700" />
              </button>
              <span className="mx-1 text-sm">
                {selectedItem.scale.toFixed(1)}
              </span>
              <button
                onClick={handleScaleIncrease}
                className="p-1 rounded-full hover:bg-gray-100"
                title="Increase size"
              >
                <Maximize className="h-4 w-4 text-gray-700" />
              </button>
            </div>
          </div>
          
          <button
            onClick={handleDeleteItem}
            className="p-1 rounded-full hover:bg-red-100 text-red-600"
            title="Delete item"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default DesignControls;