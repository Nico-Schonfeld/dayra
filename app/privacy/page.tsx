'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

const PrivacyPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 max-w-4xl">
        {/* Botón Volver */}
        <div className="mb-6 sm:mb-8">
          <Link href="/">
            <Button variant="ghost" className="flex items-center gap-2 text-sm sm:text-base">
              <ArrowLeft className="h-4 w-4" />
              Volver al inicio
            </Button>
          </Link>
        </div>

        {/* Título */}
        <h1 className="text-2xl sm:text-4xl font-bold mb-6 sm:mb-8 text-center">Políticas de Privacidad</h1>

        {/* Introducción */}
        <div className="prose prose-sm sm:prose-lg max-w-none mb-8 sm:mb-12">
          <p className="text-muted-foreground text-sm sm:text-base">
            En DAYRA, la privacidad de nuestros clientes es una prioridad. Nos comprometemos a proteger la información personal que compartís con nosotros. A continuación, te detallamos cómo recopilamos, usamos y protegemos tus datos personales.
          </p>
        </div>

        {/* Secciones */}
        <div className="space-y-8 sm:space-y-12">
          {/* Sección 1 */}
          <section>
            <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">1. Recopilación de Datos Personales</h2>
            <p className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4">
              Cuando realizás una compra o interactuás con nosotros en nuestra página web o redes sociales, podemos recopilar la siguiente información:
            </p>
            <ul className="list-disc list-inside space-y-1.5 sm:space-y-2 text-sm sm:text-base text-muted-foreground">
              <li>Datos de contacto: nombre, apellido, dirección de envío, teléfono y correo electrónico.</li>
              <li>Datos de pago: información relacionada con la transferencia bancaria o pago en efectivo.</li>
              <li>Datos de navegación: información sobre cómo usás nuestro sitio web, a través de cookies o herramientas de análisis web.</li>
            </ul>
          </section>

          {/* Sección 2 */}
          <section>
            <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">2. Uso de los Datos Personales</h2>
            <p className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4">
              La información recopilada se utilizará exclusivamente para los siguientes fines:
            </p>
            <ul className="list-disc list-inside space-y-1.5 sm:space-y-2 text-sm sm:text-base text-muted-foreground">
              <li>Procesar y enviar tus pedidos.</li>
              <li>Gestionar la atención al cliente.</li>
              <li>Enviar comunicaciones relacionadas con tu compra o nuestros productos.</li>
              <li>Enviar promociones, ofertas o novedades (solo si te suscribís a nuestra lista de correo y nos autorizás a hacerlo).</li>
              <li>Mejorar la experiencia de compra a través del análisis de los datos de navegación.</li>
            </ul>
          </section>

          {/* Sección 3 */}
          <section>
            <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">3. Seguridad de la Información</h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              En DAYRA nos tomamos muy en serio la protección de tu información personal. Implementamos medidas de seguridad razonables para evitar el acceso no autorizado, la alteración, divulgación o destrucción de tus datos personales. Sin embargo, tené en cuenta que ningún sistema de transmisión de datos a través de internet es 100% seguro.
            </p>
          </section>

          {/* Sección 4 */}
          <section>
            <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">4. Derechos del Usuario</h2>
            <p className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4">
              De acuerdo con la Ley 25.326 de Protección de Datos Personales, tenés derecho a:
            </p>
            <ul className="list-disc list-inside space-y-1.5 sm:space-y-2 text-sm sm:text-base text-muted-foreground">
              <li>Acceder a la información personal que tenemos sobre vos.</li>
              <li>Rectificar cualquier dato incorrecto o desactualizado.</li>
              <li>Eliminar tus datos personales cuando ya no sean necesarios para el propósito por el cual los recopilamos.</li>
              <li>Revocar tu consentimiento en cualquier momento, especialmente en relación a la recepción de comunicaciones comerciales, simplemente poniéndote en contacto con nosotros a través de nuestros canales de atención.</li>
            </ul>
          </section>

          {/* Sección 5 */}
         

          {/* Sección 6 */}
          <section>
            <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">5. Compartir Información con Terceros</h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              En algunos casos, podemos compartir tus datos personales con empresas de transporte y servicios de pago únicamente para procesar tu pedido. No vendemos ni alquilamos tu información personal a terceros para fines comerciales.
            </p>
          </section>

          {/* Sección 7 */}
          <section>
            <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">6. Modificaciones a las Políticas de Privacidad</h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              DAYRA se reserva el derecho de modificar estas políticas de privacidad en cualquier momento. En caso de que haya cambios, los publicaremos en esta página y te notificaremos de manera apropiada.
            </p>
          </section>

          {/* Sección 8 */}
          <section>
            <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">7. Contacto</h2>
            <p className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4">
              Si tenés alguna pregunta o inquietud sobre nuestras políticas de privacidad o sobre cómo manejamos tus datos personales, no dudes en contactarnos a través de:
            </p>
            <ul className="list-disc list-inside space-y-1.5 sm:space-y-2 text-sm sm:text-base text-muted-foreground">
              <li>Correo electrónico: accesoriosdayra@gmail.com</li>
              <li>Redes sociales: INSTAGRAM @dayra.accesorios</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}

export default PrivacyPage
