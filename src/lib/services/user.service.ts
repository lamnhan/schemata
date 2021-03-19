import {Status, Timing} from '../types/shared.type';

export interface User extends Status, Timing, UserProperties, UserSecret {
  '#'?: number;
  // Status
  // Timing
  // UserProperties
  // UserSecret
}

export type UserProviderId =
  | 'password'
  | 'custom'
  | 'anonymous'
  | 'google.com'
  | 'facebook.com';
export type UserOobMode = 'resetPassword' | 'verifyEmail' | 'none';

export interface UserAddressDetail {
  zip?: number;
  country?: string;
  province?: string; // or state
  district?: string;
  village?: string; // or town
  street?: string;
  number?: number | string;
  // custom
  [key: string]: unknown;
}

export interface UserAddress {
  default?: boolean;
  publicly?: boolean;
  title?: string;
  text?: string;
  detail?: UserAddressDetail;
}

export interface UserMetadata {
  creationTime?: string;
  lastSignInTime?: string;
}

export interface UserPublicly {
  email?: boolean;
  phoneNumber?: boolean;
  // for .additionalData
  [key: string]: undefined | boolean;
}

export interface UserSettings {
  theme?: string;
  persona?: string;
  locale?: string;
  [key: string]: unknown;
}

export interface UserInfo {
  providerId?: UserProviderId;
  uid: string;
  email?: string;
  displayName?: string;
  photoURL?: string;
  phoneNumber?: string;
}

export interface UserProperties extends UserPrivate, UserContext, UserProfile {
  // UserPrivate
  // UserContext
  // UserProfile
}

export interface UserPrivate {
  providerId?: UserProviderId;
  providerData?: UserInfo[];
  metadata?: UserMetadata;
  publicly?: UserPublicly;
  settings?: UserSettings;
}

export interface UserContext {
  isNew?: boolean;
  isAnonymous?: boolean;
  emailVerified?: boolean;
}

export interface UserProfile extends UserInternalProfile, UserEditableProfile {
  // UserInternalProfile
  // UserEditableProfile
}

export interface UserInternalProfile {
  official?: boolean;
  uid: string;
  email?: string;
  username?: string;
  phoneNumber?: string;
  addresses?: string | Record<string, string | UserAddress>;
  claims?: Record<string, unknown>;
  additionalData?: Record<string, unknown>;
}

export interface UserEditableProfile {
  displayName?: string;
  photoURL?: string;
  coverPhoto?: string;
  intro?: string;
  detail?: string;
  url?: string;
}

export interface UserSecret {
  password?: string;
  refreshToken?: string;
  tokenTimestamp?: number;
  oobCode?: string;
  oobMode?: UserOobMode;
  oobTimestamp?: number;
  jwtWhitelist?: string | string[]; // hashed single/list
  instanceWhitelist?: string | string[]; // hashed single/list
}

export class UserService {
  constructor() {}
}
