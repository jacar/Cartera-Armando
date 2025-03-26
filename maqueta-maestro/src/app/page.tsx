"use client";

import Home from "@/components/Home";
import About from "@/components/About";
import Services from "@/components/Services";
import Work from "@/components/Work";
import Testimonials from "@/components/Testimonials";
import Skills from "@/components/Skills";
import ProfessionalExperience from "@/components/ProfessionalExperience";

export default function HomePage() {
  return (
    <main>
      <Home />
      <About />
      <Services />
      <Work />
      <Testimonials />
      <Skills />
      <ProfessionalExperience />
    </main>
  );
}
