import { useEffect, useRef, useState, useCallback } from 'react';
import { ArrowRight, X, ArrowUp } from 'lucide-react';
import { askEngineer, type ChatMessage } from '@/lib/ai';
import { suggestedQuestions, quickExploreCategories } from '@/data/ai-suggestions';

type AIAssistantProps = {
  isOpen: boolean;
  onClose: () => void;
  onViewProject: (projectId: string) => void;
};

type Status = 'idle' | 'loading' | 'success' | 'error';

const PROJECT_KEYWORDS: Record<string, string> = {
  atlas: 'atlas',
  insight: 'insight',
  forge: 'forge',
  beacon: 'beacon',
};

function detectProjectReferral(text: string): string | null {
  const lower = text.toLowerCase();
  for (const [keyword, id] of Object.entries(PROJECT_KEYWORDS)) {
    if (lower.includes(keyword)) return id;
  }
  if (lower.includes('project 01')) return 'atlas';
  if (lower.includes('project 02')) return 'insight';
  if (lower.includes('project 03')) return 'forge';
  if (lower.includes('project 04')) return 'beacon';
  return null;
}

export function AIAssistant({ isOpen, onClose, onViewProject }: AIAssistantProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, status]);

  const sendQuestion = useCallback(
    async (question: string) => {
      const trimmed = question.trim();
      if (!trimmed || status === 'loading') return;

      setInput('');
      setStatus('loading');
      setErrorMsg('');

      const userMsg: ChatMessage = { role: 'user', text: trimmed };
      const newHistory = [...messages, userMsg];
      setMessages(newHistory);

      try {
        const result = await askEngineer(trimmed, messages);
        const modelMsg: ChatMessage = { role: 'model', text: result.response };
        setMessages([...newHistory, modelMsg]);
        setStatus('success');
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'AI assistant is temporarily unavailable.';
        setErrorMsg(msg);
        setStatus('error');
      }
    },
    [messages, status]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendQuestion(input);
  };

  const handleSuggestionClick = (question: string) => {
    setActiveCategory(null);
    sendQuestion(question);
  };

  const handleProjectReferral = (text: string) => {
    const projectId = detectProjectReferral(text);
    if (projectId) {
      onViewProject(projectId);
      onClose();
    }
  };

  if (!isOpen) return null;

  const hasMessages = messages.length > 0;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-ink-900/40 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Ask the Engineer — AI Portfolio Assistant"
    >
      <div
        className="relative my-0 flex min-h-screen w-full flex-col bg-paper-50 sm:my-8 sm:min-h-0 sm:max-w-2xl sm:rounded-2xl sm:border sm:border-ink-100 sm:shadow-2xl lg:max-w-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-ink-100 px-6 py-5 sm:px-8">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-6 bg-accent-500" />
              <span className="label-accent">Ask the Engineer</span>
            </div>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-ink-500">
              Explore my work, projects, technical experience, and engineering approach.
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close assistant"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-paper-200 text-ink-500 transition-colors hover:bg-ink-200 hover:text-ink-800"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 py-6 sm:px-8">
          {/* Conversation */}
          {hasMessages && (
            <div className="space-y-5">
              {messages.map((msg, i) => (
                <div key={i} className={msg.role === 'user' ? 'flex justify-end' : ''}>
                  <div
                    className={`max-w-[85%] rounded-lg px-4 py-3 text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-accent-500 text-white'
                        : 'border border-ink-100 bg-paper-100 text-ink-700'
                    }`}
                  >
                    {msg.role === 'model' ? (
                      <FormattedResponse text={msg.text} onViewProject={handleProjectReferral} />
                    ) : (
                      msg.text
                    )}
                  </div>
                </div>
              ))}

              {status === 'loading' && (
                <div className="flex items-center gap-2.5 text-sm text-ink-400">
                  <span className="flex gap-1">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-ink-300" style={{ animationDelay: '0ms' }} />
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-ink-300" style={{ animationDelay: '150ms' }} />
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-ink-300" style={{ animationDelay: '300ms' }} />
                  </span>
                  Thinking...
                </div>
              )}

              {status === 'error' && (
                <div className="rounded-lg border border-ink-100 bg-paper-100 px-4 py-3 text-sm text-ink-500">
                  {errorMsg}
                </div>
              )}
            </div>
          )}

          {/* Idle state: suggestions */}
          {!hasMessages && status !== 'loading' && (
            <div className="space-y-8">
              <div>
                <span className="label-meta">Suggested Questions</span>
                <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
                  {suggestedQuestions.map((q) => (
                    <button
                      key={q}
                      onClick={() => handleSuggestionClick(q)}
                      className="group flex items-center justify-between gap-2 rounded-lg border border-ink-100 bg-paper-100 px-4 py-3 text-left text-sm text-ink-600 transition-all duration-200 hover:border-accent-500 hover:text-accent-500"
                    >
                      {q}
                      <ArrowRight className="h-3.5 w-3.5 shrink-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <span className="label-meta">Quick Explore</span>
                <div className="mt-4 flex flex-wrap gap-2">
                  {quickExploreCategories.map((cat) => (
                    <button
                      key={cat.label}
                      onClick={() => setActiveCategory(activeCategory === cat.label ? null : cat.label)}
                      className={`rounded-md border px-3.5 py-2 text-sm font-medium transition-all duration-200 ${
                        activeCategory === cat.label
                          ? 'border-accent-500 bg-accent-500 text-white'
                          : 'border-ink-200 bg-paper-100 text-ink-600 hover:border-accent-500 hover:text-accent-500'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                {activeCategory && (
                  <div className="mt-4 space-y-2">
                    {quickExploreCategories
                      .find((c) => c.label === activeCategory)
                      ?.questions.map((q) => (
                        <button
                          key={q}
                          onClick={() => handleSuggestionClick(q)}
                          className="group flex w-full items-center justify-between gap-2 rounded-lg border border-ink-100 bg-paper-100 px-4 py-2.5 text-left text-sm text-ink-600 transition-all duration-200 hover:border-accent-500 hover:text-accent-500"
                        >
                          {q}
                          <ArrowRight className="h-3.5 w-3.5 shrink-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                        </button>
                      ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="border-t border-ink-100 px-6 py-4 sm:px-8">
          <form onSubmit={handleSubmit} className="flex items-center gap-3">
            <label htmlFor="ai-input" className="sr-only">
              Ask something about my work
            </label>
            <input
              ref={inputRef}
              id="ai-input"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              maxLength={1000}
              placeholder="Ask something about my work..."
              className="flex-1 rounded-lg border border-ink-200 bg-paper-100 px-4 py-3 text-sm text-ink-800 placeholder:text-ink-400 focus:border-accent-500 focus:outline-none focus:ring-1 focus:ring-accent-500"
              autoComplete="off"
            />
            <button
              type="submit"
              disabled={!input.trim() || status === 'loading'}
              aria-label="Send question"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-accent-500 text-white transition-colors hover:bg-accent-600 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function FormattedResponse({ text, onViewProject }: { text: string; onViewProject: (text: string) => void }) {
  const projectId = detectProjectReferral(text);

  return (
    <div>
      <div className="whitespace-pre-wrap">{text}</div>
      {projectId && (
        <button
          onClick={() => onViewProject(text)}
          className="group mt-3 inline-flex items-center gap-1.5 rounded-md border border-accent-500 px-3 py-1.5 text-xs font-medium text-accent-500 transition-colors hover:bg-accent-500 hover:text-white"
        >
          View Project
          <ArrowRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5" />
        </button>
      )}
    </div>
  );
}
