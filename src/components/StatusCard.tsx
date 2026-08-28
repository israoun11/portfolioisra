import { profile } from '../data/portfolioData';

export function StatusCard() {
  return (
    <div className="card flex flex-col gap-3 p-6" role="status" aria-label="Current availability status">
      <div className="flex items-center gap-2 font-mono text-sm">
        <span className="h-2 w-2 rounded-full bg-signal" aria-hidden />
        Status: <span className="text-signal">{profile.status}</span>
      </div>
      <p className="text-sm text-ink-dim">
        Current focus: <span className="text-ink">{profile.currentFocus}</span>
      </p>
      <p className="text-sm text-ink-dim">
        Based in: <span className="text-ink">{profile.location}</span>
      </p>
    </div>
  );
}