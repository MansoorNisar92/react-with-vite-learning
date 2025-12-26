import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { resetAllData } from '../store/rootActions.js'
import { setCurrency } from '../store/settingsSlice.js'

export default function Settings() {
  const dispatch = useDispatch()
  const currency = useSelector((s) => s.settings.currency)

  return (
    <div className="page">
      <header className="page__header">
        <h1 className="page__title">Settings</h1>
        <p className="page__subtitle">Local-only demo settings (stored in localStorage).</p>
      </header>

      <section className="card">
        <h2 className="card__title">Currency</h2>
        <div className="toolbar">
          <div className="toolbar__group">
            <select className="input" value={currency} onChange={(e) => dispatch(setCurrency(e.target.value))}>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="INR">INR</option>
              <option value="GBP">GBP</option>
            </select>
          </div>
        </div>
      </section>

      <section className="card" style={{ marginTop: 16 }}>
        <h2 className="card__title">Danger zone</h2>
        <p className="card__body">Reset will wipe the local demo data and restore the seed dataset.</p>
        <div className="card__actions">
          <button type="button" className="btn btn--ghost" onClick={() => dispatch(resetAllData())}>
            Reset demo data
          </button>
        </div>
      </section>
    </div>
  )
}

