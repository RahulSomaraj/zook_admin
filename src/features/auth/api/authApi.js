import { api } from "../../../lib/axios";
import { env } from "../../../config/env";

/**
 * Auth API calls. Each returns plain data; React Query / the store handle
 * caching and state. When env.useMock is on, these resolve fake data so the
 * UI works with no backend.
 *
 * Expected backend contract:
 *   POST /auth/login   { email, password }  -> { user, accessToken }  (+ sets httpOnly refresh cookie)
 *   POST /auth/refresh {}                   -> { user, accessToken }   (reads refresh cookie)
 *   POST /auth/logout  {}                   -> 204                     (clears refresh cookie)
 */

export async function loginRequest(credentials) {
  if (env.useMock) {
    await delay(400);
    if (!credentials.email || !credentials.password) {
      throw new Error("Email and password are required");
    }
    return {
      user: {
        id: 1,
        name: "Zook Admin",
        email: credentials.email,
        role: "super_admin",
      },
      accessToken: "mock-access-token",
    };
  }
  const { data } = await api.post("/auth/admin/login", credentials);
  return data;
}

export async function refreshSession() {
  if (env.useMock) {
    await delay(150);
    // No persisted mock session → force a login each reload in mock mode.
    return null;
  }
  const { data } = await api.post("/auth/refresh", {});
  return data;
}

export async function logoutRequest() {
  if (env.useMock) {
    await delay(100);
    return;
  }
  await api.post("/auth/logout", {});
}

const delay = (ms) => new Promise((r) => setTimeout(r, ms));
