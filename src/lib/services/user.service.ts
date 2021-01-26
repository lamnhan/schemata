import {Timing} from '../types/shared.type';
export interface User extends UserInfo, UserSecret {
  '#'?: number;
  // UserInfo
  // UserSecret
}

export type AuthUser = UserInfo & Record<string, Function>;

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
  default?: true;
  title?: string;
  text?: string;
  detail?: UserAddressDetail;
}

export interface UserContexts {
  isNew?: boolean;
  isAnonymous?: boolean;
}

export interface UserProfileSettings {
  publicEmail?: boolean;
  publicPhoneNumber?: boolean;
  publicAddresses?: boolean;
  publicType?: boolean;
  // for additionalData
  [key: string]: unknown;
}

export interface UserInfo extends UserContexts, UserProfile {
  username?: string;
  emailVerified?: boolean;
  lastLogin?: string;
  providerId?: UserProviderId;
  settings?: UserProfileSettings;
  // UserContexts
  // UserProfile
}

export interface UserProfile extends Timing, UserEditableProfile {
  uid?: string;
  type?: string;
  // Timing
  email?: string;
  phoneNumber?: number | string;
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
