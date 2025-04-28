"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, Heart, ShoppingBag } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/components/cart-provider";
import QuickViewModal from "@/components/quick-view-modal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Importar datos del JSON
import productsData from "@/messages/products.json";
import { encryptIdPublic } from "@/utils/encodeDecode";
import { useRouter } from "next/navigation";

// Datos de productos
export const products = productsData.products;

// Opciones de filtrado
const categories = productsData.categories;
const priceRanges = productsData.priceRanges;
const sortOptions = productsData.sortOptions;

export default function ProductGrid() {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [selectedPriceRange, setSelectedPriceRange] =
    useState("Todos los precios");
  const [selectedSort, setSelectedSort] = useState("Más nuevos");
  const [quickViewProduct, setQuickViewProduct] = useState<any>(null);
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [collectionFilter, setCollectionFilter] = useState("");
  const { addItem } = useCart();

  // Escuchar eventos de búsqueda desde el encabezado
  useEffect(() => {
    const handleSearch = (event: Event) => {
      const customEvent = event as CustomEvent;
      setSearchQuery(customEvent.detail.query);
    };

    window.addEventListener("product-search", handleSearch as EventListener);
    return () => {
      window.removeEventListener(
        "product-search",
        handleSearch as EventListener
      );
    };
  }, []);

  // Escuchar eventos de filtro de categoría
  useEffect(() => {
    const handleCategoryFilter = (event: Event) => {
      const customEvent = event as CustomEvent;
      setSelectedCategory(customEvent.detail.category);
      setCollectionFilter("");
      setSearchQuery("");
    };

    window.addEventListener(
      "category-filter",
      handleCategoryFilter as EventListener
    );
    return () => {
      window.removeEventListener(
        "category-filter",
        handleCategoryFilter as EventListener
      );
    };
  }, []);

  // Escuchar eventos de filtro de colección
  useEffect(() => {
    const handleCollectionFilter = (event: Event) => {
      const customEvent = event as CustomEvent;
      setCollectionFilter(customEvent.detail.filter);
      setSelectedCategory("Todos");
      setSearchQuery("");
    };

    window.addEventListener(
      "collection-filter",
      handleCollectionFilter as EventListener
    );
    return () => {
      window.removeEventListener(
        "collection-filter",
        handleCollectionFilter as EventListener
      );
    };
  }, []);

  // Filtrar productos
  let filteredProducts = products.filter(product => !product.hidden);

  // Aplicar filtro de búsqueda
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        (product.material && product.material.toLowerCase().includes(query)) ||
        (product.features &&
          product.features.some((feature) =>
            feature.toLowerCase().includes(query)
          ))
    );
  }
  // Luego filtrar por colección si existe
  else if (collectionFilter) {
    filteredProducts = filteredProducts.filter(
      (product) => product.tags && product.tags.includes(collectionFilter)
    );
  }
  // Luego filtrar por categoría
  else if (selectedCategory !== "Todos") {
    filteredProducts = filteredProducts.filter(
      (product) => product.category === selectedCategory
    );
  }

  // Luego filtrar por rango de precio
  if (selectedPriceRange !== "Todos los precios") {
    filteredProducts = filteredProducts.filter((product) => {
      const price = product.price;
      let matches = false;

      switch (selectedPriceRange) {
        case "Menos de $5000":
          matches = price < 5000;
          break;
        case "$5000 - $10000":
          matches = price >= 5000 && price <= 10000;
          break;
        case "Más de $10000":
          matches = price > 10000;
          break;
        default:
          matches = true;
      }

      return matches;
    });
  }

  // Ordenar productos
  filteredProducts = [...filteredProducts].sort((a, b) => {
    if (selectedSort === "Precio: Menor a Mayor") return a.price - b.price;
    if (selectedSort === "Precio: Mayor a Menor") return b.price - a.price;
    if (selectedSort === "Populares") {
      return (b.badge ? 1 : 0) - (a.badge ? 1 : 0);
    }
    return b.id - a.id;
  });

  // Limitar productos a menos que "mostrar todo" esté activado
  const displayedProducts = showAllProducts
    ? filteredProducts
    : filteredProducts.slice(0, 6);

  const handleAddToCart = (product: any) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity: 1,
      category: product.category,
      color: product.colors ? product.colors[0] : undefined,
      size: product.sizes ? product.sizes[0] : undefined,
    });
  };

  const resetFilters = () => {
    setSelectedCategory("Todos");
    setSelectedPriceRange("Todos los precios");
    setSelectedSort("Más nuevos");
    setCollectionFilter("");
    setSearchQuery("");
  };

  const router = useRouter();

  return (
    <div className="space-y-8">
      {/* Controles de Filtro y Ordenamiento */}
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Badge
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              className="px-4 py-2 cursor-pointer rounded-full hover:bg-primary/90 transition-colors hover:text-white"
              onClick={() => {
                setSelectedCategory(category);
                setCollectionFilter("");
              }}
            >
              {category}
            </Badge>
          ))}
        </div>

        <div className="flex gap-2">
          <Select
            value={selectedPriceRange}
            onValueChange={setSelectedPriceRange}
          >
            <SelectTrigger className="rounded-full">
              <SelectValue placeholder="Rango de precios" />
            </SelectTrigger>
            <SelectContent>
              {priceRanges.map((range) => (
                <SelectItem key={range} value={range}>
                  {range}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedSort} onValueChange={setSelectedSort}>
            <SelectTrigger className="rounded-full">
              <SelectValue placeholder="Ordenar por" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {(selectedCategory !== "Todos" ||
            selectedPriceRange !== "Todos los precios" ||
            selectedSort !== "Más nuevos" ||
            collectionFilter ||
            searchQuery) && (
            <Button
              variant="outline"
              size="sm"
              className="rounded-full hover:bg-primary hover:text-white transition-colors"
              onClick={resetFilters}
            >
              Restablecer Filtros
            </Button>
          )}
        </div>
      </div>

      {/* Indicador de Resultados de Búsqueda o Filtro de Colección */}
      {(searchQuery || collectionFilter) && (
        <div className="bg-muted/30 p-4 rounded-lg">
          {searchQuery && (
            <p>
              Resultados de búsqueda para:{" "}
              <span className="font-medium">"{searchQuery}"</span>
              <span className="text-muted-foreground ml-2">
                ({filteredProducts.length} productos encontrados)
              </span>
            </p>
          )}
          {collectionFilter && (
            <p>
              Mostrando productos de:{" "}
              <span className="font-medium">
                Colección{" "}
                {collectionFilter.charAt(0).toUpperCase() +
                  collectionFilter.slice(1)}
              </span>
              <span className="text-muted-foreground ml-2">
                ({filteredProducts.length} productos encontrados)
              </span>
            </p>
          )}
        </div>
      )}

      {/* Mensaje Sin Resultados */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-xl font-medium mb-2">
            No se encontraron productos
          </p>
          <p className="text-muted-foreground mb-4">
            Intenta ajustar tus filtros o criterios de búsqueda
          </p>
          <Button onClick={resetFilters}>Restablecer Todos los Filtros</Button>
        </div>
      )}

      {/* Cuadrícula de Productos */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayedProducts.map((product) => (
          <div
            key={product.id}
            className="group relative product-card-hover rounded-xl overflow-hidden bg-background border hover:border-primary transition-all duration-300 hover:shadow-lg"
          >
            {/* Imagen del Producto */}
            <div className="aspect-square relative overflow-hidden">
              <Image
                src={product.images[0] || "/placeholder.svg"}
                alt={product.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                priority={product.id <= 6} // Prioriza la carga de las primeras 6 imágenes
                loading={product.id <= 6 ? "eager" : "lazy"} // Carga eager para las primeras 6, lazy para el resto
                quality={80} // Ajusta la calidad para optimizar el tamaño
                className={`object-cover transition-transform duration-500 ${
                  product.stock === 0 ? "opacity-50" : "group-hover:scale-110"
                }`}
              />

              {/* Insignia */}
              {product.badge && (
                <div className="absolute top-4 left-4 z-10">
                  <Badge className="px-3 py-1 bg-primary text-white font-medium">
                    {product.badge}
                  </Badge>
                </div>
              )}

              {/* Badge de Sin Stock */}
              {product.stock === 0 && (
                <div className="absolute top-4 right-4 z-10">
                  <Badge className="px-3 py-1 bg-red-500 text-white font-medium">
                    Sin Stock
                  </Badge>
                </div>
              )}

              {/* Acciones Rápidas */}
              {product.stock > 0 && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex gap-2">
                    <Button
                      variant="secondary"
                      size="icon"
                      className="rounded-full hover:bg-primary hover:text-white"
                      onClick={() => setQuickViewProduct(product)}
                    >
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">Vista rápida</span>
                    </Button>
                    {/*   <Button
                      variant="secondary"
                      size="icon"
                      className="rounded-full hover:bg-primary hover:text-white"
                    >
                      <Heart className="h-4 w-4" />
                      <span className="sr-only">Agregar a favoritos</span>
                    </Button> */}
                    <Button
                      variant="secondary"
                      size="icon"
                      className="rounded-full hover:bg-primary hover:text-white"
                      onClick={() => handleAddToCart(product)}
                    >
                      <ShoppingBag className="h-4 w-4" />
                      <span className="sr-only">Agregar al carrito</span>
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Información del Producto */}
            <div className="p-6">
              <div className="mb-2 text-sm text-muted-foreground">
                {product.category}
              </div>
              <h3 className="font-medium text-lg mb-2 line-clamp-2 min-h-[3.5rem]">
                {product.name}
              </h3>
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold">
                  ${product.price.toLocaleString("es-AR")}
                </span>
                {product.stock > 0 ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="font-medium hover:bg-primary hover:text-white"
                    onClick={() => {
                      const productIdEncrypted = encodeURIComponent(
                        encryptIdPublic(product.id.toString()) || ""
                      );

                      router.push(`/product/${productIdEncrypted}`);
                    }}
                  >
                    Ver Detalles
                  </Button>
                ) : (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="font-medium text-muted-foreground cursor-not-allowed"
                    disabled
                  >
                    Sin Stock
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Botón Cargar Más / Ver Todo */}
      {filteredProducts.length > 6 && !showAllProducts && (
        <div className="text-center mt-8">
          <Button onClick={() => setShowAllProducts(true)} className="px-8">
            Ver Todos los Productos ({filteredProducts.length})
          </Button>
        </div>
      )}

      {/* Botón Mostrar Menos */}
      {showAllProducts && filteredProducts.length > 6 && (
        <div className="text-center mt-8">
          <Button
            variant="outline"
            onClick={() => setShowAllProducts(false)}
            className="px-8"
          >
            Mostrar Menos
          </Button>
        </div>
      )}

      {/* Modal de Vista Rápida */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
}
