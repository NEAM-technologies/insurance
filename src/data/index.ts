export const projects = [
  {
    title: "Auto",
    lottieUrl:
      "https://lottie.host/f678cace-d7cd-432e-993c-604366bd2ab7/wxmJGyQ24V.lottie",
    link: "/autoInsurance",
  },
  {
    title: "Home",
    lottieUrl:
      "https://lottie.host/e01068ed-3f7e-4924-a818-c16e7ddd507c/akYIFiUVuA.lottie",
    link: "/homeInsurance",
  },
  {
    title: "Life",
    lottieUrl:
      "https://lottie.host/5e792da9-6285-4bf2-a3c8-43d66b866341/weviWvRg9f.lottie",
    link: "/lifeInsurance",
  },
  {
    title: "Commercial",
    lottieUrl:
      "https://lottie.host/e8dcd266-d7c2-43e3-b04b-3d1d6c41d60d/PBXyBPSfut.lottie",
    link: "/",
  },
  {
    title: "Renters",
    lottieUrl:
      "https://lottie.host/b17bf1dd-736b-41a2-8de9-cb16c3763e94/o5IF3v51RU.lottie",
    link: "/",
  },
  {
    title: "Motorcycle",
    lottieUrl:
      "https://lottie.host/8a63fa75-005e-47a6-9e44-e4f4e177018c/HVeUV1L85Y.lottie",
    link: "/",
  },
  {
    title: "Recreational",
    lottieUrl:
      "https://lottie.host/bbaf83f2-9ccf-4c7d-a9a9-69f9f923ced2/pUVHJGOAxV.lottie",
    link: "/",
  },
  {
    title: "Umbrella",
    lottieUrl:
      "https://lottie.host/abbd9746-387c-412d-bf17-bef15bc503bc/wdiKcicUfy.lottie",
    link: "/",
  },
];

export const insuranceOptions = [
  {
    id: 1,
    title: "Answer Questions",
    description:
      "Tell us about your needs, so we can find the best insurance options for you.",
  },
  {
    id: 2,
    title: "Compare Quotes",
    description:
      "Browse offers from over 200 providers, tailored area and preferences.",
  },
  {
    id: 3,
    title: "Choose Coverage",
    description:
      "Pick the best coverage for you, all in just a few minutes. It's 100% free.",
  },
];

export const reviews = [
  {
    id: 1,
    name: "Sookanya",
    review:
      "Tabatha was awesome. She went over everything to make sure I understood everything. Very friendly and great customer service.",
  },
  {
    id: 2,
    name: "Nicole Yang",
    review:
      "Informative and helpful. Helped me find policies for my home, truck ,car and boat. Very responsive to questions and found great coverage for me. I hope the great service continues in the case of a claim.",
  },
  {
    id: 3,
    name: "Calvin Smith",
    review:
      "You Insurance Agency has amazing customer service. I spoke with Cathrine, she answered all my questions. Definitely recommend!",
  },
];

export const knowledgeCenter = [
  {
    id: 1,
    imageUrl: "/center1.png",
    date: "Nov 7",
    description:
      "What to Do About Home and Auto Insurance When Moving to North Carolina",
  },
  {
    id: 2,
    imageUrl: "/center2.jpg",
    date: "Nov 7",
    description:
      "Moving to North Carolina: Getting Your License and Auto Insurance Updated",
  },
  {
    id: 3,
    imageUrl: "/center3.png",
    date: "Nov 7",
    description:
      "Supplemental Life Insurance and Retirement Planning: A Comprehensive Guide",
  },
  {
    id: 4,
    imageUrl: "/center4.jpg",
    date: "Nov 7",
    description:
      "Unlock the Lowest Home Insurance Premiums for New Builds in North Carolina",
  },
  {
    id: 5,
    imageUrl: "/center5.jpg",
    date: "Oct 29",
    description: "Save Money with your New Home",
  },
];

export const steps = [
  "Name",
  "Date of Birth?",
  "Gender",
  "Email",
  "Phone Number",
  "Height",
  "Weight",
  "Address",
  "Marital Status",
  "Tobacco Usage",
  "Health Conditions",
  "Coverage Type",
  "Coverage Amount",
];

export const validationSchema: ValidationSchema = {
  1: ["firstName", "lastName"],
  2: ["dob.month", "dob.day", "dob.year"],
  3: ["gender"],
  4: ["email"],
  5: ["phoneNumber"],
  6: ["height.feet", "height.inches"],
  7: ["weight"],
  8: ["address.street", "address.city", "address.state", "address.zip"],
  9: ["maritalStatus"],
  10: ["tobaccoUse"],
  11: ["healthConditions"],
  12: ["coverageType"],
  13: ["coverageAmount"],
};

export const usStates = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
];

export const healthConditions = [
  "AIDS / HIV",
  "Alcohol / Drug Abuse",
  "Alzheimer's Disease",
  "Asthma",
  "Cancer",
  "High Cholesterol",
  "Clinical Depression",
  "Diabetes",
  "Heart Disease",
  "High Blood Pressure",
  "Kidney Disease",
  "Liver Disease",
  "Mental Illness",
  "Pulmonary Disease",
  "Stroke",
  "Ulcer",
  "Vascular Disease",
  "Other / Not Listed",
];

export const coverageType = [
  "Term 1 Years",
  "Term 5 Years",
  "Term 10 Years",
  "Term 15 Years",
  "Term 20 Years",
  "Term 25 Years",
  "Term 30 Years",
  "Whole Life",
  "Universal Life",
  "Variable Life",
  "Investment",
  "Not Sure",
];

export const coverageAmount = [
  "$50,000",
  "$100,000",
  "$150,000",
  "$200,000",
  "$250,000",
  "$300,000",
  "$350,000",
  "$400,000",
  "$450,000",
  "$500,000",
  "$600,000",
  "$700,000",
  "$800,000",
  "$900,000",
  "$1,000,000",
  "$1,250,000",
  "$1,500,000",
  "$1,750,000",
  "$2,000,000",
];
