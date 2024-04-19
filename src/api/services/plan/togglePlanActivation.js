import axios from "axios";
import { apiEndpoints } from "@/api/config/ApiConfig";
import { mapPlanData } from "./Mapper/planMapper";  

const togglePlanActivation = async (planActivationRequest, token) => {
  try {
    const response = await axios.post(
      apiEndpoints.togglePlanActivation,
      planActivationRequest,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default togglePlanActivation;