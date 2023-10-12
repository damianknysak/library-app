interface shortenStringReturnProps {
    text: string,
    isShortened: boolean
}

export function shortenString(string: string, wordsCounter: number): shortenStringReturnProps  {
    const words = string.split(" ");

    if (wordsCounter <= words.length) {
      const skroconyString = words.slice(0, wordsCounter).join(" ") + "...";
      return { text: skroconyString, isShortened: true };
    } else {
      return { text: string, isShortened: false };
    }
  }