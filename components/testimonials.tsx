"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    id: 1,
    name: "María García",
    avatar: "/placeholder.svg?height=100&width=100",
    role: "Bloguera de Moda",
    rating: 5,
    text: "La calidad de los productos es excepcional. He sido cliente fiel durante años y nunca me han decepcionado. La atención al detalle y la artesanía no tienen comparación.",
  },
  {
    id: 2,
    name: "Carlos Ruiz",
    avatar: "/placeholder.svg?height=100&width=100",
    role: "Fotógrafo",
    rating: 4,
    text: "Me encanta la estética minimalista y la versatilidad de las piezas. Todo lo que he comprado se ha convertido en un básico en mi guardarropa. El servicio al cliente también es excelente.",
  },
  {
    id: 3,
    name: "Ana Martínez",
    avatar: "/placeholder.svg?height=100&width=100",
    role: "Diseñadora de Interiores",
    rating: 5,
    text: "No solo los productos son hermosos, sino que también están hechos para durar. Aprecio el compromiso de la marca con la sostenibilidad y las prácticas de producción éticas.",
  },
  {
    id: 4,
    name: "Diego López",
    avatar: "/placeholder.svg?height=100&width=100",
    role: "Ejecutivo de Marketing",
    rating: 5,
    text: "La experiencia de compra es perfecta desde la navegación hasta la entrega. El empaque es elegante y ecológico, y los productos siempre superan mis expectativas.",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const testimonialsPerView = 3;
  const totalPages = Math.ceil(testimonials.length / testimonialsPerView);

  const next = () => {
    setCurrent((current + 1) % totalPages);
  };

  const prev = () => {
    setCurrent((current - 1 + totalPages) % totalPages);
  };

  const visibleTestimonials = testimonials.slice(
    current * testimonialsPerView,
    Math.min((current + 1) * testimonialsPerView, testimonials.length)
  );

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Lo Que Dicen Nuestros Clientes</h2>
          <p className="text-muted-foreground mt-2">
            Escucha a nuestros clientes satisfechos
          </p>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full"
            onClick={prev}
            disabled={totalPages <= 1}
          >
            <ChevronLeft className="h-5 w-5" />
            <span className="sr-only">Anterior</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full"
            onClick={next}
            disabled={totalPages <= 1}
          >
            <ChevronRight className="h-5 w-5" />
            <span className="sr-only">Siguiente</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {visibleTestimonials.map((testimonial) => (
          <Card key={testimonial.id} className="border-none shadow-lg slide-up">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="relative h-14 w-14 rounded-full overflow-hidden">
                  <Image
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium">{testimonial.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </div>

              {/*   <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < testimonial.rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div> */}

              <p className="text-muted-foreground italic">
                "{testimonial.text}"
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
