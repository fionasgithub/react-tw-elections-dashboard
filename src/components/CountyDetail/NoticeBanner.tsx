import { TriangleAlert } from "lucide-react";

interface NoticeBannerProps {
  note: string;
}

const NoticeBanner = ({ note }: NoticeBannerProps) => {
  return (
    <div className="shrink-0 rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-3">
      <div className="flex items-start gap-3">
        <TriangleAlert className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" />
        <div className="space-y-1">
          <p className="text-sm font-semibold text-amber-300">
            本縣市於 2022/11/26 投票日未舉行選舉
          </p>
          <p className="text-sm text-amber-200/80">{note}</p>
          <a
            href="https://zh.wikipedia.org/zh-tw/2022%E5%B9%B4%E4%B8%AD%E8%8F%AF%E6%B0%91%E5%9C%8B%E5%9C%B0%E6%96%B9%E5%85%AC%E8%81%B7%E4%BA%BA%E5%93%A1%E9%81%B8%E8%88%89#:~:text=%E5%98%89%E7%BE%A9%E5%B8%82%E5%B8%82%E9%95%B7%E9%81%B8%E8%88%89%E5%9B%A0%E5%80%99%E9%81%B8%E4%BA%BA%E7%97%85%E9%80%9D%EF%BC%8C%E9%81%B8%E8%88%89%E6%97%A5%E6%9C%9F%E5%BB%B6%E8%87%B32022%E5%B9%B412%E6%9C%8818%E6%97%A5"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-amber-400 underline underline-offset-2 hover:text-amber-300 transition-colors"
          >
            查看補選詳情
          </a>
        </div>
      </div>
    </div>
  );
};

export default NoticeBanner;
