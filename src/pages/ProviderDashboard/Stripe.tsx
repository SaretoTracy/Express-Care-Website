import { useState } from "react";
import { CreditCard, Lock, CheckCircle, XCircle } from "lucide-react";
import { FaCcVisa, FaCcMastercard } from "react-icons/fa";

// AuthCard remains the same
const AuthCard = ({ title, logo, children }) => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
    <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 hover:scale-[1.01] transition-transform">
      {logo && (
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Logo" className="h-16 w-auto" />
        </div>
      )}
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">{title}</h2>
      {children}
    </div>
  </div>
);

// InputField remains reusable
const InputField = ({ label, icon: Icon, value, onChange, placeholder, type = "text" }) => (
  <div className="flex flex-col">
    <label className="flex items-center mb-1 font-medium text-[#557a95]">
      {Icon && <Icon size={16} className="mr-2" />}
      {label}
    </label>
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full p-4 rounded-lg border-2 border-gray-300 focus:border-yellow-400 focus:ring focus:ring-yellow-100 transition-all bg-white text-gray-800 placeholder-gray-400"
    />
  </div>
);

// Button remains the same
const AuthButton = ({ loading, loadingText, onClick, children }) => (
  <button
    type="button"
    onClick={onClick}
    disabled={loading}
    className="w-full bg-gradient-to-r from-[#557a95] to-[#4a6b82] text-white py-3 px-4 rounded-lg font-semibold hover:from-[#4a6b82] hover:to-[#3d5a6d] transition-all duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
  >
    {loading ? (
      <>
        <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
        {loadingText}
      </>
    ) : (
      children
    )}
  </button>
);

function PaymentForm() {
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("idle");
  const [message, setMessage] = useState("");
  const [amount] = useState(25000); // USD 250 in cents

  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [isFlipped, setIsFlipped] = useState(false);

  // Formatting
  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const parts = [];
    for (let i = 0; i < v.length && i < 16; i += 4) parts.push(v.substring(i, i + 4));
    return parts.join(" ");
  };

  const formatExpiryDate = (value) => {
    const v = value.replace(/\D/g, "");
    return v.length > 2 ? `${v.slice(0, 2)}/${v.slice(2, 4)}` : v;
  };

  // Handle submission
  const handleSubmit = () => {
    if (!cardNumber || !cardName || !expiryDate || !cvv) {
      setMessage("Please fill in all card details");
      setPaymentStatus("error");
      return;
    }
    setLoading(true);
    setMessage("");
    setPaymentStatus("idle");
    setTimeout(() => {
      setMessage("Payment processed successfully! 🎉");
      setPaymentStatus("success");
      setLoading(false);
      setTimeout(() => {
        setCardNumber(""); setCardName(""); setExpiryDate(""); setCvv("");
        setPaymentStatus("idle"); setMessage("");
      }, 3000);
    }, 2000);
  };

  const formatAmount = (amt) => `$${(amt / 100).toFixed(2)}`;

  return (
    <AuthCard title="Complete Payment">
      {/* Card Preview */}
      <div
        className={`w-full h-40 rounded-xl p-6 mb-6 relative text-white shadow-xl bg-gradient-to-r from-indigo-500 to-blue-500 transform transition-transform duration-500 ${
          isFlipped ? "rotate-y-180" : ""
        }`}
      >
        {!isFlipped ? (
          <div className="flex flex-col justify-between h-full">
            <div className="flex justify-between items-start">
              <div className="text-sm uppercase tracking-widest">Card</div>
              <div className="flex space-x-2 text-2xl">
                <FaCcVisa />
                <FaCcMastercard />
              </div>
            </div>
            <div className="text-lg tracking-widest">{cardNumber || "**** **** **** ****"}</div>
            <div className="flex justify-between text-sm">
              <span>{cardName || "Cardholder Name"}</span>
              <span>{expiryDate || "MM/YY"}</span>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-end h-full text-sm">
            <div className="bg-gray-800 h-10 w-full rounded-md flex items-center justify-end pr-4 text-white">
              {cvv || "***"}
            </div>
          </div>
        )}
      </div>

      {/* Amount */}
      <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200 text-gray-800">
        <div className="flex items-center justify-between">
          <span className="font-medium">Amount to Pay</span>
          <span className="text-2xl font-bold text-[#557a95]">{formatAmount(amount)}</span>
        </div>
      </div>

      {/* Card Inputs */}
      <div className="mb-6 space-y-4">
        <InputField label="Card Number" icon={CreditCard} placeholder="1234 5678 9012 3456" value={cardNumber} onChange={(e) => setCardNumber(formatCardNumber(e.target.value))} />
        <InputField label="Cardholder Name" placeholder="John Doe" value={cardName} onChange={(e) => setCardName(e.target.value)} />
        <div className="grid grid-cols-2 gap-4">
          <InputField label="Expiry" placeholder="MM/YY" value={expiryDate} onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))} />
          <InputField
            label="CVV"
            placeholder="123"
            value={cvv}
            onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
            onFocus={() => setIsFlipped(true)}
            onBlur={() => setIsFlipped(false)}
          />
        </div>
        <div className="flex items-center mt-2 text-xs text-gray-500">
          <Lock size={12} className="mr-1" />
          Your payment information is secure and encrypted
        </div>
      </div>

      <AuthButton loading={loading} loadingText="Processing Payment..." onClick={handleSubmit}>
        <CreditCard size={18} className="mr-2" /> Pay {formatAmount(amount)}
      </AuthButton>

      {message && (
        <div className={`mt-6 p-4 rounded-lg flex items-center ${
          paymentStatus === "success" ? "bg-green-50 text-green-700 border border-green-200" :
          paymentStatus === "error" ? "bg-red-50 text-red-700 border border-red-200" : ""}`}>
          {paymentStatus === "success" && <CheckCircle size={20} className="mr-2" />}
          {paymentStatus === "error" && <XCircle size={20} className="mr-2" />}
          <span className="font-medium">{message}</span>
        </div>
      )}
    </AuthCard>
  );
}

export default function App() {
  return <PaymentForm />;
}
