export interface IProviderSignup {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirmPassword: string;      // camelCase for internal usage
  phone_number: string;         // backend expects snake_case
  job_title: string;            // must be included
  adult_home_name: string;
  adult_home_email: string;
  adult_home_phone: string;
  adult_home_state: string;
  adult_home_city: string;
  adult_home_street: string;
  adult_home_zipcode: string;
  adult_home_website?: string;
}
