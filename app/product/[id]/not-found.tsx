import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function ProductNotFound() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-bold mb-4">Producto No Encontrado</h1>
      <p className="text-muted-foreground mb-8">
        Lo sentimos, no pudimos encontrar el producto que estás buscando.
      </p>
      <Link href="/#products">
        <Button>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver a Productos
        </Button>
      </Link>
    </div>
  );
}
