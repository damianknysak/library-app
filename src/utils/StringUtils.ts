export function shortenString(string: string, wordsCounter: number): string {
  if (!string) return wordsCounter > 15 ? "Brak opisu." : "Brak autora.";

  const words = string.split(" ");

  if (wordsCounter <= words.length) {
    const shortenedString = words.slice(0, wordsCounter).join(" ") + "...";
    return shortenedString;
  } else {
    return string;
  }
}
