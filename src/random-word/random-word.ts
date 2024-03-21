import { FollowingLetters, InputMetadata } from "./model";

export const generateRandomWord = (words: string[]): string => {
  if (words.length === 0) return "";
  const inputMetadata = computeImputMetadata(words);
  return computeRandomWord(inputMetadata);
};

const randomNextLetter = (array: FollowingLetters): string | undefined => {
  return array[Math.floor(Math.random() * array.length)];
};

const computeRandomWord = (inputMetadata: InputMetadata): string => {
  let result = "";
  let currentLetter = randomNextLetter(inputMetadata.startingLetters);
  while (currentLetter !== undefined) {
    result += currentLetter;
    const nextLetters = inputMetadata.followingLetters.get(currentLetter);
    if (nextLetters) {
      currentLetter = randomNextLetter(nextLetters);
    } else {
      currentLetter = undefined;
    }
  }
  return result;
};

const computeImputMetadata = (words: string[]): InputMetadata => {
  const startingLetters: string[] = [];
  const followingLetters = new Map<string, FollowingLetters>();
  words.forEach((word) => {
    startingLetters.push(word[0]);
    computeInputFollowingLetters(word, followingLetters);
  });
  return { startingLetters, followingLetters };
};

const computeInputFollowingLetters = (
  word: string,
  followingLetters: Map<string, FollowingLetters>
) => {
  for (let index = 0; index < word.length; index++) {
    const letter = word[index];
    const nextLetter = word[index + 1];
    if (followingLetters.has(letter)) {
      const nextLetters = followingLetters.get(letter);
      if (nextLetters) {
        nextLetters.push(nextLetter);
      } else {
        followingLetters.set(letter, [nextLetter]);
      }
    } else {
      followingLetters.set(letter, [nextLetter]);
    }
  }
};
