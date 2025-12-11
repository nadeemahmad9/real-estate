import React from 'react';
import { MASTER_AMENITIES_LIST } from '../config/AmenitiesConfig';

const AmenitiesSelector = ({ selectedAmenities, onChange }) => {

    const handleCheckboxChange = (amenityName) => {
        if (selectedAmenities.includes(amenityName)) {
            // Remove it
            onChange(selectedAmenities.filter(item => item !== amenityName));
        } else {
            // Add it
            onChange([...selectedAmenities, amenityName]);
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
            <h3 className="text-lg font-bold mb-4 text-gray-800">Select Amenities</h3>

            <div className="space-y-6">
                {Object.entries(MASTER_AMENITIES_LIST).map(([category, items]) => (
                    <div key={category}>
                        <h4 className="font-semibold text-sm text-gray-500 uppercase tracking-wider mb-2 border-b pb-1">
                            {category}
                        </h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {items.map((item) => (
                                <label
                                    key={item.name}
                                    className={`
                    flex items-center space-x-2 p-2 rounded cursor-pointer border text-sm transition-all
                    ${selectedAmenities.includes(item.name)
                                            ? 'bg-red-50 border-red-200 text-red-700 font-medium'
                                            : 'bg-gray-50 border-gray-100 text-gray-600 hover:bg-gray-100'}
                  `}
                                >
                                    <input
                                        type="checkbox"
                                        value={item.name}
                                        checked={selectedAmenities.includes(item.name)}
                                        onChange={() => handleCheckboxChange(item.name)}
                                        className="w-4 h-4 text-red-600 rounded focus:ring-red-500"
                                    />
                                    <span>{item.name}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AmenitiesSelector;