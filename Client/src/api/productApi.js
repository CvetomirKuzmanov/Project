import { useEffect, useState } from "react";
import request from "../utils/request";
import useAuth from "../hooks/useAuth";
import { v4 as uuidv4 } from 'uuid'; // Import UUID library for generating unique IDs

const baseUrl = `${import.meta.env.VITE_APP_SERVER_URL}/data/products`;

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    request.get(baseUrl)
      .then(setProducts);
  }, []);
  
  return { products };
};

export const useProduct = (productId) => {
  const [product, setProduct] = useState({});
  
  useEffect(() => {
    request.get(`${baseUrl}/${productId}`)
      .then(setProduct);
  }, [productId]);
  
  return {
    product,
  };
};

export const useLatestProducts = () => {
  const [latestProducts, setLatestProducts] = useState([]);
  
  useEffect(() => {
    const searchParams = new URLSearchParams({
      sortBy: '_createdOn desc',
      pageSize: 3,
      select: '_id,image,name,price',
    });
    
    request.get(`${baseUrl}?${searchParams.toString()}`)
      .then(setLatestProducts);
  }, []);
  
  return { latestProducts };
};

export const useCreateProduct = () => {
  const { request } = useAuth();
  
  const create = (productData) => {
    // Generate a unique ID for the new product
    const productWithId = {
      ...productData,
      _id: uuidv4(), // Generate unique ID
      _createdOn: Date.now() // Add creation timestamp
    };
    
    return request.post(baseUrl, productWithId);
  };
  
  return {
    create,
  };
};

export const useEditProduct = () => {
  const { request } = useAuth();
  
  const edit = (productId, productData) =>
    request.put(`${baseUrl}/${productId}`, { 
      ...productData, 
      _id: productId,
      _updatedOn: Date.now() // Add update timestamp
    });
  
  return {
    edit,
  };
};

export const useDeleteProduct = () => {
  const { request } = useAuth();
  
  const deleteProduct = (productId) =>
    request.delete(`${baseUrl}/${productId}`);
  
  return {
    deleteProduct,
  };
};