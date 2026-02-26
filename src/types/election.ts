export type PartyId = 'KMT' | 'DPP' | 'TPP' | 'IND' | 'NPP';

export interface Party {
  id: PartyId;
  name: string;
  nameEn: string;
  colors: string[]; // Array of colors from dark to light based on vote percentage
}

export interface ElectionResult {
  countyId: string;
  winner: PartyId;
  votePercentage: number;
  candidates: {
    name: string;
    party: PartyId;
    votes: number;
    percentage: number;
  }[];
}

export interface YearData {
  year: number;
  results: ElectionResult[];
}

export const parties: Record<PartyId, Party> = {
  KMT: {
    id: 'KMT',
    name: '國民黨',
    nameEn: 'KMT',
    colors: ['#005BAC', '#2E7BBF', '#5B9BD5', '#8DBCE8', '#BDD9F2'],
  },
  DPP: {
    id: 'DPP',
    name: '民進黨',
    nameEn: 'DPP',
    colors: ['#1B9431', '#3DAF54', '#5FC476', '#8AD9A0', '#B8ECC9'],
  },
  TPP: {
    id: 'TPP',
    name: '民眾黨',
    nameEn: 'TPP',
    colors: ['#28C8C8', '#4DD4D4', '#72E0E0', '#9CEBEB', '#C8F5F5'],
  },
  IND: {
    id: 'IND',
    name: '無黨籍',
    nameEn: 'Independent',
    colors: ['#5A5A5A', '#7A7A7A', '#9A9A9A', '#BABABA', '#DADADA'],
  },
  NPP: {
    id: 'NPP',
    name: '時代力量',
    nameEn: 'NPP',
    colors: ['#FBBE01', '#FCC934', '#FDD566', '#FEE299', '#FFEFC6'],
  },
};

export const getPartyColor = (partyId: PartyId, percentage: number): string => {
  const party = parties[partyId];
  if (percentage >= 70) return party.colors[0];
  if (percentage >= 60) return party.colors[1];
  if (percentage >= 50) return party.colors[2];
  if (percentage >= 45) return party.colors[3];
  return party.colors[4];
};
