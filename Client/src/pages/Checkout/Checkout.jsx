import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useStore } from '../../contexts/StoreContext';
import useAuth from '../../hooks/useAuth';
import { toast } from 'react-toastify';
import { useProducts } from '../../api/productApi';
import './Checkout.css';

// Component imports
import CheckoutSteps from '../../components/CheckoutSteps/CheckoutSteps';
import OrderSummary from '../../components/OrderSummary/OrderSummary';

export default function Checkout() {
    const { getCartData, removeFromCart } = useStore();
    const { isAuthenticated, accessToken } = useAuth();
    const navigate = useNavigate();
    const { getProducts } = useProducts();

    const [cartData, setCartData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
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
                        const product = getProducts.find(p => p._id === cartItem.productId);
                        
                        if (product) {
                            return {
                                ...cartItem,
                                name: product.name,
                                price: product.price,
                                image: product.image,
                                description: product.description
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
    }, [isAuthenticated, getProducts]); 

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

    const orderSummaryProps = {
        cartData,
        isLoading,
        handleRemoveProduct,
        calculateSubtotal,
        calculateTax,
        calculateTotal,
        navigate
    };

    return (
        <section className="checkout">
            <div className="container">

                <div className="checkout-container">
                    <OrderSummary {...orderSummaryProps} />
                </div>
            </div>
        </section>
    );
}