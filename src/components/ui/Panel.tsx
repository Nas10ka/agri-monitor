import type { PropsWithChildren, ReactNode } from 'react';

interface PanelProps extends PropsWithChildren {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  className?: string;
}

export function Panel({ title, subtitle, action, className = '', children }: PanelProps) {
  return (
    <section className={`rounded-2xl border border-slate-200 bg-white shadow-panel ${className}`}>
      <header className="flex items-start justify-between gap-3 border-b border-slate-100 px-4 py-4">
        <div>
          <h2 className="text-sm font-semibold text-slate-900">{title}</h2>
          {subtitle ? <p className="mt-1 text-xs text-slate-500">{subtitle}</p> : null}
        </div>
        {action}
      </header>
      <div className="p-4">{children}</div>
    </section>
  );
}
