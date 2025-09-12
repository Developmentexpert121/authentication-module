import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const BASE_URL = '/api/auth'; // Adjust if needed

interface ApiResponse {
  message?: string;
  error?: string;
}

interface VerifyOtpArgs {
  email: string;
  otp: string;
}

interface AuthEmail {
  loading: boolean;
  error: string | null;
  message: string | null;
  verified: boolean;
}

const initialState: AuthEmail = {
  loading: false,
  error: null,
  message: null,
  verified: false,
};

// sendOtp thunk
export const sendOtp = createAsyncThunk<
  ApiResponse,  // Return type from the thunk (data from API)
  string,       // Argument type to the thunk (email string)
  { rejectValue: string } // thunkAPI reject type
>(
  'auth/sendOtp',
  async (email, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:8080/api/auth/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data: ApiResponse = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.error || 'Failed to send OTP');
      }

      return data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

// verifyOtp thunk
export const verifyOtp = createAsyncThunk<          
  ApiResponse,        
  VerifyOtpArgs,      
  { rejectValue: string } 
>(
  'auth/verifyOtp',
  async ({ email, otp }, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:8080/api/auth/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
        credentials: 'include',   
   });

      const data: ApiResponse = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.error || 'Failed to verify OTP');
      }

      return data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);
export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (
    { email, username }: { email: string; username: string },
    thunkAPI
  ) => {
    try {
      const response = await fetch('http://localhost:8080/api/auth/registerForm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, username })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || 'Network error');
    }
  }
);
const authSlice = createSlice({
  name: 'emailverifications',
  initialState,
  reducers: {
    resetState: (state) => {
      state.loading = false;
      state.error = null;
      state.message = null;
      state.verified = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // sendOtp cases
      .addCase(sendOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(sendOtp.fulfilled, (state, action: PayloadAction<ApiResponse>) => {
        state.loading = false;
        state.message = action.payload.message || 'OTP sent successfully';
      })
      .addCase(sendOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Error sending OTP';
      })

      // verifyOtp cases
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(verifyOtp.fulfilled, (state, action: PayloadAction<ApiResponse>) => {
        state.loading = false;
        state.verified = true;
        state.message = action.payload.message || 'Email verified successfully';
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Error verifying OTP';
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = '';
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetState } = authSlice.actions;
export default authSlice.reducer;
