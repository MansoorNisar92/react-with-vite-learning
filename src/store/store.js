import { configureStore, combineReducers } from '@reduxjs/toolkit'
import transactionsReducer from './transactionsSlice.js'
import budgetsReducer from './budgetsSlice.js'
import settingsReducer from './settingsSlice.js'
import { createSeedState } from './seed.js'
import { resetAllData } from './rootActions.js'

const STORAGE_KEY = 'pocketledger:v1'

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw)
  } catch {
    return null
  }
}

function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // ignore
  }
}

const appReducer = combineReducers({
  transactions: transactionsReducer,
  budgets: budgetsReducer,
  settings: settingsReducer,
})

function rootReducer(state, action) {
  if (action.type === resetAllData.type) {
    return appReducer(createSeedState(), action)
  }
  return appReducer(state, action)
}

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: loadState() || createSeedState(),
})

store.subscribe(() => {
  const s = store.getState()
  saveState({
    settings: s.settings,
    transactions: s.transactions,
    budgets: s.budgets,
  })
})

