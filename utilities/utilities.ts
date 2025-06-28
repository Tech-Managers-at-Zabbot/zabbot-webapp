
/**
 * Masks an email address by showing first and last characters of the username
 * and replacing middle characters with asterisks
 * @param email - The email address to mask
 * @returns Masked email string
 */
export function maskEmail(email: string): string {
  if (!email || !email.includes('@')) {
    throw new Error('Invalid email format');
  }

  const [username, domain] = email.split('@');
  
  if (username.length === 0) {
    throw new Error('Invalid email format');
  }
  
  let maskedUsername: string;
  
  if (username.length === 1) {
    maskedUsername = username;
  } else if (username.length === 2) {
    maskedUsername = username[0] + '*';
  } else if (username.length === 3) {
    maskedUsername = username[0] + '*' + username[username.length - 1];
  } else if (username.length === 4) {
    maskedUsername = username[0] + '**' + username[username.length - 1];
  } else {
    const firstChar = username[0];
    const lastTwoChars = username.slice(-2);
    const middleLength = username.length - 3;
    const asterisks = '*'.repeat(middleLength);
    maskedUsername = firstChar + asterisks + lastTwoChars;
  }
  
  return `${maskedUsername}@${domain}`;
}



export const getGoogleAuthErrorMessage = (error: string) => {
  const errorMessages: Record<string, string> = {
    'user_not_found_please_register': 'Account not found. Please register first.',
    'user_already_exists': 'Account already exists. Please login instead.',
    'please_register_first': 'Account not found. Please register first.',
    'user_exists_please_login': 'Account already exists. Please login instead.',
    'unauthorized_for_testing': 'You are in the Founders Circle; however, you did not sign up to be a Beta Tester.  Changed your mind? That is GREAT! Please send an email to bola@zabbot.com and we will add you the Beta Test group.  Thank you!',
    'signup_as_tester': 'User not found. Please sign up as a beta tester at https://zabbot.com/founders-circle',
    'failed_tester_check': 'Beta tester check failed Please try again.',
    'account_inactive_or_blocked': 'Your account is inactive or blocked, please contact us on bola@zabbot.com',
    'registration_failed': 'Registration failed. Please try again.',
    'login_failed': 'Login failed. Please try again.',
    'authentication_failed': 'Google authentication failed. Please try again.',
    'invalid_user_data': 'Invalid user data received.',
    'unknown_error': 'An unknown error occurred.',
    'login_successful': 'Login successful.',
  };
  
  return errorMessages[error] || 'An unexpected error occurred.';
};