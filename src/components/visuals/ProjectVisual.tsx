type ProjectVisualProps = {
  type: 'dashboard' | 'analytics' | 'terminal' | 'mobile';
  label: string;
  className?: string;
};

export function ProjectVisual({ type, label, className = '' }: ProjectVisualProps) {
  return (
    <div
      className={`group relative overflow-hidden rounded-xl border border-ink-100 bg-paper-50 ${className}`}
      aria-label={`${label} interface mockup`}
    >
      <div className="flex items-center gap-1.5 border-b border-ink-100 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-ink-200" />
        <span className="h-2.5 w-2.5 rounded-full bg-ink-200" />
        <span className="h-2.5 w-2.5 rounded-full bg-ink-200" />
        <span className="ml-3 font-mono text-[10px] uppercase tracking-wider text-ink-300">
          {label}
        </span>
      </div>
      <div className="p-5">
        {type === 'dashboard' && <DashboardMockup />}
        {type === 'analytics' && <AnalyticsMockup />}
        {type === 'terminal' && <TerminalMockup />}
        {type === 'mobile' && <MobileMockup />}
      </div>
    </div>
  );
}

function DashboardMockup() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="rounded-lg border border-ink-100 bg-paper-100 p-3">
            <div className="mb-2 h-2 w-12 rounded bg-ink-100" />
            <div className="h-4 w-16 rounded bg-ink-200" />
          </div>
        ))}
      </div>
      <div className="rounded-lg border border-ink-100 bg-paper-100 p-4">
        <div className="mb-3 flex items-center justify-between">
          <div className="h-3 w-24 rounded bg-ink-200" />
          <div className="h-5 w-16 rounded-md bg-accent-500" />
        </div>
        <div className="space-y-2">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="h-4 w-4 rounded border border-ink-200" />
              <div className="h-2 flex-1 rounded bg-ink-100" />
              <div className="h-2 w-8 rounded bg-ink-100" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AnalyticsMockup() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        {[0, 1].map((i) => (
          <div key={i} className="rounded-lg border border-ink-100 bg-paper-100 p-3">
            <div className="mb-2 h-2 w-10 rounded bg-ink-100" />
            <div className="flex h-20 items-end gap-1.5">
              {[40, 65, 35, 80, 55, 90, 45, 70].map((h, j) => (
                <div
                  key={j}
                  className="flex-1 rounded-t bg-accent-200"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="rounded-lg border border-ink-100 bg-paper-100 p-4">
        <div className="mb-3 h-3 w-20 rounded bg-ink-200" />
        <svg viewBox="0 0 300 60" className="w-full" aria-hidden="true">
          <polyline
            points="0,45 40,30 80,38 120,15 160,25 200,10 240,20 280,5 300,8"
            fill="none"
            stroke="#1e3a5f"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="280" cy="5" r="3" fill="#1e3a5f" />
        </svg>
      </div>
    </div>
  );
}

function TerminalMockup() {
  return (
    <div className="space-y-2.5 font-mono text-xs">
      <div className="flex gap-2">
        <span className="text-ink-300">GET</span>
        <span className="text-ink-700">/api/v1/users</span>
        <span className="ml-auto rounded bg-accent-50 px-1.5 text-[10px] text-accent-500">200</span>
      </div>
      <div className="flex gap-2">
        <span className="text-ink-300">POST</span>
        <span className="text-ink-700">/api/v1/tasks</span>
        <span className="ml-auto rounded bg-accent-50 px-1.5 text-[10px] text-accent-500">201</span>
      </div>
      <div className="flex gap-2">
        <span className="text-ink-300">PUT</span>
        <span className="text-ink-700">/api/v1/tasks/42</span>
        <span className="ml-auto rounded bg-accent-50 px-1.5 text-[10px] text-accent-500">200</span>
      </div>
      <div className="flex gap-2">
        <span className="text-ink-300">DEL</span>
        <span className="text-ink-700">/api/v1/tasks/99</span>
        <span className="ml-auto rounded bg-accent-50 px-1.5 text-[10px] text-accent-500">204</span>
      </div>
      <div className="mt-3 border-t border-ink-100 pt-2.5">
        <div className="text-ink-400">{'>'} Running tests...</div>
        <div className="text-accent-500">{'>'} 24 passed · 0 failed</div>
      </div>
    </div>
  );
}

function MobileMockup() {
  return (
    <div className="flex justify-center">
      <div className="w-44 rounded-2xl border-2 border-ink-200 bg-paper-100 p-3">
        <div className="mb-3 flex justify-center">
          <div className="h-1 w-12 rounded-full bg-ink-200" />
        </div>
        <div className="mb-3 text-center">
          <div className="mx-auto mb-2 h-3 w-20 rounded bg-ink-200" />
          <div className="mx-auto h-2 w-16 rounded bg-ink-100" />
        </div>
        <div className="space-y-2">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex items-center gap-2 rounded-lg border border-ink-100 bg-paper-50 p-2">
              <div className="h-6 w-6 rounded-md bg-accent-500" />
              <div className="flex-1">
                <div className="h-2 w-12 rounded bg-ink-200" />
                <div className="mt-1 h-1.5 w-8 rounded bg-ink-100" />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3 h-8 rounded-md bg-accent-500" />
      </div>
    </div>
  );
}
