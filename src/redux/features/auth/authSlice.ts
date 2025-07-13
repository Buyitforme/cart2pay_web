import { createSlice } from '@reduxjs/toolkit'
import { triggerSignup } from './authThunk'

interface IinitialState {
  error: boolean
  loading: boolean
  userData: Record<string, any>
  message: string
  statusCode?: number | null
}

const initialState: IinitialState = {
  error: false,
  loading: false,
  userData: {},
  message: '',
  statusCode: null,
}

const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    
  },
  extraReducers: builder => {
    // SIGN UP
    builder.addCase(triggerSignup.pending, state => {
      state.loading = true
      state.error = false
      state.userData = {}
      state.message = ''
    })
    builder.addCase(triggerSignup.fulfilled, (state, action) => {
      state.loading = false
      state.userData = action.payload as any
      state.error = false
      state.message = action.payload?.message as unknown as string
      state.statusCode = action.payload?.status_code as unknown as number
    })
    builder.addCase(triggerSignup.rejected, (state, action) => {
      state.loading = false
      state.error = true
      state.userData = {}
      state.message = action.payload as unknown as string
    })
  },
})

export default userSlice.reducer
