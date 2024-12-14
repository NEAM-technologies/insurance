// state management
import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

const useHomeInsuranceStore = create<useHomeInsuranceState>()(
  devtools(
    persist(
      (set) => ({
        // Home form state
        homeForm: {
          homeType: "",
          street: "",
          city: "",
          state: "",
          unit: "",
          zip: "",
          yearBuilt: "",
          squareFootage: "",
          stories: "",
          bedrooms: "",
          bathrooms: "",
          purchaseYear: "",
        },
        setHomeForm: (data: HomeFormData) => set({ homeForm: data }),

        // Owner form state
        ownerForm: {
          firstName: "",
          lastName: "",
          dobMonth: "",
          dobDay: "",
          dobYear: "",
          gender: "",
          maritalStatus: "",
          educationLevel: "",
          occupation: "",
          creditScore: "",
        },
        setOwnerForm: (data: OwnerFormData) => set({ ownerForm: data }),

        // Coverage form state
        coverageForm: {
          currentlyInsured: "",
          insuredCompany: "",
          yearsWithCompany: "",
          policyExpires: "",
          costToRebuildHome: "",
        },
        setCoverageForm: (data: CoverageFormData) => set({ coverageForm: data }),

        // Reset all form states
        resetHomeForm: () =>
          set({
            homeForm: {
              homeType: "",
              street: "",
              city: "",
              state: "",
              unit: "",
              zip: "",
              yearBuilt: "",
              squareFootage: "",
              stories: "",
              bedrooms: "",
              bathrooms: "",
              purchaseYear: "",
            },
            ownerForm: {
              firstName: "",
              lastName: "",
              dobMonth: "",
              dobDay: "",
              dobYear: "",
              gender: "",
              maritalStatus: "",
              educationLevel: "",
              occupation: "",
              creditScore: "",
            },
            coverageForm: {
              currentlyInsured: "",
              insuredCompany: "",
              yearsWithCompany: "",
              policyExpires: "",
              costToRebuildHome: "",
            },
          }),
      }),
      { name: "homeInsuranceForm" }
    )
  )
);

export default useHomeInsuranceStore;
