import LanguageDetect from 'languagedetect';
import englishWords from './englishWords';

const lngDetector = new LanguageDetect();

export const isEnglishWithLangDetect = (text: string) => {
  const probabilities = lngDetector.detect(text);
  if (!probabilities.length) return false;
  const [topLanguage, topScore] = probabilities[0];
  return topLanguage === 'english' && topScore > 0.3;
};

export const isEnglishWithWordCheck = (text: string) => {
  let englishWordsCount = 0;
  let totalWordsCount = 0;

  const wordsList = text.match(/\b\w+\b/g);

  wordsList?.forEach((word) => {
    totalWordsCount++;
    if (englishWords.has(word)) {
      englishWordsCount++;
    }
  });

  return englishWordsCount / totalWordsCount > 0.7;
};
