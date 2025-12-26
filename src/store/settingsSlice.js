import { createSlice } from '@reduxjs/toolkit'
import { resetAllData } from './rootActions.js'
import { createSeedState } from './seed.js'

const initialState = createSeedState().settings

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setCurrency(state, action) {
      state.currency = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(resetAllData, () => createSeedState().settings)
  },
})

export const { setCurrency } = settingsSlice.actions
export default settingsSlice.reducer

