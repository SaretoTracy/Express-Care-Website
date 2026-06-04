/** Shared job display helpers for caregiver and provider dashboards. */

export const formatJobType = (type: string) =>
  type.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

export const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

export const formatTime = (time: string) => {
  if (!time) return "";
  const [h, m] = time.split(":").map(Number);
  const ampm = h >= 12 ? "PM" : "AM";
  const hour = h % 12 || 12;
  return `${hour}:${m.toString().padStart(2, "0")} ${ampm}`;
};

export const getJobStatus = (job: {
  is_filled: boolean;
  is_urgent: boolean;
}): "Active" | "Filled" | "Urgent" => {
  if (job.is_filled) return "Filled";
  if (job.is_urgent) return "Urgent";
  return "Active";
};
