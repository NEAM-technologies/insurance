// Reads and converts the Excel file into a JSON array
// import * as XLSX from "xlsx";

// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import {
  collection,
  doc,
  getFirestore,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(app);

// export const uploadAutoInsuranceData = async (file: File) => {
//   try {
//     console.log("Starting uploadAutoInsuranceData...");

//     // Step 1: Read file as text
//     console.log("Reading file...");
//     const text = await file.text();

//     // Step 2: Parse the CSV data using XLSX
//     console.log("Parsing CSV file...");
//     const workbook = XLSX.read(text, { type: "string" });

//     // Step 3: Select the first sheet and convert to JSON
//     const sheet = workbook.Sheets[workbook.SheetNames[0]];
//     const jsonData: Array<{ year?: number; make?: string; model?: string }> =
//       XLSX.utils.sheet_to_json(sheet);
//     console.log("Parsed data:", jsonData);

//     // Step 4: Firestore collection reference
//     const autoInsuranceRef = collection(db, "autoInsurance");
//     console.log("Firestore collection reference obtained.");

//     // Step 5: Upload data grouped by year
//     for (let i = 0; i < jsonData.length; i++) {
//       const { year, make, model } = jsonData[i];

//       // Log each entry
//       console.log(`Processing row ${i + 1}:`, { year, make, model });

//       // Validate fields
//       if (year === undefined || make === undefined || model === undefined) {
//         console.warn(`Skipping row ${i + 1}: Missing required fields.`);
//         continue;
//       }

//       // Step 6: Check if the year document exists
//       const yearDocRef = doc(autoInsuranceRef, `${year}`);
//       const yearDocSnap = await getDoc(yearDocRef);

//       // If the year document doesn't exist, create it
//       if (!yearDocSnap.exists()) {
//         console.log(`Creating new document for year: ${year}`);
//         await setDoc(yearDocRef, { year }); // You can add more metadata here if needed
//         console.log(`Year document for ${year} created.`);
//       }

//       // Step 7: Add the row as a subdocument under the year document
//       const rowsRef = collection(yearDocRef, "rows"); // Create a 'rows' subcollection under the year document
//       const rowDocRef = doc(rowsRef, `row${i + 1}`); // Generate unique ID for each row (row1, row2, etc.)
//       await setDoc(rowDocRef, { make, model });
//       console.log(`Row ${i + 1} uploaded successfully under year ${year}.`);
//     }

//     console.log("All valid data uploaded successfully.");
//     return { success: true, message: "CSV data uploaded successfully!" };
//   } catch (error) {
//     console.error("Error uploading data:", error);
//     return { success: false, message: "Error uploading CSV data." };
//   }
// };

export const getAutoYear = async (): Promise<{
  success: boolean;
  data: AutoYear[];
}> => {
  let response;
  try {
    const autoInsuranceRef = collection(db, "autoInsurance");
    const autoInsuranceSnap = await getDocs(autoInsuranceRef);

    const autoInsuranceData: AutoYear[] = autoInsuranceSnap.docs.map(
      (doc, index) => ({
        id: index + 1, // Sequential IDs starting from 1
        year: doc.id, // Firestore document ID used as the name
      })
    );

    response = { success: true, data: autoInsuranceData };
  } catch (e: any) {
    response = { success: false, data: e.message || e };
  }
  return response;
};

export const getAutoInsuranceCollection = async (
  documentId: string
): Promise<{
  success: boolean;
  data: VechileData[];
}> => {
  let response;
  try {
    // Reference to the specific document in the 'autoInsurance' collection
    const documentRef = doc(db, "autoInsurance", documentId);

    // Reference to the collection inside the specified document
    const collectionRef = collection(documentRef, "rows");

    // Fetch all documents within the nested collection
    const collectionSnap = await getDocs(collectionRef);

    const collectionData = collectionSnap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    response = { success: true, data: collectionData };
  } catch (e: any) {
    response = { success: false, data: e.message || e };
  }
  return response;
};

// const handleUpload = async () => {
//   try {
//     const filesToUpload = [];

//     // Generate file paths from 1992.csv to 2025.csv
//     for (let year = 2015; year <= 2025; year++) {
//       filesToUpload.push(`csv/${year}.csv`);
//     }

//     // Loop through each file and upload it
//     for (let filePath of filesToUpload) {
//       console.log(`Fetching file from public folder: ${filePath}...`);

//       const response = await fetch(filePath); // Fetch the file from the public folder

//       if (!response.ok) {
//         throw new Error(`Failed to fetch file: ${response.statusText}`);
//       }

//       console.log(`File fetched successfully: ${filePath}`);
//       const fileData = await response.blob(); // Convert the response to a Blob

//       // Ensure filePath is always a string, then split to get the filename
//       const fileName = filePath.split("/").pop() ?? "default.csv"; // Default to "default.csv" if undefined

//       const file = new File([fileData], fileName, {
//         type: fileData.type,
//       });

//       console.log("File converted successfully. Uploading...");
//       const result = await uploadAutoInsuranceData(file); // Upload the file

//       setMessage(result.message); // Set the upload result message
//       console.log(`Upload completed for ${filePath}:`, result.message);
//     }
//   } catch (error) {
//     setMessage("Error fetching or uploading the file.");
//     console.error("Error during file upload:", error);
//   }
// };