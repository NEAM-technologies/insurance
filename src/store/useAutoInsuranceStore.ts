// state management
import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

const useAutoInsuranceStore = create<useAutoInsuranceState>()(
  devtools(
    persist(
      (set) => ({
        // Vehecile form state
        vehicleForm: {
          year: "",
          make: "",
          model: "",
          vehicleUse: "",
          dailyMiles: "",
          vehicleOwnership: "",
          coverageType: "",
          collisionDeductible: "",
          comprehensiveDeductible: "",
          secondVehicle: "",
        },
        setVehicleForm: (data: VehicleFormData) => set({ vehicleForm: data }),

        // Driver form state
        driverForm: {
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
        setDriverForm: (data: OwnerFormData) => set({ driverForm: data }),

        // Final Detail form state
        finalDetailsForm: {
          currentlyInsured: "",
          insuredCompany: "",
          yearsWithCompany: "",
          policyExpires: "",
          costToRebuildHome: "",
        },
        setFinalDetailsForm: (data: CoverageFormData) => set({ finalDetailsForm: data }),

        // Reset all form states
        resetAutoForm: () =>
          set({
            vehicleForm: {
              year: "",
              make: "",
              model: "",
              vehicleUse: "",
              dailyMiles: "",
              vehicleOwnership: "",
              coverageType: "",
              collisionDeductible: "",
              comprehensiveDeductible: "",
              secondVehicle: "",
            },
            driverForm: {
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
            finalDetailsForm: {
              currentlyInsured: "",
              insuredCompany: "",
              yearsWithCompany: "",
              policyExpires: "",
              costToRebuildHome: "",
            },
          }),
      }),
      { name: "AutoInsuranceForm" }
    )
  )
);

export default useAutoInsuranceStore;
