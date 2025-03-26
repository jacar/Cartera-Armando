"use client";

import { motion, MotionValue } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  product: {
    title: string;
    link: string;
    thumbnail: string;
    description?: string;
  };
  translate: MotionValue<number>;
}

export function ProductCard({ product, translate }: ProductCardProps) {
  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -20,
      }}
      key={product.title}
      className="group/product h-96 w-[30rem] relative flex-shrink-0"
    >
      <Link
        href={product.link}
        className="block group-hover/product:shadow-2xl"
      >
        <Image
          src={product.thumbnail}
          height="600"
          width="600"
          className="object-cover object-left-top absolute h-full w-full inset-0"
          alt={product.title}
        />
      </Link>
      <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-black pointer-events-none"></div>
      <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover/product:opacity-100 text-white p-4 bg-black/80 rounded-lg">
        <h2 className="text-lg font-bold mb-2">{product.title}</h2>
        {product.description && (
          <p className="text-sm text-gray-200 line-clamp-2">{product.description}</p>
        )}
      </div>
    </motion.div>
  );
}
