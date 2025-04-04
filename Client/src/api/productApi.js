import { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import request from "../utils/request";

const BASE_URL = `${import.meta.env.VITE_APP_SERVER_URL}/data/products`

export const useProducts = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [getProducts, setGetProducts] = useState([]);

    useEffect(() => {

        setLoading(true);

        
        axios.get(`${BASE_URL}`)
            .then(response => {
                setGetProducts(response.data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.response?.data || 'Failed to fetch latest products');
                setLoading(false);
            });
    }, []);
    return { getProducts, loading, error };

};

export const useProduct = (productId) => {
    const [product, setProduct] = useState({});

    useEffect(() => {
            request.get(`${BASE_URL}/${productId}`)
                .then(setProduct);
        }, [productId])
    
        return {
            product,
        };
};

export const useLatestProducts = () => {
    const [latestProducts, setLatestProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        const searchParams = new URLSearchParams({
            sortBy: '_createdOn desc',
            pageSize: 4
        });
        
        axios.get(`${BASE_URL}?${searchParams.toString()}`)
            .then(response => {
                setLatestProducts(response.data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.response?.data || 'Failed to fetch latest products');
                setLoading(false);
            });
    }, []);

    return { latestProducts, loading, error };
};

export const useCreateProduct = () => {
    const { accessToken } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const create = async (productData) => {
        setLoading(true);
        try {
            const response = await axios.post(BASE_URL, productData, {
                headers: { 'X-Authorization': accessToken }
            });
            setLoading(false);
            return response.data;
        } catch (err) {
            setError(err.response?.data || 'Failed to create product');
            setLoading(false);
            throw err;
        }
    };

    return { create, loading, error };
};

export const useEditProduct = () => {
    const { accessToken } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const edit = async (productId, productData) => {
        setLoading(true);
        try {
            const response = await axios.put(`${BASE_URL}/${productId}`, 
                { ...productData, _id: productId },
                { headers: { 'X-Authorization': accessToken } }
            );
            setLoading(false);
            return response.data;
        } catch (err) {
            setError(err.response?.data || 'Failed to edit product');
            setLoading(false);
            throw err;
        }
    };

    return { edit, loading, error };
};

export const useDeleteProduct = () => {
    const { accessToken } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const deleteProduct = async (productId) => {
        setLoading(true);
        try {
            const response = await axios.delete(`${BASE_URL}/${productId}`, {
                headers: { 'X-Authorization': accessToken }
            });
            setLoading(false);
            return response.data;
        } catch (err) {
            setError(err.response?.data || 'Failed to delete product');
            setLoading(false);
            throw err;
        }
    };

    return { deleteProduct, loading, error };
};