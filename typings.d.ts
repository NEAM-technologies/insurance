type TabKeys = "viewall" | "savemoney" | "tips" | "guides";

type LoadingState = {
  text: string;
};

type ValidationSchema = {
  [key: number]: string[];
};

type LifeFormData = {
  firstName: string;
  lastName: string;
  dob: { month: string; day: string; year: string };
  gender: string;
  email: string;
  phoneNumber: string;
  height: { feet: string; inches: string };
  weight: string;
  address: {
    street: string;
    unit: string;
    city: string;
    state: string;
    zip: string;
  };
  maritalStatus: string;
  tobaccoUse: string;
  healthConditions: string[];
  coverageType: string;
  coverageAmount: string;
};

type useLifeInsuranceState = {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  formData: LifeFormData;
  setFormData: (data: LifeFormData) => void;
  resetLifeForm: () => void;
};

type HomeFormData = {
  homeType: string;
  street: string;
  city: string;
  state: string;
  unit: string;
  zip: string;
  yearBuilt: string;
  squareFootage: string;
  stories: string;
  bedrooms: string;
  bathrooms: string;
  purchaseYear: string;
};

type OwnerFormData = {
  firstName: string;
  lastName: string;
  dobDate: string;
  gender: string;
  maritalStatus: string;
  educationLevel: string;
  occupation: string;
  creditScore: string;
};

type CoverageFormData = {
  currentlyInsured: string;
  insuredCompany: string;
  yearsWithCompany: string;
  policyExpires: string;
  costToRebuildHome: string;
};

type useHomeInsuranceState = {
  homeForm: HomeFormData;
  setHomeForm: (data: HomeFormData) => void;
  ownerForm: OwnerFormData;
  setOwnerForm: (data: OwnerFormData) => void;
  coverageForm: CoverageFormData;
  setCoverageForm: (data: CoverageFormData) => void;
  resetHomeForm: () => void;
};

type VehicleData = {
  make: string;
  model: string;
};

type AutoYear = {
  id: number;
  year: string;
  vehicles: VehicleData[];
};

type VehicleFormData = {
  v1Year: string;
  v1Make: string;
  v1Model: string;
  v1Use: string;
  v1Miles: string;
  v1Ownership: string;
  v1Coverage: string;
  v1CollisionDeductible: string;
  v1ComprehensiveDeductible: string;
  secondVehicle: string;
  v2Year: string;
  v2Make: string;
  v2Model: string;
  v2Use: string;
  v2Miles: string;
  v2Ownership: string;
  v2Coverage: string;
  v2CollisionDeductible: string;
  v2ComprehensiveDeductible: string;
};

type Incident = {
  hasIncident: string;
  type: string;
  incidentDate: string;
  details: string;
  setNewIncident: string;
};

type DriversFormData = {
  d1FirstName: string;
  d1LastName: string;
  d1DobDate: string;
  d1Gender: string;
  d1MaritalStatus: string;
  d1EducationLevel: string;
  d1Occupation: string;
  d1CreditScore: string;
  d1LicenseStatus: string;
  d1SR22Cert: string;
  d1Last3YAccidents: Incident[];
  d2FirstName: string;
  d2LastName: string;
  d2DobDate: string;
  d2Gender: string;
  d2MaritalStatus: string;
  d2EducationLevel: string;
  d2Occupation: string;
  d2CreditScore: string;
  d2LicenseStatus: string;
  d2SR22Cert: string;
  d2Last3YAccidents: Incident[];
  secondDriver: string;
};

type FinalDetailsFormData = {
  currentlyCarInsured: string;
  insuredCompany: string;
  coverageNeed: string;
  militaryService: string;
  homeOwnership: string;
  homeType: string;
  street: string;
  city: string;
  state: string;
  unit: string;
  zip: string;
};

type useAutoInsuranceState = {
  vehicleForm: VehicleFormData;
  setVehicleForm: (data: VehicleFormData) => void;
  driverForm: DriversFormData;
  setDriverForm: (data: DriversFormData) => void;
  finalDetailsForm: FinalDetailsFormData;
  setFinalDetailsForm: (data: FinalDetailsFormData) => void;
  resetAutoForm: () => void;
};
