import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="page">
      <header className="page__header">
        <h1 className="page__title">Page not found</h1>
        <p className="page__subtitle">
          The route doesn’t exist. Go back <Link to="/">home</Link>.
        </p>
      </header>
    </div>
  )
}

