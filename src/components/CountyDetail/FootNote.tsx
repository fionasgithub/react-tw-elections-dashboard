import { Info } from "lucide-react";

const FootNote = () => {
  return (
    <div className="bento-cell text-xs flex items-start gap-2 text-muted-foreground">
      <Info className="h-3.5 w-3.5 mt-0.5 flex-shrink-0"></Info>
      <p>
        得票率 = 該候選人得票數 ÷ 有效票總數 x 100%。
        資料來源：中央選舉委員會。本頁數據僅供參考，最終結果以中選會公告為準。
      </p>
    </div>
  );
};

export default FootNote;
