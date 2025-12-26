import React, { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setBudget } from '../store/budgetsSlice.js'
import { selectBudgetUsageByCategory } from '../store/selectors.js'

function formatMoney(amount, currency) {
  return new Intl.NumberFormat(undefined, { style: 'currency', currency }).format(amount)
}

export default function Budgets() {
  const dispatch = useDispatch()
  const currency = useSelector((s) => s.settings.currency)
  const budgets = useSelector((s) => s.budgets.byCategory)
  const usage = useSelector(selectBudgetUsageByCategory)

  const [draftCategory, setDraftCategory] = useState('Food')
  const [draftAmount, setDraftAmount] = useState('300')

  const rows = useMemo(() => {
    const categories = new Set([...Object.keys(budgets), ...Object.keys(usage)])
    return Array.from(categories)
      .sort((a, b) => a.localeCompare(b))
      .map((cat) => {
        const limit = budgets[cat] ?? 0
        const spent = usage[cat] ?? 0
        const pct = limit > 0 ? Math.min(100, Math.round((spent / limit) * 100)) : 0
        return { cat, limit, spent, pct }
      })
  }, [budgets, usage])

  const submit = () => {
    const amount = Number(draftAmount)
    if (!draftCategory.trim() || !Number.isFinite(amount) || amount < 0) return
    dispatch(setBudget({ category: draftCategory.trim(), amount }))
    setDraftAmount('')
  }

  return (
    <div className="page">
      <header className="page__header">
        <h1 className="page__title">Budgets</h1>
        <p className="page__subtitle">Reducers + pure functions + derived usage (selectors).</p>
      </header>

      <section className="card">
        <h2 className="card__title">Set budget</h2>
        <div className="toolbar">
          <div className="toolbar__group">
            <div className="formRow" style={{ margin: 0 }}>
              <label className="label" htmlFor="bcat">
                Category
              </label>
              <input id="bcat" className="input" value={draftCategory} onChange={(e) => setDraftCategory(e.target.value)} />
            </div>
          </div>
          <div className="toolbar__group">
            <div className="formRow" style={{ margin: 0 }}>
              <label className="label" htmlFor="bamt">
                Monthly limit ({currency})
              </label>
              <input
                id="bamt"
                className="input"
                value={draftAmount}
                onChange={(e) => setDraftAmount(e.target.value)}
                inputMode="decimal"
              />
            </div>
            <button type="button" className="btn" onClick={submit}>
              Save budget
            </button>
          </div>
        </div>
      </section>

      <section className="card" style={{ marginTop: 16 }}>
        <h2 className="card__title">Budget overview</h2>
        {rows.length === 0 ? (
          <p className="card__body">No budgets yet.</p>
        ) : (
          <div className="budgetList">
            {rows.map((r) => (
              <div key={r.cat} className="budgetRow">
                <div className="budgetRow__left">
                  <div className="budgetRow__title">{r.cat}</div>
                  <div className="budgetRow__meta">
                    Spent {formatMoney(-r.spent, currency)} of {formatMoney(r.limit, currency)}
                  </div>
                </div>
                <div className="budgetRow__right">
                  <div className={`pill ${r.pct >= 100 ? 'pill--danger' : r.pct >= 80 ? 'pill--warn' : ''}`}>{r.pct}%</div>
                </div>
                <div className="progress">
                  <div className={`progress__bar ${r.pct >= 100 ? 'progress__bar--danger' : r.pct >= 80 ? 'progress__bar--warn' : ''}`} style={{ width: `${r.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

