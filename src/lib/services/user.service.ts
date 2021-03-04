export type AuthUser = UserProperties & UserMethods;

export interface UserMethods {
  [method: string]: Function;
}

export interface User extends UserProperties, UserSecret {
  '#'?: number;
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

export interface UserSettings {
  // profile settings
  emailPublicly?: boolean;
  phoneNumberPublicly?: boolean;
  addressesPublicly?: boolean;
  typePublicly?: boolean;
  // built-in
  theme?: string;
  persona?: string;
  locale?: string;
  // for additionalData visiblity or any things
  [key: string]: unknown;
}

export interface UserInfo {
  providerId?: UserProviderId;
  uid?: string;
  displayName?: string;
  photoURL?: string;
  email?: string;
  phoneNumber?: string;
}

export interface UserProperties extends UserContexts, UserProfile {
  username?: string;
  emailVerified?: boolean;
  providerId?: UserProviderId;
  providerData?: UserInfo[];
  metadata?: UserMetadata;
  settings?: UserSettings;
  // UserContexts
  // UserProfile
}

export interface UserContexts {
  isNew?: boolean;
  isAnonymous?: boolean;
}

export interface UserProfile extends UserEditableProfile {
  uid?: string;
  type?: string;
  email?: string;
  phoneNumber?: string;
  claims?: Record<string, unknown>;
  // UserEditableProfile
}

export interface UserEditableProfile {
  displayName?: string;
  photoURL?: string;
  bio?: string;
  url?: string;
  addresses?: string | Record<string, string | UserAddress>;
  additionalData?: Record<string, unknown>;
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
