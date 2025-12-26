import React from 'react'
import { useConsole } from '../console/ConsoleContext.jsx'

export default function StateLab() {
  const consoleApi = useConsole()

  return (
    <div className="page">
      <header className="page__header">
        <h1 className="page__title">State Management</h1>
        <p className="page__subtitle">Context API vs Redux, reducers, pure functions, and composition.</p>
      </header>

      <section className="card">
        <h2 className="card__title">Plan</h2>
        <ul className="list">
          <li>Context: theme/auth/cart + re-render discussion</li>
          <li>Redux: reducers, actions, devtools, async</li>
          <li>Same UI built both ways for comparison</li>
        </ul>
        <div className="card__actions">
          <button type="button" className="btn" onClick={() => consoleApi.info('State lab scaffolded. Redux comes next.')}>
            Log status
          </button>
        </div>
      </section>
    </div>
  )
}

