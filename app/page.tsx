"use client";

import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import HeroCarousel from "@/components/hero-carousel";
import CategoryScroll from "@/components/category-scroll";
import ProductGrid from "@/components/product-grid";
import FeaturedCollection from "@/components/featured-collection";
import Testimonials from "@/components/testimonials";
import { Button } from "@/components/ui/button";
import { Instagram } from "lucide-react";
import Link from "next/link";
import { InView } from "@/components/ui/InViewProps";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      {/* Hero Section */}
      <section className="pt-16">
        <HeroCarousel />
      </section>

      {/* Featured Collections */}
      {/*   <section id="featured" className="py-20">
        <div className="container px-4 md:px-6">
          <FeaturedCollection />
        </div>
      </section> */}

      {/* Categories */}
      <InView
        variants={{
          hidden: { opacity: 0, y: 100, filter: "blur(4px)" },
          visible: { opacity: 1, y: 0, filter: "blur(0px)" },
        }}
        viewOptions={{ margin: "0px 0px -200px 0px" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <section id="collections" className="py-20 bg-muted/30">
          <div className="container px-4 md:px-6">
            <CategoryScroll />
          </div>
        </section>
      </InView>

      {/* Product Grid */}
      <InView
        variants={{
          hidden: { opacity: 0, y: 100, filter: "blur(4px)" },
          visible: { opacity: 1, y: 0, filter: "blur(0px)" },
        }}
        viewOptions={{ margin: "0px 0px -200px 0px" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <section id="shop" className="py-20">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Nuestra Tienda
              </h2>
              <p className="text-muted-foreground max-w-2xl">
                Descubre nuestra selección curada de productos premium diseñados
                para estilo y comodidad. Cada pieza está elaborada con atención
                al detalle y materiales de calidad.
              </p>
            </div>

            <ProductGrid />
          </div>
        </section>
      </InView>
      
    {/* Testimonials */}
      {/* <InView
        variants={{
          hidden: { opacity: 0, y: 100, filter: "blur(4px)" },
          visible: { opacity: 1, y: 0, filter: "blur(0px)" },
        }}
        viewOptions={{ margin: "0px 0px -200px 0px" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <section className="py-20 bg-muted/30">
          <div className="container px-4 md:px-6">
            <Testimonials />
          </div>
        </section>
      </InView> */}

     {/* About Section */}
      <InView
        variants={{
          hidden: { opacity: 0, y: 100, filter: "blur(4px)" },
          visible: { opacity: 1, y: 0, filter: "blur(0px)" },
        }}
        viewOptions={{ margin: "0px 0px -200px 0px" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <section id="about" className="py-20">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Nuestra Historia
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    ¡Hola! Me llamo Magalí y desde los últimos dos años he
                    estado enfocándome en DAYRA, mi pequeño rincón, donde diseño
                    con mucho cariño accesorios para que puedas añadir ese
                    toquecito mágico a tu outfit y brillar con tu propio
                    estilo✨
                  </p>
                  <p>
                    Por lo que me dedico a elaborar cada pieza de manera
                    artesanal con materiales más duraderos como el acero
                    quirúrgico, cristales de roca y perlas de vidrio.
                  </p>
                  <p>
                    ¡Me encantaría poder acompañarte en tus momentos más
                    especiales y ser parte de tu historia! 🤗
                  </p>
                </div>
                <div className="mt-8">
                  <Link
                    href="https://www.instagram.com/dayra.accesorios/"
                    target="_blank"
                  >
                    <Button
                      className="inline-flex items-center justify-center rounded-full border border-primary bg-transparent px-8 py-3 text-base font-medium text-primary hover:bg-primary hover:text-white transition-colors"
                      onClick={() => {
                        const aboutSection = document.getElementById("about");
                        if (aboutSection)
                          aboutSection.scrollIntoView({ behavior: "smooth" });
                      }}
                    >
                      <Instagram className="mr-2 h-4 w-4" />
                      Nuestro Instagram
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative h-[500px] rounded-2xl overflow-hidden">
                <div className="absolute inset-0 bg-[url('/assets/quien-soy.jpg')] bg-cover bg-center"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <blockquote className="text-xl italic font-serif">
                    "Mi objetivo es crear piezas que se conviertan en la base de
                    tu estilo personal."
                  </blockquote>
                  <p className="mt-2 font-medium">— Magalí, Fundadora</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </InView>

   {/* Sección de Preguntas Frecuentes */}
      <InView
        variants={{
          hidden: { opacity: 0, y: 100, filter: "blur(4px)" },
          visible: { opacity: 1, y: 0, filter: "blur(0px)" },
        }}
        viewOptions={{ margin: "0px 0px -200px 0px" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <section className="py-16 bg-muted/30">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                ¿Cómo Realizar tu Pedido?
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                El proceso es muy sencillo. Te explicamos paso a paso cómo
                puedes obtener tus accesorios favoritos.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="bg-background p-6 rounded-xl shadow-sm">
                <div className="text-4xl font-bold text-primary mb-4">1</div>
                <h3 className="font-medium text-lg mb-2">Explora y Elige</h3>
                <p className="text-muted-foreground">
                  Navega por nuestra tienda y añade tus productos favoritos al
                  carrito de compras.
                </p>
              </div>

              <div className="bg-background p-6 rounded-xl shadow-sm">
                <div className="text-4xl font-bold text-primary mb-4">2</div>
                <h3 className="font-medium text-lg mb-2">Contacto Directo</h3>
                <p className="text-muted-foreground">
                  Al finalizar tu selección, serás redirigido a WhatsApp para
                  una atención personalizada.
                </p>
              </div>

              <div className="bg-background p-6 rounded-xl shadow-sm">
                <div className="text-4xl font-bold text-primary mb-4">3</div>
                <h3 className="font-medium text-lg mb-2">Coordinar Detalles</h3>
                <p className="text-muted-foreground">
                  Conversaremos sobre las opciones de pago y coordinaremos el
                  envío de tu paquete.
                </p>
              </div>
            </div>
          </div>
        </section>
      </InView>

      <SiteFooter />
    </div>
  );
}
