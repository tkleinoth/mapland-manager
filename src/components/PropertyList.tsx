import React from 'react';
import { Card } from "@/components/ui/card";

export const PropertyList = () => {
  // Beispieldaten
  const properties = [
    { id: 1, name: 'Grundstück 1', area: '500m²', location: 'Berlin' },
    { id: 2, name: 'Grundstück 2', area: '750m²', location: 'Hamburg' },
  ];

  return (
    <div className="space-y-4">
      {properties.map((property) => (
        <Card key={property.id} className="p-4 hover:shadow-lg transition-shadow">
          <h3 className="font-semibold text-estate-primary">{property.name}</h3>
          <p className="text-sm text-gray-600">{property.location}</p>
          <p className="text-sm text-gray-600">Fläche: {property.area}</p>
        </Card>
      ))}
    </div>
  );
};