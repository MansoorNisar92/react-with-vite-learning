import { createSelector } from '@reduxjs/toolkit'

export const selectTransactionsState = (s) => s.transactions

export const selectTransactions = createSelector([selectTransactionsState], (tx) => tx.ids.map((id) => tx.byId[id]).filter(Boolean))

// HashMap-like access: return a Map(id -> transaction)
export const selectTransactionsByIdMap = createSelector([selectTransactions], (list) => new Map(list.map((t) => [t.id, t])))

export const selectRecentTransactions = createSelector([selectTransactions], (list) => list.slice(0, 8))

export const selectFilteredTransactions = createSelector([selectTransactions], (list) => list)

export const selectMonthSummary = createSelector([selectTransactions], (list) => {
  let income = 0
  let expense = 0
  for (const t of list) {
    if (t.amount >= 0) income += t.amount
    else expense += t.amount
  }
  return { income, expense, net: income + expense }
})

export const selectCategoryTotals = createSelector([selectTransactions], (list) => {
  const map = new Map()
  for (const t of list) {
    map.set(t.category, (map.get(t.category) || 0) + t.amount)
  }
  return Array.from(map, ([category, total]) => ({ category, total }))
})

// Budget usage expects "spent" as positive number for expenses only
export const selectBudgetUsageByCategory = createSelector([selectTransactions], (list) => {
  const usage = Object.create(null)
  for (const t of list) {
    if (t.amount >= 0) continue
    usage[t.category] = (usage[t.category] || 0) + Math.abs(t.amount)
  }
  return usage
})

