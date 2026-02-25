export interface ICreateJob {
  job_role: string;
  job_type: "FULL_TIME" | "PART_TIME" | "CONTRACT";
  start_date: string;
  end_date: string;
  shift_start: string;
  shift_end: string;
  payment_rate: string;
  staff_needed: number;
  certificates_needed: string[];
  is_urgent: boolean;
  adult_home_id: string;
}