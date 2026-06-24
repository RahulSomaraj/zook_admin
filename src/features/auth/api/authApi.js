import { api } from "../../../lib/axios";
import { env } from "../../../config/env";

export async function loginRequest(credentials) {
  if (env.useMock) {
    await delay(400);
    if (!credentials.email || !credentials.password)
      throw new Error("Email and password are required");
    const mockData = {
      user: { id: 1, name: "Zook Admin", email: credentials.email, role: "super_admin" },
      accessToken: "mock-access-token",
      refreshToken: "mock-refresh-token",
    };
    localStorage.setItem("accessToken", mockData.accessToken);
    localStorage.setItem("refreshToken", mockData.refreshToken);
    return mockData;
  }

  const { data } = await api.post("/auth/admin/login", credentials);
  const payload = data.data; 

  localStorage.setItem("accessToken", payload.accessToken);
  localStorage.setItem("refreshToken", payload.refreshToken);
  return payload; // { accessToken, refreshToken, user, tokenType, expiresIn }
}

export async function refreshSession() {
  if (env.useMock) {
    await delay(150);
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    if (!accessToken || !refreshToken) return null;
    return {
      user: { id: 1, name: "Zook Admin", role: "super_admin" },
      accessToken,
      refreshToken,
    };
  }

  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) return null;

  try {
    const { data } = await api.post("/auth/refresh", { refreshToken });
    const payload = data.data; 

    localStorage.setItem("accessToken", payload.accessToken);
    localStorage.setItem("refreshToken", payload.refreshToken);
    return payload;
  } catch {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    return null;
  }
}

export async function logoutRequest() {
  if (env.useMock) {
    await delay(100);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    return;
  }
  try {
    await api.post("/auth/logout", {});
  } finally {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  }
}

const delay = (ms) => new Promise((r) => setTimeout(r, ms));