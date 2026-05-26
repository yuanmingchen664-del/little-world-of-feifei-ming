import { STORAGE_KEYS } from "../lib/storageKeys";
import { useLocalStorage } from "./useLocalStorage";
import type { NoteAuthor } from "./useNotes";

export interface DiaryEntry {
  id: string;
  date: string;
  title: string;
  content: string;
  author: NoteAuthor;
  createdAt: string;
}

export interface NewDiaryEntry {
  title: string;
  content: string;
  author: NoteAuthor;
  date?: string;
}

const initialDiaryEntries: DiaryEntry[] = [
  {
    id: "initial-1",
    date: "2026-05-20",
    title: "我们的第一次约会",
    content: "今天天气很好，我们一起去了公园，拍了很多照片。",
    author: "小明",
    createdAt: "2026-05-20T12:00:00.000Z",
  },
];

function createDiaryEntryId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function getTodayDate() {
  return new Intl.DateTimeFormat("en-CA").format(new Date());
}

export function useDiaryEntries() {
  const [entries, setEntries] = useLocalStorage<DiaryEntry[]>(
    STORAGE_KEYS.diaryEntries,
    initialDiaryEntries,
  );

  const addEntry = ({ title, content, author, date }: NewDiaryEntry) => {
    const trimmedTitle = title.trim();
    const trimmedContent = content.trim();

    if (!trimmedTitle || !trimmedContent) {
      return false;
    }

    setEntries((currentEntries) => [
      {
        id: createDiaryEntryId(),
        date: date || getTodayDate(),
        title: trimmedTitle,
        content: trimmedContent,
        author,
        createdAt: new Date().toISOString(),
      },
      ...currentEntries,
    ]);

    return true;
  };

  const deleteEntry = (id: string) => {
    setEntries((currentEntries) => currentEntries.filter((entry) => entry.id !== id));
  };

  return {
    entries,
    addEntry,
    deleteEntry,
  };
}
