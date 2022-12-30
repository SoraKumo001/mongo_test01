import crypto from 'crypto';

export const createHash = (value: string) =>
  crypto.createHash('sha256').update(value, 'utf8').digest('hex');
