import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { NavigationRoutes } from "./navigation-routes";
import { useAuth } from "@clerk/clerk-react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

export const ToggleContainer = () => {
  const { userId, isSignedIn } = useAuth();
  return (
    <Sheet>
      <SheetTrigger className="block md:hidden p-2 rounded-xl hover:bg-muted/70 transition-colors duration-200">
        <Menu className="w-5 h-5 text-foreground" />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="mb-6">
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>

        <nav className="gap-3 flex flex-col items-start">
          <NavigationRoutes isMobile />
          {userId && (
            <NavLink
              to={"/generate"}
              className={({ isActive }) =>
                cn(
                  "text-base font-medium text-muted-foreground w-full px-4 py-3 rounded-xl transition-all duration-200",
                  isActive && "text-foreground bg-muted font-semibold"
                )
              }
            >
              Take An Interview
            </NavLink>
          )}
          {!isSignedIn && (
            <div className="w-full pt-4 mt-2 border-t border-border">
              <Link to={"/signin"} className="block w-full">
                <Button className="w-full">Get Started</Button>
              </Link>
            </div>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
};
