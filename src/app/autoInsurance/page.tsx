"use client";

// Next.js dynamic import to disable SSR for the entire page
import dynamic from "next/dynamic";

// Dynamically import the page component
const Page = dynamic(() => import("../../components/insurance/AutoInsurancePage"), { ssr: false });

export default Page;
