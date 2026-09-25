import { Component, type ErrorInfo, type PropsWithChildren } from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<PropsWithChildren, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Application error', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="grid min-h-screen place-items-center bg-slate-50 p-6">
          <div className="max-w-md rounded-2xl border border-rose-200 bg-white p-6 text-center shadow-panel">
            <h1 className="text-lg font-semibold text-slate-900">Не вдалося відобразити застосунок</h1>
            <p className="mt-2 text-sm text-slate-600">Оновіть сторінку. Якщо помилка повторюється, перевірте консоль браузера.</p>
          </div>
        </main>
      );
    }

    return this.props.children;
  }
}
