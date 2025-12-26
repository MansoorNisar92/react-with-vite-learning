import React from 'react'
import { useConsole } from '../console/ConsoleContext.jsx'

export default function JsCoreLab() {
  const consoleApi = useConsole()

  return (
    <div className="page">
      <header className="page__header">
        <h1 className="page__title">JavaScript Core</h1>
        <p className="page__subtitle">Scope, hoisting, closures, this, call/apply/bind, and Maps.</p>
      </header>

      <section className="card">
        <h2 className="card__title">Coming next</h2>
        <p className="card__body">
          We’ll add small runnable snippets for each concept (with “predict the output” prompts).
        </p>
        <div className="card__actions">
          <button
            type="button"
            className="btn"
            onClick={() => consoleApi.log('JS Core lab ready. Next: var/let/const + hoisting demo.')}
          >
            Log status
          </button>
        </div>
      </section>
    </div>
  )
}

