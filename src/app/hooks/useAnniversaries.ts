import { useMemo } from "react";
import { STORAGE_KEYS } from "../lib/storageKeys";
import { useLocalStorage } from "./useLocalStorage";

export type AnniversaryColor = "amber" | "orange" | "yellow";

export interface Anniversary {
  id: string;
  title: string;
  date: string;
  color: AnniversaryColor;
  createdAt: string;
}

export interface NewAnniversary {
  title: string;
  date: string;
  color: AnniversaryColor;
}

const initialAnniversaries: Anniversary[] = [
  {
    id: "initial-1",
    title: "在一起纪念日",
    date: "2025-02-24",
    color: "amber",
    createdAt: "2025-02-24T00:00:00.000Z",
  },
  {
    id: "initial-2",
    title: "菲菲的生日",
    date: "2026-07-08",
    color: "orange",
    createdAt: "2026-05-25T00:00:00.000Z",
  },
  {
    id: "initial-3",
    title: "第一次旅行",
    date: "2026-08-20",
    color: "yellow",
    createdAt: "2026-05-25T00:00:00.000Z",
  },
];

function createAnniversaryId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function toStartOfLocalDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function getDaysUntil(dateValue: string) {
  const today = toStartOfLocalDay(new Date());
  const targetDate = toStartOfLocalDay(new Date(`${dateValue}T00:00:00`));
  const dayInMilliseconds = 24 * 60 * 60 * 1000;

  return Math.ceil((targetDate.getTime() - today.getTime()) / dayInMilliseconds);
}

export function getAnniversaryStatus(daysUntil: number) {
  if (daysUntil === 0) {
    return "就是今天";
  }

  if (daysUntil > 0) {
    return "天后";
  }

  return "天前";
}

export function useAnniversaries() {
  const [anniversaries, setAnniversaries] = useLocalStorage<Anniversary[]>(
    STORAGE_KEYS.anniversaries,
    initialAnniversaries,
  );

  const sortedAnniversaries = useMemo(
    () =>
      [...anniversaries].sort((first, second) => {
        const firstDays = getDaysUntil(first.date);
        const secondDays = getDaysUntil(second.date);

        if (firstDays >= 0 && secondDays < 0) {
          return -1;
        }

        if (firstDays < 0 && secondDays >= 0) {
          return 1;
        }

        return firstDays - secondDays;
      }),
    [anniversaries],
  );

  const addAnniversary = ({ title, date, color }: NewAnniversary) => {
    const trimmedTitle = title.trim();

    if (!trimmedTitle || !date) {
      return false;
    }

    setAnniversaries((currentAnniversaries) => [
      {
        id: createAnniversaryId(),
        title: trimmedTitle,
        date,
        color,
        createdAt: new Date().toISOString(),
      },
      ...currentAnniversaries,
    ]);

    return true;
  };

  const deleteAnniversary = (id: string) => {
    setAnniversaries((currentAnniversaries) =>
      currentAnniversaries.filter((anniversary) => anniversary.id !== id),
    );
  };

  return {
    anniversaries: sortedAnniversaries,
    addAnniversary,
    deleteAnniversary,
  };
}
