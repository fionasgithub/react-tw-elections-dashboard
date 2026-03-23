import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import BreadcrumbNav from "@/components/Navigation/BreadcrumbNav";
import HeaderActions from "@/components/Common/HeaderActions";

interface HeaderProps {
  countyName: string;
}

const Header = ({ countyName }: HeaderProps) => {
  return (
    <header className="fixed inset-x-0 w-full top-0 z-50 bg-background">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-4 px-4 py-4 lg:px-8 lg:py-8">
        <div className="flex shrink-0 items-center justify-between gap-2">
          <BreadcrumbNav
            items={[
              { label: "2022 縣市長選舉", to: "/" },
              { label: countyName },
            ]}
          ></BreadcrumbNav>

          <HeaderActions />
        </div>

        {/* Back link */}
        <Link
          to="/"
          className="inline-flex shrink-0 items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          返回全台地圖
        </Link>
      </div>
    </header>
  );
};

export default Header;
