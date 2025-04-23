import Head from "next/head"
import { siteConfig } from "@/config/site"

interface SeoMetaProps {
  title?: string
  description?: string
  canonical?: string
  image?: string
  type?: "website" | "article" | "product"
  product?: {
    name: string
    price: number
    currency: string
    sku: string
    availability: "in stock" | "out of stock"
  }
}

export default function SeoMeta({ title, description, canonical, image, type = "website", product }: SeoMetaProps) {
  const metaTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.name
  const metaDescription = description || siteConfig.description
  const metaImage = image || "/placeholder.svg?height=1200&width=630"
  const url = canonical || "https://yourdomain.com"

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImage} />

      {/* Product Schema for SEO */}
      {type === "product" && product && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org/",
              "@type": "Product",
              name: product.name,
              image: metaImage,
              description: metaDescription,
              sku: product.sku,
              brand: {
                "@type": "Brand",
                name: siteConfig.name,
              },
              offers: {
                "@type": "Offer",
                url: url,
                priceCurrency: product.currency,
                price: product.price,
                availability: `https://schema.org/${product.availability === "in stock" ? "InStock" : "OutOfStock"}`,
              },
            }),
          }}
        />
      )}
    </Head>
  )
}

