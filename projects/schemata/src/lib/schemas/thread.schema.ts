import {Ids, Status, Timing, Statistics} from '../shared.type';

export interface ThreadAttachment {
  // link attachment
  link?: string;
  // file attachment
  id?: string; // Drive file id or undefined for Gmail attachments
  name?: string;
  mimeType?: string;
  size?: number;
}

export interface GroupingThread {
  parent: Thread;
  children: Thread[];
}

export interface Thread extends Ids, Status, Timing, Statistics {
  // Ids
  type?: string;
  // Status
  // Timing
  content: string;
  attachments?: ThreadAttachment[];
  parent?: false | string; // composite
  master?: string; // collection#doc
  uid?: string;
  // Statistics
}
