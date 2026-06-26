import type { FC } from 'react';
import { TURN_DURATION_SECONDS } from '../types/game';
import './TimerRing.css';

interface TimerRingProps {
  remaining: number;
  active: boolean;
  paused?: boolean;
  resetKey?: string | number;
}

export const TimerRing: FC<TimerRingProps> = ({
  remaining,
  active,
  paused = false,
  resetKey = 0,
}) => {
  const size = 100;
  const stroke = 8;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;

  const seconds = active ? Math.ceil(remaining) : TURN_DURATION_SECONDS;
  const critical = active && remaining <= 3;

  // Determine current color class based on remaining time
  let colorClass = 'timer-color-success';
  if (!active) {
    colorClass = 'timer-color-inactive';
  } else if (remaining <= 4) {
    colorClass = 'timer-color-danger';
  } else if (remaining <= 7) {
    colorClass = 'timer-color-warning';
  }

  // Animation style properties
  const animationStyle = active
    ? ({
        animationName: 'timer-countdown',
        animationDuration: `${TURN_DURATION_SECONDS}s`,
        animationTimingFunction: 'linear',
        animationFillMode: 'forwards',
        animationPlayState: paused ? 'paused' : 'running',
        '--timer-circumference': `${circumference}px`,
        strokeDasharray: circumference,
      } as React.CSSProperties)
    : ({
        '--timer-circumference': `${circumference}px`,
        strokeDasharray: circumference,
        strokeDashoffset: 0,
      } as React.CSSProperties);

  return (
    <div
      className={`timer-ring-container ${critical ? 'timer-ring-pulse' : ''}`}
      role="timer"
      aria-label={`Tiempo restante: ${seconds} segundos`}
    >
      <svg width={size} height={size} className="timer-ring-svg">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          className="timer-ring-bg"
          strokeWidth={stroke}
        />
        <circle
          key={`${resetKey}-${active}`}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          className={`timer-ring-fg ${colorClass}`}
          strokeWidth={stroke}
          strokeLinecap="round"
          style={animationStyle}
        />
      </svg>
      <div className="timer-ring-content">
        <span className={`timer-ring-number ${!active ? 'timer-number-inactive' : critical ? 'timer-number-urgent' : ''}`}>
          {seconds}
        </span>
        <span className="timer-ring-label">
          {active ? 'segundos' : 'listo'}
        </span>
      </div>
    </div>
  );
};

