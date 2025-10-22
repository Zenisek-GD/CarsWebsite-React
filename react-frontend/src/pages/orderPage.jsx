import React, { useState, useEffect } from 'react';
import PrimaryButton from '../components/PrimaryButton';

const OrderPage = ({ car, onHome, onExplore }) => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        carModel: '',
        testDrive: 'no',
        preferredDate: '',
        financing: 'not-sure',
        tradeIn: 'no',
        message: '',
        contactMethod: 'email'
    });

    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    // Pre-fill car model if passed as prop
    useEffect(() => {
        if (car) {
            setFormData(prev => ({
                ...prev,
                carModel: car.model
            }));
        }
    }, [car]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const nextStep = () => {
        setCurrentStep(prev => Math.min(prev + 1, 4));
        // Scroll to top on step change
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const prevStep = () => {
        setCurrentStep(prev => Math.max(prev - 1, 1));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        console.log('Order submitted:', formData);
        setIsSubmitting(false);
        setSubmitSuccess(true);
    };

    const carModels = [
        "Honda Civic 2024",
        "Toyota Camry XSE", 
        "Ford Mustang GT",
        "Tesla Model 3",
        "BMW X5",
        "Audi A4",
        "Mercedes-Benz C-Class",
        "Jeep Wrangler Rubicon",
        "Porsche 911 Carrera",
        "Hyundai Tucson Hybrid",
        "Chevrolet Corvette Stingray"
    ];

    const states = [
        "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
        "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
        "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
        "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
        "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
    ];

    if (submitSuccess) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl w-full mx-auto">
                    <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 md:p-12">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                            <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 text-center">Order Confirmed!</h2>
                        <p className="text-base sm:text-lg text-gray-600 mb-2 text-center">
                            Thank you for your order, <strong>{formData.fullName}</strong>!
                        </p>
                        <p className="text-gray-600 mb-6 text-center">
                            We've received your request for the <strong>{formData.carModel}</strong> and our sales team will contact you within 24 hours.
                        </p>
                        <div className="space-y-3 sm:space-y-4">
                            <PrimaryButton
                                label="Back to Home"
                                onClick={onHome}
                                type="primary"
                                className="w-full"
                            />
                            <PrimaryButton
                                label="Browse More Cars"
                                onClick={onExplore}
                                type="outline"
                                className="w-full"
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-4 sm:py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8 sm:mb-12">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
                        {car ? `Order ${car.model}` : 'Place Your Order'}
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
                        Complete your purchase in just a few simple steps. Our team is ready to assist you.
                    </p>
                </div>

                {/* Progress Bar - Mobile */}
                <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 mb-6 sm:mb-8 md:hidden">
                    <div className="flex items-center justify-between mb-3">
                        {[1, 2, 3, 4].map(step => (
                            <div key={step} className="flex flex-col items-center">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                                    step === currentStep 
                                        ? 'bg-blue-600 border-blue-600 text-white' 
                                        : step < currentStep 
                                        ? 'bg-green-500 border-green-500 text-white'
                                        : 'bg-white border-gray-300 text-gray-500'
                                }`}>
                                    {step < currentStep ? '✓' : step}
                                </div>
                                <span className={`text-xs mt-1 ${
                                    step === currentStep ? 'text-blue-600 font-semibold' : 'text-gray-500'
                                }`}>
                                    Step {step}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Progress Bar - Desktop */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 hidden md:block">
                    <div className="flex items-center justify-between mb-4">
                        {[1, 2, 3, 4].map(step => (
                            <div key={step} className="flex items-center flex-1">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                                    step === currentStep 
                                        ? 'bg-blue-600 border-blue-600 text-white' 
                                        : step < currentStep 
                                        ? 'bg-green-500 border-green-500 text-white'
                                        : 'bg-white border-gray-300 text-gray-500'
                                }`}>
                                    {step < currentStep ? '✓' : step}
                                </div>
                                {step < 4 && (
                                    <div className={`flex-1 h-1 mx-2 ${
                                        step < currentStep ? 'bg-green-500' : 'bg-gray-300'
                                    }`}></div>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                        <span className={currentStep >= 1 ? 'text-blue-600 font-semibold' : ''}>Personal Info</span>
                        <span className={currentStep >= 2 ? 'text-blue-600 font-semibold' : ''}>Vehicle Details</span>
                        <span className={currentStep >= 3 ? 'text-blue-600 font-semibold' : ''}>Services</span>
                        <span className={currentStep >= 4 ? 'text-blue-600 font-semibold' : ''}>Review</span>
                    </div>
                </div>

                {/* Order Form */}
                <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 md:p-8">
                    <form onSubmit={handleSubmit}>
                        {/* Step 1: Personal Information */}
                        {currentStep === 1 && (
                            <div className="space-y-4 sm:space-y-6">
                                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Personal Information</h3>
                                
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                                    <div className="sm:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            name="fullName"
                                            value={formData.fullName}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                            placeholder="John Doe"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Email Address *
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                            placeholder="john@example.com"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Phone Number *
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                            placeholder="(555) 123-4567"
                                        />
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Preferred Contact Method
                                        </label>
                                        <select
                                            name="contactMethod"
                                            value={formData.contactMethod}
                                            onChange={handleChange}
                                            className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        >
                                            <option value="email">Email</option>
                                            <option value="phone">Phone</option>
                                            <option value="text">Text Message</option>
                                        </select>
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Street Address
                                        </label>
                                        <input
                                            type="text"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleChange}
                                            className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                            placeholder="123 Main St"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            City
                                        </label>
                                        <input
                                            type="text"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleChange}
                                            className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                            placeholder="New York"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            State
                                        </label>
                                        <select
                                            name="state"
                                            value={formData.state}
                                            onChange={handleChange}
                                            className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        >
                                            <option value="">Select State</option>
                                            {states.map(state => (
                                                <option key={state} value={state}>{state}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            ZIP Code
                                        </label>
                                        <input
                                            type="text"
                                            name="zipCode"
                                            value={formData.zipCode}
                                            onChange={handleChange}
                                            className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                            placeholder="10001"
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-end pt-4">
                                    <PrimaryButton
                                        type="button"
                                        label="Next: Vehicle Details"
                                        onClick={nextStep}
                                        className="px-6 sm:px-8 py-2 sm:py-3"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Step 2: Vehicle Details */}
                        {currentStep === 2 && (
                            <div className="space-y-4 sm:space-y-6">
                                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Vehicle Details</h3>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Select Vehicle *
                                    </label>
                                    <select
                                        name="carModel"
                                        value={formData.carModel}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        <option value="">Choose a vehicle model</option>
                                        {carModels.map(model => (
                                            <option key={model} value={model}>{model}</option>
                                        ))}
                                    </select>
                                </div>

                                {car && (
                                    <div className="bg-blue-50 border border-blue-200 rounded-lg sm:rounded-xl p-3 sm:p-4">
                                        <h4 className="font-semibold text-blue-900 mb-2">Selected Vehicle</h4>
                                        <p className="text-blue-800">{car.model} - {car.price}</p>
                                        <p className="text-blue-700 text-sm mt-1">{car.description}</p>
                                    </div>
                                )}

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Financing Interest
                                        </label>
                                        <select
                                            name="financing"
                                            value={formData.financing}
                                            onChange={handleChange}
                                            className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        >
                                            <option value="not-sure">Not Sure Yet</option>
                                            <option value="cash">Paying Cash</option>
                                            <option value="finance">Need Financing</option>
                                            <option value="lease">Interested in Lease</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Trade-In Vehicle
                                        </label>
                                        <select
                                            name="tradeIn"
                                            value={formData.tradeIn}
                                            onChange={handleChange}
                                            className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        >
                                            <option value="no">No Trade-In</option>
                                            <option value="yes">Yes, I have a trade-in</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="flex justify-between pt-4">
                                    <PrimaryButton
                                        type="button"
                                        label="Back"
                                        onClick={prevStep}
                                        className="px-6 sm:px-8 py-2 sm:py-3"
                                    />
                                    <PrimaryButton
                                        type="button"
                                        label="Next: Additional Services"
                                        onClick={nextStep}
                                        className="px-6 sm:px-8 py-2 sm:py-3"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Step 3: Additional Services */}
                        {currentStep === 3 && (
                            <div className="space-y-4 sm:space-y-6">
                                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Additional Services</h3>
                                
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                                    <div className="sm:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Schedule Test Drive
                                        </label>
                                        <select
                                            name="testDrive"
                                            value={formData.testDrive}
                                            onChange={handleChange}
                                            className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        >
                                            <option value="no">No, thanks</option>
                                            <option value="yes">Yes, please schedule a test drive</option>
                                        </select>
                                    </div>

                                    {formData.testDrive === 'yes' && (
                                        <div className="sm:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Preferred Date
                                            </label>
                                            <input
                                                type="date"
                                                name="preferredDate"
                                                value={formData.preferredDate}
                                                onChange={handleChange}
                                                min={new Date().toISOString().split('T')[0]}
                                                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Additional Message or Special Requests
                                    </label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows="4"
                                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                        placeholder="Any special requests, questions, or additional information you'd like to share..."
                                    />
                                </div>

                                <div className="flex justify-between pt-4">
                                    <PrimaryButton
                                        type="button"
                                        label="Back"
                                        onClick={prevStep}
                                        className="px-6 sm:px-8 py-2 sm:py-3"
                                    />
                                    <PrimaryButton
                                        type="button"
                                        label="Next: Review & Submit"
                                        onClick={nextStep}
                                        className="px-6 sm:px-8 py-2 sm:py-3"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Step 4: Review & Submit */}
                        {currentStep === 4 && (
                            <div className="space-y-4 sm:space-y-6">
                                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Review Your Order</h3>
                                
                                <div className="bg-gray-50 rounded-lg sm:rounded-xl p-4 sm:p-6 space-y-4 sm:space-y-6">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                                        <div>
                                            <h4 className="font-semibold text-gray-700 mb-2">Personal Information</h4>
                                            <div className="space-y-1 text-sm sm:text-base">
                                                <p className="text-gray-600">{formData.fullName}</p>
                                                <p className="text-gray-600">{formData.email}</p>
                                                <p className="text-gray-600">{formData.phone}</p>
                                                <p className="text-gray-600">{formData.address}</p>
                                                <p className="text-gray-600">{formData.city}, {formData.state} {formData.zipCode}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-700 mb-2">Vehicle Details</h4>
                                            <div className="space-y-1 text-sm sm:text-base">
                                                <p className="text-gray-600">{formData.carModel}</p>
                                                <p className="text-gray-600">Financing: {formData.financing.replace('-', ' ')}</p>
                                                <p className="text-gray-600">Trade-in: {formData.tradeIn}</p>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {formData.testDrive === 'yes' && (
                                        <div>
                                            <h4 className="font-semibold text-gray-700 mb-2">Test Drive</h4>
                                            <p className="text-gray-600">Scheduled: {formData.preferredDate || 'Date to be determined'}</p>
                                        </div>
                                    )}
                                    
                                    {formData.message && (
                                        <div>
                                            <h4 className="font-semibold text-gray-700 mb-2">Additional Notes</h4>
                                            <p className="text-gray-600">{formData.message}</p>
                                        </div>
                                    )}
                                </div>

                                <div className="flex justify-between pt-4">
                                    <PrimaryButton
                                        type="button"
                                        label="Back"
                                        onClick={prevStep}
                                        className="px-6 sm:px-8 py-2 sm:py-3"
                                    />
                                    <PrimaryButton
                                        type="submit"
                                        label={isSubmitting ? "Processing..." : "Submit Order"}
                                        disabled={isSubmitting}
                                        className="px-8 sm:px-12 py-2 sm:py-3"
                                    />
                                </div>
                            </div>
                        )}
                    </form>
                </div>

                {/* Support Info */}
                <div className="text-center mt-6 sm:mt-8 text-gray-600">
                    <p className="text-sm sm:text-base">Need immediate assistance? Call us at <strong>(555) 123-4567</strong></p>
                    <p className="text-xs sm:text-sm mt-1 sm:mt-2">Our sales team is available Monday-Saturday, 9AM-8PM</p>
                </div>
            </div>
        </div>
    );
};

export default OrderPage;