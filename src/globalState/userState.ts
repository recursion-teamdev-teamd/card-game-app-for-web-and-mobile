import { atom } from "recoil";

export const userState = atom<RecoilUserState>({
  key: "userState",
  default: {
    userName: "User",
    userChip: 200,
    difficulty: "medium",
  },
});

export type RecoilUserState = {
  userName: string;
  userChip: number;
  difficulty: "easy" | "medium" | "hard";
};
