import React, { memo, useCallback, useMemo, useState } from 'react'
import { useConsole } from '../console/ConsoleContext.jsx'

const Child = memo(function Child({ onPing }) {
  return (
    <div className="miniRow">
      <div className="miniRow__label">Memoized child</div>
      <button type="button" className="btn btn--ghost" onClick={onPing}>
        Ping
      </button>
    </div>
  )
})

export default function HooksLab() {
  const consoleApi = useConsole()
  const [query, setQuery] = useState('')
  const [count, setCount] = useState(0)

  const items = useMemo(() => {
    // Artificially "expensive" derived data
    const base = Array.from({ length: 2000 }, (_, i) => `Item ${i + 1}`)
    const q = query.trim().toLowerCase()
    return q ? base.filter((x) => x.toLowerCase().includes(q)) : base
  }, [query])

  const onPing = useCallback(() => {
    consoleApi.log('Child pinged. Callback identity is stable with useCallback.')
  }, [consoleApi])

  return (
    <div className="page">
      <header className="page__header">
        <h1 className="page__title">React Hooks</h1>
        <p className="page__subtitle">A simple playground for useMemo, useCallback, and useEffect (next).</p>
      </header>

      <section className="card">
        <h2 className="card__title">useMemo + useCallback</h2>
        <div className="formRow">
          <label className="label" htmlFor="q">
            Filter
          </label>
          <input
            id="q"
            className="input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type to filter 2,000 items…"
          />
        </div>

        <div className="miniRow">
          <div className="miniRow__label">Filtered count</div>
          <div className="mono">{items.length}</div>
        </div>

        <div className="miniRow">
          <div className="miniRow__label">Unrelated state</div>
          <button type="button" className="btn btn--ghost" onClick={() => setCount((c) => c + 1)}>
            Increment: {count}
          </button>
        </div>

        <Child onPing={onPing} />
      </section>
    </div>
  )
}

