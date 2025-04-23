"use client";

import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { type BusinessType, businessTypeConfigs } from "@/config/site";

export default function BusinessConfigForm() {
  const [businessName, setBusinessName] = useState("StyleStore");
  const [description, setDescription] = useState(
    "Tu destino para productos premium de moda y estilo de vida."
  );
  const [businessType, setBusinessType] = useState<BusinessType>("fashion");
  const [contactEmail, setContactEmail] = useState("contact@stylestore.com");
  const [contactPhone, setContactPhone] = useState("(123) 456-7890");
  const [address, setAddress] = useState(
    "123 Calle Moda, Ciudad Estilo, CE 12345"
  );
  const [whatsappNumber, setWhatsappNumber] = useState("1234567890");
  const [showReviews, setShowReviews] = useState(true);
  const [showPromoBanner, setShowPromoBanner] = useState(true);
  const [enableQuickView, setEnableQuickView] = useState(true);
  const [open, setOpen] = useState(false);

  const handleSave = () => {
    // En una implementación real, esto se guardaría en una base de datos o archivo de configuración
    console.log({
      businessName,
      description,
      businessType,
      contactEmail,
      contactPhone,
      address,
      whatsappNumber,
      showReviews,
      showPromoBanner,
      enableQuickView,
    });

    alert("¡Configuración guardada exitosamente!");
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Configuración del Negocio</CardTitle>
        <CardDescription>
          Personaliza la configuración de tu tienda para que coincida con tu
          tipo de negocio y preferencias.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="business-name">Nombre del Negocio</Label>
            <Input
              id="business-name"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="business-type">Tipo de Negocio</Label>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-full justify-between"
                >
                  {businessType
                    ? businessType.charAt(0).toUpperCase() +
                      businessType.slice(1)
                    : "Seleccionar tipo de negocio..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput placeholder="Buscar tipo de negocio..." />
                  <CommandList>
                    <CommandEmpty>
                      No se encontró ningún tipo de negocio.
                    </CommandEmpty>
                    <CommandGroup>
                      {Object.keys(businessTypeConfigs).map((type) => (
                        <CommandItem
                          key={type}
                          value={type}
                          onSelect={(currentValue) => {
                            setBusinessType(currentValue as BusinessType);
                            setOpen(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              businessType === type
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Descripción del Negocio</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="contact-email">Correo de Contacto</Label>
            <Input
              id="contact-email"
              type="email"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact-phone">Teléfono de Contacto</Label>
            <Input
              id="contact-phone"
              value={contactPhone}
              onChange={(e) => setContactPhone(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">Dirección del Negocio</Label>
          <Input
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="whatsapp">Número de WhatsApp (para pedidos)</Label>
          <Input
            id="whatsapp"
            value={whatsappNumber}
            onChange={(e) => setWhatsappNumber(e.target.value)}
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">
            Configuración de Características
          </h3>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="show-reviews">Reseñas de Clientes</Label>
              <p className="text-sm text-muted-foreground">
                Mostrar reseñas de clientes en tu tienda
              </p>
            </div>
            <Switch
              id="show-reviews"
              checked={showReviews}
              onCheckedChange={setShowReviews}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="show-promo">Banner Promocional</Label>
              <p className="text-sm text-muted-foreground">
                Mostrar banner promocional en la parte superior de tu tienda
              </p>
            </div>
            <Switch
              id="show-promo"
              checked={showPromoBanner}
              onCheckedChange={setShowPromoBanner}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="quick-view">Vista Rápida</Label>
              <p className="text-sm text-muted-foreground">
                Habilitar vista rápida modal para productos
              </p>
            </div>
            <Switch
              id="quick-view"
              checked={enableQuickView}
              onCheckedChange={setEnableQuickView}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSave} className="ml-auto">
          Guardar Configuración
        </Button>
      </CardFooter>
    </Card>
  );
}
