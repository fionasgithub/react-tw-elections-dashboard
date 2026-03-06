import clsx from "clsx";

interface MainLayoutProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
}

const MainLayout = ({
  children,
  className,
  containerClassName,
}: MainLayoutProps) => (
  <div
    className={clsx(
      "h-screen bg-background px-4 py-6 md:px-8 md:py-8",
      className,
    )}
  >
    <div className={clsx("mx-auto max-w-[1440px]", containerClassName)}>
      {children}
    </div>
  </div>
);

export default MainLayout;
