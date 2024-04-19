import axios from "axios";
import { apiEndpoints } from "@/api/config/ApiConfig";
import { mapPlanList } from "./Mapper/planMapper";  

const getPlans = async () => {
  try {
    const response = await axios.get(apiEndpoints.getPlans);
    const mappedPlans = mapPlanList(response.data);
    return mappedPlans;
  } catch (error) {
    throw new Error("Error al obtener planes");
  }
};

export default getPlans;