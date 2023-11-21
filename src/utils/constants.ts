export const MAX_TEXT_INPUT_LENGTH = 2000; // 2000 characters length is equivalent to 290-500 words with space.
export const MAX_DAILY_WORD_COUNT = 3000;
export const MAX_DAILY_GENERATION_COUNT = 3;
export const SHOW_FEATURE = Boolean(
  process?.env?.NEXT_PUBLIC_SHOW_FEATURE !== 'false' ?? true
);
