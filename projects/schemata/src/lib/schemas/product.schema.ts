import {
  BasicWithLocalization,
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
  // Images
  title: string; // Product 1 (XL, Blue)
  sku: string; // product SKU + options ids: P001-XL-B
  price?: number;
  discounted?: number;
  upc?: string;
  stockCount?: number;
  soldCount?: number;
}

export interface Product
  extends BasicWithLocalization,
    Authors,
    Images,
    Content,
    Parents,
    Relationships,
    Taxonomies,
    Statistics {
  // BasicWithLocalization
  sku: string;
  unit: string;
  price: number;
  // Authors
  // Images
  description?: string;
  // Content
  slides?: Post[];
  video?: string;
  discounted?: number;
  brand?: string;
  birthday?: string;
  country?: string;
  upc?: string;
  promotion?: string;
  warranty?: string;
  prop?: {
    weight?: string;
    dimensions?: string;
    [name: string]: unknown;
  };
  stockCount?: number;
  soldCount?: number;
  options?: ProductOption[];
  variants?: ProductVariant[];
  // Parents
  // Relationships
  // Taxonomies
  // Statistics
  keyword?: string;
}
