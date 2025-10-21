import React from 'react';
import PrimaryButton from './PrimaryButton';

const Navbar = ({ onExplore, onOrder, onHome, currentPage }) => {
    return (
        <nav className="w-full flex justify-between items-center px-6 md:px-12 lg:px-20 xl:px-32 py-5 bg-white shadow-md sticky top-0 z-50">
            <div
                className="flex items-center space-x-4 cursor-pointer"
                onClick={onHome}
            >
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    C
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
                    CarElite
                </h1>
            </div>

            <div className="space-x-8 hidden md:flex items-center">
                <button
                    onClick={onHome}
                    className={`transition-colors font-medium ${currentPage === 'home' ? 'text-blue-600 font-bold' : 'text-gray-700 hover:text-blue-600'
                        }`}
                >
                    Home
                </button>
                <button
                    onClick={onExplore}
                    className={`transition-colors font-medium ${currentPage === 'listing' ? 'text-blue-600 font-bold' : 'text-gray-700 hover:text-blue-600'
                        }`}
                >
                    Car Listing
                </button>
                <button
                    onClick={onOrder}
                    className={`transition-colors font-medium ${currentPage === 'order' ? 'text-blue-600 font-bold' : 'text-gray-700 hover:text-blue-600'
                        }`}
                >
                    Order
                </button>
            </div>

            <PrimaryButton
                label="Get Started"
                onClick={onExplore}
                type="primary"
            />
        </nav>
    );
};

export default Navbar;