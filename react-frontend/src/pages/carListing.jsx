import React, { useState, useEffect } from 'react';
import { carData } from '../data/cardata';
import SearchBar from '../components/Searchbar';
import CarCard from '../components/CarCard';
import Pagination from '../components/Pagination';

const CarListing = () => {
  const [cars, setCars] = useState(carData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const carsPerPage = 4;

  // Filter cars based on search and filter
  useEffect(() => {
    let filteredCars = carData;
    
    // Apply search filter
    if (searchTerm) {
      filteredCars = filteredCars.filter(car =>
        car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.features.some(feature => 
          feature.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
    
    // Apply type filter
    if (selectedFilter !== 'all') {
      filteredCars = filteredCars.filter(car => car.type === selectedFilter);
    }
    
    setCars(filteredCars);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchTerm, selectedFilter]);

  // Calculate pagination
  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = cars.slice(indexOfFirstCar, indexOfLastCar);
  const totalPages = Math.ceil(cars.length / carsPerPage);

  const handleOrderClick = (car) => {
    console.log('Ordering car:', car);
    // Navigate to order page or open order modal
    // window.location.href = `/order?car=${car.id}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Find Your Perfect Car
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Browse our extensive collection of premium vehicles. Find the car that matches your style and needs.
          </p>
        </div>

        {/* Search and Filter */}
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedFilter={selectedFilter}
          onFilterChange={setSelectedFilter}
        />

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {cars.length} car{cars.length !== 1 ? 's' : ''}
            {selectedFilter !== 'all' && ` in ${selectedFilter}`}
            {searchTerm && ` matching "${searchTerm}"`}
          </p>
        </div>

        {/* Car Grid */}
        {currentCars.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8 mb-8">
              {currentCars.map(car => (
                <CarCard
                  key={car.id}
                  car={car}
                  onOrderClick={handleOrderClick}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </>
        ) : (
          // No results message
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🚗</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              No cars found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CarListing;