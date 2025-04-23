"use client";

import { useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const categories = [
  {
    id: 1,
    name: "Aritos",
    image:
      "/assets/Aritos/Aritos “Encanto floreado” colgante doble/Adobe_Express_20231002_1704190_1.png",
    count: 6,
    filter: "Aritos",
    description: "Aritos delicados y elegantes para cada ocasión",
  },
  {
    id: 2,
    name: "Collares",
    image:
      "/assets/Collares/Collar Rocío matutino/Adobe_Express_20231020_1630110_1.png",
    count: 9,
    filter: "Collares",
    description: "Collares únicos que realzan tu estilo personal",
  },
  {
    id: 3,
    name: "Combos",
    image:
      "/assets/Combos/COMBO “Cerecita”/Adobe_Express_20231218_1853320_3.png",
    count: 3,
    filter: "Combos",
    description: "Conjuntos especialmente seleccionados para ti",
  },
  {
    id: 4,
    name: "Pulseras",
    image: "/placeholder.svg?height=600&width=400",
    count: 0,
    filter: "Pulseras",
    description: "Pulseras artesanales con diseños exclusivos",
  },
];

export default function CategoryScroll() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount =
        direction === "left"
          ? -current.offsetWidth / 2
          : current.offsetWidth / 2;
      current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const handleCategoryClick = (category: string) => {
    const shopSection = document.getElementById("shop");
    if (shopSection) {
      shopSection.scrollIntoView({ behavior: "smooth" });
    }

    const filterEvent = new CustomEvent("category-filter", {
      detail: { category },
    });
    window.dispatchEvent(filterEvent);
  };

  return (
    <div className="relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Nuestras Categorías
        </h2>
        <p className="text-muted-foreground max-w-2xl">
          Explora nuestra colección de accesorios artesanales, cuidadosamente
          elaborados para complementar tu estilo
        </p>
      </motion.div>

      <div className="relative px-4 md:px-8">
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm rounded-full shadow-md hover:bg-background"
          onClick={() => scroll("left")}
        >
          <ChevronLeft className="h-6 w-6" />
          <span className="sr-only">Desplazar izquierda</span>
        </Button>

        <div
          ref={scrollRef}
          className="flex space-x-6 overflow-x-auto pb-8 scrollbar-hide snap-x snap-mandatory"
        >
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              className="flex-none w-[300px] snap-center"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <button
                onClick={() => handleCategoryClick(category.filter)}
                className="group w-full focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-xl"
              >
                <div className="relative h-[400px] overflow-hidden rounded-xl bg-muted">
                  <Image
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    fill
                    className="object-cover transition-all duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform transition-transform duration-300 group-hover:translate-y-[-8px]">
                    <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                    <p className="text-sm text-white/90 mb-3">
                      {category.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full">
                        {category.count} productos
                      </span>
                      <span className="text-sm font-medium text-primary-foreground">
                        Ver más →
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            </motion.div>
          ))}
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm rounded-full shadow-md hover:bg-background"
          onClick={() => scroll("right")}
        >
          <ChevronRight className="h-6 w-6" />
          <span className="sr-only">Desplazar derecha</span>
        </Button>
      </div>
    </div>
  );
}
