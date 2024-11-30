type TabKeys = "viewall" | "savemoney" | "tips" | "guides";

type LoadingState = {
  text: string;
};

type AutoYear = {
  id: number;
  year: string;
};

type VechileData = {
  id: number;
  make: string;
  model: string;
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

type ValidationSchema = {
  [key: number]: string[];
};

type StoreState = {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  formData: LifeFormData;
  setFormData: (data: LifeFormData) => void;
  reset: () => void;
};

type AutoInsuranceQuestion = {
  question: string;
  options: (string | number)[];
  note?: string;
};

interface AutoFormData {
  year: string;
  make: string;
  model: string;
  [key: string]: string | number | undefined; // To handle dynamic question responses
}
