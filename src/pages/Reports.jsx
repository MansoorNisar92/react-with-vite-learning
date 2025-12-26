import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { selectCategoryTotals, selectMonthSummary } from '../store/selectors.js'

function formatMoney(amount, currency) {
  return new Intl.NumberFormat(undefined, { style: 'currency', currency }).format(amount)
}

export default function Reports() {
  const currency = useSelector((s) => s.settings.currency)
  const summary = useSelector(selectMonthSummary)
  const totals = useSelector(selectCategoryTotals)

  const sorted = useMemo(() => {
    return [...totals].sort((a, b) => Math.abs(b.total) - Math.abs(a.total))
  }, [totals])

  const maxAbs = useMemo(() => {
    let m = 0
    for (const r of sorted) m = Math.max(m, Math.abs(r.total))
    return m || 1
  }, [sorted])

  return (
    <div className="page">
      <header className="page__header">
        <h1 className="page__title">Reports</h1>
        <p className="page__subtitle">Lazy-loaded page (code splitting) + derived aggregates (useMemo/selectors).</p>
      </header>

      <div className="grid3">
        <section className="statCard">
          <div className="statCard__label">Income</div>
          <div className="statCard__value">{formatMoney(summary.income, currency)}</div>
        </section>
        <section className="statCard">
          <div className="statCard__label">Expenses</div>
          <div className="statCard__value">{formatMoney(summary.expense, currency)}</div>
        </section>
        <section className="statCard">
          <div className="statCard__label">Net</div>
          <div className="statCard__value">{formatMoney(summary.net, currency)}</div>
        </section>
      </div>

      <section className="card" style={{ marginTop: 16 }}>
        <h2 className="card__title">By category</h2>
        {sorted.length === 0 ? (
          <p className="card__body">No data yet.</p>
        ) : (
          <div className="bars">
            {sorted.map((r) => {
              const w = Math.round((Math.abs(r.total) / maxAbs) * 100)
              return (
                <div key={r.category} className="barRow">
                  <div className="barRow__label">{r.category}</div>
                  <div className="barRow__track">
                    <div className={`barRow__bar ${r.total < 0 ? 'barRow__bar--neg' : 'barRow__bar--pos'}`} style={{ width: `${w}%` }} />
                  </div>
                  <div className={`barRow__value mono ${r.total < 0 ? 'neg' : 'pos'}`}>{formatMoney(r.total, currency)}</div>
                </div>
              )
            })}
          </div>
        )}
      </section>
    </div>
  )
}

