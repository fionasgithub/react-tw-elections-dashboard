import React from "react";
import { Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

type BreadcrumbItem = {
  label: string;
  to?: string;
  ariaLabel?: string;
};

type Props = {
  items: BreadcrumbItem[];
  className?: string;
};

function BreadcrumbNav({ items, className }: Props) {
  return (
    <Breadcrumb className={className}>
      <BreadcrumbList>
        {items.map((item, index, array) => {
          if (index === array.length - 1) {
            return (
              <BreadcrumbItem key={index}>
                <BreadcrumbPage>{item.label}</BreadcrumbPage>
              </BreadcrumbItem>
            );
          }

          return (
            <React.Fragment key={index}>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to={item.to ?? "/"} aria-label={item.ariaLabel}>
                    {item.label}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default BreadcrumbNav;
