export interface BonusScore {
  id: string;
  type: 'organizational' | 'monitoring' | 'training' | 'quality' | 'other';
  amount: number;
  description?: string;
  date?: string;
}

export interface Operator {
  id: string;
  name: string;
  avatar: string;
  rank: number;
  points: number;
  count: number;
  kpi: number;
  average: string | number; // Allow both string (time format like "02:24") and number
  behavior: number; // Behavior score from backend (1-10)
  stars?: number;
  rankChange?: number; // +1, -1, or null
  activityData?: number[];
  monthlyRankings?: number[]; // 12-month ranking history
  dailyRankings?: number[]; // 23-day ranking history
  topMedalCount?: number; // How many times in top 3 this year
  bonusScores?: BonusScore[]; // Bonus points for additional activities
}

export interface OperatorGroup {
  id: string;
  title: string;
  operators: Operator[];
}

export type Quarter = '1' | '2' | '3' | '4';

export type MonthFilter = 'last-month' | 'current-month' | 'select-month';

export type Month = '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09' | '10' | '11' | '12';
