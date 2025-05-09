import React from 'react';
import { useDesignStore } from '../../store/designStore';
import { FurnitureItem } from '../../types';
import { ArmchairIcon as ChairIcon, TableIcon, SofaIcon, SquareIcon } from 'lucide-react';

const FurniturePalette: React.FC = () => {
  const { addFurniture, currentDesign } = useDesignStore();
  
  const furnitureTemplates = [
    {
      type: 'chair',
      name: 'Dining Chair',
      width: 45,
      depth: 50,
      height: 90,
      color: '#289df4',
      icon: <ChairIcon className="h-6 w-6" />,
    },
    {
      type: 'table',
      name: 'Dining Table',
      width: 150,
      depth: 90,
      height: 75,
      color: '#71d175',
      icon: <TableIcon className="h-6 w-6" />,
    },
    {
      type: 'sofa',
      name: 'Sofa',
      width: 220,
      depth: 90,
      height: 85,
      color: '#289df4',
      icon: <SofaIcon className="h-6 w-6" />,
    },
    {
      type: 'cabinet',
      name: 'Cabinet',
      width: 120,
      depth: 45,
      height: 180,
      color: '#71d175',
      icon: <SquareIcon className="h-6 w-6" />,
    },
  ];
  
  const handleAddFurniture = (template: typeof furnitureTemplates[0]) => {
    if (!currentDesign) return;
    
    const newItem: FurnitureItem = {
      id: `${template.type}-${Date.now()}`,
      type: template.type as any,
      name: template.name,
      width: template.width,
      depth: template.depth,
      height: template.height,
      color: template.color,
      position: { x: 50, y: 0, z: 50 },
      rotation: { x: 0, y: 0, z: 0 },
      scale: 1,
      selected: false,
    };
    
    addFurniture(newItem);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        {furnitureTemplates.map((template) => (
          <button
            key={template.type}
            onClick={() => handleAddFurniture(template)}
            className="group flex flex-col items-center justify-center p-4 rounded-xl border border-light/50 bg-white hover:bg-light/30 transition-all duration-200 hover:shadow-lg hover:shadow-primary/5"
          >
            <div className={`text-${template.color === '#289df4' ? 'primary' : 'secondary'} mb-2 group-hover:scale-110 transition-transform duration-200`}>
              {template.icon}
            </div>
            <span className="text-sm font-medium text-text">{template.name}</span>
            <div className="mt-2 w-4 h-4 rounded-full" style={{ backgroundColor: template.color }} />
          </button>
        ))}
      </div>
    </div>
  );
};

export default FurniturePalette;