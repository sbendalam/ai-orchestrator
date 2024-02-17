import { configureStore } from '@reduxjs/toolkit'
import localeReducer from '../features/locale/localeSlice'
export const store = configureStore({
  reducer: {
    locale:localeReducer
  },
})