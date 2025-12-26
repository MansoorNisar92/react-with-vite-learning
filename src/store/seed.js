function isoDaysAgo(days) {
  const d = new Date()
  d.setDate(d.getDate() - days)
  const yyyy = d.getFullYear()
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  return `${yyyy}-${mm}-${dd}`
}

function uid() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`
}

export function createSeedState() {
  const base = [
    { date: isoDaysAgo(1), payee: 'Starbucks', category: 'Food', amount: -7.65 },
    { date: isoDaysAgo(2), payee: 'Uber', category: 'Transport', amount: -14.2 },
    { date: isoDaysAgo(3), payee: 'Salary', category: 'Income', amount: 2400 },
    { date: isoDaysAgo(4), payee: 'Netflix', category: 'Subscriptions', amount: -12.99 },
    { date: isoDaysAgo(6), payee: 'Whole Foods', category: 'Groceries', amount: -64.33 },
    { date: isoDaysAgo(7), payee: 'Electric Co', category: 'Bills', amount: -88.1 },
  ]

  // Add many rows for virtualization demos
  const more = Array.from({ length: 2500 }, (_, i) => ({
    date: isoDaysAgo(10 + (i % 28)),
    payee: `Mock merchant ${i + 1}`,
    category: ['Groceries', 'Food', 'Bills', 'Shopping', 'Transport'][i % 5],
    amount: -Number(((i % 90) + 3 + (i % 7) * 0.17).toFixed(2)),
  }))

  const all = [...base, ...more].map((t) => ({ ...t, id: uid() }))

  return {
    settings: { currency: 'USD' },
    transactions: { ids: all.map((t) => t.id), byId: Object.fromEntries(all.map((t) => [t.id, t])) },
    budgets: {
      byCategory: {
        Food: 250,
        Groceries: 400,
        Transport: 180,
        Subscriptions: 60,
        Bills: 300,
      },
    },
  }
}

