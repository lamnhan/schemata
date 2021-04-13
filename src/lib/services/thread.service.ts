import {Ids, Status, Timing, Statistics} from '../types/shared.type';

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
  attachments?: {
    [name: string]: ThreadAttachment;
  };
  parent?: string;
  master?: string; // <collection>/<doc> (posts/post-1)
  stars?: number; // with rating stars
  uid?: string;
  email?: string;
  displayName?: string;
  phoneNumber?: number | string;
  // Statistics
}

export type ParentThread = Omit<Thread, 'parent'>;
export type ChildThread = Thread;

// export type Thread = Thread;
export type Message = ChildThread;

export class ThreadService {
  constructor() {}
}
