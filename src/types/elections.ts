export type Party =
  | "KMT" // 中國國民黨
  | "DPP" // 民主進步黨
  | "TPP" // 台灣民眾黨
  | "NPP" // 時代力量
  | "PFP" // 親民黨
  | "TSU" // 台灣團結聯盟
  | "GPT" // 綠黨
  | "RP" // 共和黨
  | "SSFPP" // 台澎國際法法理建國黨
  | "TAPP" // 台灣動物保護黨
  | "TRP" // 台灣維新
  | "TYP" //天一黨
  | "DP" // 龍黨
  | "IND" // 無
  | "EMPTY"; // 未分配或無資料

export const PARTY_COLORS: Record<Party, string> = {
  KMT: "#5B6FA6",
  DPP: "#6FB98E",
  TPP: "#7FD0D0",
  NPP: "#F4D49A",
  PFP: "#FF9A66",
  TSU: "#D6B890",
  GPT: "#A3C75A",
  RP: "#C97070",
  SSFPP: "#88B878",
  TAPP: "#C87098",
  TRP: "#D4936A",
  TYP: "#C8A85C",
  DP: "#7060B0",
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
  RP: "共和黨",
  SSFPP: "台澎黨",
  TAPP: "台灣動物保護黨",
  TRP: "台灣維新",
  TYP: "天一黨",
  DP: "龍黨",
  IND: "無",
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
  RP: "和",
  SSFPP: "澎",
  TAPP: "動",
  TRP: "維",
  TYP: "天",
  DP: "龍",
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
  isSpecialElection?: boolean; // 是否為補選（因特殊原因延期）
  note?: string; // 特殊說明文字
}

export interface TownshipResult {
  townshipId: string; // 鄉鎮市區代碼
  countyId: string; // 所屬縣市代碼
  townshipName: string; // 鄉鎮市區名稱
  votingProgress: number; // 開票進度 (0-100, %)
  candidates: Candidate[]; // 所有候選人
}
