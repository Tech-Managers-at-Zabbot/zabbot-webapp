export const initiateGoogleRegister = () => {
  // Redirect to your backend's Google OAuth registration endpoint
  window.location.href = "https://zabbot-backend-development-no68m.ondigitalocean.app/api/v1/users/auth/google/register";
  // For local development:
  // window.location.href = "http://localhost:3010/api/v1/users/auth/google/register";
};

export const initiateGoogleLogin = () => {
  // Redirect to your backend's Google OAuth login endpoint
  window.location.href = "https://zabbot-backend-development-no68m.ondigitalocean.app/api/v1/users/auth/google/login";
  // For local development:
  // window.location.href = "http://localhost:3010/api/v1/users/auth/google/login";
};

// Handle the callback and extract user data or check for errors
export const handleGoogleAuthCallback = () => {
  const urlParams = new URLSearchParams(window.location.search);
  
  // Check for errors first
  const error = urlParams.get('error');
  if (error) {
    return { 
      success: false, 
      error: error,
      user: null 
    };
  }
  
  // Check for success indicators
  const registration = urlParams.get('registration');
  const login = urlParams.get('login');
  
  if (registration === 'success') {
    return { 
      success: true, 
      type: 'registration',
      error: null,
      user: null // User data will be in cookies/tokens
    };
  }
  
  if (login === 'success') {
    return { 
      success: true, 
      type: 'login',
      error: null,
      user: null // User data will be in cookies/tokens
    };
  }
  
  // Fallback for old implementation with user data in URL
  const user = urlParams.get('user');
  if (user) {
    try {
      return {
        success: true,
        type: 'unknown',
        error: null,
        user: JSON.parse(decodeURIComponent(user))
      };
    } catch (error) {
      console.error('Error parsing user data:', error);
      return { 
        success: false, 
        error: 'invalid_user_data',
        user: null 
      };
    }
  }
  
  return { 
    success: false, 
    error: 'unknown_error',
    user: null 
  };
};

// Updated hook with separate functions
export function useGoogleAuth() {
  const [isLoading, setIsLoading] = useState(false);
  
  const initiateGoogleRegistration = () => {
    setIsLoading(true);
    initiateGoogleRegister(); // This will redirect the user
  };

  const initiateGoogleSignIn = () => {
    setIsLoading(true);
    initiateGoogleLogin(); // This will redirect the user
  };

  return {
    initiateGoogleRegistration,
    initiateGoogleSignIn,
    isLoading
  };
}



export function useGoogleAuth() {
  const [isLoading, setIsLoading] = useState(false);

  const initiateGoogleRegistration = () => {
    setIsLoading(true);
    initiateGoogleRegister();
  };

  const initiateGoogleSignIn = () => {
    setIsLoading(true);
    initiateGoogleLogin();
  };

  return {
    initiateGoogleRegistration,
    initiateGoogleSignIn,
    isLoading
  };
}