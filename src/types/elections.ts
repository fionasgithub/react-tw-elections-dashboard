export type Party =
  | "KMT" // 中國國民黨
  | "DPP" // 民主進步黨
  | "TPP" // 台灣民眾黨
  | "NPP" // 時代力量
  | "PFP" // 親民黨
  | "TSU" // 台灣團結聯盟
  | "GPT" // 綠黨
  | "IND" // 無黨籍
  | "EMPTY"; // 未分配或無資料

export const PARTY_COLORS: Record<Party, string> = {
  KMT: "#5B6FA6",
  DPP: "#6FB98E",
  TPP: "#7FD0D0",
  NPP: "#F4D49A",
  PFP: "#FF9A66",
  TSU: "#D6B890",
  GPT: "#A3C75A",
  IND: "#B4BCC4",
  EMPTY: "#D3D3D3",
};

export const PARTY_NAMES: Record<Party, string> = {
  KMT: "中國國民黨",
  DPP: "民主進步黨",
  TPP: "台灣民眾黨",
  NPP: "時代力量",
  PFP: "親民黨",
  TSU: "台灣團結聯盟",
  GPT: "綠黨",
  IND: "無黨籍",
  EMPTY: "尚未開票/票數相同",
};

export const PARTY_SHORT_NAMES: Record<Exclude<Party, "EMPTY">, string> = {
  KMT: "國",
  DPP: "民",
  TPP: "眾",
  NPP: "時",
  PFP: "親",
  TSU: "團",
  GPT: "綠",
  IND: "無",
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
  votingProgress: number; // 開票進度 (0-100, %)
  candidates: Candidate[]; // 所有候選人
}

export interface TownshipResult {
  townshipId: string; // 鄉鎮市區代碼
  countyId: string; // 所屬縣市代碼
  townshipName: string; // 鄉鎮市區名稱
  votingProgress: number; // 開票進度 (0-100, %)
  candidates: Candidate[]; // 所有候選人
}
