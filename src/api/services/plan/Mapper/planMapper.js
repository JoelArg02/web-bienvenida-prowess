export const mapPlanData = (plan) => {
  return {
      id_plan: plan.id,
      plan_name: plan.name,
      plan_description: plan.description,
      plan_isActive: plan.isactive, 
      plan_image: plan.image,
      monthly_price: parseFloat(plan.monthlyPrice).toFixed(2),
      annual_price: parseFloat(plan.annualPrice).toFixed(2),
      features: plan.features.map(feature => ({
          id: feature.id,
          name: feature.name,
          isAvailable: feature.isAvailable,
          associated_planId: feature.planId 
      }))
  };
};

  
  export const mapPlanList = (plans) => {
    return plans.map(mapPlanData);
  };
  
  
  