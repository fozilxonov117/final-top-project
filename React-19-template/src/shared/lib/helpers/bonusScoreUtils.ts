import type { Operator } from 'shared/types';

/**
 * Calculate total bonus points for an operator
 */
export const calculateTotalBonus = (operator: Operator): number => {
  if (!operator.bonusScores || operator.bonusScores.length === 0) {
    return 0;
  }
  return operator.bonusScores.reduce((sum, bonus) => sum + bonus.amount, 0);
};

/**
 * Get formatted points display with bonus
 * @param operator - The operator object
 * @returns Formatted string like "1204" or "1204 + 10"
 */
export const getFormattedPointsWithBonus = (operator: Operator): string => {
  const basePoints = operator.points;
  const bonusPoints = calculateTotalBonus(operator);
  
  if (bonusPoints === 0) {
    return basePoints.toString();
  }
  
  return `${basePoints}/${bonusPoints}`;
};

/**
 * Get total points including bonus
 */
export const getTotalPoints = (operator: Operator): number => {
  return operator.points + calculateTotalBonus(operator);
};
