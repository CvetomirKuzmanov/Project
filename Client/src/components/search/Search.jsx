import React, { useState } from 'react';
import './Search.css';

export default function Search({ onSearch, onPriceFilter, onClearFilters }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [priceSlider, setPriceSlider] = useState(100);

  const handleSearchInput = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handlePriceSliderChange = (e) => {
    const value = parseInt(e.target.value);
    setPriceSlider(value);
    setMaxPrice(value);
  };

  const handleMinPriceChange = (e) => {
    setMinPrice(e.target.value);
  };

  const handleMaxPriceChange = (e) => {
    setMaxPrice(e.target.value);
  };

  const applyFilters = () => {
    onPriceFilter({
      min: minPrice === '' ? 0 : parseInt(minPrice),
      max: maxPrice === '' ? 200 : parseInt(maxPrice)
    });
  };

  const clearFilters = () => {
    setSearchTerm('');
    setMinPrice('');
    setMaxPrice('');
    setPriceSlider(100);
    onClearFilters();
  };

  return (
    <div className="catalog-sidebar">
      <div className="search-box">
        <h3>Search Products</h3>
        <div className="search-input-container">
          <input 
            type="text" 
            placeholder="Search..." 
            className="search-input" 
            value={searchTerm}
            onChange={handleSearchInput}
            onKeyPress={handleKeyPress}
          />
          <button className="search-btn" onClick={handleSearch}>🔍</button>
        </div>
      </div>
      <div className="filter-section">
        <h3>Price Range</h3>
        <div className="price-range">
          <input 
            type="range" 
            min="0" 
            max="200" 
            value={priceSlider} 
            className="price-slider"
            onChange={handlePriceSliderChange}
          />
          <div className="price-inputs">
            <input 
              type="number" 
              placeholder="Min" 
              className="price-input" 
              min="0"
              value={minPrice}
              onChange={handleMinPriceChange}
            />
            <span>-</span>
            <input 
              type="number" 
              placeholder="Max" 
              className="price-input" 
              min="0"
              value={maxPrice}
              onChange={handleMaxPriceChange}
            />
          </div>
        </div>
      </div>
      <button className="apply-filter-btn" onClick={applyFilters}>Apply Filters</button>
      <button className="clear-filter-btn" onClick={clearFilters}>Clear All</button>
    </div>
  );
}