interface shortenStringReturnProps {
    text: string,
    isShortened: boolean
}

export function shortenString(string: string, wordsCounter: number): shortenStringReturnProps  {
    if(!string) return {text: "Brak opisu.", isShortened: false};  

    const words = string.split(" ");

    if (wordsCounter <= words.length) {
      const shortenedString = words.slice(0, wordsCounter).join(" ") + "...";
      return { text: shortenedString, isShortened: true };
    } else {
      return { text: string, isShortened: false };
    }
  }