import React, { createContext, useContext, useReducer } from "react";
import * as planService from "./services/planService";

const PlanContext = createContext();

function planReducer(state, action) {
  switch (action.type) {
    case "FETCH_PLANS_SUCCESS":
      return { ...state, plans: action.payload, loading: false };
    case "ERROR":
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
}

export function PlanProvider({ children }) {
  const [state, dispatch] = useReducer(planReducer, {
    plans: [],
    loading: false,
    error: null,
  });

  const fetchPlans = async () => {
    try {
      const plans = await planService.fetchPlans();
      dispatch({ type: "FETCH_PLANS_SUCCESS", payload: plans });
    } catch (error) {
      dispatch({ type: "ERROR", payload: error });
    }
  };

  const value = { ...state, fetchPlans };

  return <PlanContext.Provider value={value}>{children}</PlanContext.Provider>;
}

export const usePlans = () => useContext(PlanContext);
