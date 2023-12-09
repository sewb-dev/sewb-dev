export function countWords(input: string): number {
  // Use a regular expression to match alphanumeric words
  const regex = /\b\w+\b/g;

  // Use match to find all matches in the input string
  const matches = input.match(regex);

  // Return the count of alphanumeric words
  return matches ? matches.length : 0;
}
