import { STORAGE_KEYS } from "../lib/storageKeys";
import { useLocalStorage } from "./useLocalStorage";

export type NoteAuthor = "菲菲" | "小明";

export interface Note {
  id: string;
  content: string;
  from: NoteAuthor;
  to: NoteAuthor;
  createdAt: string;
}

const initialNotes: Note[] = [
  {
    id: "initial-1",
    content: "今天想你了",
    from: "菲菲",
    to: "小明",
    createdAt: "2026-05-25T10:30:00.000Z",
  },
  {
    id: "initial-2",
    content: "晚上一起吃饭吗？",
    from: "小明",
    to: "菲菲",
    createdAt: "2026-05-25T12:15:00.000Z",
  },
];

function createNoteId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function getRecipient(author: NoteAuthor): NoteAuthor {
  return author === "小明" ? "菲菲" : "小明";
}

export function formatNoteTime(createdAt: string) {
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(createdAt));
}

export function useNotes() {
  const [notes, setNotes] = useLocalStorage<Note[]>(STORAGE_KEYS.notes, initialNotes);

  const addNote = (content: string, from: NoteAuthor) => {
    const trimmedContent = content.trim();

    if (!trimmedContent) {
      return false;
    }

    setNotes((currentNotes) => [
      {
        id: createNoteId(),
        content: trimmedContent,
        from,
        to: getRecipient(from),
        createdAt: new Date().toISOString(),
      },
      ...currentNotes,
    ]);

    return true;
  };

  const deleteNote = (id: string) => {
    setNotes((currentNotes) => currentNotes.filter((note) => note.id !== id));
  };

  return {
    notes,
    addNote,
    deleteNote,
  };
}
