import type { YearData, ElectionResult } from '../types/election';

// 2022 九合一選舉結果 (Local Elections)
const results2022: ElectionResult[] = [
  { countyId: 'TPE', winner: 'KMT', votePercentage: 57.2, candidates: [
    { name: '蔣萬安', party: 'KMT', votes: 575590, percentage: 42.29 },
    { name: '陳時中', party: 'DPP', votes: 434558, percentage: 31.93 },
    { name: '黃珊珊', party: 'TPP', votes: 342141, percentage: 25.14 },
  ]},
  { countyId: 'NWT', winner: 'KMT', votePercentage: 52.1, candidates: [
    { name: '侯友宜', party: 'KMT', votes: 1152555, percentage: 62.42 },
    { name: '林佳龍', party: 'DPP', votes: 693744, percentage: 37.58 },
  ]},
  { countyId: 'TYN', winner: 'KMT', votePercentage: 51.8, candidates: [
    { name: '張善政', party: 'KMT', votes: 556606, percentage: 52.02 },
    { name: '鄭運鵬', party: 'DPP', votes: 513212, percentage: 47.98 },
  ]},
  { countyId: 'TXG', winner: 'KMT', votePercentage: 56.5, candidates: [
    { name: '盧秀燕', party: 'KMT', votes: 825105, percentage: 56.59 },
    { name: '蔡其昌', party: 'DPP', votes: 632956, percentage: 43.41 },
  ]},
  { countyId: 'TNN', winner: 'DPP', votePercentage: 51.2, candidates: [
    { name: '黃偉哲', party: 'DPP', votes: 486941, percentage: 47.56 },
    { name: '謝龍介', party: 'KMT', votes: 399082, percentage: 38.98 },
  ]},
  { countyId: 'KHH', winner: 'DPP', votePercentage: 51.8, candidates: [
    { name: '陳其邁', party: 'DPP', votes: 706007, percentage: 58.06 },
    { name: '柯志恩', party: 'KMT', votes: 510040, percentage: 41.94 },
  ]},
  { countyId: 'KEE', winner: 'KMT', votePercentage: 54.2, candidates: [
    { name: '謝國樑', party: 'KMT', votes: 91535, percentage: 54.28 },
    { name: '蔡適應', party: 'DPP', votes: 73703, percentage: 43.71 },
  ]},
  { countyId: 'HSZ', winner: 'KMT', votePercentage: 52.6, candidates: [
    { name: '高虹安', party: 'TPP', votes: 97041, percentage: 45.21 },
    { name: '沈慧虹', party: 'DPP', votes: 75966, percentage: 35.39 },
    { name: '林耕仁', party: 'KMT', votes: 41626, percentage: 19.39 },
  ]},
  { countyId: 'HSQ', winner: 'KMT', votePercentage: 61.3, candidates: [
    { name: '楊文科', party: 'KMT', votes: 152808, percentage: 61.04 },
    { name: '周江杰', party: 'DPP', votes: 97533, percentage: 38.96 },
  ]},
  { countyId: 'MIA', winner: 'KMT', votePercentage: 59.8, candidates: [
    { name: '鍾東錦', party: 'IND', votes: 127632, percentage: 46.8 },
    { name: '徐定禎', party: 'DPP', votes: 108883, percentage: 39.92 },
  ]},
  { countyId: 'CHA', winner: 'KMT', votePercentage: 55.4, candidates: [
    { name: '王惠美', party: 'KMT', votes: 304489, percentage: 55.14 },
    { name: '黃秀芳', party: 'DPP', votes: 247732, percentage: 44.86 },
  ]},
  { countyId: 'NAN', winner: 'KMT', votePercentage: 58.2, candidates: [
    { name: '許淑華', party: 'KMT', votes: 136883, percentage: 56.6 },
    { name: '蔡培慧', party: 'DPP', votes: 104981, percentage: 43.4 },
  ]},
  { countyId: 'YUN', winner: 'KMT', votePercentage: 52.1, candidates: [
    { name: '張麗善', party: 'KMT', votes: 193792, percentage: 57.13 },
    { name: '劉建國', party: 'DPP', votes: 145464, percentage: 42.87 },
  ]},
  { countyId: 'CYI', winner: 'DPP', votePercentage: 47.8, candidates: [
    { name: '黃敏惠', party: 'KMT', votes: 70023, percentage: 52.63 },
    { name: '李俊俋', party: 'DPP', votes: 63031, percentage: 47.37 },
  ]},
  { countyId: 'CYQ', winner: 'DPP', votePercentage: 48.5, candidates: [
    { name: '翁章梁', party: 'DPP', votes: 162992, percentage: 60.77 },
    { name: '王育敏', party: 'KMT', votes: 105180, percentage: 39.23 },
  ]},
  { countyId: 'PIF', winner: 'DPP', votePercentage: 54.6, candidates: [
    { name: '周春米', party: 'DPP', votes: 209689, percentage: 54.43 },
    { name: '蘇清泉', party: 'KMT', votes: 175618, percentage: 45.57 },
  ]},
  { countyId: 'ILA', winner: 'DPP', votePercentage: 51.5, candidates: [
    { name: '林姿妙', party: 'KMT', votes: 117572, percentage: 54.55 },
    { name: '江聰淵', party: 'DPP', votes: 97940, percentage: 45.45 },
  ]},
  { countyId: 'HUA', winner: 'KMT', votePercentage: 65.3, candidates: [
    { name: '徐榛蔚', party: 'KMT', votes: 89543, percentage: 64.76 },
    { name: '江躍中', party: 'DPP', votes: 48728, percentage: 35.24 },
  ]},
  { countyId: 'TTT', winner: 'KMT', votePercentage: 62.4, candidates: [
    { name: '饒慶鈴', party: 'KMT', votes: 55988, percentage: 62.26 },
    { name: '劉櫂豪', party: 'DPP', votes: 33936, percentage: 37.74 },
  ]},
  { countyId: 'PEN', winner: 'KMT', votePercentage: 55.8, candidates: [
    { name: '陳光復', party: 'DPP', votes: 25679, percentage: 51.18 },
    { name: '賴峰偉', party: 'KMT', votes: 24489, percentage: 48.82 },
  ]},
  { countyId: 'KIN', winner: 'KMT', votePercentage: 70.2, candidates: [
    { name: '陳福海', party: 'IND', votes: 15851, percentage: 53.77 },
    { name: '李正皓', party: 'KMT', votes: 9827, percentage: 33.33 },
  ]},
  { countyId: 'LIE', winner: 'KMT', votePercentage: 68.5, candidates: [
    { name: '王忠銘', party: 'KMT', votes: 4105, percentage: 59.12 },
    { name: '李問', party: 'DPP', votes: 2839, percentage: 40.88 },
  ]},
];

// 2018 九合一選舉結果
const results2018: ElectionResult[] = [
  { countyId: 'TPE', winner: 'IND', votePercentage: 41.1, candidates: [
    { name: '柯文哲', party: 'IND', votes: 580663, percentage: 41.05 },
    { name: '丁守中', party: 'KMT', votes: 577096, percentage: 40.82 },
    { name: '姚文智', party: 'DPP', votes: 244641, percentage: 17.29 },
  ]},
  { countyId: 'NWT', winner: 'KMT', votePercentage: 57.1, candidates: [
    { name: '侯友宜', party: 'KMT', votes: 1165130, percentage: 57.14 },
    { name: '蘇貞昌', party: 'DPP', votes: 873692, percentage: 42.86 },
  ]},
  { countyId: 'TYN', winner: 'KMT', votePercentage: 52.6, candidates: [
    { name: '鄭文燦', party: 'DPP', votes: 557775, percentage: 52.56 },
    { name: '陳學聖', party: 'KMT', votes: 440798, percentage: 41.55 },
  ]},
  { countyId: 'TXG', winner: 'KMT', votePercentage: 56.6, candidates: [
    { name: '盧秀燕', party: 'KMT', votes: 827996, percentage: 56.57 },
    { name: '林佳龍', party: 'DPP', votes: 635475, percentage: 43.43 },
  ]},
  { countyId: 'TNN', winner: 'DPP', votePercentage: 38.0, candidates: [
    { name: '黃偉哲', party: 'DPP', votes: 367518, percentage: 38.02 },
    { name: '高思博', party: 'KMT', votes: 312874, percentage: 32.37 },
  ]},
  { countyId: 'KHH', winner: 'KMT', votePercentage: 53.9, candidates: [
    { name: '韓國瑜', party: 'KMT', votes: 892545, percentage: 53.87 },
    { name: '陳其邁', party: 'DPP', votes: 742239, percentage: 44.80 },
  ]},
  { countyId: 'KEE', winner: 'KMT', votePercentage: 55.4, candidates: [
    { name: '林右昌', party: 'DPP', votes: 99444, percentage: 55.35 },
    { name: '謝立功', party: 'KMT', votes: 80284, percentage: 44.68 },
  ]},
  { countyId: 'HSZ', winner: 'DPP', votePercentage: 51.3, candidates: [
    { name: '林智堅', party: 'DPP', votes: 97484, percentage: 51.32 },
    { name: '許明財', party: 'KMT', votes: 92462, percentage: 48.68 },
  ]},
  { countyId: 'HSQ', winner: 'KMT', votePercentage: 54.9, candidates: [
    { name: '楊文科', party: 'KMT', votes: 144480, percentage: 54.31 },
    { name: '徐欣瑩', party: 'IND', votes: 121616, percentage: 45.72 },
  ]},
  { countyId: 'MIA', winner: 'KMT', votePercentage: 52.4, candidates: [
    { name: '徐耀昌', party: 'KMT', votes: 146456, percentage: 52.35 },
    { name: '徐定禎', party: 'DPP', votes: 133274, percentage: 47.65 },
  ]},
  { countyId: 'CHA', winner: 'KMT', votePercentage: 52.0, candidates: [
    { name: '王惠美', party: 'KMT', votes: 320316, percentage: 51.97 },
    { name: '魏明谷', party: 'DPP', votes: 296017, percentage: 48.03 },
  ]},
  { countyId: 'NAN', winner: 'KMT', votePercentage: 61.5, candidates: [
    { name: '林明溱', party: 'KMT', votes: 146414, percentage: 61.26 },
    { name: '洪國浩', party: 'DPP', votes: 92585, percentage: 38.74 },
  ]},
  { countyId: 'YUN', winner: 'KMT', votePercentage: 56.8, candidates: [
    { name: '張麗善', party: 'KMT', votes: 199833, percentage: 56.78 },
    { name: '李進勇', party: 'DPP', votes: 152117, percentage: 43.22 },
  ]},
  { countyId: 'CYI', winner: 'KMT', votePercentage: 53.2, candidates: [
    { name: '黃敏惠', party: 'KMT', votes: 68647, percentage: 53.17 },
    { name: '涂醒哲', party: 'DPP', votes: 60472, percentage: 46.83 },
  ]},
  { countyId: 'CYQ', winner: 'DPP', votePercentage: 47.6, candidates: [
    { name: '翁章梁', party: 'DPP', votes: 166329, percentage: 47.56 },
    { name: '吳育仁', party: 'KMT', votes: 139497, percentage: 39.89 },
  ]},
  { countyId: 'PIF', winner: 'DPP', votePercentage: 52.1, candidates: [
    { name: '潘孟安', party: 'DPP', votes: 228065, percentage: 52.05 },
    { name: '蘇清泉', party: 'KMT', votes: 210062, percentage: 47.95 },
  ]},
  { countyId: 'ILA', winner: 'KMT', votePercentage: 50.2, candidates: [
    { name: '林姿妙', party: 'KMT', votes: 125158, percentage: 50.22 },
    { name: '陳歐珀', party: 'DPP', votes: 124011, percentage: 49.76 },
  ]},
  { countyId: 'HUA', winner: 'KMT', votePercentage: 56.4, candidates: [
    { name: '徐榛蔚', party: 'KMT', votes: 87314, percentage: 56.35 },
    { name: '劉曉玫', party: 'DPP', votes: 54870, percentage: 35.42 },
  ]},
  { countyId: 'TTT', winner: 'KMT', votePercentage: 58.2, candidates: [
    { name: '饒慶鈴', party: 'KMT', votes: 55304, percentage: 58.17 },
    { name: '劉櫂豪', party: 'DPP', votes: 39785, percentage: 41.84 },
  ]},
  { countyId: 'PEN', winner: 'KMT', votePercentage: 55.2, candidates: [
    { name: '賴峰偉', party: 'KMT', votes: 25823, percentage: 55.17 },
    { name: '陳光復', party: 'DPP', votes: 20978, percentage: 44.83 },
  ]},
  { countyId: 'KIN', winner: 'IND', votePercentage: 48.5, candidates: [
    { name: '楊鎮浯', party: 'KMT', votes: 17506, percentage: 48.53 },
    { name: '陳福海', party: 'IND', votes: 18572, percentage: 51.47 },
  ]},
  { countyId: 'LIE', winner: 'KMT', votePercentage: 62.8, candidates: [
    { name: '劉增應', party: 'KMT', votes: 4088, percentage: 62.79 },
    { name: '蘇柏豪', party: 'DPP', votes: 2424, percentage: 37.21 },
  ]},
];

// 2014 九合一選舉結果
const results2014: ElectionResult[] = [
  { countyId: 'TPE', winner: 'IND', votePercentage: 57.2, candidates: [
    { name: '柯文哲', party: 'IND', votes: 853983, percentage: 57.16 },
    { name: '連勝文', party: 'KMT', votes: 609932, percentage: 40.82 },
  ]},
  { countyId: 'NWT', winner: 'DPP', votePercentage: 50.1, candidates: [
    { name: '朱立倫', party: 'KMT', votes: 959302, percentage: 50.06 },
    { name: '游錫堃', party: 'DPP', votes: 956814, percentage: 49.93 },
  ]},
  { countyId: 'TYN', winner: 'DPP', votePercentage: 51.0, candidates: [
    { name: '鄭文燦', party: 'DPP', votes: 492414, percentage: 51.00 },
    { name: '吳志揚', party: 'KMT', votes: 473257, percentage: 49.00 },
  ]},
  { countyId: 'TXG', winner: 'DPP', votePercentage: 57.1, candidates: [
    { name: '林佳龍', party: 'DPP', votes: 847284, percentage: 57.06 },
    { name: '胡志強', party: 'KMT', votes: 637531, percentage: 42.94 },
  ]},
  { countyId: 'TNN', winner: 'DPP', votePercentage: 72.9, candidates: [
    { name: '賴清德', party: 'DPP', votes: 711557, percentage: 72.90 },
    { name: '黃秀霜', party: 'KMT', votes: 264536, percentage: 27.10 },
  ]},
  { countyId: 'KHH', winner: 'DPP', votePercentage: 68.1, candidates: [
    { name: '陳菊', party: 'DPP', votes: 993300, percentage: 68.09 },
    { name: '楊秋興', party: 'KMT', votes: 465274, percentage: 31.91 },
  ]},
  { countyId: 'KEE', winner: 'DPP', votePercentage: 54.4, candidates: [
    { name: '林右昌', party: 'DPP', votes: 85222, percentage: 54.43 },
    { name: '謝立功', party: 'KMT', votes: 71370, percentage: 45.57 },
  ]},
  { countyId: 'HSZ', winner: 'DPP', votePercentage: 52.7, candidates: [
    { name: '林智堅', party: 'DPP', votes: 83158, percentage: 52.69 },
    { name: '許明財', party: 'KMT', votes: 74681, percentage: 47.31 },
  ]},
  { countyId: 'HSQ', winner: 'KMT', votePercentage: 52.4, candidates: [
    { name: '邱鏡淳', party: 'KMT', votes: 130696, percentage: 52.39 },
    { name: '鄭永金', party: 'IND', votes: 118692, percentage: 47.61 },
  ]},
  { countyId: 'MIA', winner: 'KMT', votePercentage: 56.0, candidates: [
    { name: '徐耀昌', party: 'KMT', votes: 149879, percentage: 56.00 },
    { name: '吳宜臻', party: 'DPP', votes: 117756, percentage: 44.00 },
  ]},
  { countyId: 'CHA', winner: 'DPP', votePercentage: 53.3, candidates: [
    { name: '魏明谷', party: 'DPP', votes: 336323, percentage: 53.34 },
    { name: '林滄敏', party: 'KMT', votes: 294298, percentage: 46.66 },
  ]},
  { countyId: 'NAN', winner: 'KMT', votePercentage: 56.5, candidates: [
    { name: '林明溱', party: 'KMT', votes: 132689, percentage: 56.47 },
    { name: '李文忠', party: 'DPP', votes: 102282, percentage: 43.53 },
  ]},
  { countyId: 'YUN', winner: 'DPP', votePercentage: 57.0, candidates: [
    { name: '李進勇', party: 'DPP', votes: 194153, percentage: 57.01 },
    { name: '張麗善', party: 'KMT', votes: 146361, percentage: 42.99 },
  ]},
  { countyId: 'CYI', winner: 'DPP', votePercentage: 52.1, candidates: [
    { name: '涂醒哲', party: 'DPP', votes: 63919, percentage: 52.07 },
    { name: '陳以真', party: 'KMT', votes: 58817, percentage: 47.93 },
  ]},
  { countyId: 'CYQ', winner: 'DPP', votePercentage: 50.8, candidates: [
    { name: '張花冠', party: 'DPP', votes: 169041, percentage: 50.78 },
    { name: '翁重鈞', party: 'KMT', votes: 163885, percentage: 49.22 },
  ]},
  { countyId: 'PIF', winner: 'DPP', votePercentage: 60.3, candidates: [
    { name: '潘孟安', party: 'DPP', votes: 248478, percentage: 60.27 },
    { name: '簡太郎', party: 'KMT', votes: 163755, percentage: 39.73 },
  ]},
  { countyId: 'ILA', winner: 'DPP', votePercentage: 63.4, candidates: [
    { name: '林聰賢', party: 'DPP', votes: 142730, percentage: 63.38 },
    { name: '林信華', party: 'KMT', votes: 82472, percentage: 36.62 },
  ]},
  { countyId: 'HUA', winner: 'KMT', votePercentage: 60.8, candidates: [
    { name: '傅崐萁', party: 'IND', votes: 87545, percentage: 60.76 },
    { name: '蔡耀寬', party: 'DPP', votes: 33568, percentage: 23.30 },
  ]},
  { countyId: 'TTT', winner: 'KMT', votePercentage: 58.2, candidates: [
    { name: '黃健庭', party: 'KMT', votes: 49776, percentage: 58.23 },
    { name: '劉櫂豪', party: 'DPP', votes: 35715, percentage: 41.77 },
  ]},
  { countyId: 'PEN', winner: 'DPP', votePercentage: 52.6, candidates: [
    { name: '陳光復', party: 'DPP', votes: 24046, percentage: 52.55 },
    { name: '王乾發', party: 'KMT', votes: 21706, percentage: 47.45 },
  ]},
  { countyId: 'KIN', winner: 'IND', votePercentage: 57.9, candidates: [
    { name: '陳福海', party: 'IND', votes: 18005, percentage: 57.89 },
    { name: '李沃士', party: 'KMT', votes: 13101, percentage: 42.11 },
  ]},
  { countyId: 'LIE', winner: 'KMT', votePercentage: 52.1, candidates: [
    { name: '劉增應', party: 'KMT', votes: 3304, percentage: 52.12 },
    { name: '楊綏生', party: 'IND', votes: 3035, percentage: 47.88 },
  ]},
];

export const electionData: YearData[] = [
  { year: 2022, results: results2022 },
  { year: 2018, results: results2018 },
  { year: 2014, results: results2014 },
];

export const getResultsByYear = (year: number): ElectionResult[] => {
  const yearData = electionData.find(d => d.year === year);
  return yearData?.results || [];
};
