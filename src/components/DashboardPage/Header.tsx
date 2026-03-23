import { MapPin } from "lucide-react";
import HeaderActions from "@/components/Common/HeaderActions";

interface HeaderProps {
  isRealTime: boolean;
}

const Header = ({ isRealTime }: HeaderProps) => {
  return (
    <header className="flex items-center gap-4 mb-6 shrink-0">
      <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-primary/15">
        <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
      </div>
      <h1 className="text-2xl font-bold text-foreground">
        2022 縣市長選舉開票地圖
      </h1>
      {isRealTime && (
        <div className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-2 sm:px-2.5 sm:py-1">
          <div className="live-dot"></div>
          <span className="hidden sm:inline text-xs">即時</span>
        </div>
      )}

      <HeaderActions />
    </header>
  );
};

export default Header;
