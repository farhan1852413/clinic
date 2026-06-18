// Centralized API base URL.
// Falls back to localhost for local dev, but reads from env in any deployed environment.
// Set NEXT_PUBLIC_API_URL in your .env.local / hosting provider's env settings.
import { apiUrl } from "components/lib/api";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export function apiUrl(path: string) {
  return `${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}