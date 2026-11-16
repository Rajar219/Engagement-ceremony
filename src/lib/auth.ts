import crypto from 'crypto';
import { NextRequest } from 'next/server';

const ADMIN_SECRET = process.env.ADMIN_SECRET || 'vp-royal-invitation-2026-secret-key';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'vp2026';
export const ADMIN_COOKIE_NAME = 'vp_admin_session';

// Create a tamper-proof admin token
export function createAdminToken(): string {
  const payload = `admin_${Date.now()}`;
  const signature = crypto
    .createHmac('sha256', ADMIN_SECRET)
    .update(payload)
    .digest('hex');
  return `${payload}.${signature}`;
}

// Verify admin token validity
export function verifyAdminToken(token?: string | null): boolean {
  if (!token) return false;
  const parts = token.split('.');
  if (parts.length !== 2) return false;

  const [payload, signature] = parts;
  const expectedSignature = crypto
    .createHmac('sha256', ADMIN_SECRET)
    .update(payload)
    .digest('hex');

  return signature === expectedSignature;
}

// Verify admin credentials
export function checkAdminPassword(password: string): boolean {
  if (!password) return false;
  return password.trim() === ADMIN_PASSWORD.trim();
}

// Check if request is authenticated as admin
export function isRequestAdmin(req: NextRequest): boolean {
  const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
  return verifyAdminToken(token);
}
