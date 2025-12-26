import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { selectMonthSummary, selectRecentTransactions } from '../store/selectors.js'

function formatMoney(amount, currency) {
  return new Intl.NumberFormat(undefined, { style: 'currency', currency }).format(amount)
}

export default function Dashboard() {
  const currency = useSelector((s) => s.settings.currency)
  const summary = useSelector(selectMonthSummary)
  const recent = useSelector(selectRecentTransactions)

  const cards = useMemo(
    () => [
      { label: 'Income', value: formatMoney(summary.income, currency) },
      { label: 'Expenses', value: formatMoney(summary.expense, currency) },
      { label: 'Net', value: formatMoney(summary.net, currency) },
    ],
    [currency, summary.expense, summary.income, summary.net],
  )

  return (
    <div className="page">
      <header className="page__header">
        <h1 className="page__title">Dashboard</h1>
        <p className="page__subtitle">Your month at a glance (demo data is stored locally in your browser).</p>
      </header>

      <div className="grid3">
        {cards.map((c) => (
          <section key={c.label} className="statCard">
            <div className="statCard__label">{c.label}</div>
            <div className="statCard__value">{c.value}</div>
          </section>
        ))}
      </div>

      <section className="card" style={{ marginTop: 16 }}>
        <h2 className="card__title">Recent transactions</h2>
        {recent.length === 0 ? (
          <p className="card__body">No transactions yet.</p>
        ) : (
          <div className="table">
            <div className="table__header">
              <div>Date</div>
              <div>Payee</div>
              <div>Category</div>
              <div className="table__right">Amount</div>
            </div>
            {recent.map((t) => (
              <div key={t.id} className="table__row">
                <div className="mono">{t.date}</div>
                <div>{t.payee}</div>
                <div className="tag">{t.category}</div>
                <div className={`table__right mono ${t.amount < 0 ? 'neg' : 'pos'}`}>
                  {formatMoney(t.amount, currency)}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

