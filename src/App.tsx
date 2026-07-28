import React from 'react';
import { GOAL_CONFIG } from './config';
import { CircularProgress } from './components/CircularProgress';
import { BankDetailsCard } from './components/BankDetailsCard';
import { Sparkles } from 'lucide-react';

export default function App() {
  const amountNeeded = GOAL_CONFIG.amountNeeded;
  const amountReceived = GOAL_CONFIG.amountReceived;
  const currency = GOAL_CONFIG.currency || '$';
  const title = GOAL_CONFIG.title || 'Goal Progress';

  const percentage = amountNeeded > 0 ? Math.round((amountReceived / amountNeeded) * 100) : 0;
  const isIncrease = percentage > 100;
  const increasePercentage = isIncrease ? percentage - 100 : 0;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between p-4 md:p-8 selection:bg-indigo-500 selection:text-white">
      {/* Top Header */}
      <header className="max-w-md mx-auto w-full text-center space-y-1 py-4">
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900">
          {title}
        </h1>
        <p className="text-xs md:text-sm text-slate-500 font-medium">
          {isIncrease ? (
            <span className="text-amber-600 font-bold inline-flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              Goal exceeded by {increasePercentage}% (+{currency}{(amountReceived - amountNeeded).toLocaleString()})
            </span>
          ) : (
            `Current progress`
          )}
        </p>
      </header>

      {/* Main Circle Visual & Payment Info */}
      <main className="flex-1 flex flex-col items-center justify-center my-6 space-y-8">
        <CircularProgress
          amountNeeded={amountNeeded}
          amountReceived={amountReceived}
          currency={currency}
          size={340}
          strokeWidth={28}
        />

        {/* Bank / Payment Account Details Card */}
        <BankDetailsCard
          accountName="Stefan Ojietu"
          accountNumber="8064763992"
          bankName="OPay"
        />
      </main>

      {/* Footer */}
      <footer className="text-center text-xs text-slate-400 py-2">
        <span>Continuous completion gauge • Apple Fitness style multi-loop</span>
      </footer>
    </div>
  );
}
