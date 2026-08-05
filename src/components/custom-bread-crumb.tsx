import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Home } from "lucide-react";
import React from "react";

interface CustomBreadCrumbProps {
  breadCrumbPage: string;
  breadCrumpItems?: { link: string; label: string }[];
}

export const CustomBreadCrumb = ({
  breadCrumbPage,
  breadCrumpItems,
}: CustomBreadCrumbProps) => {
  return (
    <Breadcrumb>
      <BreadcrumbList className="text-sm">
        <BreadcrumbItem>
          <BreadcrumbLink
            href="/"
            className="flex items-center justify-center hover:text-primary transition-colors duration-200 text-muted-foreground"
          >
            <Home className="w-3.5 h-3.5 mr-1.5" />
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>

        {breadCrumpItems &&
          breadCrumpItems.map((item, i) => (
            <React.Fragment key={i}>
              <BreadcrumbSeparator className="text-muted-foreground/40" />
              <BreadcrumbItem>
                <BreadcrumbLink
                  href={item.link}
                  className="text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  {item.label}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </React.Fragment>
          ))}
        <BreadcrumbSeparator className="text-muted-foreground/40" />
        <BreadcrumbItem>
          <BreadcrumbPage className="text-foreground font-medium">{breadCrumbPage}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
