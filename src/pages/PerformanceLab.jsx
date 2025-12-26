import React, { memo, useMemo, useState } from 'react'
import { useConsole } from '../console/ConsoleContext.jsx'

const SlowChild = memo(function SlowChild({ seed }) {
  // small, intentional slowdown for profiling later
  const total = useMemo(() => {
    let t = 0
    for (let i = 0; i < 150000; i++) t += (i * seed) % 7
    return t
  }, [seed])
  return <div className="mono">SlowChild computed: {total}</div>
})

export default function PerformanceLab() {
  const consoleApi = useConsole()
  const [seed, setSeed] = useState(1)
  const [showSlow, setShowSlow] = useState(false)

  return (
    <div className="page">
      <header className="page__header">
        <h1 className="page__title">Performance</h1>
        <p className="page__subtitle">Rendering behavior, profiling, code splitting, and list virtualization.</p>
      </header>

      <section className="card">
        <h2 className="card__title">Profiler playground (starter)</h2>
        <div className="miniRow">
          <div className="miniRow__label">Slow component</div>
          <button type="button" className="btn btn--ghost" onClick={() => setShowSlow((v) => !v)}>
            {showSlow ? 'Disable' : 'Enable'}
          </button>
        </div>
        <div className="miniRow">
          <div className="miniRow__label">Seed</div>
          <button type="button" className="btn btn--ghost" onClick={() => setSeed((s) => s + 1)}>
            Increment: {seed}
          </button>
        </div>
        {showSlow ? (
          <div className="stack">
            <SlowChild seed={seed} />
            <button type="button" className="btn" onClick={() => consoleApi.warn('Use React DevTools Profiler to measure commits.')}>
              What to do next
            </button>
          </div>
        ) : (
          <p className="card__body">Enable slow component, then profile re-renders in React DevTools.</p>
        )}
      </section>
    </div>
  )
}

