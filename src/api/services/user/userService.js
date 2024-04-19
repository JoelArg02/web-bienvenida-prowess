import axios from "axios";



export const getRoles = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}api/Plan/GetPlans`
    );
    const mappedPlans = mapPlanList(response.data);
    return mappedPlans;
  } catch (error) {
    console.error("Error fetching plans:", error);
    throw error;
  }
};

