import { useQuery } from "@tanstack/react-query";
import { fetchPolicies } from "../api/policiesApi";

export function usePolicies(params = {}) {
  return useQuery({
    queryKey: ["policies", params],
    queryFn: () => fetchPolicies(params),
  });
}