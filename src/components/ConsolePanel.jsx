import React, { useMemo } from 'react'
import { useConsole } from '../console/ConsoleContext.jsx'

function formatTime(ts) {
  const d = new Date(ts)
  const hh = String(d.getHours()).padStart(2, '0')
  const mm = String(d.getMinutes()).padStart(2, '0')
  const ss = String(d.getSeconds()).padStart(2, '0')
  return `${hh}:${mm}:${ss}`
}

export function ConsolePanel({ className = '' }) {
  const { entries, clear } = useConsole()

  const text = useMemo(
    () => entries.map((e) => `[${formatTime(e.ts)}] ${e.level.toUpperCase()}: ${e.message}`).join('\n'),
    [entries],
  )

  return (
    <section className={`consolePanel ${className}`.trim()} aria-label="Output console">
      <header className="consolePanel__header">
        <div className="consolePanel__title">Console</div>
        <div className="consolePanel__actions">
          <button type="button" className="btn btn--ghost" onClick={() => navigator.clipboard?.writeText(text)}>
            Copy
          </button>
          <button type="button" className="btn btn--ghost" onClick={clear}>
            Clear
          </button>
        </div>
      </header>
      <div className="consolePanel__body">
        {entries.length === 0 ? (
          <div className="consolePanel__empty">Run a demo to see output here.</div>
        ) : (
          <pre className="consolePanel__pre">
            {entries.map((e) => (
              <div key={e.id} className={`consolePanel__line consolePanel__line--${e.level}`}>
                <span className="consolePanel__time">[{formatTime(e.ts)}]</span> {e.message}
              </div>
            ))}
          </pre>
        )}
      </div>
    </section>
  )
}

