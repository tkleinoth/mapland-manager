import React from 'react';
import { Button } from "@/components/ui/button";
import { MapPin, Square, Circle } from 'lucide-react';

export const DrawingTools = () => {
  return (
    <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-2 space-y-2">
      <Button 
        variant="outline" 
        className="w-full flex items-center gap-2"
        onClick={() => console.log('Polygon zeichnen')}
      >
        <Square size={16} />
        Polygon
      </Button>
      <Button 
        variant="outline" 
        className="w-full flex items-center gap-2"
        onClick={() => console.log('Kreis zeichnen')}
      >
        <Circle size={16} />
        Kreis
      </Button>
      <Button 
        variant="outline" 
        className="w-full flex items-center gap-2"
        onClick={() => console.log('Marker setzen')}
      >
        <MapPin size={16} />
        Marker
      </Button>
    </div>
  );
};