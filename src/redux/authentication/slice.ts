import { createSlice } from '@reduxjs/toolkit'
import { UserResponse } from '../../types'
import {
  confirmedEmail,
  currentUser,
  login,
  logout,
  saveNewPassword,
  signUp,
  resetPassword
} from './operation'

export type OperationType = 'Login' | 'SignUp' | 'currentUser'

export type SignUpFormData = {
  firstName: string
  lastName: string
  email: string
  password: string
  repeatPassword: string
}

export enum sendEmailType {
  forPass = 'forPass',
  forEmail = 'forEmail'
}

type AuthState = {
  user: UserResponse | null
  isLoggedIn: boolean
  isLoading: boolean
  errors: any | null
  operationType: OperationType | null
  confEmail: string | null
  resPass: string | null
  sendEmail: sendEmailType | null
}

const INITIAL_STATE: AuthState = {
  user: null,
  isLoggedIn: false,
  isLoading: false,
  errors: null,
  operationType: null,
  confEmail: null,
  resPass: null,
  sendEmail: null
}

export const authSlice = createSlice({
  name: 'Auth',
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state, action) => {
        state.isLoading = true
        state.operationType = action.meta.arg.operationType
      })
      .addCase(signUp.rejected, (state, action) => {
        state.isLoading = false
        state.errors = action.payload
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload.data
        if (state.errors) {
          state.errors = null
        }
      })
      .addCase(login.pending, (state, action) => {
        state.isLoading = true
        state.operationType = action.meta.arg.operationType
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.errors = action.payload
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload.data.user
        state.isLoggedIn = true
        if (state.errors) {
          state.errors = null
        }
      })
      .addCase(currentUser.pending, (state, action) => {
        state.isLoading = true
        state.operationType = action.meta.arg.operationType
      })
      .addCase(currentUser.rejected, (state, action) => {
        state.isLoading = false
        state.errors = action.error
      })
      .addCase(currentUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isLoggedIn = true
        state.user = action.payload.data
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false
        state.errors = action.error
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null
        state.isLoggedIn = false
        state.isLoading = false
        state.errors = null
        state.operationType = null
      })
      .addCase(confirmedEmail.pending, (state) => {
        state.isLoading = true
      })
      .addCase(confirmedEmail.rejected, (state, action) => {
        state.isLoading = false
        state.errors = action.error
      })
      .addCase(confirmedEmail.fulfilled, (state, action) => {
        state.isLoading = false
        state.confEmail = action.payload
      })
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false
        state.errors = action.payload
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.isLoading = false
        state.sendEmail = sendEmailType.forPass
      })
      .addCase(saveNewPassword.pending, (state) => {
        state.isLoading = true
      })
      .addCase(saveNewPassword.rejected, (state, action) => {
        state.isLoading = false
        state.errors = action.error
      })
      .addCase(saveNewPassword.fulfilled, (state, action) => {
        state.isLoading = false
        state.resPass = action.payload
      })
  }
})

export default authSlice.reducer
