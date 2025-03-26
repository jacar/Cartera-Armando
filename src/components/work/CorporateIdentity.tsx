"use client";

import { motion } from "framer-motion";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
const testimonials = [{
  quote: "La identidad visual desarrollada capturó perfectamente la esencia de nuestra marca. El resultado superó todas las expectativas y transformó nuestra presencia en el mercado.",
  name: "Maria Laura",
  designation: "CEO, Break",
  src: "https://pre-built-images.s3.amazonaws.com/webapp-uploads/9286bc9100cb3681871974fa21b85f9d.png",
  avatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?q=80&w=800&h=800&auto=format&fit=crop"
}, {
  quote: "Un trabajo excepcional que transformó completamente la imagen de nuestra empresa. El proceso fue profesional y los resultados, extraordinarios.",
  name: "German Mendoza",
  designation: "CEO, German Couture",
  src: "https://pre-built-images.s3.amazonaws.com/webapp-uploads/322c7210b70eccb1e33e4f51cfbe35d4.jpg"
}, {
  quote: "La creatividad y atención al detalle en nuestro proyecto fue impresionante. El equipo logró capturar perfectamente la esencia de nuestra marca.",
  name: "Alicia Gutiérrez",
  designation: "CEO, Alice Store",
  src: "https://pre-built-images.s3.amazonaws.com/webapp-uploads/de78ffd586c03d37acad45ac1371644b.png",
  avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=800&h=800"
}, {
  quote: "Excelente trabajo en la creación de nuestra marca. El diseño refleja perfectamente nuestros valores y visión empresarial.",
  name: "Daniel Vargas",
  designation: "Director Creativo, Bud Pets",
  src: "https://pre-built-images.s3.amazonaws.com/webapp-uploads/bfda40ff333c6b9e25b4652a9c4eec8e.jpg",
  avatar: "https://images.unsplash.com/photo-1557862921-37829c790f19?fm=jpg&q=60&w=3000"
}, {
  quote: "El diseño de marca para Bondicopa refleja perfectamente la elegancia y feminidad que buscábamos. La identidad visual ha ayudado a posicionar nuestra marca en el mercado de lencería.",
  name: "Victoria Torres",
  designation: "Fundadora, Bondicopa",
  src: "https://pre-built-images.s3.amazonaws.com/webapp-uploads/8997510725c0a1d56914bf7ecb87d6a3.png",
  avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&h=800"
}, {
  quote: "La calidad del trabajo y el profesionalismo fueron extraordinarios. El diseño elevó nuestra marca a un nuevo nivel.",
  name: "Roberto Santos",
  designation: "CEO, DevShop",
  src: "https://pre-built-images.s3.amazonaws.com/webapp-uploads/ffedfda095e499ef913c880dedbf18b6.png",
  avatar: "https://t4.ftcdn.net/jpg/00/84/06/29/360_F_84062994_5AxDSM44TAfFfRWFcdjAhRvfzdmQUNFP.jpg"
}];
export function CorporateIdentity() {
  return <section className="py-40 relative overflow-hidden">
      <div className="w-full max-w-[100vw] px-6">
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.6
      }} className="text-center mb-20">
          <h2 className="text-5xl font-bold mb-6 text-zinc-900 dark:text-[#c5fb00]">
            Identidad Corporativa
          </h2>
          <p className="text-zinc-600 dark:text-white max-w-2xl mx-auto text-lg">
            Creamos identidades visuales que transmiten la esencia de tu marca y conectan con tu audiencia.
          </p>
        </motion.div>

        <AnimatedTestimonials testimonials={testimonials} autoplay={true} className="mb-20" />
      </div>
    </section>;
}
