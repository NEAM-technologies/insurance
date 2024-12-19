// state management
import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

const useLifeFormStore = create<useLifeInsuranceState>()(
  devtools(
    persist(
      (set) => ({
        // Life form state
        lifeForm: {
          firstName: "",
          lastName: "",
          dobDate: "",
          gender: "",
          email: "",
          phoneNumber: "",
          feet: "",
          inches: "",
          weight: "",
          street: "",
          unit: "",
          city: "",
          state: "",
          zip: "",
          maritalStatus: "",
          tobaccoUse: "",
          healthConditions: [],
          coverageType: "",
          coverageAmount: "",
        },
        setLifeForm: (data: LifeFormData) => set({ lifeForm: data }),

        // Add a reset function to reset the state
        resetLifeForm: () =>
          set({
            lifeForm: {
              firstName: "",
              lastName: "",
              dobDate: "",
              gender: "",
              email: "",
              phoneNumber: "",
              feet: "",
              inches: "",
              weight: "",
              street: "",
              unit: "",
              city: "",
              state: "",
              zip: "",
              maritalStatus: "",
              tobaccoUse: "",
              healthConditions: [],
              coverageType: "",
              coverageAmount: "",
            },
          }),
      }),
      { name: "LifeInsuranceForm" }
    )
  )
);

export default useLifeFormStore;
