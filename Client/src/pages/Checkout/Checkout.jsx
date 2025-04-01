import './Checkout.css';
import { useNavigate } from 'react-router';
import { useStore } from '../../contexts/StoreContext';
import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { toast } from 'react-toastify';
import { useLatestProducts } from '../../api/productApi';
import { useSelector } from 'react-redux';

export default function Checkout() {
    const { getCartData, removeFromCart } = useStore();
    const { isAuthenticated, accessToken } = useAuth();
    const navigate = useNavigate();
    const { latestProducts } = useLatestProducts();
    const cartStoreItems = useSelector(state => state.cart.items);

    const [cartData, setCartData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // Flag to prevent excessive API calls
        let isMounted = true;
        setIsLoading(true);
        
        const fetchCartData = async () => {
            if (!isAuthenticated) {
                toast.error('Please log in to view your cart');
                setIsLoading(false);
                return;
            }
            
            try {
                const data = await getCartData();
                
                if (isMounted && data) {
                    const updatedCartData = data.map(cartItem => {
                        const product = latestProducts.find(p => p._id === cartItem.productId);
                        
                        if (product) {
                            return {
                                ...cartItem,
                                name: product.name,
                                price: product.price,
                                image: product.image,
                            };
                        }
                        return cartItem;
                    });
                    setCartData(updatedCartData);
                }
            } catch (error) {
                if (isMounted) {
                    toast.error('Failed to load cart data');
                    console.error('Error fetching cart data:', error);
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        fetchCartData();
        
        return () => {
            isMounted = false;
        };
    }, [isAuthenticated, latestProducts]); 

    const handleRemoveProduct = async (productId) => {
        try {
            await removeFromCart({ _id: productId, token: accessToken });
            setCartData(prevCartData => prevCartData.filter(item => item._id !== productId));
        } catch (error) {
            toast.error('Failed to remove item from cart');
            console.error('Error removing product:', error);
        }
    };
    
    const calculateSubtotal = () => {
        return cartData.reduce((total, item) => {
            return total + (parseFloat(item.price));
        }, 0).toFixed(2);
    };

    const calculateTax = () => {
        const TAX_RATE = 0.07;
        const subtotal = parseFloat(calculateSubtotal());
        return (subtotal * TAX_RATE).toFixed(2);
    };

    const calculateTotal = () => {
        const subtotal = parseFloat(calculateSubtotal());
        const tax = parseFloat(calculateTax());
        return (subtotal + tax).toFixed(2);
    };

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
                            {isLoading ? (
                                <p>Loading cart items...</p>
                            ) : cartData.length > 0 ? (
                                cartData.map(product => (
                                    <div className="cart-item" key={product._id}>
                                        <div className="cart-item-img">
                                            <img src={product.image} alt={product.name} />
                                        </div>
                                        <div className="cart-item-details">
                                            <a >{product.name}</a>
                                            <div className="cart-item-price">
                                                <span className="price">${product.price}</span>
                                            </div>
                                        </div>
                                        <div className="remove-item-wrapper">
                                            <span
                                                className="remove-item-x"
                                                onClick={() => handleRemoveProduct(product._id)}
                                            >
                                                &times;
                                            </span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>Your cart is empty.</p>
                            )}
                        </div>

                        {/* Price calculations section */}
                        {cartData.length > 0 && (
                            <div className="order-totals">
                                <div className="total-row">
                                    <span>Subtotal:</span>
                                    <span>${calculateSubtotal()}</span>
                                </div>
                                <div className="total-row">
                                    <span>Tax (7%):</span>
                                    <span>${calculateTax()}</span>
                                </div>
                                <div className="total-row total">
                                    <span>Total:</span>
                                    <span>${calculateTotal()}</span>
                                </div>
                            </div>
                        )}
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