import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

export const PropertyMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapStyle, setMapStyle] = useState('mapbox://styles/mapbox/streets-v11');

  useEffect(() => {
    if (!mapContainer.current) return;

    // Temporärer Token - Bitte ersetzen Sie diesen durch Ihren eigenen Token
    mapboxgl.accessToken = 'BITTE_FÜGEN_SIE_IHREN_MAPBOX_TOKEN_EIN';
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: mapStyle,
      center: [10.4515, 51.1657], // Zentrum von Deutschland
      zoom: 6
    });

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    return () => {
      map.current?.remove();
    };
  }, [mapStyle]);

  const changeMapStyle = (style: string) => {
    setMapStyle(style);
  };

  return (
    <>
      <div ref={mapContainer} className="absolute inset-0" />
      <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-2">
        <select 
          className="p-2 border rounded"
          onChange={(e) => changeMapStyle(e.target.value)}
          value={mapStyle}
        >
          <option value="mapbox://styles/mapbox/streets-v11">Straßen</option>
          <option value="mapbox://styles/mapbox/satellite-v9">Satellit</option>
          <option value="mapbox://styles/mapbox/terrain-v2">Gelände</option>
        </select>
      </div>
    </>
  );
};