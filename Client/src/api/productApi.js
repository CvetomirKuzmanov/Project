import { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../hooks/useAuth";

const BASE_URL = 'http://localhost:3030/data/products';

export const useProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        axios.get(BASE_URL)
            .then(response => {
                setProducts(response.data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.response?.data || 'Failed to fetch products');
                setLoading(false);
            });
    }, []);

    return { products, loading, error };
};

export const useProduct = (productId) => {
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!productId) return;
        
        setLoading(true);
        axios.get(`${BASE_URL}/${productId}`)
            .then(response => {
                setProduct(response.data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.response?.data || 'Failed to fetch product');
                setLoading(false);
            });
    }, [productId]);

    return { product, loading, error };
};

export const useLatestProducts = () => {
    const [latestProducts, setLatestProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        const searchParams = new URLSearchParams({
            sortBy: '_createdOn desc',
            pageSize: 3
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