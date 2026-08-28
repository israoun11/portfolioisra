export function TypingIndicator() {
  return (
    <div className="flex justify-start" aria-live="polite" aria-label="Isra AI is typing">
      <div className="flex items-center gap-1.5 rounded-xl border border-canvas-line bg-canvas-raised px-4 py-3">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="h-1.5 w-1.5 animate-typingDot rounded-full bg-signal"
            style={{ animationDelay: `${i * 0.15}s `}}
          />
        ))}
      </div>
    </div>
  );
}