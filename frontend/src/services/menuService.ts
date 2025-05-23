// services/menuService
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Menu } from "@/types";
import { fetcher } from "@/lib/helper";

const API_URL = import.meta.env.VITE_API_URL;

export const useFetchMenus = () =>
  useQuery<Menu[]>({
    queryKey: ["menus"],
    queryFn: () => fetcher(`${API_URL}/api/content/items/menu?populate=1`),
  });

export const useFetchKitchenMenus = () =>
  useQuery<Menu[]>({
    queryKey: ["kitchenMenus"],
    queryFn: () =>
      fetcher(
        `${API_URL}/api/content/items/menu?populate=1&sort={_created:-1}&filter={status:"in-kitchen"}`,
      ),
  });

export const useFetchMenu = (menuId: string) =>
  useQuery<Menu>({
    queryKey: ["menu", menuId],
    queryFn: () => fetcher(`${API_URL}/api/content/items/menu/${menuId}`),
  });

export const useCreateMenu = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (menu: Partial<Menu>) =>
      fetcher(`${API_URL}/api/content/item/menu`, {
        method: "POST",
        body: JSON.stringify({ data: menu }),
      }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["menus"] }),
  });
};

export const useUpdateMenu = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (menu: Partial<Menu>) =>
      fetcher(`${API_URL}/api/content/item/menu`, {
        method: "POST",
        body: JSON.stringify({ data: menu }),
      }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["menus"] }),
  });
};

export const useDeleteMenu = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (menuId: string) =>
      fetcher(`${API_URL}/api/content/item/menu/${menuId}`, {
        method: "DELETE",
      }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["menus"] }),
  });
};
