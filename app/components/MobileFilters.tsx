import React from 'react';
import { IoClose } from 'react-icons/io5';

interface MobileFiltersProps {
  isOpen: boolean;
  onClose: () => void;
  setFilter: (filter: string) => void;
  currentFilter: string;
  // Add any other filter-related props you need
}

const MobileFilters: React.FC<MobileFiltersProps> = ({
  isOpen,
  onClose,
  setFilter,
  currentFilter,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
      <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-medium">Filters</h2>
          <button onClick={onClose} className="p-2">
            <IoClose size={24} />
          </button>
        </div>
      </div>

      <div className="px-4 py-4">
        {/* Sort By Section */}
        <div className="border-b border-gray-200">
          <button className="flex justify-between items-center w-full py-4">
            <span className="text-lg">Sort By</span>
            <span className="transform rotate-0">›</span>
          </button>
        </div>

        {/* Categories Section */}
        <div className="border-b border-gray-200">
          <button className="flex justify-between items-center w-full py-4">
            <span className="text-lg">Categories</span>
            <span className="transform rotate-0">›</span>
          </button>
          <div className="pb-4">
            <div className="flex flex-wrap gap-2">
              {['Boots', 'Bottoms', 'Denim', 'Dresses', 'Knit Tops', 'Outerwear', 'Shirting', 'Woven Tops'].map((category) => (
                <button
                  key={category}
                  className={`px-4 py-2 rounded-full border ${
                    currentFilter === category.toLowerCase()
                      ? 'border-black bg-black text-white'
                      : 'border-gray-300 text-gray-700'
                  }`}
                  onClick={() => setFilter(category.toLowerCase())}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Color Section */}
        <div className="border-b border-gray-200">
          <button className="flex justify-between items-center w-full py-4">
            <span className="text-lg">Color</span>
            <span className="transform rotate-0">›</span>
          </button>
          <div className="pb-4">
            <div className="grid grid-cols-4 gap-4">
              {[
                { name: 'Black', color: '#000000' },
                { name: 'Blue', color: '#0047AB' },
                { name: 'Brown', color: '#964B00' },
                { name: 'Green', color: '#228B22' },
                { name: 'Grey', color: '#808080' },
                { name: 'Pink', color: '#FFC0CB' },
              ].map((colorOption) => (
                <button
                  key={colorOption.name}
                  className="flex flex-col items-center gap-2"
                >
                  <div
                    className="w-12 h-12 rounded-full border border-gray-300"
                    style={{ backgroundColor: colorOption.color }}
                  />
                  <span className="text-sm">{colorOption.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Price Range Section */}
        <div className="border-b border-gray-200">
          <button className="flex justify-between items-center w-full py-4">
            <span className="text-lg">Price</span>
            <span className="transform rotate-0">›</span>
          </button>
        </div>
      </div>

      {/* Bottom Buttons */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200">
        <div className="flex gap-4">
          <button
            onClick={() => setFilter('all')}
            className="flex-1 py-3 px-4 border border-black text-black font-medium"
          >
            Clear Filters
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-3 px-4 bg-black text-white font-medium"
          >
            View Products
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileFilters; 