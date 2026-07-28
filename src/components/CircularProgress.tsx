import React from 'react';
import { motion } from 'motion/react';
import { TrendingUp, Sparkles, CheckCircle2 } from 'lucide-react';

interface CircularProgressProps {
  amountNeeded: number;
  amountReceived: number;
  currency?: string;
  size?: number;
  strokeWidth?: number;
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
  amountNeeded,
  amountReceived,
  currency = '$',
  size = 340,
  strokeWidth = 26,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // Calculate percentage
  const rawPercentage = amountNeeded > 0 ? (amountReceived / amountNeeded) * 100 : 0;
  const percentage = Math.round(rawPercentage);
  const increasePercentage = percentage > 100 ? percentage - 100 : 0;

  // Apple Fitness style multi-ring loop offsets
  // Loop 1: 0% to 100% (Base Indigo/Cyan Ring)
  const loop1Pct = Math.min(Math.max(rawPercentage, 0), 100);
  const strokeDashoffset1 = circumference - (loop1Pct / 100) * circumference;

  // Loop 2: 101% to 200% (Emerald/Gold Overflow Ring)
  const loop2Pct = rawPercentage > 100 ? Math.min(rawPercentage - 100, 100) : 0;
  const strokeDashoffset2 = circumference - (loop2Pct / 100) * circumference;

  // Loop 3: 201% to 300%+ (Vibrant Rose/Magenta Ring)
  const loop3Pct = rawPercentage > 200 ? Math.min(rawPercentage - 200, 100) : 0;
  const strokeDashoffset3 = circumference - (loop3Pct / 100) * circumference;

  return (
    <div className="relative flex flex-col items-center justify-center">
      {/* Outer Glow Container */}
      <div className="relative flex items-center justify-center rounded-full p-6 bg-white shadow-xl shadow-slate-200/70 border border-slate-100">
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="transform -rotate-90 drop-shadow-md"
        >
          <defs>
            {/* Loop 1 Gradient: Deep Indigo to Electric Cyan */}
            <linearGradient id="grad-loop1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>

            {/* Loop 2 Gradient: Vibrant Emerald to Warm Amber (Apple Fitness style overflow) */}
            <linearGradient id="grad-loop2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>

            {/* Loop 3 Gradient: Electric Rose to Hot Magenta */}
            <linearGradient id="grad-loop3" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f43f5e" />
              <stop offset="100%" stopColor="#d946ef" />
            </linearGradient>

            {/* Ring Drop Shadows */}
            <filter id="ring-shadow-1" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#6366f1" floodOpacity="0.25" />
            </filter>
            <filter id="ring-shadow-2" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="3" stdDeviation="5" floodColor="#10b981" floodOpacity="0.4" />
            </filter>
            <filter id="ring-shadow-3" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="3" stdDeviation="5" floodColor="#f43f5e" floodOpacity="0.4" />
            </filter>
          </defs>

          {/* Background Track Circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke="#f1f5f9"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />

          {/* Loop 1: Primary 0-100% Ring */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke="url(#grad-loop1)"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: strokeDashoffset1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            strokeLinecap="round"
            filter="url(#ring-shadow-1)"
          />

          {/* Loop 2: 101-200% Overlap Ring (Apple Fitness Style) */}
          {rawPercentage > 100 && (
            <motion.circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="transparent"
              stroke="url(#grad-loop2)"
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: strokeDashoffset2 }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              strokeLinecap="round"
              filter="url(#ring-shadow-2)"
            />
          )}

          {/* Loop 3: 201-300%+ Overlap Ring */}
          {rawPercentage > 200 && (
            <motion.circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="transparent"
              stroke="url(#grad-loop3)"
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: strokeDashoffset3 }}
              transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              strokeLinecap="round"
              filter="url(#ring-shadow-3)"
            />
          )}
        </svg>

        {/* Center Content Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 select-none">
          {/* Top Status Tag */}
          <motion.div
            key={increasePercentage > 0 ? 'exceeded' : 'normal'}
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="mb-1"
          >
            {increasePercentage > 0 ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300 shadow-sm">
                <TrendingUp className="w-3.5 h-3.5 text-amber-600" />
                +{increasePercentage}% Increase!
              </span>
            ) : percentage >= 100 ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 shadow-sm">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                100% Reached
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-600 border border-indigo-100">
                <Sparkles className="w-3 h-3" />
                In Progress
              </span>
            )}
          </motion.div>

          {/* Main Percentage Display */}
          <div className="flex items-baseline justify-center font-extrabold tracking-tight text-slate-900">
            <motion.span
              key={percentage}
              initial={{ opacity: 0.6, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="text-5xl md:text-6xl"
            >
              {percentage}
            </motion.span>
            <span className={`text-2xl md:text-3xl font-bold ml-1 ${increasePercentage > 0 ? 'text-amber-600' : 'text-indigo-600'}`}>
              %
            </span>
          </div>

          {/* Amounts Display */}
          <div className="mt-2 text-xs md:text-sm font-semibold text-slate-600 max-w-[200px]">
            <span className="text-slate-900 font-bold">
              {currency}{amountReceived.toLocaleString()}
            </span>
            <span className="text-slate-400 font-normal"> / </span>
            <span>{currency}{amountNeeded.toLocaleString()}</span>
          </div>

          {/* Additional info line */}
          <div className="mt-1 text-xs font-medium text-slate-400">
            {increasePercentage > 0
              ? `${currency}${(amountReceived - amountNeeded).toLocaleString()} surplus`
              : `${currency}${Math.max(0, amountNeeded - amountReceived).toLocaleString()} remaining`}
          </div>
        </div>
      </div>
    </div>
  );
};
