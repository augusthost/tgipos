export const waiterRestrictedRoutes = [
  "/menus",
  "/kitchen",
  "/categories",
  "/orders",
  "/reports",
];
export const chefRestrictedRoutes = ["/orders", "/reports"];

export const canAccess = (role: string, pathname: string): boolean => {
  if (role === "waiter") {
    return waiterRestrictedRoutes.includes(pathname);
  }

  if (role === "chef") {
    return chefRestrictedRoutes.includes(pathname);
  }

  return false;
};
