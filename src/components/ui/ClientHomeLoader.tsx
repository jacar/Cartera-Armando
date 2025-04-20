"use client";
import dynamic from "next/dynamic";

// Client-only loader for Home component
const Home = dynamic(() => import("@/components/Home"), { ssr: false });

export default Home;
