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
  dobMonth: string;
  dobDay: string;
  dobYear: string;
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

type useHomeInsuranceState ={
  homeForm: HomeFormData;
  setHomeForm: (data: HomeFormData) => void;
  ownerForm: OwnerFormData;
  setOwnerForm: (data: OwnerFormData) => void;
  coverageForm: CoverageFormData;
  setCoverageForm: (data: CoverageFormData) => void;
  resetHomeForm: () => void;
}

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
  year: string;
  make: string;
  model: string;
  vehicleUse: string;
  dailyMiles: string;
  vehicleOwnership: string;
  coverageType: string;
  collisionDeductible: string;
  comprehensiveDeductible: string;
  secondVehicle: string;
};

type useAutoInsuranceState ={
  vehicleForm: VehicleFormData;
  setVehicleForm: (data: VehicleFormData) => void;
  driverForm: OwnerFormData;
  setDriverForm: (data: OwnerFormData) => void;
  finalDetailsForm: CoverageFormData;
  setFinalDetailsForm: (data: CoverageFormData) => void;
  resetAutoForm: () => void;
}


