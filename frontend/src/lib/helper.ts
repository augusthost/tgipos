import { ImageType } from "@/types";

export const getStatusColor = (status: string) => {
  switch (status) {
    case "new":
      return "border-blue-500";
    case "in-kitchen":
      return "border-yellow-500";
    case "ready":
      return "border-green-500";
    case "completed":
      return "!bg-gray-800 text-white";
    default:
      return "border-gray-100";
  }
};

export const getImageUrl = (image: ImageType): string => {
  if (!image) return import.meta.env.VITE_PLACEHOLDER_IMAGE;
  return import.meta.env.VITE_ASSET_URL + image.path;
};

export const fetcher = async (url: string, options?: RequestInit) => {
  const user = localStorage.getItem("user");
  if (!user) return;
  const userData = JSON.parse(user);
  const API_KEY: string = userData?.apiKey;

  const response = await fetch(url, {
    headers: { "Content-Type": "application/json", "api-key": API_KEY },
    ...options,
  });
  if (!response.ok) throw new Error("Network response was not ok");
  return response.json();
};
