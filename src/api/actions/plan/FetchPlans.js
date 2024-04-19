import { getPlans } from "@/api/services/plan";

const fetchPlans = async (setPlans) => {
    try {
      const fetchedPlans = await getPlans();
      setPlans(fetchedPlans);
    } catch (error) {
      throw new Error("Error al obtener planes");
    }
  };

  export default fetchPlans;