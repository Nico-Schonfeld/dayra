"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const featuredItems = [
  {
    id: 1,
    name: "Colección de Verano",
    description: "Piezas ligeras y transpirables para días cálidos",
    image: "/placeholder.svg?height=600&width=800",
    badge: "Nueva Temporada",
    filter: "summer",
  },
  {
    id: 2,
    name: "Esenciales",
    description: "Piezas atemporales para tu guardarropa diario",
    image: "/placeholder.svg?height=600&width=800",
    badge: "Más Vendidos",
    filter: "bestseller",
  },
  {
    id: 3,
    name: "Edición Limitada",
    description: "Diseños exclusivos disponibles por tiempo limitado",
    image: "/placeholder.svg?height=600&width=800",
    badge: "Limitado",
    filter: "limited",
  },
];

export default function FeaturedCollection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount =
        direction === "left" ? -current.offsetWidth : current.offsetWidth;
      current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const handleCollectionClick = (filter: string) => {
    // Scroll to the shop section
    const shopSection = document.getElementById("shop");
    if (shopSection) {
      shopSection.scrollIntoView({ behavior: "smooth" });
    }

    // Trigger collection filter
    const filterEvent = new CustomEvent("collection-filter", {
      detail: { filter },
    });
    window.dispatchEvent(filterEvent);
  };

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold">Colecciones Destacadas</h2>
          <p className="text-muted-foreground mt-2">
            Explora nuestras selecciones curadas
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex space-x-2">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              onClick={() => scroll("left")}
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">Anterior</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              onClick={() => scroll("right")}
            >
              <ChevronRight className="h-5 w-5" />
              <span className="sr-only">Siguiente</span>
            </Button>
          </div>
          <Button
            variant="link"
            className="gap-1"
            onClick={() => {
              const shopSection = document.getElementById("shop");
              if (shopSection)
                shopSection.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Ver Todo
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex space-x-6 overflow-x-auto pb-6 horizontal-scroll -mx-4 px-4"
      >
        {featuredItems.map((item) => (
          <div key={item.id} className="flex-none w-[85vw] max-w-[600px] group">
            <div className="relative h-[400px] overflow-hidden rounded-xl">
              <Image
                src={item.image || "/placeholder.svg"}
                alt={item.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

              {item.badge && (
                <div className="absolute top-4 left-4">
                  <Badge className="px-3 py-1 bg-primary text-white font-medium">
                    {item.badge}
                  </Badge>
                </div>
              )}

              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">{item.name}</h3>
                <p className="text-white/80 mb-4">{item.description}</p>
                <Button
                  className="bg-white text-black hover:bg-white/90"
                  onClick={() => handleCollectionClick(item.filter)}
                >
                  Explorar Colección
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
