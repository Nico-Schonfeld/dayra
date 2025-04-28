"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const carouselItems = [
  {
    id: 1,
    image:
      "/assets/carrusel/aritos.jpg",
    title: "Aritos",
    subtitle:
      "Descubre nuestra elegante colección de aritos y aros para realzar tu belleza",
    cta: "Ver colección",
    link: "/#shop",
    position: "center",
  },
  {
    id: 2,
    image:
      "/assets/carrusel/collar.jpg",
    title: "Collares",
    subtitle:
      "Descubre nuestra elegante colección de collares, donde cada pieza cuenta una historia de romance y sofisticación",
    cta: "Ver colección",
    link: "/#shop",
    position: "left",
  },
 
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const prev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrent((current) =>
      current === 0 ? carouselItems.length - 1 : current - 1
    );
    setTimeout(() => setIsAnimating(false), 500);
  };

  const next = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrent((current) =>
      current === carouselItems.length - 1 ? 0 : current + 1
    );
    setTimeout(() => setIsAnimating(false), 500);
  };

  useEffect(() => {
    const interval = setInterval(next, 6000);
    return () => clearInterval(interval);
  }, []);

  const getPositionClasses = (position: string) => {
    switch (position) {
      case "left":
        return "items-start text-left left-[5%] sm:left-[10%]";
      case "right":
        return "items-end text-right right-[5%] sm:right-[10%]";
      default:
        return "items-center text-center left-1/2 -translate-x-1/2";
    }
  };

  const router = useRouter();

  return (
    <div className="relative w-full hero-carousel overflow-hidden">
      {/* Carousel Items */}
      {carouselItems.map((item, index) => (
        <div
          key={item.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            current === index ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src={item.image || "/placeholder.svg"}
              alt={item.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/30" />
          </div>

          {/* Content */}
          <div
            className={`absolute bottom-[15%] sm:bottom-[20%] ${getPositionClasses(
              item.position
            )} max-w-[90%] sm:max-w-md z-20 px-4 sm:px-0`}
          >
            {current === index && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-2 sm:space-y-4"
              >
                <motion.h1
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white"
                >
                  {item.title}
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="text-base sm:text-lg md:text-xl text-white/90"
                >
                  {item.subtitle}
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  {/*  <Button
                    size="lg"
                    className="mt-2 sm:mt-4 text-sm sm:text-base"
                    onClick={() => router.push(item.link)}
                  >
                    {item.cta}
                  </Button> */}
                </motion.div>
              </motion.div>
            )}
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      {/*  <div className="absolute inset-0 flex items-center justify-between p-4 z-20">
        <Button
          variant="ghost"
          size="icon"
          className="h-12 w-12 rounded-full bg-background/20 backdrop-blur-sm hover:bg-background/40 text-white"
          onClick={prev}
        >
          <ChevronLeft className="h-6 w-6" />
          <span className="sr-only">Previous slide</span>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-12 w-12 rounded-full bg-background/20 backdrop-blur-sm hover:bg-background/40 text-white"
          onClick={next}
        >
          <ChevronRight className="h-6 w-6" />
          <span className="sr-only">Next slide</span>
        </Button>
      </div> */}

      {/* Indicators */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
        {carouselItems.map((_, index) => (
          <button
            key={index}
            className={`w-8 sm:w-12 h-1 rounded-full transition-all ${
              current === index ? "bg-white" : "bg-white/40"
            }`}
            onClick={() => setCurrent(index)}
          >
            <span className="sr-only">Go to slide {index + 1}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
