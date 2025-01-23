import React, { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

interface MobileFiltersProps {
  isOpen: boolean;
  onClose: () => void;
  setFilter: (filter: string) => void;
  currentFilter: string;
}

const MobileFilters: React.FC<MobileFiltersProps> = ({
  isOpen,
  onClose,
  setFilter,
  currentFilter,
}) => {
  // Initialize all sections as open
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
    sort: true,
    categories: true,
    size: true,
    color: true,
    price: true
  });

  if (!isOpen) return null;

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const FilterSection = ({ 
    title, 
    id, 
    children 
  }: { 
    title: string; 
    id: string; 
    children: React.ReactNode 
  }) => (
    <div className="border-b border-gray-200">
      <button 
        onClick={() => toggleSection(id)}
        className="flex justify-between items-center w-full py-3 text-left"
      >
        <span className="text-base font-medium text-gray-900">{title}</span>
        {openSections[id] ? (
          <IoIosArrowUp className="text-gray-500" size={20} />
        ) : (
          <IoIosArrowDown className="text-gray-500" size={20} />
        )}
      </button>
      {openSections[id] && (
        <div className="pb-3">
          {children}
        </div>
      )}
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
      <div 
        className="fixed bottom-0 left-0 right-0 h-[90vh] bg-white rounded-none flex flex-col"
        style={{
          transform: isOpen ? 'translateY(0)' : 'translateY(100%)',
          transition: 'transform 0.3s ease-out'
        }}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
            <button onClick={onClose} className="p-1.5 text-gray-500 hover:text-gray-700">
              <IoClose size={20} />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-4">
          {/* Sort By Section */}
          <FilterSection title="Sort By" id="sort">
            <div className="space-y-2">
              {['Newest', 'Price: Low to High', 'Price: High to Low', 'Best Selling'].map((option) => (
                <button
                  key={option}
                  className="w-full text-left py-2 px-3 text-sm text-gray-700 hover:bg-gray-50 rounded"
                >
                  {option}
                </button>
              ))}
            </div>
          </FilterSection>

          {/* Categories Section */}
          <FilterSection title="Categories" id="categories">
            <div className="flex flex-wrap gap-2">
              {['Boots', 'Bottoms', 'Denim', 'Dresses', 'Knit Tops', 'Outerwear', 'Shirting', 'Woven Tops'].map((category) => (
                <button
                  key={category}
                  className={`px-4 py-2 rounded-full border text-sm ${
                    currentFilter === category.toLowerCase()
                      ? 'border-black bg-black text-white'
                      : 'border-gray-300 text-gray-700 hover:border-gray-400'
                  }`}
                  onClick={() => setFilter(category.toLowerCase())}
                >
                  {category}
                </button>
              ))}
            </div>
          </FilterSection>

          {/* Size Section */}
          <FilterSection title="Size" id="size">
            <div className="grid grid-cols-4 gap-2">
              {['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL'].map((size) => (
                <button
                  key={size}
                  className="px-3 py-2 border border-gray-300 rounded text-gray-700 hover:border-gray-400 text-sm"
                >
                  {size}
                </button>
              ))}
            </div>
          </FilterSection>

          {/* Color Section */}
          <FilterSection title="Color" id="color">
            <div className="grid grid-cols-4 gap-3">
              {[
                { name: 'Black', color: '#000000' },
                { name: 'White', color: '#FFFFFF' },
                { name: 'Navy', color: '#000080' },
                { name: 'Blue', color: '#0047AB' },
                { name: 'Brown', color: '#964B00' },
                { name: 'Green', color: '#228B22' },
                { name: 'Grey', color: '#808080' },
                { name: 'Pink', color: '#FFC0CB' },
                { name: 'Red', color: '#FF0000' },
                { name: 'Purple', color: '#800080' },
                { name: 'Yellow', color: '#FFD700' },
                { name: 'Orange', color: '#FFA500' },
              ].map((colorOption) => (
                <button
                  key={colorOption.name}
                  className="flex flex-col items-center gap-1"
                >
                  <div
                    className={`w-10 h-10 rounded-full border ${
                      colorOption.color === '#FFFFFF' ? 'border-gray-300' : 'border-transparent'
                    }`}
                    style={{ backgroundColor: colorOption.color }}
                  />
                  <span className="text-xs text-gray-700">{colorOption.name}</span>
                </button>
              ))}
            </div>
          </FilterSection>

          {/* Price Range Section */}
          <FilterSection title="Price Range" id="price">
            <div className="space-y-2">
              {['Under $50', '$50 - $100', '$100 - $200', '$200 - $500', 'Over $500'].map((range) => (
                <button
                  key={range}
                  className="w-full text-left py-2 px-3 text-sm text-gray-700 hover:bg-gray-50 rounded"
                >
                  {range}
                </button>
              ))}
            </div>
          </FilterSection>
        </div>

        {/* Bottom Buttons */}
        <div className="sticky bottom-0 p-4 bg-white border-t border-gray-200">
          <div className="flex gap-3">
            <button
              onClick={() => setFilter('all')}
              className="flex-1 py-2.5 px-4 border border-black text-black font-medium text-sm"
            >
              Clear All
            </button>
            <button
              onClick={onClose}
              className="flex-1 py-2.5 px-4 bg-black text-white font-medium text-sm"
            >
              View Results
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileFilters; 