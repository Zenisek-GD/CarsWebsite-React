import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import PrimaryButton from "../components/PrimaryButton";
import FeatureCard from "../components/FeatureCard";
import CarCard from "../components/CarCard";
import SearchBar from "../components/Searchbar";
import '../App.css'

const LandingPage = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [currentBrand, setCurrentBrand] = useState(0);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('all');

    // Hero car slides data
    const carSlides = [
        {
            image: "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=1200",
            title: "Luxury Redefined",
            subtitle: "Experience unparalleled comfort and performance",
            description: "Discover the perfect blend of luxury and innovation with our flagship model.",
            buttonText: "Explore Luxury Cars"
        },
        {
            image: "https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg?auto=compress&cs=tinysrgb&w=1200",
            title: "Electric Future",
            subtitle: "Zero emissions, maximum performance",
            description: "Join the electric revolution with our cutting-edge EV technology.",
            buttonText: "View Electric Cars"
        },
        {
            image: "https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg?auto=compress&cs=tinysrgb&w=1200",
            title: "Sport Edition",
            subtitle: "Thrilling performance meets elegant design",
            description: "Feel the adrenaline with our high-performance sports models.",
            buttonText: "Discover Sports Cars"
        }
    ];

    // Brand logos for swiping
    const brands = [
        "🚗", "⚡", "🌟", "🏎️", "💎", "🚀"
    ];

    // Car brands for horizontal scroll
    const carBrands = [
        {
            name: "Toyota",
            logo: "https://cdn.worldvectorlogo.com/logos/toyota-1.svg",
            models: "Camry, Corolla, RAV4"
        },
        {
            name: "Honda",
            logo: "https://cdn.worldvectorlogo.com/logos/honda-1.svg",
            models: "Civic, Accord, CR-V"
        },
        {
            name: "Ford",
            logo: "https://cdn.worldvectorlogo.com/logos/ford-8.svg",
            models: "Mustang, F-150, Explorer"
        },
        {
            name: "BMW",
            logo: "https://cdn.worldvectorlogo.com/logos/bmw-2020.svg",
            models: "X5, 3 Series, 5 Series"
        },
        {
            name: "Mercedes",
            logo: "https://cdn.worldvectorlogo.com/logos/mercedes-benz-9.svg",
            models: "C-Class, E-Class, GLC"
        },
        {
            name: "Audi",
            logo: "https://cdn.worldvectorlogo.com/logos/audi-2.svg",
            models: "A4, Q5, Q7"
        },
        {
            name: "Tesla",
            logo: "https://cdn.worldvectorlogo.com/logos/tesla-motors-1.svg",
            models: "Model 3, Model S, Model Y"
        },
        {
            name: "Hyundai",
            logo: "https://cdn.worldvectorlogo.com/logos/hyundai-motor-company.svg",
            models: "Tucson, Santa Fe, Elantra"
        },
        {
            name: "Kia",
            logo: "https://cdn.worldvectorlogo.com/logos/kia-motors-1.svg",
            models: "Sorento, Sportage, Telluride"
        },
        {
            name: "Nissan",
            logo: "https://cdn.worldvectorlogo.com/logos/nissan-2.svg",
            models: "Altima, Rogue, Pathfinder"
        }
    ];

    // Features data
    const features = [
        {
            icon: "⚡",
            title: "High Performance",
            description: "Experience breathtaking acceleration and top-tier performance with our advanced engine technology."
        },
        {
            icon: "🌿",
            title: "Eco Friendly",
            description: "Drive with confidence knowing our vehicles are designed with sustainability in mind."
        },
        {
            icon: "🛡️",
            title: "Premium Safety",
            description: "Advanced safety features and crash protection systems for complete peace of mind."
        },
        {
            icon: "🔧",
            title: "Smart Technology",
            description: "Integrated AI systems and smart connectivity for a seamless driving experience."
        },
        {
            icon: "💺",
            title: "Luxury Comfort",
            description: "Premium interiors and ergonomic design for the ultimate comfort on every journey."
        },
        {
            icon: "💰",
            title: "Great Value",
            description: "Competitive pricing with exceptional quality and long-term reliability."
        }
    ];

    // Popular car models data for CarCard components
    const popularCars = [
        {
            id: 1,
            model: "Honda Civic 2024",
            image: "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=400",
            description: "The all-new Honda Civic with advanced safety features, sleek design, and excellent fuel economy.",
            price: "$24,500",
            type: "Sedan",
            features: ["Apple CarPlay", "Android Auto", "Lane Assist", "Bluetooth"]
        },
        {
            id: 2,
            model: "Toyota Camry XSE",
            image: "https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg?auto=compress&cs=tinysrgb&w=400",
            description: "Sporty and sophisticated, the Camry XSE offers dynamic handling and premium interior features.",
            price: "$31,000",
            type: "Sedan",
            features: ["Heated Seats", "Sunroof", "Navigation", "Premium Audio"]
        },
        {
            id: 3,
            model: "Ford Mustang GT",
            image: "https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg?auto=compress&cs=tinysrgb&w=400",
            description: "Experience raw power with the iconic Ford Mustang GT. 5.0L V8 engine delivering 450 horsepower.",
            price: "$42,000",
            type: "Sports Car",
            features: ["V8 Engine", "Sport Suspension", "Performance Brakes", "Racing Stripes"]
        },
        {
            id: 4,
            model: "Tesla Model 3",
            image: "https://images.pexels.com/photos/358189/pexels-photo-358189.jpeg?auto=compress&cs=tinysrgb&w=400",
            description: "Fully electric with autopilot features. Zero emissions with incredible acceleration.",
            price: "$45,000",
            type: "Electric",
            features: ["Autopilot", "Supercharging", "Glass Roof", "Premium Interior"]
        }
    ];

    // Statistics data
    const stats = [
        { number: "10K+", label: "Happy Customers" },
        { number: "50+", label: "Car Models" },
        { number: "15+", label: "Years Experience" },
        { number: "24/7", label: "Customer Support" }
    ];

    // Auto-rotate slides and brands
    useEffect(() => {
        const slideInterval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % carSlides.length);
        }, 5000);

        const brandInterval = setInterval(() => {
            setCurrentBrand((prev) => (prev + 1) % brands.length);
        }, 2000);

        return () => {
            clearInterval(slideInterval);
            clearInterval(brandInterval);
        };
    }, []);

    // Horizontal scroll animation for brands
    useEffect(() => {
        const scrollInterval = setInterval(() => {
            setScrollPosition((prev) => (prev + 1) % carBrands.length);
        }, 3000);

        return () => clearInterval(scrollInterval);
    }, []);

    const handleExplore = () => {
        console.log("Explore clicked");
    };

    const handleOrder = (car = null) => {
        if (car) {
            console.log("Ordering car:", car);
        } else {
            console.log("Order clicked");
        }
    };

    const handleFeatureClick = (index) => {
        console.log(`Feature ${index} clicked`);
    };

    const handleSearch = (term) => {
        setSearchTerm(term);
        console.log("Searching for:", term);
    };

    const handleFilter = (filter) => {
        setSelectedFilter(filter);
        console.log("Filtering by:", filter);
    };

    return (
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen w-full">


            {/* Hero Section with Swapping Cards */}
            <section id="home" className="w-full relative overflow-hidden">
                <div className="relative h-screen flex items-center justify-center">
                    {/* Background Slides */}
                    {carSlides.map((slide, index) => (
                        <div
                            key={index}
                            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'
                                }`}
                        >
                            <img
                                src={slide.image}
                                alt={slide.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                        </div>
                    ))}

                    {/* Hero Content */}
                    <div className="relative z-10 text-center text-white px-6 max-w-4xl">
                        <div className="mb-8">
                            <div className="text-6xl mb-4 animate-bounce">
                                {brands[currentBrand]}
                            </div>
                            <h1 className="text-5xl md:text-7xl font-bold mb-4 animate-fade-in-up">
                                {carSlides[currentSlide].title}
                            </h1>
                            <p className="text-xl md:text-2xl mb-6 text-gray-200">
                                {carSlides[currentSlide].subtitle}
                            </p>
                            <p className="text-lg mb-8 max-w-2xl mx-auto">
                                {carSlides[currentSlide].description}
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <PrimaryButton
                                label={carSlides[currentSlide].buttonText}
                                onClick={handleExplore}
                                type="primary"
                            />
                            <PrimaryButton
                                label="Order Now"
                                onClick={() => handleOrder()}
                                type="outline"
                            />
                        </div>
                    </div>

                    {/* Slide Indicators */}
                    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
                        {carSlides.map((_, index) => (
                            <button
                                key={index}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-white scale-125' : 'bg-gray-400'
                                    }`}
                                onClick={() => setCurrentSlide(index)}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Moving Brands Section */}
            <section className="w-full py-12 bg-white border-y border-gray-200 overflow-hidden">
                <div className="relative">
                    <div className="flex space-x-16 animate-marquee whitespace-nowrap">
                        {[...carBrands, ...carBrands].map((brand, index) => (
                            <div
                                key={index}
                                className="flex flex-col items-center justify-center min-w-[140px] transform hover:scale-110 transition-transform duration-300 group"
                            >
                                <div className="w-16 h-16 mb-3 flex items-center justify-center bg-gray-50 rounded-full p-2 group-hover:bg-blue-50 transition-colors duration-300">
                                    <img
                                        src={brand.logo}
                                        alt={brand.name}
                                        className="w-12 h-12 object-contain filter group-hover:brightness-110 transition-all duration-300"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                            e.target.nextSibling.style.display = 'block';
                                        }}
                                    />
                                    <span className="text-2xl hidden">{brand.name.charAt(0)}</span>
                                </div>
                                <div className="text-center">
                                    <div className="font-bold text-gray-800 text-lg group-hover:text-blue-600 transition-colors duration-300">
                                        {brand.name}
                                    </div>
                                    <div className="text-xs text-gray-500 mt-1 max-w-[120px] truncate">
                                        {brand.models}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Statistics Section */}
            <section className="w-full py-20 bg-gradient-to-r from-blue-50 to-indigo-50">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Why Choose CarElite
                        </h2>
                        <p className="text-lg text-gray-600">
                            Trusted by thousands of satisfied customers worldwide
                        </p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                                    {stat.number}
                                </div>
                                <div className="text-gray-600 font-medium">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Search and Featured Cars Section */}
            <section id="models" className="w-full py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            Find Your Perfect Car
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Browse our curated selection of premium vehicles
                        </p>
                    </div>

                    {/* Search Bar */}
                    <SearchBar
                        searchTerm={searchTerm}
                        onSearchChange={handleSearch}
                        selectedFilter={selectedFilter}
                        onFilterChange={handleFilter}
                    />

                    {/* Featured Cars Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8">
                        {popularCars.map((car) => (
                            <CarCard
                                key={car.id}
                                car={car}
                                onOrderClick={handleOrder}
                            />
                        ))}
                    </div>

                    {/* View All Button */}
                    <div className="text-center mt-12">
                        <PrimaryButton
                            label="View All Vehicles"
                            onClick={handleExplore}
                            type="primary"
                            className="px-12 py-4 text-lg"
                        />
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="w-full py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            Why Choose CarElite
                        </h3>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Discover the features that make our vehicles stand out from the competition
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <FeatureCard
                                key={index}
                                icon={feature.icon}
                                title={feature.title}
                                description={feature.description}
                                onClick={() => handleFeatureClick(index)}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="w-full py-24 bg-white">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            What Our Customers Say
                        </h2>
                        <p className="text-xl text-gray-600">
                            Hear from our satisfied customers about their CarElite experience.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl shadow-lg border border-blue-100">
                            <div className="text-yellow-400 text-2xl mb-4">★★★★★</div>
                            <p className="text-gray-600 mb-4">
                                "Amazing service! The team helped me find the perfect car within my budget. Highly recommended!"
                            </p>
                            <div className="font-semibold text-gray-800">- Sarah Johnson</div>
                        </div>

                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl shadow-lg border border-blue-100">
                            <div className="text-yellow-400 text-2xl mb-4">★★★★★</div>
                            <p className="text-gray-600 mb-4">
                                "The buying process was smooth and transparent. Love my new Tesla Model 3!"
                            </p>
                            <div className="font-semibold text-gray-800">- Mike Chen</div>
                        </div>

                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl shadow-lg border border-blue-100">
                            <div className="text-yellow-400 text-2xl mb-4">★★★★★</div>
                            <p className="text-gray-600 mb-4">
                                "Excellent after-sales support. The maintenance team is professional and efficient."
                            </p>
                            <div className="font-semibold text-gray-800">- Emily Davis</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white text-center py-20 px-6">
                <div className="max-w-4xl mx-auto">
                    <h3 className="text-4xl md:text-5xl font-bold mb-6">
                        Ready to Drive Your Dream Car?
                    </h3>
                    <p className="mb-10 text-xl text-blue-100 max-w-2xl mx-auto">
                        Join thousands of satisfied customers who have found their perfect vehicle with us.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <PrimaryButton
                            label="Browse Inventory"
                            onClick={handleExplore}
                            type="secondary"
                        />
                        <PrimaryButton
                            label="Schedule Test Drive"
                            onClick={() => handleOrder()}
                            type="outline"
                        />
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="w-full bg-gray-900 text-gray-400 py-12">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {/* Company Info */}
                        <div className="col-span-1 md:col-span-2">
                            <div className="flex items-center space-x-4 mb-6">
                                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-full flex items-center justify-center text-white font-bold text-lg">
                                    C
                                </div>
                                <span className="text-white font-bold text-2xl">CarElite</span>
                            </div>
                            <p className="text-gray-400 mb-4 max-w-md">
                                Your trusted partner for premium vehicles. We offer the best selection of cars with exceptional customer service.
                            </p>
                            <div className="flex space-x-4">
                                <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
                                    <span className="text-white">f</span>
                                </div>
                                <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-blue-400 transition-colors cursor-pointer">
                                    <span className="text-white">t</span>
                                </div>
                                <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors cursor-pointer">
                                    <span className="text-white">i</span>
                                </div>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h4 className="text-white font-bold mb-4">Quick Links</h4>
                            <ul className="space-y-2">
                                <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
                                <li><a href="#models" className="hover:text-white transition-colors">Models</a></li>
                                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                            </ul>
                        </div>

                        {/* Contact Info */}
                        <div>
                            <h4 className="text-white font-bold mb-4">Contact</h4>
                            <ul className="space-y-2">
                                <li>📞 (555) 123-4567</li>
                                <li>✉️ info@carelite.com</li>
                                <li>📍 123 Auto Street, Car City</li>
                                <li>🕒 Mon-Sun: 9AM - 8PM</li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-gray-700 mt-8 pt-8 text-center">
                        <p className="text-sm">
                            © 2025 CarElite Motors. All rights reserved. |
                            <a href="#" className="hover:text-white transition-colors mx-2">Privacy Policy</a> |
                            <a href="#" className="hover:text-white transition-colors mx-2">Terms of Service</a> |
                            <a href="#" className="hover:text-white transition-colors mx-2">Contact Us</a>
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;