export type Party =
  | "KMT" // 中國國民黨
  | "DPP" // 民主進步黨
  | "TPP" // 台灣民眾黨
  | "NPP" // 時代力量
  | "PFP" // 親民黨
  | "TSU" // 台灣團結聯盟
  | "GUE" // 綠黨
  | "IND" // 無黨籍
  | "EMPTY"; // 未分配或無資料

export const PARTY_COLORS: Record<Party, string> = {
  DPP: "#00A859",
  KMT: "#005BAC",
  TPP: "#FF6B00",
  NPP: "#FFD200",
  PFP: "#8B5CF6",
  TSU: "#A21CAF",
  GUE: "#7A5CFF",
  IND: "#9CA3AF",
  EMPTY: "#F3F4F6",
};

export interface Candidate {
  name: string; // 姓名
  party: Party; // 政黨
  votes: number; // 得票數
  voteRate: number; // 得票率 (%)
  elected: boolean; // 是否當選
  photoUrl?: string; // 候選人照片 URL（選填，無則顯示預設頭像）
}

export interface CountyResult {
  countyId: string; // 縣市代碼
  countyName: string; // 縣市名稱
  votingProgress: number; // 開票進度 (0–100, %)
  candidates: Candidate[]; // 所有候選人
}

export interface TownshipResult {
  townshipId: string; // 鄉鎮市區代碼
  countyId: string; // 所屬縣市代碼
  townshipName: string; // 鄉鎮市區名稱
  votingProgress: number; // 開票進度 (0–100, %)
  candidates: Candidate[]; // 所有候選人
}
