// services/tableService
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Table } from "@/types";
import { fetcher } from "@/lib/helper";

const API_URL = import.meta.env.VITE_API_URL;

export const useFetchTables = () =>
  useQuery<Table[]>({
    queryKey: ["tables"],
    queryFn: () => fetcher(`${API_URL}/api/content/items/table?populate=1`),
  });

export const useFetchKitchenTables = () =>
  useQuery<Table[]>({
    queryKey: ["kitchenTables"],
    queryFn: () =>
      fetcher(
        `${API_URL}/api/content/items/table?populate=1&sort={_created:-1}&filter={status:"in-kitchen"}`,
      ),
  });

export const useFetchTable = (tableId: string) =>
  useQuery<Table>({
    queryKey: ["table", tableId],
    queryFn: () => fetcher(`${API_URL}/api/content/item/table/${tableId}`),
  });

export const useCreateTable = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (table: Partial<Table>) =>
      fetcher(`${API_URL}/api/content/item/table`, {
        method: "POST",
        body: JSON.stringify({ data: table }),
      }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tables"] }),
  });
};

export const useUpdateTable = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (table: Partial<Table>) =>
      fetcher(`${API_URL}/api/content/item/table`, {
        method: "POST",
        body: JSON.stringify({ data: table }),
      }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tables"] }),
  });
};

export const useDeleteTable = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (tableId: string) =>
      fetcher(`${API_URL}/api/content/item/table/${tableId}`, {
        method: "DELETE",
      }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tables"] }),
  });
};
