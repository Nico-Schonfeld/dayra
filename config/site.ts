export type BusinessType =
  | "fashion"
  | "electronics"
  | "food"
  | "beauty"
  | "home"
  | "jewelry"
  | "art"
  | "sports"
  | "toys"
  | "books"
  | "general"

type SocialMedia = {
  platform: string
  url: string
  icon: string
}

type BusinessConfig = {
  name: string
  description: string
  logo: string
  type: BusinessType
  currency: string
  contactEmail: string
  contactPhone: string
  address: string
  socialMedia: SocialMedia[]
  whatsappNumber: string
  showReviews: boolean
  showPromoBanner: boolean
  enableQuickView: boolean
}

export const siteConfig: BusinessConfig = {
  name: "StyleStore",
  description: "Your destination for premium fashion and lifestyle products.",
  logo: "/placeholder.svg?height=40&width=40",
  type: "fashion",
  currency: "USD",
  contactEmail: "contact@stylestore.com",
  contactPhone: "(123) 456-7890",
  address: "123 Fashion Street, Style City, SC 12345",
  socialMedia: [
    {
      platform: "Facebook",
      url: "https://facebook.com",
      icon: "facebook",
    },
    {
      platform: "Instagram",
      url: "https://instagram.com",
      icon: "instagram",
    },
    {
      platform: "Twitter",
      url: "https://twitter.com",
      icon: "twitter",
    },
    {
      platform: "YouTube",
      url: "https://youtube.com",
      icon: "youtube",
    },
  ],
  whatsappNumber: "1234567890",
  showReviews: true,
  showPromoBanner: true,
  enableQuickView: true,
}

// Business type specific configurations
export const businessTypeConfigs: Record<
  BusinessType,
  {
    productLabel: string
    categoryNames: string[]
    featuredSectionTitle: string
    catalogSectionTitle: string
  }
> = {
  fashion: {
    productLabel: "Product",
    categoryNames: ["Clothing", "Accessories", "Footwear", "Bags"],
    featuredSectionTitle: "Featured Collection",
    catalogSectionTitle: "Browse Our Collection",
  },
  electronics: {
    productLabel: "Product",
    categoryNames: ["Smartphones", "Laptops", "Audio", "Accessories"],
    featuredSectionTitle: "Featured Gadgets",
    catalogSectionTitle: "Shop Electronics",
  },
  food: {
    productLabel: "Item",
    categoryNames: ["Appetizers", "Main Courses", "Desserts", "Beverages"],
    featuredSectionTitle: "Chef's Specials",
    catalogSectionTitle: "Our Menu",
  },
  beauty: {
    productLabel: "Product",
    categoryNames: ["Skincare", "Makeup", "Haircare", "Fragrances"],
    featuredSectionTitle: "Trending Products",
    catalogSectionTitle: "Beauty Products",
  },
  home: {
    productLabel: "Item",
    categoryNames: ["Furniture", "Decor", "Kitchen", "Bedding"],
    featuredSectionTitle: "Featured Home Items",
    catalogSectionTitle: "Home Collection",
  },
  jewelry: {
    productLabel: "Piece",
    categoryNames: ["Necklaces", "Rings", "Earrings", "Bracelets"],
    featuredSectionTitle: "Featured Jewelry",
    catalogSectionTitle: "Jewelry Collection",
  },
  art: {
    productLabel: "Artwork",
    categoryNames: ["Paintings", "Sculptures", "Prints", "Photography"],
    featuredSectionTitle: "Featured Artworks",
    catalogSectionTitle: "Art Gallery",
  },
  sports: {
    productLabel: "Item",
    categoryNames: ["Equipment", "Apparel", "Footwear", "Accessories"],
    featuredSectionTitle: "Featured Gear",
    catalogSectionTitle: "Sports Equipment",
  },
  toys: {
    productLabel: "Toy",
    categoryNames: ["Action Figures", "Board Games", "Dolls", "Educational"],
    featuredSectionTitle: "Featured Toys",
    catalogSectionTitle: "Toy Collection",
  },
  books: {
    productLabel: "Book",
    categoryNames: ["Fiction", "Non-Fiction", "Children's", "Educational"],
    featuredSectionTitle: "Featured Books",
    catalogSectionTitle: "Book Collection",
  },
  general: {
    productLabel: "Product",
    categoryNames: ["Featured", "New Arrivals", "Best Sellers", "Sale"],
    featuredSectionTitle: "Featured Products",
    catalogSectionTitle: "Product Catalog",
  },
}

// Helper function to get business type specific text
export function getBusinessText(key: keyof (typeof businessTypeConfigs)[BusinessType]) {
  return businessTypeConfigs[siteConfig.type][key]
}

