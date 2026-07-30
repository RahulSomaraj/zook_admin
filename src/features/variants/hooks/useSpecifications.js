import { useQuery } from "@tanstack/react-query";
import { fetchSpecifications } from "../api/specificationsApi";

export function useSpecifications() {
  return useQuery({
    queryKey: ["specifications"],
    queryFn: fetchSpecifications,
  });
}