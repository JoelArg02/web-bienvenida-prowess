import axios from "axios";
import { apiEndpoints } from "@/api/config/ApiConfig";
import { mapPlanData } from "./Mapper/planMapper";  

export const addPlans = async (plan) => {
    try {

        const mappedPlan = mapPlanData(plan);
        const response = await axios.post(apiEndpoints.createPlan, mappedPlan);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export default addPlans;
