import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
const apiUrl = import.meta.env.VITE_API_URL;

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  message: string | null; // Added missing message property
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface SignupCredentials {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface ForgotPasswordData {
  email: string;
}

interface ResetPasswordData {
  token: string;
  newPassword: string;
  confirmPassword: string;
}

// API response interfaces
interface LoginResponse {
  user: User;
  token: string;
}

interface SignupResponse {
  user: User;
  token: string;
}

interface ForgotPasswordResponse {
  message: string;
}

interface ResetPasswordResponse {
  message: string;
}


export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:8080/api/auth/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
          credentials: 'include',  // <---- Add this!

      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.error || 'Login failed');
      }

      return data as LoginResponse;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Login failed');
    }
  }
);

export const signupUser = createAsyncThunk(
  'auth/signup',
  async (credentials: SignupCredentials, { rejectWithValue }) => {
    try {
      // Remove confirmPassword before sending to API
      
      const response = await fetch(`http://localhost:8080/api/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message || 'Signup failed');
      }

      return data as SignupResponse;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Signup failed');
    }
  }
);

export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async (emailData: ForgotPasswordData, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:8080/api/auth/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message || 'Failed to send reset email');
      }

      return data as ForgotPasswordResponse;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to send reset email');
    }
  }
);

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (resetData: ResetPasswordData, { rejectWithValue }) => {
    try {
      // Remove confirmPassword before sending to API
const { token, newPassword,confirmPassword } = resetData;
      
      const response = await fetch(`http://localhost:8080/api/auth/reset-password/${token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
body: JSON.stringify({ newPassword, confirmPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message || 'Password reset failed');
      }

      return data as ResetPasswordResponse;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Password reset failed');
    }
  }
);
export const verifyToken = createAsyncThunk(
  'auth/verifyToken',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:8080/api/auth/verify-token`, {
        method: 'GET',
        credentials: 'include', 
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message || 'Token invalid');
      }

      return data; // contains decoded user
    } catch (error: any) {
      return rejectWithValue(error.message || 'Token verification failed');
    }
  }
);


const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('token'),
  isLoading: false,
  error: null,
  message: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setMessage: (state, action: PayloadAction<string | null>) => {
      state.message = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
    },
    clearAuthState: (state) => {
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    // Login cases
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
      state.error = null;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // Signup cases
    builder.addCase(signupUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(signupUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.error = null;
      localStorage.setItem('token', action.payload.token);
    });
    builder.addCase(signupUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // Forgot password cases
    builder.addCase(forgotPassword.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.message = null;
    });
    builder.addCase(forgotPassword.fulfilled, (state, action) => {
      state.isLoading = false;
      state.message = action.payload.message;
      state.error = null;
    });
    builder.addCase(forgotPassword.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // Reset password cases
    builder.addCase(resetPassword.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.message = null;
    });
    builder.addCase(resetPassword.fulfilled, (state, action) => {
      state.isLoading = false;
      state.message = action.payload.message;
      state.error = null;
    });
    builder.addCase(resetPassword.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    })
      .addCase(verifyToken.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(verifyToken.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
      state.error = null;
    })
    .addCase(verifyToken.rejected, (state, action) => {
      state.isLoading = false;
      state.user = null;
    });
  },
});

export const { setLoading, setError, setMessage, logout, clearAuthState } = authSlice.actions;
export default authSlice.reducer;