export const capitalize = (string) => {
  if (string) {
    const firstLetter = string[0].toUpperCase();
    const capitalizedWord = firstLetter + string.substring(1);
    return capitalizedWord;
  }
  return;
};
