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
              <BreadcrumbItem>
                <BreadcrumbPage>{item.label}</BreadcrumbPage>
              </BreadcrumbItem>
            );
          }

          return (
            <>
              <BreadcrumbItem key={index}>
                <BreadcrumbLink href={item.to} aria-label={item.ariaLabel}>
                  {item.label}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default BreadcrumbNav;
