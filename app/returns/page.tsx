'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

const ReturnsPage = () => {
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
        <h1 className="text-4xl font-bold mb-8 text-center">Devoluciones y Cambios</h1>

        {/* Secciones */}
        <div className="space-y-12">
          {/* Sección Derecho de arrepentimiento */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Derecho de arrepentimiento</h2>
            <div className="bg-muted/30 p-4 rounded-lg">
              <p className="text-muted-foreground">
                Según la Ley de Defensa del Consumidor, tenés derecho a cancelar tu compra dentro de los 10 días corridos desde la recepción del producto, sin necesidad de justificar el motivo. En este caso, los gastos de devolución corren por cuenta del proveedor.
              </p>
            </div>
          </section>

          {/* Sección Condiciones */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Condiciones para cambios y devoluciones</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-2">
                <span className="text-primary">🔹</span>
                <p className="text-muted-foreground">
                  El producto debe estar en las mismas condiciones en que fue entregado: sin uso, con su embalaje original y etiquetas correspondientes.
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-primary">🔹</span>
                <p className="text-muted-foreground">
                  Dado que nuestros accesorios son de uso personal, no se aceptarán cambios o devoluciones si el producto ha sido utilizado.
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-primary">🔹</span>
                <p className="text-muted-foreground">
                  Para gestionar cualquier cambio o devolución, el cliente deberá enviar fotos y un video del producto recibido, en el que se muestre el estado original del mismo. Aunque el plazo para cambios o devoluciones es de 10 días, te solicitamos que las imágenes sean lo más claras posible para verificar que el producto no ha sido utilizado.
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-primary">🔹</span>
                <p className="text-muted-foreground">
                  No se aceptarán devoluciones de productos personalizados o hechos a medida, salvo que presenten defectos de fabricación.
                </p>
              </div>
            </div>
          </section>

          {/* Sección Proceso */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">¿Cómo iniciar un cambio o devolución?</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-2">
                <span className="text-primary">1.</span>
                <p className="text-muted-foreground">
                  Contactanos a través de nuestras redes sociales o por correo electrónico dentro del plazo de 10 días desde la recepción del producto.
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-primary">2.</span>
                <p className="text-muted-foreground">
                  Una vez aprobado el cambio o devolución, coordinaremos el retiro o envío del producto según corresponda.
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-primary">3.</span>
                <p className="text-muted-foreground">
                  En caso de ser una devolución por arrepentimiento, el costo del envío correrá por nuestra cuenta. Si se trata de un cambio voluntario (por otro modelo o color), el costo del envío estará a cargo del cliente.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default ReturnsPage
