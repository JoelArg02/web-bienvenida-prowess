 import { addPlans, updatePlan} from "@/api/services/plan"


export const handleAddPlan = async (plan, setPlans, setShowModal) => {
  try {
    await addPlans(plan);
    await fetchPlans(setPlans);
    setShowModal(false);
  } catch (error) {
    console.error("Error adding plan:", error);
  }
};


export const handleUpdatePlan = async (plan, setShowEditModal, setPlans) => {
  try {
    await updatePlan(plan);
    setShowEditModal(false);
    await fetchPlans(setPlans);
  } catch (error) {
    console.error("Error updating plan:", error);
  }
};
