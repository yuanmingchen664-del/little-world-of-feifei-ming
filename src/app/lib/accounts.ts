import type { NoteAuthor } from "../hooks/useNotes";

export type LoginName = "feifei" | "ming";

export interface AppAccount {
  loginName: LoginName;
  displayName: NoteAuthor;
  email: string;
}

export const APP_ACCOUNTS: Record<LoginName, AppAccount> = {
  feifei: {
    loginName: "feifei",
    displayName: "菲菲",
    email: "feifei@little-world.local",
  },
  ming: {
    loginName: "ming",
    displayName: "小明",
    email: "ming@little-world.local",
  },
};

export function getAccountByLoginName(loginName: string) {
  return APP_ACCOUNTS[loginName.trim().toLowerCase() as LoginName] || null;
}

export function getAccountByEmail(email?: string | null) {
  if (!email) {
    return null;
  }

  return Object.values(APP_ACCOUNTS).find((account) => account.email === email) || null;
}
