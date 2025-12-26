import React from 'react'
import { useConsole } from '../console/ConsoleContext.jsx'

export default function Home() {
  const consoleApi = useConsole()

  return (
    <div className="page">
      <header className="page__header">
        <h1 className="page__title">Interview Prep Lab</h1>
        <p className="page__subtitle">
          A hands-on playground for JavaScript and React interview concepts. Pick a lab from the left, run small demos,
          and watch the output in the Console.
        </p>
      </header>

      <section className="card">
        <h2 className="card__title">Quick check</h2>
        <p className="card__body">If you can see a log in the Console panel, the shared “lab console” is wired up.</p>
        <div className="card__actions">
          <button type="button" className="btn" onClick={() => consoleApi.log('Hello from Home!')}>
            Write to console
          </button>
        </div>
      </section>
    </div>
  )
}

