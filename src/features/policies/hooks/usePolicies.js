import { useQuery } from "@tanstack/react-query";
import { fetchPolicy } from "../api/policiesApi";

export function useTermsPolicy() {
  return useQuery({
    queryKey: ["policy", "terms_and_conditions"],
    queryFn: () => fetchPolicy("terms_and_conditions"),
  });
}

export function usePrivacyPolicy() {
  return useQuery({
    queryKey: ["policy", "privacy_policy"],
    queryFn: () => fetchPolicy("privacy_policy"),
  });
}