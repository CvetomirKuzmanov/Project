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
        console.log('Adding to cart:', { _id, isAuthenticated, accessToken });
        if (!isAuthenticated) {
            toast.error('Please login to add items to cart');
            return;
        }

        const product = productList.find(product => product._id === _id);
        if (!product) {
            toast.error('Product not found');
            return;
        }
        try {
            dispatch(addToCart({ _id: product._id, token: accessToken }));
            toast.success('Added to cart!');
        } catch (err) {
            console.log(err.message);

        }
    };
    const handleRemoveFromCart = async (_id) => {
        console.log('Removing from cart:', { _id });
        dispatch(removeFromCart({ _id: product._id, token: accessToken }));
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
                console.log('Raw cart data:', resultAction.payload);
    
                const enrichedCart = resultAction.payload.map(cartItem => {
                    const product = productList.find(p => p._id === cartItem.productId);
                    return product
                        ? { ...cartItem, ...product }  
                        : cartItem;  
                });
    
                console.log('Enriched cart data:', enrichedCart);
                return enrichedCart;
            } else {
                toast.error('Failed to load cart data');
                return null;
            }
        } catch (err) {
            console.error('Error loading cart data:', err);
            return null;
        }
    };
    
    useEffect(() => {
        dispatch(fetchProductList());
        console.log ("dispatch fetchproductlist" )
        console.log(dispatch(fetchProductList()));
        
        if (isAuthenticated) {
            dispatch(loadCartData(accessToken));
            console.log ("dispatch loadCart data" + dispatch(loadCartData(accessToken)));
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
