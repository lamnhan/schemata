import { Injectable } from '@angular/core';
import { Product } from '@lamnhan/schemata';

import { DatabaseService, DatabaseData } from '@lamnhan/ngx-useful';

@Injectable({
  providedIn: 'root'
})
export class ProductDataService extends DatabaseData<Product> {
  constructor(databaseService: DatabaseService) {
    super(
      databaseService,
      'products',
      {
        updateEffects: [
          { collection: 'products', key: 'relatedProducts' },
        ],
        linkingFields: [
          'createdAt',
          'thumbnails',
          'description',
          'sku',
          'unit',
          'price',
        ],
        effectDataPickers: {
          thumbnails: data => (!data ? undefined : {
            default: {
              name: 'default',
              src: (data.md || data.default).src,
            }
          }),
        }
      }
    );
  }
}
