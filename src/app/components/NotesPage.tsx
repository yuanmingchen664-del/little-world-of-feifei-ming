import { useState } from "react";
import { formatNoteTime, NoteAuthor, useNotes } from "../hooks/useNotes";
import { PixelSend, PixelMail, PixelTrash } from "./PixelIcons";

export function NotesPage() {
  const { notes, addNote, deleteNote } = useNotes();
  const [newNote, setNewNote] = useState("");
  const [author, setAuthor] = useState<NoteAuthor>("小明");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (addNote(newNote, author)) {
      setNewNote("");
    }
  };

  return (
    <div className="h-full flex flex-col bg-amber-200" style={{ fontFamily: 'Press Start 2P, monospace' }}>
      <header className="flex-shrink-0 p-4 bg-amber-900 border-b-4 border-black">
        <h1 className="text-[10px] flex items-center gap-2 text-amber-100">
          <PixelMail size={16} />
          小纸条
        </h1>
        <p className="text-[7px] text-amber-300 mt-1">传递爱的留言</p>
      </header>

      <div className="flex-1 overflow-auto p-4 space-y-2.5">
        <div className="bg-white border-4 border-black p-2 flex gap-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          {(["小明", "菲菲"] as NoteAuthor[]).map((person) => (
            <button
              key={person}
              type="button"
              onClick={() => setAuthor(person)}
              className={`flex-1 border-4 border-black px-3 py-2 text-[8px] transition-all ${
                author === person
                  ? "bg-orange-500 text-white"
                  : "bg-amber-100 text-gray-700 active:translate-y-[1px]"
              }`}
            >
              {person}
            </button>
          ))}
        </div>

        {notes.map((note) => (
          <div
            key={note.id}
            className={`p-3 border-4 border-black max-w-[85%] transition-all relative ${
              note.from === "小明"
                ? "bg-orange-500 text-white ml-auto shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
                : "bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
            }`}
          >
            <div className="flex items-start gap-2">
              <p className="text-[8px] mb-2 leading-relaxed flex-1">{note.content}</p>
              <button
                type="button"
                aria-label={`删除${note.content}`}
                onClick={() => deleteNote(note.id)}
                className={`flex-shrink-0 border-4 border-black p-1.5 active:translate-x-[1px] active:translate-y-[1px] ${
                  note.from === "小明"
                    ? "bg-white text-red-500"
                    : "bg-red-500 text-white"
                }`}
              >
                <PixelTrash size={12} />
              </button>
            </div>
            <div
              className={`text-[7px] flex items-center gap-1.5 ${
                note.from === "小明" ? "text-white/80" : "text-gray-500"
              }`}
            >
              <span>{note.from}</span>
              <span className="w-1 h-1 bg-current opacity-50" />
              <span>{formatNoteTime(note.createdAt)}</span>
            </div>
          </div>
        ))}

        {notes.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <div className="bg-white border-4 border-black p-6 inline-block">
              <PixelSend size={32} className="mx-auto mb-3 opacity-40" />
              <p className="text-[8px] leading-relaxed">还没有纸条<br/>给 TA 写一张吧</p>
            </div>
          </div>
        )}
      </div>

      <div className="flex-shrink-0 p-4 bg-amber-900 border-t-4 border-black">
        <form onSubmit={handleSubmit} className="bg-white border-4 border-black flex items-center px-4 py-3 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <label htmlFor="new-note-content" className="sr-only">新的小纸条</label>
          <input
            id="new-note-content"
            type="text"
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="写下你想说的话..."
            className="flex-1 py-3 outline-none bg-transparent text-[10px] placeholder:text-gray-400 leading-relaxed"
            style={{ fontFamily: 'Press Start 2P, monospace' }}
          />
          <button
            type="submit"
            aria-label="发送小纸条"
            className="bg-orange-500 border-4 border-black text-white p-3 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all ml-3 min-h-[52px] min-w-[52px] flex items-center justify-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
          >
            <PixelSend size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}
