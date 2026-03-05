import { MapPin } from "lucide-react";

interface DashboardLayoutProps {
  children: React.ReactNode;
  title?: string;
  isRealTime?: boolean;
}

const DashboardLayout = ({
  children,
  title = "即時開票地圖",
  isRealTime = true,
}: DashboardLayoutProps) => (
  <div className="h-screen overflow-hidden flex flex-col bg-background px-4 py-6 md:px-8 md:py-8">
    <div className="mx-auto max-w-[1440px] w-full flex-1 flex flex-col min-h-0">
      {/* Header Section */}
      <header className="flex items-center gap-4 mb-6 shrink-0">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/15">
          <MapPin className="text-primary" />
        </div>
        <h1 className="text-2xl font-bold text-foreground">{title}</h1>
        {isRealTime && (
          <div className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-1">
            <div className="live-dot"></div>
            <span className="text-xs">即時</span>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 grid grid-cols-12 gap-4 min-h-0">{children}</main>
    </div>
  </div>
);

export default DashboardLayout;
