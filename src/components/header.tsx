import { cn } from "@/lib/utils";
import { useAuth } from "@clerk/clerk-react";
import { Container } from "./container";
import { LogoContainer } from "./logo-container";
import { NavigationRoutes } from "./navigation-routes";
import { NavLink } from "react-router-dom";
import { ProfileContainer } from "./profile-container";
import { ToggleContainer } from "./toggle-container";

const Header = () => {
  const { userId } = useAuth();

  return (
    <header
      className={cn(
        "w-full sticky top-0 z-40 bg-card/80 backdrop-blur-xl border-b border-border/60 transition-all duration-300"
      )}
    >
      <Container className="py-0">
        <div className="flex items-center gap-4 w-full h-16 md:h-20">
          <LogoContainer />

          <nav className="hidden md:flex items-center gap-1 ml-8">
            <NavigationRoutes />
            {userId && (
              <NavLink
                to={"/generate"}
                className={({ isActive }) =>
                  cn(
                    "text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-200 rounded-xl px-3.5 py-2 hover:bg-muted/70",
                    isActive && "text-foreground bg-muted font-semibold"
                  )
                }
              >
                Take An Interview
              </NavLink>
            )}
          </nav>

          <div className="ml-auto flex items-center gap-3">
            <ProfileContainer />
            <ToggleContainer />
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
