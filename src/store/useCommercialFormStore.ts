// state management
import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

const useCommercialFormStore = create<useCommercialInsuranceState>()(
  devtools(
    persist(
      (set) => ({
        // Life form state
        commercialForm: {
          firstName: "",
          lastName: "",
          email: "",
          phoneNumber: "",
          companyName: "",
          legalEntity: "",
          briefDescription: "",
          street: "",
          unit: "",
          city: "",
          state: "",
          zip: "",
          yearsInBusiness: "",
          numOfPartners: "",
          numOfFullEmployees: "",
          numOfPartEmployees: "",
          annualRevenue: "",
          annualPayroll: "",
          coverageType: [],
        },
        setCommercialForm: (data: CommercialFormData) =>
          set({ commercialForm: data }),

        // Add a reset function to reset the state
        resetCommercialForm: () =>
          set({
            commercialForm: {
              firstName: "",
              lastName: "",
              email: "",
              phoneNumber: "",
              companyName: "",
              legalEntity: "",
              briefDescription: "",
              street: "",
              unit: "",
              city: "",
              state: "",
              zip: "",
              yearsInBusiness: "",
              numOfPartners: "",
              numOfFullEmployees: "",
              numOfPartEmployees: "",
              annualRevenue: "",
              annualPayroll: "",
              coverageType: [],
            },
          }),
      }),
      { name: "CommercialInsuranceForm" }
    )
  )
);

export default useCommercialFormStore;
