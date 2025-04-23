"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, MessageCircle, Minus, Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/components/cart-provider";
import { toast } from "@/components/ui/use-toast";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import { Magnetic } from "@/components/ui/magnetic";
export const springOptions = { bounce: 0.1 };

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, total } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);

  // Opciones de spring para el efecto magnético

  // Generar un ID de orden aleatorio
  const generateOrderId = () => {
    return `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
  };

  const handleOrderViaWhatsApp = () => {
    if (items.length === 0) {
      toast({
        title: "Carrito vacío",
        description:
          "Agrega algunos productos a tu carrito antes de realizar un pedido.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    const orderId = generateOrderId();
    let message = `🛍️ *NUEVO PEDIDO*\n`;
    message += `📋 *ID de Orden:* ${orderId}\n\n`;
    message += `*PRODUCTOS SELECCIONADOS:*\n`;

    items.forEach((item, index) => {
      message += `---------------------------\n`;
      message += `*${index + 1}. ${item.name}*\n`;
      message += `💰 Precio: $${item.price.toFixed(2)}\n`;
      message += `📦 Cantidad: ${item.quantity}\n`;
      if (item.color) message += `🎨 Color: ${item.color}\n`;
      if (item.size) message += `📏 Talle: ${item.size}\n`;
      message += `💵 Subtotal: $${(item.price * item.quantity).toFixed(2)}\n`;
    });

    message += `\n---------------------------\n`;
    message += `*RESUMEN DEL PEDIDO*\n`;
    message += `💰 *Total a Pagar:* $${total.toFixed(2)}\n\n`;
    message += `¡Hola! Me interesa realizar este pedido. ¿Podrías confirmarme la disponibilidad y los métodos de pago disponibles?\n\n`;
    message += `¡Gracias! 🙏`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/543549446648?text=${encodedMessage}`;

    // Simular procesamiento
    setTimeout(() => {
      window.open(whatsappUrl, "_blank");
      setIsProcessing(false);

      toast({
        title: "Pedido por WhatsApp Iniciado",
        description: `ID de Orden: ${orderId} ha sido creado. Completa tu pedido en WhatsApp.`,
      });
    }, 1000);
  };

  return (
    <div className="flex min-h-screen flex-col mt-12">
      <SiteHeader />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
            <h1 className="text-2xl sm:text-3xl font-bold">
              Carrito de Compras
            </h1>
            <Link href="/#products">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Continuar Comprando
              </Button>
            </Link>
          </div>

          {items.length === 0 ? (
            <div className="text-center py-8 sm:py-12">
              <div className="text-4xl sm:text-6xl mb-4">🛒</div>
              <h2 className="text-xl sm:text-2xl font-semibold mb-2">
                Tu carrito está vacío
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground mb-6">
                Parece que aún no has agregado productos a tu carrito.
              </p>
              <Link href="/#products">
                <Button>Ver Productos</Button>
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-4 sm:gap-8">
              <div className="md:col-span-2">
                {/* Mobile View */}
                <div className="md:hidden space-y-4">
                  {items.map((item) => (
                    <div
                      key={`${item.id}-${item.color}-${item.size}`}
                      className="border rounded-lg p-4"
                    >
                      <div className="flex gap-4">
                        <div className="relative h-20 w-20 rounded overflow-hidden flex-shrink-0">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">{item.name}</h3>
                          <div className="text-xs text-muted-foreground mt-1">
                            {item.color && (
                              <span className="mr-2">Color: {item.color}</span>
                            )}
                            {item.size && <span>Talle: {item.size}</span>}
                          </div>
                          <div className="mt-2 text-sm">
                            <div className="flex justify-between items-center mb-2">
                              <span>Precio:</span>
                              <span>${item.price.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span>Cantidad:</span>
                              <div className="flex items-center">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-7 w-7 rounded-full"
                                  onClick={() =>
                                    updateQuantity(
                                      item.id,
                                      item.quantity - 1,
                                      item.color,
                                      item.size
                                    )
                                  }
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                <span className="w-8 text-center">
                                  {item.quantity}
                                </span>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-7 w-7 rounded-full"
                                  onClick={() =>
                                    updateQuantity(
                                      item.id,
                                      item.quantity + 1,
                                      item.color,
                                      item.size
                                    )
                                  }
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-between items-center mt-3 pt-3 border-t">
                            <span className="font-medium">
                              Subtotal: $
                              {(item.price * item.quantity).toFixed(2)}
                            </span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-muted-foreground hover:text-destructive"
                              onClick={() =>
                                removeItem(item.id, item.color, item.size)
                              }
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Desktop View */}
                <div className="hidden md:block rounded-lg border overflow-hidden">
                  <div className="bg-muted/50 px-6 py-3 text-sm font-medium grid grid-cols-12 gap-2">
                    <div className="col-span-6">Producto</div>
                    <div className="col-span-2 text-center">Precio</div>
                    <div className="col-span-2 text-center">Cantidad</div>
                    <div className="col-span-2 text-center">Subtotal</div>
                  </div>

                  {items.map((item) => (
                    <div
                      key={`${item.id}-${item.color}-${item.size}`}
                      className="px-6 py-4 border-t grid grid-cols-12 gap-2 items-center"
                    >
                      <div className="col-span-6 flex items-center gap-4">
                        <div className="relative h-16 w-16 rounded overflow-hidden flex-shrink-0">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-medium">{item.name}</h3>
                          <div className="text-xs text-muted-foreground mt-1">
                            {item.color && (
                              <span className="mr-2">Color: {item.color}</span>
                            )}
                            {item.size && <span>Talle: {item.size}</span>}
                          </div>
                        </div>
                      </div>

                      <div className="col-span-2 text-center">
                        ${item.price.toFixed(2)}
                      </div>

                      <div className="col-span-2 flex items-center justify-center">
                        <div className="flex items-center">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7 rounded-full"
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                item.quantity - 1,
                                item.color,
                                item.size
                              )
                            }
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7 rounded-full"
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                item.quantity + 1,
                                item.color,
                                item.size
                              )
                            }
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>

                      <div className="col-span-2 text-center flex items-center justify-between">
                        <span className="font-medium">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-muted-foreground hover:text-destructive"
                          onClick={() =>
                            removeItem(item.id, item.color, item.size)
                          }
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between mt-4">
                  <Button variant="outline" size="sm" onClick={clearCart}>
                    Vaciar Carrito
                  </Button>
                </div>
              </div>

              <div className="md:col-span-1">
                <div className="rounded-lg border p-4 sm:p-6">
                  <h2 className="text-lg font-semibold mb-4">
                    Resumen del Pedido
                  </h2>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Envío</span>
                      <span>Calculado al finalizar</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Impuestos</span>
                      <span>Calculado al finalizar</span>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <div className="flex justify-between font-semibold text-base sm:text-lg mb-6">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>

                  <Magnetic
                    intensity={0.2}
                    springOptions={springOptions}
                    actionArea="global"
                    range={200}
                  >
                    <Button
                      className="w-full text-sm sm:text-base"
                      size="lg"
                      onClick={handleOrderViaWhatsApp}
                      disabled={isProcessing || items.length === 0}
                    >
                      {isProcessing ? (
                        <div className="flex items-center">
                          <div className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full"></div>
                          Procesando...
                        </div>
                      ) : (
                        <Magnetic
                          intensity={0.1}
                          springOptions={springOptions}
                          actionArea="global"
                          range={200}
                        >
                          <div className="flex items-center ">
                            <MessageCircle className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                            Ordenar por WhatsApp
                          </div>
                        </Magnetic>
                      )}
                    </Button>
                  </Magnetic>

                  <p className="text-[10px] sm:text-xs text-muted-foreground text-center mt-4">
                    Al realizar un pedido, aceptas nuestros Términos de Servicio
                    y Política de Privacidad.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
