import { createSlice } from '@reduxjs/toolkit'
import { resetAllData } from './rootActions.js'
import { createSeedState } from './seed.js'

const initialState = createSeedState().budgets

export const budgetsSlice = createSlice({
  name: 'budgets',
  initialState,
  reducers: {
    setBudget(state, action) {
      const { category, amount } = action.payload || {}
      if (!category) return
      state.byCategory[category] = Number(amount) || 0
    },
    deleteBudget(state, action) {
      const category = action.payload
      if (!category) return
      delete state.byCategory[category]
    },
  },
  extraReducers: (builder) => {
    builder.addCase(resetAllData, () => createSeedState().budgets)
  },
})

export const { setBudget, deleteBudget } = budgetsSlice.actions
export default budgetsSlice.reducer

