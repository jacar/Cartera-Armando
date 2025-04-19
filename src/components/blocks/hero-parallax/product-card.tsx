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
      className="group/product relative h-96 w-[30rem] flex-shrink-0"
    >
      <Link
        href={product.link}
        className="block group-hover/product:shadow-2xl"
      >
        <Image
          src={product.thumbnail}
          height="600"
          width="600"
          className="absolute inset-0 h-full w-full object-cover object-left-top"
          alt={product.title}
        />
      </Link>
      <div className="pointer-events-none absolute inset-0 h-full w-full bg-black opacity-0 group-hover/product:opacity-80"></div>
      <div className="absolute bottom-4 left-4 right-4 rounded-lg bg-black/80 p-4 text-white opacity-0 group-hover/product:opacity-100">
        <h2 className="mb-2 text-lg font-bold">{product.title}</h2>
        {product.description && (
          <p className="line-clamp-2 text-sm text-gray-200">
            {product.description}
          </p>
        )}
      </div>
    </motion.div>
  );
}
