import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";

const CountyNotFound = () => {
  return (
    <MainLayout
      className="flex justify-center items-center"
      containerClassName="text-center"
    >
      <p className="text-lg text-muted-foreground">找不到該縣市資料</p>
      <Link
        to="/"
        className="mt-4 inline-flex items-center gap-1 text-primary hover:underline"
      >
        <ArrowLeft className="h-4 w-4" />
        返回首頁
      </Link>
    </MainLayout>
  );
};

export default CountyNotFound;
