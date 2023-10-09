export function getBaseUrl() {
  if (typeof window !== 'undefined') return '';
  return process.env.BASE_URL;
}
