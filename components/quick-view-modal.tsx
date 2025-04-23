"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
  ShoppingBag,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useCart } from "@/components/cart-provider";
import { useRouter } from "next/navigation";
import { encryptIdPublic } from "@/utils/encodeDecode";

export default function QuickViewModal({
  product,
  isOpen,
  onClose,
}: {
  product: any;
  isOpen: boolean;
  onClose: () => void;
}) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const { addItem } = useCart();

  const router = useRouter();

  if (!product) return null;

  // Set default selections when product changes
  if (product.colors && product.colors.length > 0 && !selectedColor) {
    setSelectedColor(product.colors[0]);
  }

  if (product.sizes && product.sizes.length > 0 && !selectedSize) {
    setSelectedSize(product.sizes[0]);
  }

  const handleAddToCart = () => {
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
    onClose();
  };

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setSelectedImage(
      (prev) => (prev - 1 + product.images.length) % product.images.length
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[95vw] md:max-w-[900px] p-0 overflow-auto max-h-[95vh] rounded-xl">
        <DialogTitle className="sr-only">
          Vista Rápida: {product.name}
        </DialogTitle>
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Product Images */}
          <div className="relative bg-muted/20">
            {/* Main Image */}
            <div className="relative aspect-square">
              <Image
                src={product.images[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />

              {/* Image Navigation */}
              <div className="absolute inset-0 flex items-center justify-between p-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 rounded-full bg-background/60 backdrop-blur-sm"
                  onClick={prevImage}
                >
                  <ChevronLeft className="h-5 w-5" />
                  <span className="sr-only">Imagen anterior</span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 rounded-full bg-background/60 backdrop-blur-sm"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-5 w-5" />
                  <span className="sr-only">Siguiente imagen</span>
                </Button>
              </div>

              {/* Badge */}
              {product.badge && (
                <div className="absolute top-4 left-4">
                  <Badge className="px-3 py-1 bg-primary text-white font-medium">
                    {product.badge}
                  </Badge>
                </div>
              )}
            </div>

            {/* Thumbnail Gallery */}
            <div className="flex justify-center gap-2 p-4 overflow-x-auto">
              {product.images.map((image: string, index: number) => (
                <button
                  key={index}
                  className={`relative flex-shrink-0 w-16 h-16 rounded-md overflow-hidden ${
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

          {/* Product Details */}
          <div className="p-4 md:p-8 space-y-4 md:space-y-6 overflow-y-auto max-h-[95vh] md:max-h-none">
            <div>
              <div className="text-sm text-muted-foreground mb-1">
                {product.category}
              </div>
              <h2 className="text-xl md:text-2xl font-bold mb-2">
                {product.name}
              </h2>
              <div className="text-2xl md:text-3xl font-bold text-primary">
                ${product.price.toLocaleString("es-AR")}
              </div>
            </div>

            <p className="text-muted-foreground text-sm md:text-base">
              {product.description} <br />
              {product.description_2 && product.description_2}
            </p>

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div className="space-y-3">
                <Label className="text-base">Color: {selectedColor}</Label>
                <RadioGroup
                  value={selectedColor}
                  onValueChange={setSelectedColor}
                  className="flex flex-wrap gap-2 md:gap-3"
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
                        className="flex items-center justify-center rounded-full px-3 md:px-4 py-1 md:py-2 border-2 border-muted bg-background hover:bg-muted/20 peer-data-[state=checked]:border-primary text-sm md:text-base"
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
              <div className="space-y-3">
                <Label className="text-base">Talle: {selectedSize}</Label>
                <RadioGroup
                  value={selectedSize}
                  onValueChange={setSelectedSize}
                  className="flex flex-wrap gap-2 md:gap-3"
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
                        className="flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full border-2 border-muted bg-background hover:bg-muted/20 peer-data-[state=checked]:border-primary text-sm md:text-base"
                      >
                        {size}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            )}

            {/* Quantity */}
            <div className="space-y-3">
              <Label className="text-base">Cantidad</Label>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 md:h-10 md:w-10 rounded-full"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus className="h-4 w-4" />
                  <span className="sr-only">Disminuir cantidad</span>
                </Button>
                <span className="w-8 text-center text-base md:text-lg font-medium">
                  {quantity}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 md:h-10 md:w-10 rounded-full"
                  onClick={() => setQuantity(Math.min(99, quantity + 1))}
                >
                  <Plus className="h-4 w-4" />
                  <span className="sr-only">Aumentar cantidad</span>
                </Button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-2 md:gap-3 pt-2 md:pt-4">
              <Button
                className="w-full text-sm md:text-base"
                onClick={handleAddToCart}
              >
                <ShoppingBag className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                Agregar al Carrito
              </Button>

              <Button
                variant="outline"
                className="w-full text-sm md:text-base"
                onClick={() => {
                  const productIdEncrypted = encodeURIComponent(
                    encryptIdPublic(product.id.toString()) || ""
                  );

                  onClose();
                  router.push(`/product/${productIdEncrypted}`);
                }}
              >
                Ver Detalles
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
