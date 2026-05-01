const XP_PER_LEVEL = 100;

export function useLevelSystem(totalXp) {
  const completedLevels = Math.floor(totalXp / XP_PER_LEVEL);
  const level = completedLevels + 1;
  const currentLevelXp = totalXp % XP_PER_LEVEL;
  const progressPercent = Math.min((currentLevelXp / XP_PER_LEVEL) * 100, 100);

  return {
    level,
    totalXp,
    currentLevelXp,
    xpForNextLevel: XP_PER_LEVEL,
    progressPercent
  };
}
