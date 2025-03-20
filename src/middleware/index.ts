export const waiterRestrictedRoutes = [
  "/menus",
  "/kitchen",
  "/categories",
  "/orders",
];
export const chefRestrictedRoutes = ["/orders"];

export const canAccess = (role: string, pathname: string): boolean => {
  if (role === "waiter") {
    return waiterRestrictedRoutes.includes(pathname);
  }

  if (role === "chef") {
    return chefRestrictedRoutes.includes(pathname);
  }

  return false;
};
