// state management
import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

const useAutoInsuranceStore = create<useAutoInsuranceState>()(
  devtools(
    persist(
      (set) => ({
        // Vehecile form state
        vehicleForm: {
          v1Year: "",
          v1Make: "",
          v1Model: "",
          v1Use: "",
          v1Miles: "",
          v1Ownership: "",
          v1Coverage: "",
          v1CollisionDeductible: "",
          v1ComprehensiveDeductible: "",
          secondVehicle: "",
          v2Year: "",
          v2Make: "",
          v2Model: "",
          v2Use: "",
          v2Miles: "",
          v2Ownership: "",
          v2Coverage: "",
          v2CollisionDeductible: "",
          v2ComprehensiveDeductible: "",
        },
        setVehicleForm: (data: VehicleFormData) => set({ vehicleForm: data }),

        // Driver form state
        driverForm: {
          d1FirstName: "",
          d1LastName: "",
          d1DobDate: "",
          d1Gender: "",
          d1MaritalStatus: "",
          d1EducationLevel: "",
          d1Occupation: "",
          d1CreditScore: "",
          d1LicenseStatus: "",
          d1SR22Cert: "",
          d1Last3YAccidents: [
            {
              hasIncident: "",
              type: "",
              incidentDate: "",
              details: "",
              setNewIncident: "",
            },
          ],
          d2FirstName: "",
          d2LastName: "",
          d2DobDate: "",
          d2Gender: "",
          d2MaritalStatus: "",
          d2EducationLevel: "",
          d2Occupation: "",
          d2CreditScore: "",
          d2LicenseStatus: "",
          d2SR22Cert: "",
          d2Last3YAccidents: [
            {
              hasIncident: "",
              type: "",
              incidentDate: "",
              details: "",
              setNewIncident: "",
            },
          ],
          setNewIncident: "",
          secondDriver: "",
        },
        setDriverForm: (data: DriversFormData) => set({ driverForm: data }),

        // Final Detail form state
        finalDetailsForm: {
          currentlyCarInsured: "",
          insuredCompany: "",
          coverageNeed: "",
          militaryService: "",
          homeOwnership: "",
          homeType: "",
          street: "",
          city: "",
          state: "",
          unit: "",
          zip: "",
        },
        setFinalDetailsForm: (data: FinalDetailsFormData) =>
          set({ finalDetailsForm: data }),

        // Reset all form states
        resetAutoForm: () =>
          set({
            vehicleForm: {
              v1Year: "",
              v1Make: "",
              v1Model: "",
              v1Use: "",
              v1Miles: "",
              v1Ownership: "",
              v1Coverage: "",
              v1CollisionDeductible: "",
              v1ComprehensiveDeductible: "",
              secondVehicle: "",
              v2Year: "",
              v2Make: "",
              v2Model: "",
              v2Use: "",
              v2Miles: "",
              v2Ownership: "",
              v2Coverage: "",
              v2CollisionDeductible: "",
              v2ComprehensiveDeductible: "",
            },
            driverForm: {
              d1FirstName: "",
              d1LastName: "",
              d1DobDate: "",
              d1Gender: "",
              d1MaritalStatus: "",
              d1EducationLevel: "",
              d1Occupation: "",
              d1CreditScore: "",
              d1LicenseStatus: "",
              d1SR22Cert: "",
              d1Last3YAccidents: [
                {
                  hasIncident: "",
                  type: "",
                  incidentDate: "",
                  details: "",
                  setNewIncident: "",
                },
              ],
              d2FirstName: "",
              d2LastName: "",
              d2DobDate: "",
              d2Gender: "",
              d2MaritalStatus: "",
              d2EducationLevel: "",
              d2Occupation: "",
              d2CreditScore: "",
              d2LicenseStatus: "",
              d2SR22Cert: "",
              d2Last3YAccidents: [
                {
                  hasIncident: "",
                  type: "",
                  incidentDate: "",
                  details: "",
                  setNewIncident: "",
                },
              ],
              secondDriver: "",
            },
            finalDetailsForm: {
              currentlyCarInsured: "",
              insuredCompany: "",
              coverageNeed: "",
              militaryService: "",
              homeOwnership: "",
              homeType: "",
              street: "",
              city: "",
              state: "",
              unit: "",
              zip: "",
            },
          }),
      }),
      { name: "AutoInsuranceForm" }
    )
  )
);

export default useAutoInsuranceStore;
