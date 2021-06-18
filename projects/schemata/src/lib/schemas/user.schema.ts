import {Status, Timing} from '../shared.type';

export interface User extends Status, Timing, UserProperties, UserSecret {
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
  number?: string;
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
  uid: string;
  email?: string;
  displayName?: string;
  photoURL?: string;
  phoneNumber?: string;
  providerId?: UserProviderId;
}

export type UserRoles =
  | 'sadmin' // level = 6
  | 'admin' // level = 5
  | 'editor' // level = 4
  | 'author' // level = 3
  | 'contributor' // level = 2
  | 'subscriber'; // level = 1

export type UserLegits = 'average' | 'official' | 'suspicious';

export interface UserClaims {
  role?: UserRoles;
  legit?: UserLegits;
  [name: string]: unknown;
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
  uid: string;
  email?: string;
  username?: string;
  phoneNumber?: string;
  addresses?: {
    [name: string]: UserAddress;
  };
  claims?: UserClaims;
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
  jwtWhitelist?: string[]; // hashed single/list
  instanceWhitelist?: string[]; // hashed single/list
}
