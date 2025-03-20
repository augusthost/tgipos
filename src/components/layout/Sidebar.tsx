import { motion } from "framer-motion";
import {
  UtensilsCrossed,
  Tags,
  Table,
  ClipboardList,
  ChefHatIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { canAccess } from "@/middleware";

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

interface MenuItem {
  name: string;
  icon: React.ElementType;
  path: string;
}

const menuItems: MenuItem[] = [
  { name: "Food Menus", icon: UtensilsCrossed, path: "/menus" },
  { name: "Categories", icon: Tags, path: "/categories" },
  { name: "Tables", icon: Table, path: "/" },
  { name: "Kitchen", icon: ChefHatIcon, path: "/kitchen" },
  { name: "Orders", icon: ClipboardList, path: "/orders" },
];

const Sidebar = ({ collapsed, setCollapsed }: SidebarProps) => {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const sidebarVariants = {
    expanded: { width: 240 },
    collapsed: { width: 80 },
  };

  return (
    <motion.div
      className="h-screen border-r border-border bg-white shadow-sm z-20"
      initial={collapsed ? "collapsed" : "expanded"}
      animate={collapsed ? "collapsed" : "expanded"}
      variants={sidebarVariants}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1.0] }}
    >
      <div className="flex flex-col h-full">
        <div className="p-4 flex items-center justify-between">
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="font-semibold text-lg"
            >
              TGI Pos
            </motion.div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <motion.div
              animate={{ rotate: collapsed ? 0 : 180 }}
              transition={{ duration: 0.3 }}
            >
              {collapsed ? (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              ) : (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m15 18-6-6 6-6" />
                </svg>
              )}
            </motion.div>
          </button>
        </div>

        <nav className="flex-1 mt-6">
          <ul className="px-2 space-y-2">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;

              if(canAccess(user?.role,item.path)) {
                return null;
              }

              return (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className={cn(
                      "flex items-center rounded-md px-3 py-2.5 text-sm font-medium transition-all duration-200",
                      "hover:bg-secondary/10 hover:text-secondary",
                      isActive
                        ? "bg-secondary/10 text-secondary"
                        : "text-gray-700",
                    )}
                  >
                    <item.icon
                      className={cn(
                        "h-5 w-5 transition-all",
                        collapsed ? "mx-auto" : "mr-2",
                      )}
                    />
                    {!collapsed && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        {item.name}
                      </motion.span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-4">
          <div
            className={cn(
              "rounded-lg bg-gray-50 p-3 transition-all duration-200",
              collapsed ? "px-2" : "px-3",
            )}
          >
            {!collapsed ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="text-xs text-gray-500 text-center"
              >
                TGI POS v1.0
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="text-xs text-gray-500 text-center"
              >
                v1.0
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;
