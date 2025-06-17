
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