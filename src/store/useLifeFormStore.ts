// state management
import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

const useLifeFormStore = create<useLifeInsuranceState>()(
  devtools(
    persist(
      (set) => ({
        currentStep: 1,
        setCurrentStep: (step: number) => set({ currentStep: step }),
        formData: {
          firstName: "",
          lastName: "",
          dob: { month: "", day: "", year: "" },
          gender: "",
          email: "",
          phoneNumber: "",
          height: { feet: "", inches: "" },
          weight: "",
          address: {
            street: "",
            unit: "",
            city: "",
            state: "",
            zip: "",
          },
          maritalStatus: "",
          tobaccoUse: "",
          healthConditions: [],
          coverageType: "",
          coverageAmount: "",
        },
        setFormData: (data: LifeFormData) => set({ formData: data }),

        // Add a reset function to reset the state
        resetLifeForm: () =>
          set({
            currentStep: 1,
            formData: {
              firstName: "",
              lastName: "",
              dob: { month: "", day: "", year: "" },
              gender: "",
              email: "",
              phoneNumber: "",
              height: { feet: "", inches: "" },
              weight: "",
              address: {
                street: "",
                unit: "",
                city: "",
                state: "",
                zip: "",
              },
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
