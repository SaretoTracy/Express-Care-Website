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
  job_description: string; // ← added, required by server
}

// ─── Single Job Response (GET /jobs/:jobId) ───────────────────────────────────
export interface IJob {
  id: string;
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
  is_filled: boolean;
  job_description: string;
  createdAt: string;
  updatedAt: string;
}

// ─── Jobs List ────────────────────────────────────────────────────────────────
export type IJobList = IJob[];

// ─── Apply for Job Payload (POST /jobs/application) ──────────────────────────
export interface IApplyJob {
  caregiver_id: string;
  job_id: string;
}

// ─── Job Application Response (GET /jobs/application/:id) ────────────────────
export interface IJobApplication {
  id: string;
  caregiver_id: string;
  job_id: string;
  status: "PENDING" | "ACCEPTED" | "REJECTED";
  appliedAt: string;
  acceptedAt: string | null;
  rejectedAt: string | null;
  updatedAt: string;
}