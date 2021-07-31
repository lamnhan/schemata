import {BasicWithLocalization, Authors, Images, Content} from '../shared.type';

export interface Page extends BasicWithLocalization, Authors, Images, Content {
  // BasicWithLocalization
  // Authors
  // Images
  description?: string;
  // Content
}
