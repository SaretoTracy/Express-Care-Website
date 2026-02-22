import React, { useContext, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Submitbutton } from "../../components/ButtonComponents/Submitbutton";
import { ErrorValidation } from "../../components/ErrorValidation";
import { formPhoneNumber } from "../../components/globalFunctions";
import { toast } from "react-toastify";
import { SwitchToggleContext } from "../../context/GeneralContext";
import type { ICaregiverSignup } from "../../Interfaces/ICaregiverSignUp";
import { caregiverSignupValidator } from "../../validation/signupValidation";
import { registerCaregiver } from "../../services/authService";

// ── Inline styles injected once ──────────────────────────────────────────────
const injectStyles = () => {
  if (document.getElementById("cg-signup-styles")) return;
  const style = document.createElement("style");
  style.id = "cg-signup-styles";
  style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@700&display=swap');

    .cg-wrap {
      min-height: 100vh;
      background: linear-gradient(135deg, #f8f4ef 0%, #eef3ff 50%, #fdf0e0 100%);
      font-family: 'DM Sans', sans-serif;
      padding: 2.5rem 1rem 4rem;
    }

    /* ── Hero header ── */
    .cg-hero { text-align: center; margin-bottom: 2.5rem; }
    .cg-hero-badge {
      display: inline-block;
      background: #fde8cc;
      color: #7a3d00;
      font-size: 0.72rem;
      font-weight: 700;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      padding: 0.25rem 0.9rem;
      border-radius: 999px;
      margin-bottom: 0.9rem;
    }
    .cg-hero h1 {
      font-family: 'Playfair Display', serif;
      font-size: clamp(1.8rem, 4vw, 2.6rem);
      color: #2c4a60;
      margin: 0 0 0.5rem;
      line-height: 1.15;
    }
    .cg-hero h1 span { color: #E68A1F; }
    .cg-hero p { color: #64748b; font-size: 1rem; margin: 0; }

    /* ── Card ── */
    .cg-card {
      background: #ffffff;
      border-radius: 20px;
      box-shadow: 0 4px 6px -1px rgba(0,0,0,0.06), 0 20px 60px -10px rgba(85,122,149,0.15);
      max-width: 780px;
      margin: 0 auto;
      overflow: hidden;
    }

    /* ── Section header strip ── */
    .cg-section-header {
      background: linear-gradient(90deg, #3a5a72 0%, #557A95 100%);
      padding: 1rem 1.75rem;
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }
    .cg-section-icon {
      width: 32px; height: 32px;
      background: rgba(255,255,255,0.15);
      border-radius: 8px;
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0;
    }
    .cg-section-icon svg { width: 16px; height: 16px; stroke: #fde8cc; fill: none; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
    .cg-section-header h2 { color: #fff; font-size: 0.95rem; font-weight: 600; margin: 0; }
    .cg-section-header p { color: #b8d0e0; font-size: 0.78rem; margin: 0; }

    /* ── Divider ── */
    .cg-divider {
      display: flex; align-items: center; gap: 0.75rem;
      padding: 1.25rem 1.75rem 0;
    }
    .cg-divider-line { flex: 1; height: 1px; background: #e2e8f0; }
    .cg-divider-label { color: #94a3b8; font-size: 0.7rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; white-space: nowrap; }

    /* ── Form body ── */
    .cg-form-body { padding: 1.5rem 1.75rem 2rem; }

    /* ── Field groups ── */
    .cg-row { display: grid; gap: 1rem; margin-bottom: 1rem; }
    .cg-row-2 { grid-template-columns: 1fr 1fr; }
    @media (max-width: 580px) { .cg-row-2 { grid-template-columns: 1fr; } }

    /* ── Field ── */
    .cg-field { display: flex; flex-direction: column; gap: 0.35rem; }
    .cg-label {
      font-size: 0.8rem;
      font-weight: 600;
      color: #374151;
      letter-spacing: 0.01em;
    }
    .cg-label sup { color: #ef4444; font-size: 0.7rem; }
    .cg-input, .cg-select {
      height: 42px;
      padding: 0 0.875rem;
      border: 1.5px solid #e2e8f0;
      border-radius: 10px;
      font-family: 'DM Sans', sans-serif;
      font-size: 0.9rem;
      color: #1e293b;
      background: #f8fafc;
      transition: border-color 0.18s, box-shadow 0.18s, background 0.18s;
      outline: none;
      width: 100%;
      box-sizing: border-box;
    }
    .cg-input:focus, .cg-select:focus {
      border-color: #E68A1F;
      background: #fff;
      box-shadow: 0 0 0 3px rgba(230,138,31,0.15);
    }
    .cg-input.err, .cg-select.err {
      border-color: #ef4444;
      background: #fff5f5;
    }
    .cg-input.err:focus, .cg-select.err:focus {
      box-shadow: 0 0 0 3px rgba(239,68,68,0.12);
    }
    .cg-select { appearance: none; cursor: pointer; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2.5'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 0.875rem center; padding-right: 2.25rem; }

    /* ── Password strength ── */
    .cg-pw-wrap { position: relative; }
    .cg-pw-toggle { position: absolute; right: 0.875rem; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer; color: #94a3b8; padding: 0; display: flex; align-items: center; }
    .cg-pw-toggle:hover { color: #64748b; }
    .cg-pw-toggle svg { width: 16px; height: 16px; }

    /* ── Section: address ── */
    .cg-address-section { margin-top: 0.5rem; }

    /* ── Phone prefix ── */
    .cg-phone-wrap { display: flex; align-items: stretch; }
    .cg-phone-prefix {
      background: #f1f5f9;
      border: 1.5px solid #e2e8f0;
      border-right: none;
      border-radius: 10px 0 0 10px;
      padding: 0 0.75rem;
      display: flex; align-items: center;
      color: #64748b; font-size: 0.85rem; font-weight: 600;
      white-space: nowrap;
    }
    .cg-phone-wrap .cg-input { border-radius: 0 10px 10px 0; }

    /* ── Checkbox / terms ── */
    .cg-terms { display: flex; align-items: flex-start; gap: 0.6rem; margin-top: 1.25rem; }
    .cg-checkbox {
      width: 18px; height: 18px; flex-shrink: 0;
      accent-color: #E68A1F;
      margin-top: 2px; cursor: pointer;
    }
    .cg-terms-text { font-size: 0.85rem; color: #64748b; }
    .cg-terms-text a { color: #557A95; text-decoration: underline; }

    /* ── Footer ── */
    .cg-footer {
      padding: 1.25rem 1.75rem 1.75rem;
      border-top: 1px solid #f1f5f9;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 1rem;
    }
    .cg-login-link { font-size: 0.85rem; color: #64748b; }
    .cg-login-link a { color: #557A95; font-weight: 600; text-decoration: none; }
    .cg-login-link a:hover { text-decoration: underline; }

    /* ── Submit button override ── */
    .cg-submit-btn {
      background: linear-gradient(135deg, #E68A1F 0%, #c4721a 100%);
      color: #fff;
      font-family: 'DM Sans', sans-serif;
      font-size: 0.9rem;
      font-weight: 700;
      border: none;
      border-radius: 10px;
      padding: 0.7rem 1.75rem;
      cursor: pointer;
      transition: transform 0.15s, box-shadow 0.15s, filter 0.15s;
      letter-spacing: 0.02em;
    }
    .cg-submit-btn:hover {
      transform: translateY(-1px);
      box-shadow: 0 6px 18px rgba(230,138,31,0.4);
      filter: brightness(1.05);
    }
    .cg-submit-btn:active { transform: translateY(0); }

    /* ── Progress dots ── */
    .cg-progress {
      display: flex; gap: 6px; align-items: center;
      justify-content: center; margin-bottom: 1.5rem;
    }
    .cg-dot {
      width: 8px; height: 8px; border-radius: 50%;
      background: #e2e8f0; transition: background 0.2s, transform 0.2s;
    }
    .cg-dot.active { background: #E68A1F; transform: scale(1.3); }
    .cg-dot.done { background: #557A95; }

    /* ── Error text ── */
    .cg-err { font-size: 0.75rem; color: #ef4444; margin-top: 0.15rem; display: flex; align-items: center; gap: 0.3rem; }
    .cg-err::before { content: '!'; display: inline-flex; align-items: center; justify-content: center; width: 13px; height: 13px; border-radius: 50%; background: #ef4444; color: #fff; font-size: 0.6rem; font-weight: 700; flex-shrink: 0; }

    /* ── Fade-in ── */
    @keyframes cgFadeUp {
      from { opacity: 0; transform: translateY(18px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .cg-card { animation: cgFadeUp 0.45s ease both; }
  `;
  document.head.appendChild(style);
};

// Small helper to keep template tidy
const Field: React.FC<{
  label: string;
  required?: boolean;
  error?: boolean;
  errorMsg?: string;
  children: React.ReactNode;
}> = ({ label, required, error, errorMsg, children }) => (
  <div className="cg-field">
    <label className="cg-label">
      {label} {required && <sup>*</sup>}
    </label>
    {children}
    {error && errorMsg && <span className="cg-err">{errorMsg}</span>}
  </div>
);

export const CaregiverSignup: React.FC = () => {
  injectStyles();

  const navigate = useNavigate();
  const context = useContext(SwitchToggleContext);
  const switchSpinnerOn = context?.switchSpinnerOn ?? (() => {});
  const switchSpinnerOff = context?.switchSpinnerOff ?? (() => {});

  const [phoneNumber, setPhoneNumber] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICaregiverSignup>();

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(formPhoneNumber(e.target.value));
  };

  const handleSignupSubmit: SubmitHandler<ICaregiverSignup> = async (data) => {
    switchSpinnerOn();
    try {
      const validated = caregiverSignupValidator.parse(data);
      const payload = {
        firstName: validated.firstName,
        lastName: validated.lastName,
        email: validated.email,
        password: validated.password,
        confirmPassword: validated.confirmPassword,
        dateOfBirth: validated.dateOfBirth.toString(),
        gender: validated.gender,
        phoneNumber: validated.phoneNumber,
        city: validated.city,
        state: validated.state,
        street: validated.street,
        zipcode: validated.zipcode,
        role: "Caregiver",
      };
      await registerCaregiver(payload);
      toast.success("Account created successfully!");
      navigate("/login", { replace: true });
    } catch (error: any) {
      if (error?.errors) {
        toast.error(error.errors[0].message);
      } else if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message || "An unexpected error occurred");
      }
    } finally {
      switchSpinnerOff();
    }
  };

  const EyeIcon = ({ open }: { open: boolean }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {open ? (
        <>
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <circle cx="12" cy="12" r="3" />
        </>
      ) : (
        <>
          <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
          <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
          <line x1="1" y1="1" x2="23" y2="23" />
        </>
      )}
    </svg>
  );

  return (
    <div className="cg-wrap">
      {/* Hero */}
      <div className="cg-hero">
        <span className="cg-hero-badge">✦ Join Our Team</span>
        <h1>
          Create Your <span>Caregiver</span> Account
        </h1>
        <p>Your dream job is one step away — let's get you started</p>
      </div>

      <div className="cg-card">
        <form onSubmit={handleSubmit(handleSignupSubmit)}>

          {/* ── Personal Info Section ── */}
          <div className="cg-section-header">
            <div className="cg-section-icon">
              <svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
            </div>
            <div>
              <h2>Personal Information</h2>
              <p>Tell us a bit about yourself</p>
            </div>
          </div>

          <div className="cg-form-body">
            <div className="cg-row cg-row-2">
              <Field label="First Name" required error={!!errors.firstName} errorMsg="Field cannot be empty">
                <input className={`cg-input${errors.firstName ? " err" : ""}`} type="text" {...register("firstName", { required: true })} placeholder="Jane" />
              </Field>
              <Field label="Last Name" required error={!!errors.lastName} errorMsg="Field cannot be empty">
                <input className={`cg-input${errors.lastName ? " err" : ""}`} type="text" {...register("lastName", { required: true })} placeholder="Doe" />
              </Field>
            </div>

            <div className="cg-row cg-row-2">
              <Field label="Date of Birth" required error={!!errors.dateOfBirth} errorMsg="Field cannot be empty">
                <input className={`cg-input${errors.dateOfBirth ? " err" : ""}`} type="date" {...register("dateOfBirth", { required: true })} />
              </Field>
              <Field label="Gender" required error={!!errors.gender} errorMsg="Please select your gender">
                <select className={`cg-select${errors.gender ? " err" : ""}`} defaultValue="" {...register("gender", { required: true })}>
                  <option value="" disabled>Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </Field>
            </div>
          </div>

          {/* ── Account Section ── */}
          <div className="cg-section-header">
            <div className="cg-section-icon">
              <svg viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
            </div>
            <div>
              <h2>Account Credentials</h2>
              <p>Secure your account with a strong password</p>
            </div>
          </div>

          <div className="cg-form-body">
            <div className="cg-row">
              <Field label="Email Address" required error={!!errors.email} errorMsg="Please enter a valid email">
                <input className={`cg-input${errors.email ? " err" : ""}`} type="email" {...register("email", { required: true })} placeholder="jane.doe@email.com" />
              </Field>
            </div>
            <div className="cg-row cg-row-2">
              <Field label="Password" required error={!!errors.password} errorMsg="Invalid password format">
                <div className="cg-pw-wrap">
                  <input className={`cg-input${errors.password ? " err" : ""}`} type={showPw ? "text" : "password"} {...register("password", { required: true })} placeholder="Min. 8 characters" style={{ paddingRight: "2.5rem" }} />
                  <button type="button" className="cg-pw-toggle" onClick={() => setShowPw(p => !p)}><EyeIcon open={showPw} /></button>
                </div>
              </Field>
              <Field label="Confirm Password" required error={!!errors.confirmPassword} errorMsg="Passwords do not match">
                <div className="cg-pw-wrap">
                  <input className={`cg-input${errors.confirmPassword ? " err" : ""}`} type={showConfirm ? "text" : "password"} {...register("confirmPassword", { required: true })} placeholder="Re-enter password" style={{ paddingRight: "2.5rem" }} />
                  <button type="button" className="cg-pw-toggle" onClick={() => setShowConfirm(p => !p)}><EyeIcon open={showConfirm} /></button>
                </div>
              </Field>
            </div>
          </div>

          {/* ── Address Section ── */}
          <div className="cg-section-header">
            <div className="cg-section-icon">
              <svg viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
            </div>
            <div>
              <h2>Address Details</h2>
              <p>Where are you based?</p>
            </div>
          </div>

          <div className="cg-form-body">
            <div className="cg-row cg-row-2">
              <Field label="State" required error={!!errors.state} errorMsg="Field cannot be empty">
                <input className={`cg-input${errors.state ? " err" : ""}`} type="text" {...register("state", { required: true })} placeholder="e.g. California" />
              </Field>
              <Field label="City" required error={!!errors.city} errorMsg="Field cannot be empty">
                <input className={`cg-input${errors.city ? " err" : ""}`} type="text" {...register("city", { required: true })} placeholder="e.g. Los Angeles" />
              </Field>
            </div>
            <div className="cg-row cg-row-2">
              <Field label="Zip Code" required error={!!errors.zipcode} errorMsg="Field cannot be empty">
                <input className={`cg-input${errors.zipcode ? " err" : ""}`} type="text" {...register("zipcode", { required: true })} placeholder="e.g. 90001" />
              </Field>
              <Field label="Street Address" required error={!!errors.street} errorMsg="Field cannot be empty">
                <input className={`cg-input${errors.street ? " err" : ""}`} type="text" {...register("street", { required: true })} placeholder="e.g. 123 Main St" />
              </Field>
            </div>
            <div className="cg-row" style={{ marginTop: "0.25rem" }}>
              <Field label="Phone Number" required error={!!errors.phoneNumber} errorMsg="Enter a valid phone number">
                <div className="cg-phone-wrap">
                  <span className="cg-phone-prefix">🇺🇸 +1</span>
                  <input
                    className={`cg-input${errors.phoneNumber ? " err" : ""}`}
                    type="tel"
                    {...register("phoneNumber", { required: true, minLength: 10 })}
                    onChange={handlePhoneNumberChange}
                    value={phoneNumber}
                    placeholder="(555) 000-0000"
                  />
                </div>
              </Field>
            </div>
          </div>

          {/* ── Footer ── */}
          <div className="cg-footer">
            <div style={{ flex: 1 }}>
              <div className="cg-terms">
                <input
                  className="cg-checkbox"
                  type="checkbox"
                  id="terms"
                  {...register("terms", { required: true })}
                />
                <label htmlFor="terms" className="cg-terms-text">
                  I agree to all the{" "}
                  <Link to="">Terms and Conditions</Link>
                </label>
              </div>
              {errors.terms && <span className="cg-err" style={{ marginTop: "0.35rem" }}>You must accept the terms and conditions to proceed</span>}
              <div className="cg-login-link" style={{ marginTop: "0.75rem" }}>
                Already have an account? <Link to="/login">Sign in</Link>
              </div>
            </div>
            <button type="submit" className="cg-submit-btn">
              Create Account →
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};