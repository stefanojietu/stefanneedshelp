import React, { useState } from 'react';
import { Copy, Check, CreditCard, Building2, User } from 'lucide-react';

interface BankDetailsCardProps {
  accountName?: string;
  accountNumber?: string;
  bankName?: string;
}

export const BankDetailsCard: React.FC<BankDetailsCardProps> = ({
  accountName = 'Stefan Ojietu',
  accountNumber = '8064763992',
  bankName = 'OPay',
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(accountNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Fallback if clipboard API is restricted
      const textarea = document.createElement('textarea');
      textarea.value = accountNumber;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  return (
    <div className="w-full max-w-sm bg-white rounded-2xl border border-slate-200/80 shadow-md shadow-slate-200/50 p-5 space-y-4">
      {/* Header with OPay branding */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          {/* Custom OPay Icon SVG */}
          <div className="w-9 h-9 rounded-xl bg-[#00C896]/10 flex items-center justify-center p-1 border border-[#00C896]/20">
            <svg viewBox="0 0 100 100" className="w-6 h-6">
              <circle
                cx="50"
                cy="50"
                r="35"
                fill="none"
                stroke="#00C896"
                strokeWidth="18"
              />
              <rect
                x="15"
                y="42"
                width="20"
                height="16"
                rx="4"
                fill="#1F005B"
              />
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-sm text-[#1F005B] tracking-tight">
                {bankName}
              </span>
              <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded font-bold bg-[#00C896]/10 text-[#00a87d]">
                Bank
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium">Direct Transfer</p>
          </div>
        </div>
        <CreditCard className="w-4 h-4 text-slate-300" />
      </div>

      {/* Account Info Details */}
      <div className="space-y-3">
        {/* Account Name */}
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-400 flex items-center gap-1 font-medium">
            <User className="w-3.5 h-3.5 text-slate-400" />
            Account Name
          </span>
          <span className="font-bold text-slate-800 text-sm">
            {accountName}
          </span>
        </div>

        {/* Account Number with Copy Box */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 flex items-center justify-between gap-2">
          <div className="space-y-0.5">
            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Account Number
            </span>
            <span className="font-mono text-lg font-extrabold text-slate-900 tracking-wider">
              {accountNumber}
            </span>
          </div>

          <button
            onClick={handleCopy}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all duration-200 flex items-center gap-1.5 shadow-sm active:scale-95 ${
              copied
                ? 'bg-emerald-600 text-white shadow-emerald-200'
                : 'bg-[#1F005B] hover:bg-[#2e0085] text-white shadow-purple-100'
            }`}
            title="Copy account number"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 stroke-[3]" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
