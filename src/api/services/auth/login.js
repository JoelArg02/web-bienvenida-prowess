import axios from "axios";
import { apiEndpoints } from "@/api/config/ApiConfig"; 

export const login = async (email, password) => {
  try {
    const response = await axios.post(apiEndpoints.authLogin, { email, password });
    const { Token } = response.data;
    return Token;
  } catch (error) {
    console.error("Error during login", error);
    throw error; 
  }
};
