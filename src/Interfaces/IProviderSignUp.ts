export interface IProviderSignup {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone_number: string;         
  job_title: string;            
  adult_home_name: string;
  adult_home_email: string;
  adult_home_phone: string;
  adult_home_state: string;
  adult_home_city: string;
  adult_home_street: string;
  adult_home_zipcode: string;
  adult_home_website?: string;
  homeDescription: string; 
}