import {Basic, Statistics} from '../shared.type';

export type ThreadAttachment = LinkAttachment | FileAttachment;

export interface LinkAttachment {
  url: string;
  title?: string;
  description?: string;
  screenshot?: string;
}

export interface FileAttachment {
  url: string;
  name: string;
  mimeType: string;
  size: number;
}

export interface GroupingThread {
  parent: Thread;
  children: Thread[];
}

export interface Thread extends Basic, Statistics {
  // Basic
  content: string;
  parent: string; // composite: '' (top), parent-1 (level 1), parent-1child-1 (lv. 2), ...
  master?: string; // collection#doc
  attachments?: ThreadAttachment[];
  // Statistics
}
