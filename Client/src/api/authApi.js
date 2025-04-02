import { useEffect } from "react";
import { useContext } from "react";
import { toast } from "react-toastify"; 
import request from "../utils/request"
import { UserContext } from "../contexts/UserContext";

const baseUrl = `${import.meta.env.VITE_APP_SERVER_URL}/users`;

export const useLogin = () => {
  const login = async (email, password) => {
    try {
      const result = await request.post(
        `${baseUrl}/login`,
        { email, password },
      );
      toast.success("Login successful! Welcome back.");
      return result;
    } catch (error) {
      throw error;
    }
  }
  
  return {
    login,
  }
};

export const useRegister = () => {
  const register = async (email, password) => {
    try {
      const result = await request.post(
        `${baseUrl}/register`, 
        { email, password }
      );
      toast.success("Registration successful! Your account has been created."); // Add success toast
      return result;
    } catch (error) {
      // Optional: You can add error toast handling here if needed
      throw error;
    }
  }
  
  return {
    register,
  }
};

export const useLogout = () => {
  const { accessToken, userLogoutHandler } = useContext(UserContext);
  
  useEffect(() => {
    if (!accessToken) {
      return;
    }
    
    const options = {
      headers: {
        'X-Authorization': accessToken,
      }
    };
    
    request.get(`${baseUrl}/logout`, null, options)
      .then(() => {
        toast.success("You have been successfully logged out."); // Add success toast
      })
      .finally(userLogoutHandler);
  }, [accessToken, userLogoutHandler]);
  
  return {
    isLoggedOut: !!accessToken,
  };
};