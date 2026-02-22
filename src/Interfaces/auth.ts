export type UserRole = "CAREGIVER" | "HOMEREPRESENTATIVE" | "ADMIN";

export interface CaregiverProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  city: string;
  state: string;
  street?: string;
  zipcode?: string;
  gender?: string;
  dateOfBirth?: string;
}

export interface ProviderProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  jobTitle?: string;
}

export interface AuthUser {
  id: string;
  username: string;
  role: UserRole;
  profile: CaregiverProfile | ProviderProfile | null;
}
