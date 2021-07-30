import {Ids, Status, Timing, Images, Statistics} from '../shared.type';

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

export interface Thread extends Ids, Status, Timing, Images, Statistics {
  // Ids
  type?: string;
  // Status
  // Timing
  // Images
  content: string;
  attachments?: {
    [name: string]: ThreadAttachment;
  };
  parent?: string;
  master?: string; // <collection>/<doc> (posts/post-1)
  stars?: number; // with rating stars
  uid?: string;
  email?: string;
  phoneNumber?: string;
  // Statistics
}

export type ParentThread = Omit<Thread, 'parent'>;
export type ChildThread = Thread;

// export type Thread = Thread;
export type Message = ChildThread;
