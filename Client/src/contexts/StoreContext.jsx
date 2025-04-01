import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import { fetchProductList, fetchAverageRating, updateRating } from '../store/slices/productSlice';
import { addToCart, removeFromCart, loadCartData } from '../store/slices/cartSlice';
import useAuth from '../hooks/useAuth';

export const useStore = () => {
    const dispatch = useDispatch();
    const { items: cartItems, loading: cartLoading } = useSelector(state => state.cart);
    const { items: productList, ratings, loading: productLoading } = useSelector(state => state.products);
    const { isAuthenticated, accessToken } = useAuth();

    const handleAddToCart = async (_id) => {
        if (!isAuthenticated) {
            toast.error('Please login to add items to cart');
            return;
        }

        const product = productList.find(product => product._id === _id);
        if (!product) {
            toast.error('Product not found');
            return;
        }
            dispatch(addToCart({ _id: product._id, token: accessToken }));
            toast.success('Added to cart!');
    };
    const handleRemoveFromCart = async (props) => {
        if (!isAuthenticated) {
            toast.error('Please login to remove items from cart');
            return;
        }
        
        if (!props._id) {
            console.error("Product ID is missing!");
            return;
        }
        
        const productId = props._id;
        
        try {
            const resultAction = await dispatch(removeFromCart({ 
                _id: productId, 
                token: accessToken 
            }));
            
            if (removeFromCart.fulfilled.match(resultAction)) {
                toast.success('Removed from cart!');
            } else {
                toast.error('Failed to remove from cart');
            }
        } catch (err) {
            console.error('Error removing from cart:', err);
            toast.error('Error removing product from cart');
        }
    };
    

    const getTotalCartAmount = () => {
        let total = 0;
        for (let item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = productList.find((product) => product.name === item);
                total += itemInfo.price * cartItems[item];
            }
        }
        return total.toFixed(2);
    };

    const handleRatingChange = async (name, newValue) => {
        if (!isAuthenticated) {
            toast.error('You need to be logged in to rate products');
            return;
        }
        dispatch(updateRating({ name, rating: newValue, token: accessToken }));
    };
    const getCartData = async () => {
        if (!isAuthenticated) {
            toast.error('Please login to view your cart');
            return null;
        }
    
        try {
            const resultAction = await dispatch(loadCartData(accessToken));
            if (loadCartData.fulfilled.match(resultAction)) {
                return resultAction.payload;
            } else {
                toast.error('No products in cart!');
                return null;
            }
        } catch (err) {
            console.error('Error loading cart data:', err);
            return null;
        }
    };
    
    useEffect(() => {
        dispatch(fetchProductList());
    
        if (isAuthenticated) {
            dispatch(loadCartData(accessToken));
        }
    }, [dispatch, isAuthenticated, accessToken]);
    
    
    useEffect(() => {
        dispatch(fetchProductList());
 
        
        if (isAuthenticated) {
            dispatch(loadCartData(accessToken));
        }
    }, [dispatch, isAuthenticated, accessToken]);

    return {
        product_list: productList,
        cart_list: cartItems,
        addToCart: handleAddToCart,
        removeFromCart: handleRemoveFromCart,
        getTotalCartAmount,
        loading: cartLoading || productLoading,
        fetchAverageRating: (name) => dispatch(fetchAverageRating(name)),
        handleRatingChange,
        ratings,
        getCartData,
    };
};
