import { NextRequest } from 'next/server';
export function getBaseUrl() {
  if (typeof window !== 'undefined') return '';
  return process.env.BASE_URL;
}
