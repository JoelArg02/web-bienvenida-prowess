import axios from "axios";
import { apiEndpoints } from "@/api/config/ApiConfig"; 

export const registerUser = async (credentials) => {
    try {
        const response = await axios.post(apiEndpoints.authRegister, credentials);
        if (response.data && response.data.Token) {
            localStorage.setItem('token', response.data.Token);
            return response.data;
        }
        return response
    } catch (error) {
        throw new Error("Registration failed.");
    }
};
