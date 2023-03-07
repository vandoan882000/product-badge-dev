import { Buffer } from 'buffer';

/** Encode base64 string */
export const encodeBase64 = (base64String: string) => {
  return Buffer.from(base64String).toString('base64');
};
