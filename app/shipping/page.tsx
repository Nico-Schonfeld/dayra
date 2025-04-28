'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

const ShippingPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Botón Volver */}
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Volver al inicio
            </Button>
          </Link>
        </div>

        {/* Título */}
        <h1 className="text-4xl font-bold mb-8 text-center">Políticas de Envío</h1>

        {/* Secciones */}
        <div className="space-y-12">
          {/* Sección Cobertura */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Cobertura</h2>
            <p className="text-muted-foreground">
              Realizamos envíos a todo el territorio de la República Argentina excepto Tierra del Fuego.
            </p>
          </section>

          {/* Sección Costo de envío */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Costo de envío</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Villa Mercedes, San Luis</h3>
                <p className="text-muted-foreground">
                  Entrega sin costo adicional si se coordina en el centro de la ciudad (viernes y sábado por la tarde). En caso de optar por envío mediante comisionista, el costo corre por cuenta del comprador y se calculará al momento de la compra.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Resto del país</h3>
                <p className="text-muted-foreground">
                  Una vez confirmado tu pedido, nos pondremos en contacto con vos por WhatsApp para coordinar el envío. Te informaremos las opciones de correo disponibles (Correo Argentino, OCA, comisionista o mensajería, según disponibilidad) y sus costos actualizados. El método de envío será a elección del comprador, quien también se hará cargo del costo correspondiente.
                </p>
                <p className="text-muted-foreground mt-2">
                  El número de seguimiento y toda la información necesaria se enviará una vez despachado el pedido.
                </p>
              </div>
            </div>
          </section>

          {/* Sección Plazos de entrega */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Plazos de entrega</h2>
            <div className="space-y-6">
              <p className="text-muted-foreground">
                Una vez confirmado tu pedido vía WhatsApp, comenzamos a preparar tu paquete.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-2">
                  <span className="text-primary">🔹</span>
                  <p className="text-muted-foreground">
                    Para envíos por correo, la preparación puede demorar entre 1 y 4 días hábiles antes de ser despachado.
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-primary">🔹</span>
                  <p className="text-muted-foreground">
                    Para envíos personalizados, entregas acordadas o retiros en punto físico/local, la preparación del paquete puede demorar hasta 1 día hábil. La modalidad de entrega será coordinada previamente a través de WhatsApp.
                  </p>
                </div>
              </div>
              <p className="text-muted-foreground">
                Una vez que el pedido haya sido entregado al correo o al comisionista, recibirás un mensaje por WhatsApp con el número de seguimiento correspondiente, para que puedas rastrear tu paquete en todo momento. ✨
              </p>
              <div className="bg-muted/30 p-4 rounded-lg">
                <p className="text-muted-foreground">
                  Los tiempos de entrega varían según tu ubicación y el servicio de correo seleccionado, por lo que es necesario que prestes especial atención al seguimiento y llegada del paquete. Dependiendo del correo elegido, tendrás un plazo determinado para retirarlo de la sucursal. Si no es retirado dentro de ese plazo, el paquete regresará automáticamente a su lugar de origen. En caso de que esto ocurra y desees que te lo reenviemos, el nuevo costo de envío correrá por tu cuenta. Lamentablemente, no podemos responsabilizarnos por paquetes no retirados a tiempo.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default ShippingPage
