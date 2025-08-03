import { configureStore } from '@reduxjs/toolkit'
import { setDispatchFunction } from './store'
import authReducer from '../features/auth/authSlice'
import userAccountManagementReducer from '../features/UserAccountManagement/userAccountManagementSlice'
import orderManagementReducer from '../features/orderManagement/orderManagementSlice'
const store = configureStore({
  reducer: {
    auth: authReducer,
    user_account_management: userAccountManagementReducer,
    order_management : orderManagementReducer
  },
})

setDispatchFunction(store.dispatch)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
