// src/components/DynamicMobileScrollFix.tsx
"use client";

import dynamic from "next/dynamic";

// Dynamically import MobileScrollFix only on the client-side
const MobileScrollFix = dynamic(
  () => import("@/components/ui/MobileScrollFix"),
  { ssr: false },
);

// This component simply renders the dynamically imported component
const DynamicMobileScrollFix = () => {
  return <MobileScrollFix />;
};

export default DynamicMobileScrollFix;
