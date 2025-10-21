import React, { useState } from 'react';
import PrimaryButton from './PrimaryButton';

const CarCard = ({ car, onOrder, onQuickView, onCompare, onExplore, onHome }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);
    const [showAllFeatures, setShowAllFeatures] = useState(false);

    const handleImageLoad = () => {
        setImageLoaded(true);
    };

    const handleImageError = (e) => {
        e.target.src = 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=400&h=300&fit=crop';
    };

    const toggleFavorite = (e) => {
        e.stopPropagation();
        setIsFavorite(!isFavorite);
        // You could add API call here to save favorites
    };

    const handleQuickView = (e) => {
        e.stopPropagation();
        if (onQuickView) onQuickView(car);
    };

    const handleCompare = (e) => {
        e.stopPropagation();
        if (onCompare) onCompare(car);
    };

    const handleOrderClick = (e) => {
        e.stopPropagation();
        if (onOrder) onOrder(car);
    };

    const handleExploreClick = (e) => {
        e.stopPropagation();
        if (onExplore) onExplore();
    };

    const handleHomeClick = (e) => {
        e.stopPropagation();
        if (onHome) onHome();
    };

    const toggleFeatures = (e) => {
        e.stopPropagation();
        setShowAllFeatures(!showAllFeatures);
    };

    const formatPrice = (price) => {
        if (!price) return '$0';
        if (price.startsWith('$')) return price;
        return `$${price}`;
    };

    // Calculate discount percentage if original price exists
    const calculateDiscount = () => {
        if (!car.originalPrice || !car.price) return null;

        const original = parseFloat(car.originalPrice.replace(/[$,]/g, ''));
        const current = parseFloat(car.price.replace(/[$,]/g, ''));
        const discount = ((original - current) / original) * 100;

        return Math.round(discount);
    };

    const discount = calculateDiscount();
    const displayedFeatures = showAllFeatures ? car.features : car.features?.slice(0, 4) || [];

    return (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group border border-gray-100">
            {/* Car Image with Overlay */}
            <div className="relative h-48 overflow-hidden">
                {/* Loading Skeleton */}
                {!imageLoaded && (
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse flex items-center justify-center">
                        <div className="text-gray-500 text-sm">Loading car image...</div>
                    </div>
                )}

                {/* Discount Badge */}
                {discount && (
                    <div className="absolute top-3 left-3 z-10">
                        <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-pulse">
                            🔥 {discount}% OFF
                        </span>
                    </div>
                )}

                <img
                    src={car.image}
                    alt={car.model}
                    className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${imageLoaded ? 'opacity-100' : 'opacity-0'
                        }`}
                    onLoad={handleImageLoad}
                    onError={handleImageError}
                />

                {/* Favorite Button */}
                <button
                    onClick={toggleFavorite}
                    className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-300 transform hover:scale-110 backdrop-blur-sm pointer-events-auto ${isFavorite
                        ? 'bg-red-500 text-white shadow-lg border border-red-400'
                        : 'bg-white/90 text-gray-600 hover:bg-red-500 hover:text-white border border-white/20'
                        }`}
                    title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                >
                    {isFavorite ? '❤️' : '🤍'}
                </button>

                {/* Type Badge */}
                <div className="absolute bottom-3 left-3 pointer-events-auto">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm border ${car.type === 'Electric' ? 'bg-green-500/90 text-white border-green-400' :
                        car.type === 'Sports Car' ? 'bg-red-500/90 text-white border-red-400' :
                            car.type === 'SUV' ? 'bg-orange-500/90 text-white border-orange-400' :
                                car.type === 'Luxury Sedan' ? 'bg-purple-500/90 text-white border-purple-400' :
                                    'bg-blue-500/90 text-white border-blue-400'
                        }`}>
                        {car.type}
                    </span>
                </div>
            </div>

            {/* Car Info */}
            <div className="p-6">
                {/* Header with Model and Year */}
                <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300 line-clamp-1">
                            {car.model}
                        </h3>
                        {car.year && (
                            <p className="text-sm text-gray-500 mt-1">Model Year: {car.year}</p>
                        )}
                    </div>
                    <div className="text-right ml-4">
                        <div className="text-2xl font-bold text-green-600">
                            {formatPrice(car.price)}
                        </div>
                        {car.originalPrice && car.originalPrice !== car.price && (
                            <div className="text-sm text-gray-400 line-through">
                                {formatPrice(car.originalPrice)}
                            </div>
                        )}
                        {car.financing && (
                            <div className="text-xs text-blue-600 font-medium mt-1">
                                {car.financing}
                            </div>
                        )}
                    </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 mb-4 line-clamp-2 leading-relaxed text-sm">
                    {car.description}
                </p>

                {/* Key Features */}
                {car.features && car.features.length > 0 && (
                    <div className="mb-4">
                        <div className="flex justify-between items-center mb-2">
                            <h4 className="text-sm font-semibold text-gray-700">Key Features:</h4>
                            {car.features.length > 4 && (
                                <button
                                    onClick={toggleFeatures}
                                    className="text-xs text-blue-600 hover:text-blue-700 font-medium transition-colors"
                                >
                                    {showAllFeatures ? 'Show Less' : `+${car.features.length - 4} more`}
                                </button>
                            )}
                        </div>
                        <div className="flex flex-wrap gap-1">
                            {displayedFeatures.map((feature, index) => (
                                <span
                                    key={index}
                                    className="bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full border border-blue-200 hover:border-blue-300 transition-colors"
                                    title={feature}
                                >
                                    {feature}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Additional Info Grid */}
                <div className="grid grid-cols-2 gap-3 mb-4 text-xs">
                    {car.mileage && (
                        <div className="flex items-center text-gray-600 bg-gray-50 rounded-lg p-2">
                            <span className="text-base mr-2">🛣️</span>
                            <div>
                                <div className="font-medium">Mileage</div>
                                <div>{car.mileage}</div>
                            </div>
                        </div>
                    )}
                    {car.fuelType && (
                        <div className="flex items-center text-gray-600 bg-gray-50 rounded-lg p-2">
                            <span className="text-base mr-2">⛽</span>
                            <div>
                                <div className="font-medium">Fuel</div>
                                <div>{car.fuelType}</div>
                            </div>
                        </div>
                    )}
                    {car.transmission && (
                        <div className="flex items-center text-gray-600 bg-gray-50 rounded-lg p-2">
                            <span className="text-base mr-2">⚙️</span>
                            <div>
                                <div className="font-medium">Transmission</div>
                                <div>{car.transmission}</div>
                            </div>
                        </div>
                    )}
                    {car.condition && (
                        <div className="flex items-center text-gray-600 bg-gray-50 rounded-lg p-2">
                            <span className="text-base mr-2">🆕</span>
                            <div>
                                <div className="font-medium">Condition</div>
                                <div>{car.condition}</div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                    <PrimaryButton
                        label="Quick View"
                        onClick={handleQuickView}
                        type="outline"
                        className="flex-1 text-sm py-2.5"
                    />
                    <PrimaryButton
                        label="Order Now"
                        onClick={handleOrderClick}
                        type="primary"
                        className="flex-1 text-sm py-2.5"
                    />
                </div>

                {/* Navigation Buttons */}
                <div className="flex space-x-2 mt-3">
                    {onExplore && (
                        <button
                            onClick={handleExploreClick}
                            className="flex-1 text-xs text-blue-600 hover:text-blue-700 font-medium py-2 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
                        >
                            Explore More
                        </button>
                    )}
                    {onHome && (
                        <button
                            onClick={handleHomeClick}
                            className="flex-1 text-xs text-gray-600 hover:text-gray-700 font-medium py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            Back to Home
                        </button>
                    )}
                </div>

                {/* Special Badges */}
                <div className="flex flex-wrap gap-2 mt-3">
                    {car.isNew && (
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full border border-green-200 font-medium">
                            🆕 New Arrival
                        </span>
                    )}
                    {car.isFeatured && (
                        <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full border border-yellow-200 font-medium">
                            ⭐ Featured
                        </span>
                    )}
                    {car.lowMileage && (
                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full border border-blue-200 font-medium">
                            📍 Low Mileage
                        </span>
                    )}
                    {car.certified && (
                        <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full border border-purple-200 font-medium">
                            ✅ Certified
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CarCard;