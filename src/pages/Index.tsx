import { PropertyMap } from "@/components/PropertyMap";
import { PropertyList } from "@/components/PropertyList";
import { DrawingTools } from "@/components/DrawingTools";

const Index = () => {
  return (
    <div className="flex h-screen bg-estate-light">
      <div className="w-1/4 p-4 border-r border-gray-200 overflow-y-auto">
        <h1 className="text-2xl font-bold text-estate-primary mb-6">Grundstücke</h1>
        <PropertyList />
      </div>
      <div className="w-3/4 relative">
        <DrawingTools />
        <PropertyMap />
      </div>
    </div>
  );
};

export default Index;