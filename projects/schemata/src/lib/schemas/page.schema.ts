import {BasicWithLocalization, Images, Content} from '../shared.type';

export interface Page extends BasicWithLocalization, Images, Content {
  // BasicWithLocalization
  // Images
  description?: string;
  // Content
}
