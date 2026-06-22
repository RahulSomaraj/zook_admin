import { api } from "../../../lib/axios";
import { env } from "../../../config/env";
import ordersData from "../../../data/ordersData";

/**
 * Data-access layer for orders. This is the ONLY place that knows how orders
 * are fetched. Components never call axios directly — they use the useOrders
 * hook, which calls these functions. Swapping mock → real API is a one-file
 * change.
 */

export async function fetchOrders(filters = {}) {
  if (env.useMock) {
    await delay(300);
    return applyFilters(ordersData, filters);
  }
  const { data } = await api.get("/orders", { params: filters });
  return data;
}

export async function fetchOrderById(id) {
  if (env.useMock) {
    await delay(200);
    return ordersData.find((o) => o.subOrderId === id) ?? null;
  }
  const { data } = await api.get(`/orders/${id}`);
  return data;
}

export async function updateOrderStatus(id, status) {
  if (env.useMock) {
    await delay(200);
    return { id, status };
  }
  const { data } = await api.patch(`/orders/${id}`, { status });
  return data;
}

// --- helpers (mock only) ---
function applyFilters(rows, { status, search } = {}) {
  let result = rows;
  if (status && status !== "All") {
    result = result.filter((o) => o.status === status);
  }
  if (search) {
    const q = search.toLowerCase();
    result = result.filter(
      (o) =>
        o.product.toLowerCase().includes(q) ||
        o.vendor.toLowerCase().includes(q) ||
        o.subOrderId.toLowerCase().includes(q)
    );
  }
  return result;
}

const delay = (ms) => new Promise((r) => setTimeout(r, ms));
