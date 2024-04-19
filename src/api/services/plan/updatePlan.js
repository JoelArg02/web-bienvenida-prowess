import axios from "axios";
import { apiEndpoints } from "@/api/config/ApiConfig";
import { mapPlanList } from "./Mapper/planMapper";  

export const updatePlan = async (planUpdateRequest) => {
    try {
      const response = await axios.put(
        apiEndpoints.updatePlan,
        planUpdateRequest
      );
      const updatedPlan = mapPlanData(response.data);
      return updatedPlan;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
export default updatePlan;