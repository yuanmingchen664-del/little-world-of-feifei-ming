const STORAGE_PREFIX = "little-world";

export const STORAGE_KEYS = {
  anniversaries: `${STORAGE_PREFIX}:anniversaries`,
  diaryEntries: `${STORAGE_PREFIX}:diary-entries`,
  notes: `${STORAGE_PREFIX}:notes`,
  photos: `${STORAGE_PREFIX}:photos`,
  todos: `${STORAGE_PREFIX}:todos`,
} as const;
