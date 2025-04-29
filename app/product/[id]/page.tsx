"use client";

import { useState, useEffect } from "react";
import { useParams, notFound, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  Minus,
  Plus,
  Share,
  ShoppingBag,
  Star,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { products } from "@/components/product-grid";
import { useCart } from "@/components/cart-provider";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import { toast } from "sonner";
import { toggleCopy } from "@/utils/toggleCopy";
import { decryptId, decryptIdPublic, encryptIdPublic } from "@/utils/encodeDecode";
import { Magnetic } from "@/components/ui/magnetic";
import { springOptions } from "@/app/cart/page";

interface Product {
  id: number;
  name: string;
  price: number;
  images: string[];
  category: string;
  description: string;
  description_2?: string;
  colors?: string[];
  sizes?: string[];
  stock: number;
  badge?: string;
  features?: string[];
  sku: string;
  weight?: string;
  dimensions?: string;
  material?: string;
  batteryLife?: string;
  burnTime?: string;
}

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  const router = useRouter();


  let productId;
  const originalCode = decodeURIComponent(id as string);
  const decodeFormString = decryptIdPublic(originalCode);
  productId = decodeFormString;

  if (!productId) {
    notFound();
  }

  useEffect(() => {
    const foundProduct = products.find((p) => p.id === Number(productId));

    if (foundProduct) {
      const typedProduct: Product = {
        id: foundProduct.id,
        name: foundProduct.name,
        price: foundProduct.price,
        images: foundProduct.images,
        category: foundProduct.category,
        description: foundProduct.description,
        description_2: foundProduct.description_2 || undefined,
        stock: foundProduct.stock,
        badge: foundProduct.badge,
        features: foundProduct.features,
        sku: foundProduct.sku,
        material: foundProduct.material,
      };

      setProduct(typedProduct);

      if (typedProduct.colors?.length) {
        setSelectedColor(typedProduct.colors[0]);
      }
      if (typedProduct.sizes?.length) {
        setSelectedSize(typedProduct.sizes[0]);
      }
    }

    setLoading(false);
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity: quantity,
      category: product.category,
      color: selectedColor,
      size: selectedSize,
    });
  };

  const nextImage = () => {
    if (!product) return;
    setSelectedImage((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    if (!product) return;
    setSelectedImage(
      (prev) => (prev - 1 + product.images.length) % product.images.length
    );
  };

  if (!loading && !product) {
    notFound();
  }

  if (loading || !product) {
    return (
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1 pt-16">
          <div className="container mx-auto px-4 py-12">
            <div className="flex justify-center items-center min-h-[50vh]">
              <div className="animate-pulse text-base sm:text-xl">
                Cargando producto...
              </div>
            </div>
          </div>
        </main>
        <SiteFooter />
      </div>
    );
  }

  const relatedProducts = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 pt-16">
        <div className="container mx-auto px-4 py-8 sm:py-12">
          {/* Breadcrumbs */}
          <div className="text-xs sm:text-sm text-muted-foreground mb-6 sm:mb-8">
            <Link href="/" className="hover:text-primary transition-colors">
              Inicio
            </Link>
            <span className="mx-2">/</span>
            <Link
              href="/#shop"
              className="hover:text-primary transition-colors"
            >
              Tienda
            </Link>
            <span className="mx-2">/</span>
            <Link
              href={`/#${product.category.toLowerCase()}`}
              className="hover:text-primary transition-colors"
            >
              {product.category}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-foreground line-clamp-1">{product.name}</span>
          </div>

          {/* Product Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="relative aspect-square rounded-xl overflow-hidden bg-muted/20">
                <Image
                  src={product.images[selectedImage] || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />

                <div className="absolute inset-0 flex items-center justify-between p-2 sm:p-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-background/60 backdrop-blur-sm"
                    onClick={prevImage}
                  >
                    <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span className="sr-only">Imagen anterior</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-background/60 backdrop-blur-sm"
                    onClick={nextImage}
                  >
                    <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span className="sr-only">Siguiente imagen</span>
                  </Button>
                </div>

                {product.badge && (
                  <div className="absolute top-2 sm:top-4 left-2 sm:left-4">
                    <Badge className="px-2 sm:px-3 py-0.5 sm:py-1 text-xs sm:text-sm bg-primary text-white font-medium">
                      {product.badge}
                    </Badge>
                  </div>
                )}
              </div>

              <div className="flex gap-2 overflow-x-auto pb-2">
                {product.images.map((image: string, index: number) => (
                  <button
                    key={index}
                    className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-md overflow-hidden flex-none ${
                      selectedImage === index
                        ? "ring-2 ring-primary"
                        : "ring-1 ring-border"
                    }`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${product.name} - Imagen ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6 sm:space-y-8">
              <div>
                <div className="text-xs sm:text-sm text-muted-foreground mb-1">
                  {product.category}
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold mb-2">
                  {product.name}
                </h1>
                {/* <div className="flex items-center gap-2 mb-4">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-3 w-3 sm:h-4 sm:w-4 ${
                          star <= 4
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs sm:text-sm text-muted-foreground">
                    4.0 (24 reseñas)
                  </span>
                </div> */}
                <div className="text-2xl sm:text-3xl font-bold text-primary">
                  ${product.price.toFixed(2)}
                </div>
              </div>

              <p className="text-sm sm:text-base text-muted-foreground">
                {product.description}
              </p>

              {/* Color Selection */}
              {product.colors && product.colors.length > 0 && (
                <div className="space-y-2 sm:space-y-3">
                  <Label className="text-sm sm:text-base">
                    Color: {selectedColor}
                  </Label>
                  <RadioGroup
                    value={selectedColor}
                    onValueChange={setSelectedColor}
                    className="flex flex-wrap gap-2 sm:gap-3"
                  >
                    {product.colors.map((color: string) => (
                      <div key={color} className="flex items-center">
                        <RadioGroupItem
                          value={color}
                          id={`color-${color}`}
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor={`color-${color}`}
                          className="flex items-center justify-center rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-sm border-2 border-muted bg-background hover:bg-muted/20 peer-data-[state=checked]:border-primary"
                        >
                          {color}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              )}

              {/* Size Selection */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="space-y-2 sm:space-y-3">
                  <Label className="text-sm sm:text-base">
                    Talla: {selectedSize}
                  </Label>
                  <RadioGroup
                    value={selectedSize}
                    onValueChange={setSelectedSize}
                    className="flex flex-wrap gap-2 sm:gap-3"
                  >
                    {product.sizes.map((size: string) => (
                      <div key={size} className="flex items-center">
                        <RadioGroupItem
                          value={size}
                          id={`size-${size}`}
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor={`size-${size}`}
                          className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full border-2 border-muted bg-background hover:bg-muted/20 peer-data-[state=checked]:border-primary text-sm"
                        >
                          {size}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              )}

              {/* Quantity */}
              <div className="space-y-2 sm:space-y-3">
                <Label className="text-sm sm:text-base">Cantidad</Label>
                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 sm:h-10 sm:w-10 rounded-full"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Minus className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="sr-only">Disminuir cantidad</span>
                  </Button>
                  <span className="w-8 text-center text-base sm:text-lg font-medium">
                    {quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 sm:h-10 sm:w-10 rounded-full"
                    onClick={() => setQuantity(Math.min(99, quantity + 1))}
                  >
                    <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="sr-only">Aumentar cantidad</span>
                  </Button>
                </div>
              </div>

              {/* Stock Status */}
              {/* <div className="flex items-center text-xs sm:text-sm">
                <div
                  className={`mr-2 h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full ${
                    product.stock > 0 ? "bg-green-500" : "bg-red-500"
                  }`}
                ></div>
                <span>
                  {product.stock > 0
                    ? `En Stock (${product.stock} disponibles)`
                    : "Agotado"}
                </span>
              </div> */}

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Magnetic
                  intensity={0.1}
                  springOptions={springOptions}
                  actionArea="global"
                  range={200}
                >
                  <Button
                    size="lg"
                    onClick={handleAddToCart}
                    className="text-sm sm:text-base"
                  >
                    <Magnetic
                      intensity={0.1}
                      springOptions={springOptions}
                      actionArea="global"
                      range={200}
                    >
                      <div className="flex items-center gap-2">
                        <ShoppingBag className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                        Añadir al Carrito
                      </div>
                    </Magnetic>
                  </Button>
                </Magnetic>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 sm:h-12 sm:w-12 rounded-full"
                  onClick={async () => {
                    const result = await toggleCopy(window.location.href);
                    if (result.success) {
                      toast.success("¡Enlace copiado al portapapeles!");
                    } else {
                      toast.error("No se pudo copiar el enlace");
                    }
                  }}
                >
                  <Share className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="sr-only">Compartir</span>
                </Button>
              </div>
            </div>
          </div>

          {/* Product Details Tabs */}
          <div className="mt-12 sm:mt-16">
            <Tabs defaultValue="details">
              <TabsList className="w-full justify-start border-b rounded-none bg-transparent h-auto p-0">
                <TabsTrigger
                  value="details"
                  className="text-sm sm:text-base rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-2 sm:py-3 px-4 sm:px-6"
                >
                  Detalles del Producto
                </TabsTrigger>
                <TabsTrigger
                  value="specifications"
                  className="text-sm sm:text-base rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-2 sm:py-3 px-4 sm:px-6"
                >
                  Especificaciones
                </TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="pt-4 sm:pt-6">
                <div className="space-y-4">
                  <p className="text-sm sm:text-base text-muted-foreground">
                    {product.description}
                  </p>
                  <h3 className="text-base sm:text-lg font-medium mt-4">
                    Características
                  </h3>
                  <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base text-muted-foreground">
                    {product.features &&
                      product.features.map((feature: string, index: number) => (
                        <li key={index}>{feature}</li>
                      ))}
                  </ul>
                </div>
              </TabsContent>

              <TabsContent value="specifications" className="pt-4 sm:pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-2 text-sm sm:text-base">
                      <div className="text-muted-foreground">SKU</div>
                      <div>{product.sku}</div>

                      <div className="text-muted-foreground">Categoría</div>
                      <div>{product.category}</div>

                      {product.weight && (
                        <>
                          <div className="text-muted-foreground">Peso</div>
                          <div>{product.weight}</div>
                        </>
                      )}

                      {product.dimensions && (
                        <>
                          <div className="text-muted-foreground">
                            Dimensiones
                          </div>
                          <div>{product.dimensions}</div>
                        </>
                      )}

                      {product.material && (
                        <>
                          <div className="text-muted-foreground">Material</div>
                          <div>{product.material}</div>
                        </>
                      )}

                      {product.batteryLife && (
                        <>
                          <div className="text-muted-foreground">
                            Duración de la Batería
                          </div>
                          <div>{product.batteryLife}</div>
                        </>
                      )}

                      {product.burnTime && (
                        <>
                          <div className="text-muted-foreground">
                            Tiempo de Quemado
                          </div>
                          <div>{product.burnTime}</div>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-base sm:text-lg font-medium">
                      Instrucciones de Cuidado
                    </h3>
                    <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base text-muted-foreground">
                      <li>
                        <span className="font-medium">Evitar el contacto con productos químicos y agua:</span> Para preservar la calidad de tus accesorios, evitá que entren en contacto directo con productos como perfumes, cremas, lociones, agua, detergentes o limpiadores abrasivos, ya que pueden dañar el material y el acabado.
                      </li>
                      <li>
                        <span className="font-medium">Mantener secos:</span> Evitá la exposición prolongada al agua, ya que aunque nuestros productos están hechos de materiales resistentes como acero quirúrgico, el contacto frecuente con agua puede acelerar el desgaste. Si es necesario, secalos inmediatamente con un paño suave.
                      </li>
                      <li>
                        <span className="font-medium">Guardado adecuado:</span> Cuando no estés usando tus accesorios, guardalos en un lugar seco y fresco. Lo ideal es mantenerlos en una caja o bolsa para evitar rayones o que se enreden con otros accesorios.
                      </li>
                      <li>
                        <span className="font-medium">Limpieza suave:</span> Limpiá tus accesorios con un paño suave y seco para quitar el polvo o la suciedad. Si necesitas una limpieza más profunda, utiliza agua tibia con un poco de jabón neutro y un paño suave. Secalos completamente antes de guardarlos.
                      </li>
                      <li>
                        <span className="font-medium">Evitá golpes:</span> Para evitar que se deformen o rayen, no los uses en actividades que impliquen movimientos bruscos o golpes.
                      </li>
                      <li>
                        <span className="font-medium">Cuidado con los productos delicados:</span> Si tus accesorios incluyen piedras, perlas, cristales u otros elementos decorativos, tené cuidado de no exponerlos a golpes fuertes o caídas que puedan dañarlos.
                      </li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Related Products */}
          <div className="mt-16 sm:mt-20">
            <h2 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8">
              También Te Puede Gustar
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((relatedProduct) => (
                <div
                  key={relatedProduct.id}
                  onClick={() => {
                    const productIdEncrypted = encodeURIComponent(
                      encryptIdPublic(relatedProduct.id.toString()) || ""
                    );

                    router.push(`/product/${productIdEncrypted}`);
                  }}
                  className="group cursor-pointer"
                >
                  <div className="relative aspect-square rounded-xl overflow-hidden">
                    <Image
                      src={relatedProduct.images[0] || "/placeholder.svg"}
                      alt={relatedProduct.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    {relatedProduct.badge && (
                      <div className="absolute top-2 left-2">
                        <Badge className="px-2 py-0.5 text-xs bg-primary text-white">
                          {relatedProduct.badge}
                        </Badge>
                      </div>
                    )}
                  </div>
                  <div className="mt-2 sm:mt-3">
                    <h3 className="text-sm sm:text-base font-medium group-hover:text-primary transition-colors line-clamp-1">
                      {relatedProduct.name}
                    </h3>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-sm sm:text-base font-bold">
                        ${relatedProduct.price.toFixed(2)}
                      </span>
                      <span className="text-xs sm:text-sm text-muted-foreground">
                        {relatedProduct.category}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
