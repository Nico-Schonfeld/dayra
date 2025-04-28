'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

const TermsPage = () => {
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
        <h1 className="text-4xl font-bold mb-8 text-center">Términos del Servicio</h1>

        {/* Secciones */}
        <div className="space-y-12">
          {/* Sección 1 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Aceptación de los Términos</h2>
            <p className="text-muted-foreground">
              Al acceder a este sitio web y realizar compras en DAYRA, aceptas cumplir con estos Términos y Condiciones de Servicio. Si no estás de acuerdo con alguna parte de estos términos, te recomendamos no continuar con el uso del sitio.
            </p>
          </section>

          {/* Sección 2 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Modificaciones de los Términos</h2>
            <p className="text-muted-foreground">
              DAYRA se reserva el derecho de modificar o actualizar estos Términos en cualquier momento. Los cambios serán efectivos a partir de su publicación en esta página, por lo que es importante que los revises periódicamente. Al continuar utilizando nuestros servicios después de la modificación de los términos, aceptas las nuevas condiciones.
            </p>
          </section>

          {/* Sección 3 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Productos y Disponibilidad</h2>
            <p className="text-muted-foreground">
              En DAYRA nos esforzamos por ofrecerte productos de alta calidad y disponibilidad. Sin embargo, no garantizamos que todos los productos estén siempre disponibles en stock, ya que algunos son hechos a medida o en edición limitada. En caso de que un producto no esté disponible después de realizar la compra, te contactaremos para ofrecerte una solución (reembolso, cambio de producto, etc.).
            </p>
          </section>

          {/* Sección 4 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Precios</h2>
            <p className="text-muted-foreground">
              Los precios de nuestros productos están expresados en pesos argentinos e incluyen IVA, salvo que se indique lo contrario. Nos reservamos el derecho de modificar los precios sin previo aviso, pero los cambios no afectarán a los pedidos ya realizados.
            </p>
          </section>

          {/* Sección 5 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Métodos de Pago</h2>
            <p className="text-muted-foreground">
              Los métodos de pago disponibles son transferencia bancaria y pago en efectivo. El pago debe ser completado en su totalidad antes de procesar tu pedido. El pago final deberá incluir el costo del producto y el costo de envío, salvo que se haya indicado o acordado otra cosa con el cliente.
            </p>
          </section>

          {/* Sección 6 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Confirmación del Pedido</h2>
            <p className="text-muted-foreground">
              Una vez realizado el pedido, recibirás un mensaje de confirmación a través de WhatsApp con los detalles de tu compra. Si no recibes esta confirmación, por favor contacta con nosotros para asegurarte de que el pedido se ha procesado correctamente.
            </p>
          </section>

          {/* Sección 7 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Envíos y Entregas</h2>
            <p className="text-muted-foreground">
              Los plazos de envío varían según la ubicación y el tipo de servicio elegido. El tiempo de preparación del pedido es de 1 a 4 días hábiles, dependiendo del tipo de producto. Los gastos de envío serán acordados directamente con el cliente antes de la confirmación del pedido. El cliente es responsable de retirar el paquete dentro del plazo indicado por el servicio de correo seleccionado, de lo contrario, los costos de reenvío serán a cargo del cliente.
            </p>
          </section>

          {/* Sección 8 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">8. Cambios y Devoluciones</h2>
            <p className="text-muted-foreground mb-4">
              Los clientes tienen derecho a solicitar un cambio o devolución dentro de los 10 días corridos desde la recepción del producto, siempre que el artículo esté sin uso, en su embalaje original y con las etiquetas intactas. El cliente deberá enviar fotos y un video del producto recibido, con el fin de probar que el mismo no ha sido usado. Los gastos de devolución corren por cuenta del cliente. No se aceptan devoluciones de productos personalizados o hechos a medida, salvo que presenten defectos de fabricación.
            </p>
          </section>

          {/* Sección 9 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">9. Derechos de Propiedad Intelectual</h2>
            <p className="text-muted-foreground">
              El contenido del sitio web de DAYRA, incluyendo pero no limitado a los textos, imágenes, logos, gráficos, y marcas registradas, es propiedad exclusiva de DAYRA y está protegido por las leyes de propiedad intelectual. Queda prohibida la reproducción, distribución o modificación de cualquier contenido sin el permiso expreso de DAYRA.
            </p>
          </section>

          {/* Sección 10 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">10. Limitación de Responsabilidad</h2>
            <p className="text-muted-foreground">
              En DAYRA nos comprometemos a proporcionar productos de calidad, pero no nos responsabilizamos por daños directos o indirectos derivados del uso de nuestros productos, incluido el uso inadecuado de los mismos. La responsabilidad de DAYRA está limitada al valor del producto adquirido.
            </p>
          </section>

          {/* Sección 11 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">11. Protección de Datos Personales</h2>
            <p className="text-muted-foreground">
              Para la gestión de los pedidos y las comunicaciones con los clientes, recopilamos información personal que está protegida por nuestra Política de Privacidad. No compartimos tus datos personales con terceros sin tu consentimiento, salvo para el procesamiento del pedido o como lo exijan las leyes aplicables.
            </p>
          </section>

          {/* Sección 12 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">12. Ley Aplicable y Jurisdicción</h2>
            <p className="text-muted-foreground">
              Estos Términos y Condiciones se regirán por la legislación argentina. Cualquier conflicto relacionado con el uso del sitio o la compra de productos será resuelto por los tribunales competentes de la ciudad de Villa Mercedes, San Luis, Argentina.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}

export default TermsPage
