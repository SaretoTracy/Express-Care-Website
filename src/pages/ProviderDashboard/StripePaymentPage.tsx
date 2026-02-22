import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Lock,
  Shield,
  Calendar,
  Star,
  CheckCircle,
  CreditCard,
  Sparkles,
  ArrowRight,
  Check,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/*                                CONFIG                                      */
/* -------------------------------------------------------------------------- */

const PLAN = {
  name: "Premium Provider",
  price: 99,
  period: "/month",
  benefits: [
    "Unlimited job postings",
    "Access to verified caregivers",
    "Priority support 24/7",
    "Background check integration",
    "Featured job listings",
  ],
};

/* -------------------------------------------------------------------------- */
/*                              ANIMATIONS                                    */
/* -------------------------------------------------------------------------- */

const fadeUp = {
  initial: { y: 20, opacity: 0 },
  animate: { y: 0, opacity: 1 },
};

/* -------------------------------------------------------------------------- */
/*                            SMALL COMPONENTS                                 */
/* -------------------------------------------------------------------------- */

const FadeIn = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) => (
  <motion.div
    variants={fadeUp}
    initial="initial"
    animate="animate"
    transition={{ delay }}
  >
    {children}
  </motion.div>
);

const Input = ({
  label,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label}
    </label>
    <input
      {...props}
      className="w-full border-2 border-gray-200 rounded-xl px-4 py-3.5
      focus:ring-2 focus:ring-[#e68a1f] focus:border-transparent
      transition-all outline-none font-mono"
    />
  </div>
);

/* -------------------------------------------------------------------------- */
/*                             CARD PREVIEW                                   */
/* -------------------------------------------------------------------------- */

const CardPreview = ({
  name,
  number,
  expiry,
  cvv,
  showBack,
}: {
  name: string;
  number: string;
  expiry: string;
  cvv: string;
  showBack: boolean;
}) => (
  <motion.div
    animate={{ rotateY: showBack ? 180 : 0 }}
    transition={{ duration: 0.6 }}
    className="relative w-full h-56 rounded-2xl shadow-2xl mb-10"
    style={{ transformStyle: "preserve-3d" }}
  >
    {/* FRONT */}
    <div
      className="absolute inset-0 rounded-2xl p-7 text-white"
      style={{
        backfaceVisibility: "hidden",
        background:
          "linear-gradient(135deg, #e68a1f 0%, #d47920 50%, #557a95 100%)",
      }}
    >
      <div className="w-14 h-10 bg-gradient-to-br from-yellow-200 to-yellow-400 rounded-lg mb-8 shadow-inner" />
      <p className="tracking-[0.3em] text-xl mb-6 font-mono">
        {number || "•••• •••• •••• ••••"}
      </p>
      <div className="flex justify-between text-sm">
        <span>{name || "CARDHOLDER NAME"}</span>
        <span>{expiry || "MM/YY"}</span>
      </div>
    </div>

    {/* BACK */}
    <div
      className="absolute inset-0 bg-slate-800 rounded-2xl p-7"
      style={{
        transform: "rotateY(180deg)",
        backfaceVisibility: "hidden",
      }}
    >
      <div className="bg-black h-10 mb-6" />
      <div className="bg-white text-black p-2 text-right rounded font-mono">
        {cvv || "•••"}
      </div>
    </div>
  </motion.div>
);

/* -------------------------------------------------------------------------- */
/*                              MAIN PAGE                                     */
/* -------------------------------------------------------------------------- */

const StripePaymentPage: React.FC = () => {
  const [form, setForm] = useState({
    name: "",
    number: "",
    expiry: "",
    cvv: "",
  });

  const [showBack, setShowBack] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState<"payment" | "success">("payment");

  /* -------------------------- Formatting Logic -------------------------- */

  const formatValue = (field: string, value: string) => {
    const digits = value.replace(/\D/g, "");

    if (field === "number")
      return digits.slice(0, 16).replace(/(\d{4})/g, "$1 ").trim();

    if (field === "expiry")
      return digits.length >= 2
        ? `${digits.slice(0, 2)}/${digits.slice(2, 4)}`
        : digits;

    if (field === "cvv") return digits.slice(0, 3);

    return value.toUpperCase();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: formatValue(name, value),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep("success");
    }, 1800);
  };

  /* ----------------------------- SUCCESS ----------------------------- */

  if (step === "success") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <motion.div {...fadeUp} className="bg-white p-10 rounded-3xl shadow-2xl text-center">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="text-white w-10 h-10" />
          </div>
          <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-[#e68a1f] to-[#557a95] bg-clip-text text-transparent">
            Payment Successful
          </h2>
          <p className="text-gray-600">
            Your {PLAN.name} subscription is active
          </p>
        </motion.div>
      </div>
    );
  }

  /* ----------------------------- PAYMENT ----------------------------- */

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <motion.div
        {...fadeUp}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-3xl max-w-6xl w-full grid md:grid-cols-5 shadow-2xl border"
      >
        {/* LEFT */}
        <div className="md:col-span-2 bg-slate-50 p-10">
          <FadeIn delay={0.2}>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#e68a1f] to-[#557a95] flex items-center justify-center">
                <Sparkles className="text-white" />
              </div>
              <span className="font-semibold text-lg">Premium Provider</span>
            </div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="bg-white rounded-2xl p-6 shadow">
              <p className="text-gray-500 text-sm">{PLAN.name}</p>
              <p className="text-5xl font-bold text-[#e68a1f]">${PLAN.price}</p>
              <p className="text-gray-400 text-sm">per month</p>
            </div>
          </FadeIn>

          <div className="mt-8 space-y-3 text-sm text-gray-600">
            {PLAN.benefits.map((b, i) => (
              <FadeIn key={b} delay={0.4 + i * 0.1}>
                <div className="flex gap-3">
                  <Check size={16} className="text-[#e68a1f]" />
                  {b}
                </div>
              </FadeIn>
            ))}
          </div>

          <div className="mt-10 pt-8 border-t space-y-3 text-sm text-gray-500">
            <div className="flex gap-2"><Shield size={14} /> Secure SSL payment</div>
            <div className="flex gap-2"><Calendar size={14} /> Cancel anytime</div>
            <div className="flex gap-2"><Star size={14} /> Trusted providers</div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="md:col-span-3 p-10">
          <FadeIn delay={0.2}>
            <div className="flex justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold">Payment Details</h2>
                <p className="text-gray-500">Secure checkout</p>
              </div>
              <CreditCard className="text-[#e68a1f]" size={28} />
            </div>
          </FadeIn>

          <CardPreview
            {...form}
            showBack={showBack}
          />

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input label="Cardholder Name" name="name" value={form.name} onChange={handleChange} required />
            <Input label="Card Number" name="number" value={form.number} onChange={handleChange} onFocus={() => setShowBack(false)} required />

            <div className="grid grid-cols-2 gap-4">
              <Input label="Expiry" name="expiry" value={form.expiry} onChange={handleChange} required />
              <Input
                label="CVV"
                name="cvv"
                value={form.cvv}
                onChange={handleChange}
                onFocus={() => setShowBack(true)}
                onBlur={() => setShowBack(false)}
                required
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isProcessing}
              className="w-full py-4 rounded-xl font-semibold text-white
              bg-gradient-to-r from-[#e68a1f] to-[#d47920]
              flex items-center justify-center gap-2"
            >
              {isProcessing ? "Processing..." : `Pay $${PLAN.price}/month`}
              {!isProcessing && <ArrowRight size={18} />}
            </motion.button>

            <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
              <Lock size={14} />
              PCI-DSS compliant • Secured
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default StripePaymentPage;
