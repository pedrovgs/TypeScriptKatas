import { generateRandomWord } from "./random-word";

describe("Random word generator requirementes", () => {
  const input = ["apple", "banana", "cabbage"];
  it("should work", () => {
    const result = generateRandomWord(input);
    expect(result).toEqual("?");
  });
});
