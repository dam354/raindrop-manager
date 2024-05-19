import crypto from 'crypto';

const algorithm = 'aes-256-cbc';
const key = process.env.SESSION_SECRET ? Buffer.from(process.env.SESSION_SECRET, 'hex') : null;

if (!key) {
  throw new Error('SESSION_SECRET environment variable is not set or invalid');
}

export function encrypt(text: string) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return iv.toString('hex') + ':' + encrypted;
}

export function decrypt(text: string) {
  const [ivText, encryptedText] = text.split(':');
  const iv = Buffer.from(ivText, 'hex');
  const encrypted = Buffer.from(encryptedText, 'hex');
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(encrypted);
  decrypted += decipher.final('utf8');
  return decrypted;
}