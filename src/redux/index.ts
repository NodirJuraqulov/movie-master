import { configureStore } from '@reduxjs/toolkit'
import saved from './features/saved'

export const store = configureStore({
  reducer: {
    saved
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch