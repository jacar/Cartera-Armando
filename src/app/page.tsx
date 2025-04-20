import ClientHomeLoader from '@/components/ui/ClientHomeLoader';
import About from "@/components/About";
import Services from "@/components/Services";
import Work from "@/components/Work";
import Testimonials from "@/components/Testimonials";
import Skills from "@/components/Skills";
import ProfessionalExperience from "@/components/ProfessionalExperience";

export default function HomePage() {
  return (
    <main className="space-y-[90px] sm:space-y-0">
      <ClientHomeLoader />
      <About />
      <Services />
      <Work />
      <Testimonials />
      <Skills />
      <ProfessionalExperience />
    </main>
  );
}
