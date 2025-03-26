"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { Waves } from "@/components/ui/waves-background";
import { Squares } from "@/components/ui/squares-background";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const testimonials = [
  {
    name: "Juan Carlos Vargas",
    role: "Director, Aventuras Travel",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&h=200&auto=format&fit=crop",
    quote: "El diseño web que desarrollaron para nuestra agencia de viajes superó todas nuestras expectativas. La página no solo es visualmente impresionante, sino que también ha mejorado significativamente nuestra presencia online y las reservas.",
    rating: 5
  },
  {
    name: "Karla Castillo",
    role: "Propietaria, La Casa Azteca",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&h=200&auto=format&fit=crop",
    quote: "El proceso de diseño de logo e identidad corporativa para nuestro restaurante fue excepcional. Capturaron perfectamente la esencia de nuestra cocina mexicana y cultura en cada elemento del diseño.",
    rating: 5
  },
  {
    name: "Pedro García",
    role: "Gerente, AutoPartes Express",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200&h=200&auto=format&fit=crop",
    quote: "La combinación del diseño web y logo para nuestro negocio de autorepuestos fue perfecta. El sitio es fácil de navegar y el logo transmite exactamente la profesionalidad que buscábamos.",
    rating: 5
  },
  {
    name: "Hugo Contreras",
    role: "Propietario, Licores Pipa",
    image: "https://pre-built-images.s3.amazonaws.com/webapp-uploads/a71a6f1379e958cf73db47c389293672.jpg",
    quote: "La identidad corporativa que crearon para nuestra licorera elevó significativamente nuestra imagen de marca. El diseño elegante y sofisticado refleja perfectamente la calidad de nuestros productos.",
    rating: 5
  }
];

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={16}
          className={`${
            i < rating ? "text-black dark:text-[#c5fb00]" : "text-gray-400"
          } fill-current`}
        />
      ))}
    </div>
  );
};

export default function Testimonials() {
  return (
    <section className="min-h-screen pt-32 relative" id="testimonial">
      <div className="absolute inset-0 z-0">
        <Waves
          lineColor="#c5fb00"
          backgroundColor="transparent"
          waveSpeedX={0.0125}
          waveSpeedY={0.005}
          waveAmpX={32}
          waveAmpY={16}
          className="opacity-20"
        />
      </div>
      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 dark:text-white text-zinc-900">
            Lo Que Dicen Mis Clientes
          </h2>
          <p className="dark:text-gray-300 text-zinc-600 max-w-2xl mx-auto">
            Descubre por qué las empresas confían en mis servicios para sus necesidades de desarrollo web.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative"
        >
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            className="testimonials-swiper !pb-16"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ 
                    scale: 1.02,
                    rotateX: 5,
                    rotateY: 5,
                    transition: { duration: 0.2 }
                  }}
                  className="bg-zinc-100 dark:bg-[#18181b] p-6 rounded-xl h-full flex flex-col transform-gpu"
                  style={{ perspective: "1000px" }}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="text-zinc-900 dark:text-white font-semibold">{testimonial.name}</h3>
                      <p className="text-zinc-600 dark:text-gray-400 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                  <StarRating rating={testimonial.rating} />
                  <p className="text-zinc-600 dark:text-gray-300 mt-4 flex-grow">{testimonial.quote}</p>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
}
