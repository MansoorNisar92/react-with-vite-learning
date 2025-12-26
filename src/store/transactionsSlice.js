import { createSlice, nanoid } from '@reduxjs/toolkit'
import { resetAllData } from './rootActions.js'
import { createSeedState } from './seed.js'

const seed = createSeedState()

const initialState = seed.transactions

export const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    addTransaction: {
      reducer(state, action) {
        const t = action.payload
        state.ids.unshift(t.id)
        state.byId[t.id] = t
      },
      prepare(draft) {
        return {
          payload: {
            id: nanoid(),
            date: draft.date,
            payee: draft.payee || 'Unknown',
            category: draft.category || 'General',
            amount: Number(draft.amount) || 0,
          },
        }
      },
    },
    updateTransaction(state, action) {
      const next = action.payload
      if (!next?.id || !state.byId[next.id]) return
      state.byId[next.id] = { ...state.byId[next.id], ...next }
    },
    deleteTransaction(state, action) {
      const id = action.payload
      if (!state.byId[id]) return
      delete state.byId[id]
      state.ids = state.ids.filter((x) => x !== id)
    },
  },
  extraReducers: (builder) => {
    builder.addCase(resetAllData, () => createSeedState().transactions)
  },
})

export const { addTransaction, updateTransaction, deleteTransaction } = transactionsSlice.actions

export default transactionsSlice.reducer

