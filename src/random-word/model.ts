export type FollowingLetters = Array<string | undefined>;

export interface InputMetadata {
  startingLetters: string[];
  followingLetters: Map<string, FollowingLetters>;
}
