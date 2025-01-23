import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { toast } from "sonner";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export const PropertyMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapStyle, setMapStyle] = useState('mapbox://styles/mapbox/streets-v11');
  const [token, setToken] = useState('');
  const [isMapInitialized, setIsMapInitialized] = useState(false);

  // Cleanup function to properly dispose of the map instance
  const cleanupMap = () => {
    if (map.current) {
      map.current.remove();
      map.current = null;
      setIsMapInitialized(false);
    }
  };

  const initializeMap = () => {
    if (!token) {
      toast.error('Please enter a Mapbox token');
      return;
    }

    // Clean up existing map instance if it exists
    cleanupMap();

    if (!mapContainer.current) return;

    try {
      mapboxgl.accessToken = token;
      
      const newMap = new mapboxgl.Map({
        container: mapContainer.current,
        style: mapStyle,
        center: [10.4515, 51.1657], // Center of Germany
        zoom: 6
      });

      newMap.addControl(new mapboxgl.NavigationControl(), 'top-right');

      newMap.on('style.load', () => {
        console.log('Map style loaded successfully');
        setIsMapInitialized(true);
        toast.success('Map loaded successfully');
      });

      newMap.on('error', (e) => {
        console.error('Map error:', e);
        toast.error('Error loading map. Please check your token and try again.');
        cleanupMap();
      });

      map.current = newMap;

    } catch (error) {
      console.error('Error initializing map:', error);
      toast.error('Failed to initialize map. Please check your token and try again.');
      cleanupMap();
    }
  };

  // Cleanup effect
  useEffect(() => {
    return () => {
      cleanupMap();
    };
  }, []);

  // Effect for handling style changes
  useEffect(() => {
    if (map.current && isMapInitialized) {
      try {
        map.current.setStyle(mapStyle);
      } catch (error) {
        console.error('Error changing map style:', error);
        toast.error('Failed to change map style');
      }
    }
  }, [mapStyle, isMapInitialized]);

  return (
    <div className="flex flex-col gap-4 w-full">
      {!isMapInitialized && (
        <div className="flex gap-2 items-center">
          <Input
            type="text"
            placeholder="Enter your Mapbox token"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            className="flex-1"
          />
          <Button onClick={initializeMap}>Initialize Map</Button>
        </div>
      )}
      <div className="relative w-full h-full">
        <div ref={mapContainer} className="w-full h-full min-h-[500px] rounded-lg" />
        {isMapInitialized && (
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
        )}
      </div>
    </div>
  );
};