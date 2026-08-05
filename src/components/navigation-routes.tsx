import { MainRoutes } from "@/lib/helpers";
import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";

interface NavigationRoutesProps {
  isMobile?: boolean;
}

export const NavigationRoutes = ({
  isMobile = false,
}: NavigationRoutesProps) => {
  return (
    <ul
      className={cn(
        "flex items-center gap-1",
        isMobile && "items-start flex-col gap-2 w-full"
      )}
    >
      {MainRoutes.map((route) => (
        <NavLink
          key={route.href}
          to={route.href}
          className={({ isActive }) =>
            cn(
              "text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-200 rounded-xl px-3.5 py-2 hover:bg-muted/70",
              isActive &&
                "text-foreground bg-muted font-semibold",
              isMobile && "w-full px-4"
            )
          }
        >
          {route.label}
        </NavLink>
      ))}
    </ul>
  );
};
