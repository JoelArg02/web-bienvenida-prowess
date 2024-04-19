import { fetchPlans } from "@/api/actions/plan";
import { togglePlanActivation } from "@/api/services/plan";

const handleToggleActivation = async (
    id_plans,
    isActive,
    token,
    setPlans
  ) => {
    try {
      await togglePlanActivation({ id_plans, isActive }, token);
      await fetchPlans(setPlans);
    } catch (error) {
      console.error("Error toggling plan activation:", error);
    }
  };

export default handleToggleActivation;