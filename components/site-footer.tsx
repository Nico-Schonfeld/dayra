import Link from "next/link";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SiteFooter() {
  return (
    <footer className="bg-muted/30 pt-16 pb-8">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">
          <div>
            <h3 className="text-lg sm:text-xl font-bold mb-4">DAYRA</h3>
            <p className="text-sm sm:text-base text-muted-foreground mb-6">
              Diseños artesanales elaborados con acero quirúrgico y materiales
              de calidad. Cada pieza está creada con amor para darle ese toque
              especial a tu estilo personal.
            </p>
            <div className="flex space-x-4">
              {/* <Button variant="ghost" size="icon" className="rounded-full">
                <Facebook className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="sr-only">Facebook</span>
              </Button> */}
              <Link
                href="https://www.instagram.com/dayra.accesorios/"
                target="_blank"
              >
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Instagram className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="sr-only">Instagram</span>
                </Button>
              </Link>
              {/* <Button variant="ghost" size="icon" className="rounded-full">
                <Twitter className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="sr-only">Twitter</span>
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Youtube className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="sr-only">YouTube</span>
              </Button> */}
            </div>
          </div>

          {/*  <div>
            <h3 className="text-base sm:text-lg font-bold mb-4">Tienda</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/#featured"
                  className="text-sm sm:text-base text-muted-foreground hover:text-primary transition-colors"
                >
                  Destacados
                </Link>
              </li>
              <li>
                <Link
                  href="/#collections"
                  className="text-sm sm:text-base text-muted-foreground hover:text-primary transition-colors"
                >
                  Colecciones
                </Link>
              </li>
              <li>
                <Link
                  href="/#shop"
                  className="text-sm sm:text-base text-muted-foreground hover:text-primary transition-colors"
                >
                  Todos los Productos
                </Link>
              </li>
              <li>
                <Link
                  href="/#new"
                  className="text-sm sm:text-base text-muted-foreground hover:text-primary transition-colors"
                >
                  Nuevos Ingresos
                </Link>
              </li>
              <li>
                <Link
                  href="/#sale"
                  className="text-sm sm:text-base text-muted-foreground hover:text-primary transition-colors"
                >
                  Ofertas
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-base sm:text-lg font-bold mb-4">Acerca de</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/#about"
                  className="text-sm sm:text-base text-muted-foreground hover:text-primary transition-colors"
                >
                  Nuestra Historia
                </Link>
              </li>
              <li>
                <Link
                  href="/#sustainability"
                  className="text-sm sm:text-base text-muted-foreground hover:text-primary transition-colors"
                >
                  Sustentabilidad
                </Link>
              </li>
              <li>
                <Link
                  href="/#careers"
                  className="text-sm sm:text-base text-muted-foreground hover:text-primary transition-colors"
                >
                  Carreras
                </Link>
              </li>
              <li>
                <Link
                  href="/#press"
                  className="text-sm sm:text-base text-muted-foreground hover:text-primary transition-colors"
                >
                  Prensa
                </Link>
              </li>
              <li>
                <Link
                  href="/#contact"
                  className="text-sm sm:text-base text-muted-foreground hover:text-primary transition-colors"
                >
                  Contáctanos
                </Link>
              </li>
            </ul>
          </div> */}

          <div>
            <h3 className="text-base sm:text-lg font-bold mb-4">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm sm:text-base text-muted-foreground">
                <MapPin className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0 mt-0.5" />
                <span>Agüero 1434, Villa Mercedes, San Luis, Argentina</span>
              </li>
              <li className="flex items-center gap-3 text-sm sm:text-base text-muted-foreground">
                <Phone className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                <span>+54 92657243254</span>
              </li>
              <li className="flex items-center gap-3 text-sm sm:text-base text-muted-foreground">
                <Mail className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                <span>accesoriosdayra@gmail.com</span>
              </li>
            </ul>

            {/* <div className="mt-6">
              <h4 className="text-sm sm:text-base font-medium mb-2">
                Suscríbete a nuestro boletín
              </h4>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Tu email"
                  className="rounded-full bg-background text-sm sm:text-base"
                />
                <Button className="rounded-full text-sm sm:text-base">
                  Suscribirse
                </Button>
              </div>
            </div> */}
          </div>
        </div>

        <div className="border-t pt-8 text-center text-xs sm:text-sm text-muted-foreground">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p>
              © {new Date().getFullYear()} DAYRA. Todos los derechos reservados.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/privacy"
                className="text-xs sm:text-sm hover:text-primary transition-colors"
              >
                Política de Privacidad
              </Link>
              <Link
                href="/terms"
                className="text-xs sm:text-sm hover:text-primary transition-colors"
              >
                Términos de Servicio
              </Link>
              <Link
                href="/shipping"
                className="text-xs sm:text-sm hover:text-primary transition-colors"
              >
                Política de Envíos
              </Link>
              <Link
                href="/returns"
                className="text-xs sm:text-sm hover:text-primary transition-colors"
              >
                Devoluciones y Cambios
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
