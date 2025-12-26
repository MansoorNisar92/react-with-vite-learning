import React, { useCallback, useMemo, useState } from 'react'
import { List } from 'react-window'
import { useDispatch, useSelector } from 'react-redux'
import { addTransaction, deleteTransaction, updateTransaction } from '../store/transactionsSlice.js'
import { selectFilteredTransactions, selectTransactionsByIdMap } from '../store/selectors.js'

function formatMoney(amount, currency) {
  return new Intl.NumberFormat(undefined, { style: 'currency', currency }).format(amount)
}

function todayISO() {
  const d = new Date()
  const yyyy = d.getFullYear()
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  return `${yyyy}-${mm}-${dd}`
}

function TransactionModal({ isOpen, initial, currency, onClose, onSave }) {
  const [draft, setDraft] = useState(initial)

  React.useEffect(() => {
    setDraft(initial)
  }, [initial])

  if (!isOpen) return null

  const onChange = (key) => (e) => {
    const value = e.target.value
    setDraft((prev) => ({ ...prev, [key]: value }))
  }

  const onAmountChange = (e) => {
    const next = e.target.value
    setDraft((prev) => ({ ...prev, amount: next }))
  }

  const submit = () => {
    const amountNum = Number(draft.amount)
    if (!Number.isFinite(amountNum)) return
    onSave({ ...draft, amount: amountNum })
  }

  return (
    <div className="modalOverlay" role="dialog" aria-modal="true">
      <div className="modal">
        <div className="modal__header">
          <div className="modal__title">{initial.id ? 'Edit transaction' : 'Add transaction'}</div>
          <button type="button" className="btn btn--ghost" onClick={onClose}>
            Close
          </button>
        </div>

        <div className="modal__body">
          <div className="formGrid">
            <div className="formRow">
              <label className="label" htmlFor="date">
                Date
              </label>
              <input id="date" className="input" type="date" value={draft.date} onChange={onChange('date')} />
            </div>

            <div className="formRow">
              <label className="label" htmlFor="payee">
                Payee
              </label>
              <input id="payee" className="input" value={draft.payee} onChange={onChange('payee')} />
            </div>

            <div className="formRow">
              <label className="label" htmlFor="category">
                Category
              </label>
              <input id="category" className="input" value={draft.category} onChange={onChange('category')} />
            </div>

            <div className="formRow">
              <label className="label" htmlFor="amount">
                Amount ({currency})
              </label>
              <input
                id="amount"
                className="input"
                value={String(draft.amount)}
                onChange={onAmountChange}
                inputMode="decimal"
                placeholder="-45.90"
              />
              <div className="help">Use negative for expenses, positive for income.</div>
            </div>
          </div>
        </div>

        <div className="modal__footer">
          <button type="button" className="btn btn--ghost" onClick={onClose}>
            Cancel
          </button>
          <button type="button" className="btn" onClick={submit}>
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Transactions() {
  const dispatch = useDispatch()
  const currency = useSelector((s) => s.settings.currency)
  const transactions = useSelector(selectFilteredTransactions)
  const byId = useSelector(selectTransactionsByIdMap)

  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)

  const categories = useMemo(() => {
    const set = new Set()
    for (const t of byId.values()) set.add(t.category)
    return ['All', ...Array.from(set).sort((a, b) => a.localeCompare(b))]
  }, [byId])

  const openNew = () => {
    setEditingId(null)
    setIsModalOpen(true)
  }

  const openEdit = useCallback((id) => {
    setEditingId(id)
    setIsModalOpen(true)
  }, [])

  const closeModal = () => setIsModalOpen(false)

  const initialDraft = useMemo(() => {
    if (editingId && byId.has(editingId)) {
      const t = byId.get(editingId)
      return { id: t.id, date: t.date, payee: t.payee, category: t.category, amount: t.amount }
    }
    return { id: null, date: todayISO(), payee: '', category: 'General', amount: -12.5 }
  }, [byId, editingId])

  const saveDraft = (draft) => {
    if (draft.id) dispatch(updateTransaction(draft))
    else dispatch(addTransaction(draft))
    setIsModalOpen(false)
  }

  const onDelete = useCallback(
    (id) => {
      dispatch(deleteTransaction(id))
    },
    [dispatch],
  )

  // Filter params are kept in component state to show interview-friendly memoization:
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return transactions.filter((t) => {
      if (category !== 'All' && t.category !== category) return false
      if (!q) return true
      return (
        t.payee.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q) ||
        String(t.amount).includes(q) ||
        t.date.includes(q)
      )
    })
  }, [category, query, transactions])

  const Row = useCallback(
    ({ index, style, ariaAttributes }) => {
      const t = filtered[index]
      if (!t) return null
      return (
        <div className="vRow" style={style} {...ariaAttributes}>
          <div className="mono">{t.date}</div>
          <div className="vRow__payee">{t.payee}</div>
          <div className="tag">{t.category}</div>
          <div className={`mono vRow__amount ${t.amount < 0 ? 'neg' : 'pos'}`}>{formatMoney(t.amount, currency)}</div>
          <div className="vRow__actions">
            <button type="button" className="btn btn--ghost btn--sm" onClick={() => openEdit(t.id)}>
              Edit
            </button>
            <button type="button" className="btn btn--ghost btn--sm" onClick={() => onDelete(t.id)}>
              Delete
            </button>
          </div>
        </div>
      )
    },
    [currency, filtered, onDelete, openEdit],
  )

  return (
    <div className="page">
      <header className="page__header">
        <h1 className="page__title">Transactions</h1>
        <p className="page__subtitle">Fast list (virtualized) + filters + CRUD (Redux reducers, pure updates).</p>
      </header>

      <section className="card">
        <div className="toolbar">
          <div className="toolbar__group">
            <div className="formRow" style={{ margin: 0 }}>
              <label className="label" htmlFor="q">
                Search
              </label>
              <input
                id="q"
                className="input"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Payee, category, date, amount…"
              />
            </div>
          </div>
          <div className="toolbar__group">
            <div className="formRow" style={{ margin: 0 }}>
              <label className="label" htmlFor="cat">
                Category
              </label>
              <select id="cat" className="input" value={category} onChange={(e) => setCategory(e.target.value)}>
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <button type="button" className="btn" onClick={openNew}>
              Add transaction
            </button>
          </div>
        </div>

        <div className="vTable">
          <div className="vHeader">
            <div>Date</div>
            <div>Payee</div>
            <div>Category</div>
            <div className="vHeader__right">Amount</div>
            <div className="vHeader__right">Actions</div>
          </div>

          <div className="vBody">
            <List
              rowCount={filtered.length}
              rowHeight={52}
              rowComponent={Row}
              overscanCount={6}
              style={{ height: 520 }}
            />
          </div>

          <div className="vFooter">
            <div className="muted">Rows: {filtered.length}</div>
            <div className="muted">Total: {formatMoney(filtered.reduce((s, t) => s + t.amount, 0), currency)}</div>
          </div>
        </div>
      </section>

      <TransactionModal
        isOpen={isModalOpen}
        initial={initialDraft}
        currency={currency}
        onClose={closeModal}
        onSave={saveDraft}
      />
    </div>
  )
}

