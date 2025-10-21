import React from 'react';
import PrimaryButton from './PrimaryButton';

const CarCard = ({ car, onOrderClick }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
      {/* Car Image */}
      <div className="h-48 overflow-hidden">
        <img
          src={car.image}
          alt={car.model}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
        />
      </div>
      
      {/* Car Info */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-gray-800">{car.model}</h3>
          <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
            {car.type}
          </span>
        </div>
        
        <p className="text-gray-600 mb-4 line-clamp-2">{car.description}</p>
        
        {/* Features */}
        <div className="flex flex-wrap gap-1 mb-4">
          {car.features.slice(0, 3).map((feature, index) => (
            <span
              key={index}
              className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
            >
              {feature}
            </span>
          ))}
          {car.features.length > 3 && (
            <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
              +{car.features.length - 3} more
            </span>
          )}
        </div>
        
        {/* Price and Action */}
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-green-600">{car.price}</span>
          <PrimaryButton
            label="Order Now"
            onClick={() => onOrderClick(car)}
            type="primary"
            className="text-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default CarCard;