import {
  Ids,
  Status,
  Timing,
  Authors,
  Images,
  Content,
  Parents,
  Relationships,
  Taxonomies,
  Statistics,
} from '../shared.type';
import {Post} from './post.schema';

export interface ProductOption {
  title?: string;
  items: {
    [id: string]: ProductOptionItem;
  };
}

export interface ProductOptionItem {
  title: string;
  content?: unknown; // color code, ...
  offset?: number; // positive or nagative, original price + this
}

export interface ProductVariant extends Images {
  title: string; // Product 1 (XL, Blue)
  sku: string; // product SKU + options ids: P001-XL-B
  price?: number;
  discounted?: number;
  upc?: string;
  // Images
  stockCount?: number;
  soldCount?: number;
}

export interface Product
  extends Ids,
    Status,
    Timing,
    Authors,
    Images,
    Content,
    Parents,
    Relationships,
    Taxonomies,
    Statistics {
  // Ids
  type?: string;
  // Status
  // Timing
  // Authors
  // Images
  description?: string;
  // Content
  slides?: {
    [slide: string]: Post;
  };
  sku: string;
  unit: string;
  price: number;
  discounted?: number;
  brand?: string;
  birthday?: string;
  country?: string;
  upc?: string;
  promotion?: string;
  warranty?: string;
  props?: {
    weight?: string;
    dimensions?: string;
    [name: string]: unknown;
  };
  stockCount?: number;
  soldCount?: number;
  options?: {
    [name: string]: ProductOption;
  };
  variants?: {
    [name: string]: ProductVariant;
  };
  locale?: string;
  origin?: string;
  // Parents
  // Relationships
  // Taxonomies
  // Statistics
  keywords?: string;
}
