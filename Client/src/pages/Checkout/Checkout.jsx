import './Checkout.css'
import { useNavigate } from 'react-router';
import { useLatestProducts } from '../../api/productApi';
import { useStore } from '../../contexts/StoreContext' 
import React, { useContext } from 'react'
export default function Checkout() {

    const { product_list } = useStore()
    console.log (product_list)
    const navigate = useNavigate()

    return (
        <section className="checkout">
            <div className="container">
                <div className="checkout-header">
                    <div className="checkout-steps">
                        <div className="step active">
                            <div className="step-number">1</div>
                            <div className="step-name">Shopping Cart</div>
                        </div>
                        <div className="step active">
                            <div className="step-number">2</div>
                            <div className="step-name">Checkout Details</div>
                        </div>
                        <div className="step">
                            <div className="step-number">3</div>
                            <div className="step-name">Complete Order</div>
                        </div>
                    </div>
                </div>

                <div className="checkout-container">
                    <div className="checkout-details">
                        <div className="shipping-info">
                            <h2>Shipping Information</h2>
                            <form className="shipping-form">
                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="first-name">First Name</label>
                                        <input type="text" id="first-name" required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="last-name">Last Name</label>
                                        <input type="text" id="last-name" required />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email Address</label>
                                    <input type="email" id="email" required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="phone">Phone Number</label>
                                    <input type="tel" id="phone" required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="address">Street Address</label>
                                    <input type="text" id="address" required />
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="city">City</label>
                                        <input type="text" id="city" required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="state">State/Province</label>
                                        <input type="text" id="state" required />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="zip">Zip/Postal Code</label>
                                        <input type="text" id="zip" required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="country">Country</label>
                                        <select id="country" required>
                                            <option value="">Select Country</option>
                                            <option value="us">United States</option>
                                            <option value="ca">Canada</option>
                                            <option value="uk">United Kingdom</option>
                                        </select>
                                    </div>
                                </div>
                            </form>
                        </div>


                    </div>

                    <div className="order-summary">
                        <h2>Order Summary</h2>
                        <div className="cart-items">
                            {product_list.map(product => (
                                <div className="cart-item" key={product.name}     >
                                    <div className="cart-item-img">
                                        <img src={product.image} alt={product.name} />
                                    </div>
                                    <div className="cart-item-details">
                                        <h4>{product.name}</h4>

                                        <div className="cart-item-price">
                                            <span className="price">${product.price}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="order-totals">
                            <div className="total-row">
                                <span>Subtotal</span>
                                <span>$79.98</span>
                            </div>
                            <div className="total-row">
                                <span>Shipping</span>
                                <span>$5.99</span>
                            </div>
                            <div className="total-row">
                                <span>Tax</span>
                                <span>$8.00</span>
                            </div>
                            <div className="total-row total">
                                <span>Total</span>
                                <span>$93.97</span>
                            </div>
                        </div>

                        <div className="promo-code">
                            <input type="text" placeholder="Promo Code" />
                            <button>Apply</button>
                        </div>

                        <div className="checkout-actions">
                            <a onClick={() => navigate('/catalog')} className="continue-shopping">Continue Shopping</a>
                            <button className="place-order-btn">Place Order</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}