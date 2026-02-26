// ─── Create Job Payload (POST /jobs) ─────────────────────────────────────────
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

// ─── Single Job Response (GET /jobs/:jobId) ───────────────────────────────────
export interface IJob {
  id: string;
  job_role: string;
  job_type: "FULL_TIME" | "PART_TIME" ;
  start_date: string;
  end_date: string;
  shift_start: string;
  shift_end: string;
  payment_rate: string;
  staff_needed: number;
  certificates_needed: string[];
  is_urgent: boolean;
  is_filled: boolean;
  createdAt: string;
  updatedAt: string;
}

// ─── Jobs List (GET /jobs/home) ───────────────────────────────────────────────
export type IJobList = IJob[];