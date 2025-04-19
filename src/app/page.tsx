import ClientHomeLoader from '@/components/ui/ClientHomeLoader';
import About from "@/components/About";
import Services from "@/components/Services";
import Work from "@/components/Work";
import Testimonials from "@/components/Testimonials";
import Skills from "@/components/Skills";
import ProfessionalExperience from "@/components/ProfessionalExperience";

export default function HomePage() {
  return (
    <main>
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
