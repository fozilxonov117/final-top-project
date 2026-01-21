import { useLang } from './useLang';
import { useMemo } from 'react';
import type { Operator } from 'shared/types';

export const useOperatorTranslations = () => {
  const { locale, formatNumber } = useLang();

  const getRankText = (rank: number) => {
    const rankTexts: Record<string, Record<number, string>> = {
      en: { 1: '1st', 2: '2nd', 3: '3rd' },
      ru: { 1: '1-е место', 2: '2-е место', 3: '3-е место' },
      uz: { 1: '1-chi', 2: '2-chi', 3: '3-chi' },
    };

    return rankTexts[locale]?.[rank] || `${rank}${getOrdinalSuffix(rank)}`;
  };

  const getOrdinalSuffix = (num: number) => {
    const suffixes: Record<string, string> = {
      en: ['th', 'st', 'nd', 'rd'][((num + 90) % 100 - 10) % 10] || 'th',
      ru: '',
      uz: '-chi',
    };

    return suffixes[locale] || '';
  };

  const formatPoints = (points: number) => {
    return `${formatNumber(points)} ${getPointsLabel(points)}`;
  };

  const getPointsLabel = (points: number) => {
    const labels: Record<string, { single: string; plural: string }> = {
      en: { single: 'point', plural: 'points' },
      ru: { single: 'балл', plural: 'балл' },
      uz: { single: 'ball', plural: 'ball' },
    };

    const label = labels[locale] || labels.en;
    return points === 1 ? label.single : label.plural;
  };

  const sortOperatorsByLocale = useMemo(() => {
    return (operators: Operator[]) => {
      return [...operators].sort((a, b) => {
        // Use locale-specific sorting for names if needed
        return a.name.localeCompare(b.name, locale);
      });
    };
  }, [locale]);

  return {
    getRankText,
    formatPoints,
    getPointsLabel,
    sortOperatorsByLocale,
  };
};
