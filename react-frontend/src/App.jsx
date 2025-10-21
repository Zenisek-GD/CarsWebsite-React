import React, { useState } from 'react';
import LandingPage from './pages/LandingPage';
import CarListing from './pages/carListing';
import OrderPage from './pages/orderPage';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const handleExplore = () => {
    setCurrentPage('listing');
  };

  const handleOrder = () => {
    setCurrentPage('order');
  };

  const handleHome = () => {
    setCurrentPage('home');
  };

  // Render the current page based on state
  const renderPage = () => {
    switch (currentPage) {
      case 'listing':
        return <CarListing />;
      case 'order':
        return <OrderPage />;
      case 'home':
      default:
        return <LandingPage />;
    }
  };

  return (
    <div className="App">
      <Navbar 
        onExplore={handleExplore} 
        onOrder={handleOrder} 
        onHome={handleHome}
        currentPage={currentPage}
      />
      {renderPage()}
    </div>
  );
}

export default App;