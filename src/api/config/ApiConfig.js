const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const apiEndpoints = {
  createPet: `${API_URL}api/Pet/addPet`,
  createPlan: `${API_URL}api/Plan/addPlans`,
  updatePlan: `${API_URL}api/Plan/updatePlan`,
  togglePlanActivation: `${API_URL}api/Plan/togglePlanActivation`,
  getPlans: `${API_URL}api/Plan/GetPlans`,
  authLogin: `${API_URL}api/User/login`,
  authRegister: `${API_URL}api/User/registerUser`,
};

export const createAPIEndpoint = (endpoint) => `${API_URL}${endpoint}`;