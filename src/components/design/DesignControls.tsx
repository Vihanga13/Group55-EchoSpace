import React, { useState } from 'react';
import { useDesignStore } from '../../store/designStore';
import { Eye, Save, Trash2, Palette, Maximize, Minimize, Download, RotateCcw, RotateCw } from 'lucide-react';
import { toPng, toJpeg } from 'html-to-image';

const DesignControls: React.FC = () => {
  const { 
    viewMode, 
    toggleViewMode, 
    currentDesign, 
    saveDesign,
    updateFurniture,
    removeFurniture
  } = useDesignStore();
  
  const [showDownloadOptions, setShowDownloadOptions] = useState(false);
  
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

  const handleRotateLeft = () => {
    if (selectedItem) {
      const newRotation = {
        ...selectedItem.rotation,
        y: selectedItem.rotation.y - Math.PI / 4 // Rotate 45 degrees left
      };
      updateFurniture(selectedItem.id, { rotation: newRotation });
    }
  };

  const handleRotateRight = () => {
    if (selectedItem) {
      const newRotation = {
        ...selectedItem.rotation,
        y: selectedItem.rotation.y + Math.PI / 4 // Rotate 45 degrees right
      };
      updateFurniture(selectedItem.id, { rotation: newRotation });
    }
  };

  const handleDownloadImage = async (format: 'png' | 'jpg') => {
    const element = document.querySelector('.design-canvas-container');
    if (!element || !currentDesign) return;

    try {
      const dataUrl = format === 'png' 
        ? await toPng(element, {
            backgroundColor: '#f9fafb',
            quality: 1.0,
            pixelRatio: 2,
          })
        : await toJpeg(element, {
            backgroundColor: '#f9fafb',
            quality: 0.95,
            pixelRatio: 2,
          });
      
      const link = document.createElement('a');
      link.download = `${currentDesign.name}-${viewMode.mode}-view.${format}`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Error downloading image:', err);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between bg-white border-b border-light px-4 py-2">
      <div className="flex items-center space-x-2">
        <button
          onClick={toggleViewMode}
          className="inline-flex items-center px-3 py-1.5 border border-light/50 text-sm font-medium rounded-xl text-primary bg-primary/5 hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/20 transition-all duration-200 shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)] active:shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)]"
        >
          <Eye className="mr-1.5 h-4 w-4" />
          {viewMode.mode === '2d' ? 'Switch to 3D' : 'Switch to 2D'}
        </button>
        
        <button
          onClick={saveDesign}
          className="inline-flex items-center px-3 py-1.5 border border-light/50 text-sm font-medium rounded-xl text-secondary bg-secondary/5 hover:bg-secondary/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary/20 transition-all duration-200 shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)] active:shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)]"
        >
          <Save className="mr-1.5 h-4 w-4" />
          Save Design
        </button>

        <div className="relative">
          <button
            onClick={() => setShowDownloadOptions(!showDownloadOptions)}
            className="inline-flex items-center px-3 py-1.5 border border-light/50 text-sm font-medium rounded-xl text-accent bg-accent/5 hover:bg-accent/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent/20 transition-all duration-200 shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)] active:shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)]"
          >
            <Download className="mr-1.5 h-4 w-4" />
            Download {viewMode.mode.toUpperCase()} View
          </button>
          
          {showDownloadOptions && (
            <div className="absolute right-0 mt-2 w-48 rounded-xl shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
              <div className="py-1" role="menu" aria-orientation="vertical">
                <button
                  onClick={() => {
                    handleDownloadImage('png');
                    setShowDownloadOptions(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-text hover:bg-light/30 rounded-xl transition-colors duration-200 shadow-[inset_0_1px_2px_rgba(0,0,0,0.05)]"
                  role="menuitem"
                >
                  Download as PNG
                </button>
                <button
                  onClick={() => {
                    handleDownloadImage('jpg');
                    setShowDownloadOptions(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-text hover:bg-light/30 rounded-xl transition-colors duration-200 shadow-[inset_0_1px_2px_rgba(0,0,0,0.05)]"
                  role="menuitem"
                >
                  Download as JPG
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {selectedItem && (
        <div className="flex items-center space-x-4 mt-2 sm:mt-0">
          <div className="flex items-center space-x-2">
            <label className="text-sm text-text">Color:</label>
            <input
              type="color"
              value={selectedItem.color}
              onChange={handleColorChange}
              className="h-8 w-8 rounded-lg cursor-pointer border border-light/50 shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)]"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={handleScaleDecrease}
              className="p-1.5 rounded-xl hover:bg-light/30 text-text transition-colors duration-200 shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)] active:shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)]"
            >
              <Minimize className="h-4 w-4" />
            </button>
            <span className="text-sm text-text">Scale</span>
            <button
              onClick={handleScaleIncrease}
              className="p-1.5 rounded-xl hover:bg-light/30 text-text transition-colors duration-200 shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)] active:shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)]"
            >
              <Maximize className="h-4 w-4" />
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleRotateLeft}
              className="p-1.5 rounded-xl hover:bg-light/30 text-text transition-colors duration-200 shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)] active:shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)]"
              title="Rotate Left"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
            <span className="text-sm text-text">Rotate</span>
            <button
              onClick={handleRotateRight}
              className="p-1.5 rounded-xl hover:bg-light/30 text-text transition-colors duration-200 shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)] active:shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)]"
              title="Rotate Right"
            >
              <RotateCw className="h-4 w-4" />
            </button>
          </div>
          
          <button
            onClick={handleDeleteItem}
            className="inline-flex items-center px-3 py-1.5 border border-light/50 text-sm font-medium rounded-xl text-red-600 bg-red-50 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-200 transition-all duration-200 shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)] active:shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)]"
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default DesignControls;