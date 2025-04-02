import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useCreateCart } from '../../hooks/useCreateCart';
import useAuth from '../hooks/useAuth';
import './ShippingForm.css';

const ShippingForm = () => {
  const { create, loading, error } = useCreateCart();
  const { userId } = useAuth();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: ''
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id.replace('-', '')]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Create cart data object with shipping info and user ID
      const cartData = {
        userId,
        shippingInfo: {
          ...formData
        },
        items: [] // You can populate this with cart items if needed
      };
      
      const result = await create(cartData);
      toast.success('Shipping information saved successfully!');
      // You might want to redirect the user to the next step in checkout
      // e.g., navigate('/payment');
    } catch (err) {
      toast.error(error || 'Failed to save shipping information');
    }
  };

  return (
    <div className="shipping-info">
      <h2>Shipping Information</h2>
      <form className="shipping-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="first-name">First Name</label>
            <input 
              type="text" 
              id="first-name" 
              value={formData.firstName}
              onChange={handleChange}
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="last-name">Last Name</label>
            <input 
              type="text" 
              id="last-name" 
              value={formData.lastName}
              onChange={handleChange}
              required 
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input 
            type="email" 
            id="email" 
            value={formData.email}
            onChange={handleChange}
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input 
            type="tel" 
            id="phone" 
            value={formData.phone}
            onChange={handleChange}
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Street Address</label>
          <input 
            type="text" 
            id="address" 
            value={formData.address}
            onChange={handleChange}
            required 
          />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="city">City</label>
            <input 
              type="text" 
              id="city" 
              value={formData.city}
              onChange={handleChange}
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="state">State/Province</label>
            <input 
              type="text" 
              id="state" 
              value={formData.state}
              onChange={handleChange}
              required 
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="zip">Zip/Postal Code</label>
            <input 
              type="text" 
              id="zip" 
              value={formData.zip}
              onChange={handleChange}
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="country">Country</label>
            <select 
              id="country" 
              value={formData.country}
              onChange={handleChange}
              required
            >
              <option value="">Select Country</option>
              <option value="us">United States</option>
              <option value="ca">Canada</option>
              <option value="uk">United Kingdom</option>
            </select>
          </div>
        </div>
        <div className="form-group submit-group">
          <button 
            type="submit" 
            className="submit-button" 
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save Shipping Information'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ShippingForm;