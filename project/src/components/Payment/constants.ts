export const PAYMENT_TYPES = {
  CARD: 'card',
  UPI: 'upi',
  NETBANKING: 'netbanking',
  WALLET: 'wallet',
} as const;

export const PAYMENT_VALIDATION = {
  CARD_NUMBER_LENGTH: 16,
  CVV_LENGTH: 3,
  EXPIRY_LENGTH: 4,
} as const;