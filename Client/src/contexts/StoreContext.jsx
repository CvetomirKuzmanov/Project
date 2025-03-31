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

    const handleAddToCart = async (name) => {
        console.log('Adding to cart:', { name, isAuthenticated, accessToken });
        if (!isAuthenticated) {
            toast.error('Please login to add items to cart');
            return;
        }
        dispatch(addToCart({ name, token: accessToken }));
        toast.success('Added to cart!');
    };

    const handleRemoveFromCart = async (name) => {
        console.log('Removing from cart:', { name });
        dispatch(removeFromCart({ name, token: accessToken }));
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
        if(!isAuthenticated) {
            toast.error('You need to be logged in to rate products');
            return;
        }
        dispatch(updateRating({ name, rating: newValue, token: accessToken }));
    };

    useEffect(() => {
        dispatch(fetchProductList());
        if(isAuthenticated){
            dispatch(loadCartData(accessToken));
        }
    }, [dispatch, isAuthenticated, accessToken]);

    return {
        product_list: productList,
        cartItems,
        addToCart: handleAddToCart,
        removeFromCart: handleRemoveFromCart,
        getTotalCartAmount,
        loading: cartLoading || productLoading,
        fetchAverageRating: (name) => dispatch(fetchAverageRating(name)),
        handleRatingChange,
        ratings
    };
};
