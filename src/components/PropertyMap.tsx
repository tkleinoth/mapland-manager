import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { toast } from "sonner";

// Set the access token directly on mapboxgl
mapboxgl.accessToken = 'pk.eyJ1IjoibG92YWJsZSIsImEiOiJjbHMxYXB5YmkwMGl1MmpteXB4NWY5Y2VqIn0.qX-PZ6mJwwqzxPrGh6Mf9g';

export const PropertyMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapStyle, setMapStyle] = useState('mapbox://styles/mapbox/streets-v11');

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    try {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: mapStyle,
        center: [10.4515, 51.1657], // Center of Germany
        zoom: 6
      });

      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

      map.current.on('style.load', () => {
        console.log('Map style loaded successfully');
      });

      map.current.on('error', (e) => {
        console.error('Map error:', e);
        toast.error('Error loading map. Please try again later.');
      });

    } catch (error) {
      console.error('Error initializing map:', error);
      toast.error('Failed to initialize map. Please check your connection and try again.');
    }

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []); // Only run on mount

  // Effect for handling style changes
  useEffect(() => {
    if (map.current) {
      try {
        map.current.setStyle(mapStyle);
      } catch (error) {
        console.error('Error changing map style:', error);
        toast.error('Failed to change map style');
      }
    }
  }, [mapStyle]);

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainer} className="w-full h-full min-h-[500px]" />
      <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-2 z-10">
        <select 
          className="p-2 border rounded"
          onChange={(e) => setMapStyle(e.target.value)}
          value={mapStyle}
        >
          <option value="mapbox://styles/mapbox/streets-v11">Straßen</option>
          <option value="mapbox://styles/mapbox/satellite-v9">Satellit</option>
          <option value="mapbox://styles/mapbox/terrain-v2">Gelände</option>
        </select>
      </div>
    </div>
  );
};