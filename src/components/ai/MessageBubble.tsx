import type { ChatMessage } from '../../services/ai';

export function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === 'user';
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[85%] rounded-xl px-4 py-2.5 text-sm leading-relaxed ${
          isUser
            ? 'bg-signal text-canvas'
            : 'border border-canvas-line bg-canvas-raised text-ink'
        }`}
      >
        {message.content}
      </div>
    </div>
  );
}