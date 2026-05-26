import { useMemo } from "react";
import { STORAGE_KEYS } from "../lib/storageKeys";
import { useLocalStorage } from "./useLocalStorage";

export type AnniversaryColor = "amber" | "orange" | "yellow";
export type AnniversaryMode = "countdown" | "countup";

export interface Anniversary {
  id: string;
  title: string;
  date: string;
  color: AnniversaryColor;
  mode?: AnniversaryMode;
  createdAt: string;
}

export interface NewAnniversary {
  title: string;
  date: string;
  color: AnniversaryColor;
  mode: AnniversaryMode;
}

export function getAnniversaryMode(anniversary: Pick<Anniversary, "title" | "date" | "mode">): AnniversaryMode {
  if (anniversary.mode) {
    return anniversary.mode;
  }

  if (anniversary.title === "在一起纪念日" && anniversary.date === "2025-02-24") {
    return "countup";
  }

  return "countdown";
}

const initialAnniversaries: Anniversary[] = [
  {
    id: "initial-1",
    title: "在一起纪念日",
    date: "2025-02-24",
    color: "amber",
    mode: "countup",
    createdAt: "2025-02-24T00:00:00.000Z",
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

function getDaysBetween(dateValue: string) {
  const today = toStartOfLocalDay(new Date());
  const targetDate = toStartOfLocalDay(new Date(`${dateValue}T00:00:00`));
  const dayInMilliseconds = 24 * 60 * 60 * 1000;

  return Math.ceil((targetDate.getTime() - today.getTime()) / dayInMilliseconds);
}

export function getNextAnnualDate(dateValue: string) {
  const today = toStartOfLocalDay(new Date());
  const sourceDate = new Date(`${dateValue}T00:00:00`);
  let nextDate = new Date(today.getFullYear(), sourceDate.getMonth(), sourceDate.getDate());

  if (nextDate.getTime() < today.getTime()) {
    nextDate = new Date(today.getFullYear() + 1, sourceDate.getMonth(), sourceDate.getDate());
  }

  return new Intl.DateTimeFormat("en-CA").format(nextDate);
}

export function getDaysUntil(dateValue: string) {
  return getDaysBetween(dateValue);
}

export function getAnnualDaysUntil(dateValue: string) {
  return getDaysBetween(getNextAnnualDate(dateValue));
}

export function getDaysSince(dateValue: string) {
  const today = toStartOfLocalDay(new Date());
  const sourceDate = toStartOfLocalDay(new Date(`${dateValue}T00:00:00`));
  const dayInMilliseconds = 24 * 60 * 60 * 1000;

  return Math.max(0, Math.floor((today.getTime() - sourceDate.getTime()) / dayInMilliseconds) + 1);
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
        const firstMode = getAnniversaryMode(first);
        const secondMode = getAnniversaryMode(second);
        const firstDays = firstMode === "countup" ? getDaysSince(first.date) : getAnnualDaysUntil(first.date);
        const secondDays = secondMode === "countup" ? getDaysSince(second.date) : getAnnualDaysUntil(second.date);

        return firstDays - secondDays;
      }),
    [anniversaries],
  );

  const addAnniversary = ({ title, date, color, mode }: NewAnniversary) => {
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
        mode,
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

  const toggleAnniversaryMode = (id: string) => {
    setAnniversaries((currentAnniversaries) =>
      currentAnniversaries.map((anniversary) =>
        anniversary.id === id
          ? {
              ...anniversary,
              mode: getAnniversaryMode(anniversary) === "countdown" ? "countup" : "countdown",
            }
          : anniversary,
      ),
    );
  };

  return {
    anniversaries: sortedAnniversaries,
    addAnniversary,
    deleteAnniversary,
    toggleAnniversaryMode,
  };
}
