import React from 'react'
import { useConsole } from '../console/ConsoleContext.jsx'

export default function AsyncLab() {
  const consoleApi = useConsole()

  const runOrderDemo = () => {
    consoleApi.clear()
    consoleApi.log('sync: start')
    setTimeout(() => consoleApi.log('macrotask: setTimeout(0)'), 0)
    Promise.resolve().then(() => consoleApi.log('microtask: Promise.then'))
    queueMicrotask(() => consoleApi.log('microtask: queueMicrotask'))
    consoleApi.log('sync: end')
  }

  return (
    <div className="page">
      <header className="page__header">
        <h1 className="page__title">Async & Event Loop</h1>
        <p className="page__subtitle">Microtasks vs macrotasks, and why “async” can still be single-threaded.</p>
      </header>

      <section className="card">
        <h2 className="card__title">Log order demo</h2>
        <p className="card__body">Click run, then explain the order (sync → microtasks → macrotasks).</p>
        <div className="card__actions">
          <button type="button" className="btn" onClick={runOrderDemo}>
            Run demo
          </button>
        </div>
      </section>
    </div>
  )
}

