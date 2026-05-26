import { useState } from "react";
import { NoteAuthor } from "../hooks/useNotes";
import { useDiaryEntries } from "../hooks/useDiaryEntries";
import { PixelHeart, PixelBook, PixelFeather, PixelTrash } from "./PixelIcons";

export function DiaryPage() {
  const { entries, addEntry, deleteEntry } = useDiaryEntries();
  const [isWriting, setIsWriting] = useState(false);
  const [author, setAuthor] = useState<NoteAuthor>("小明");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (addEntry({ title, content, author })) {
      setTitle("");
      setContent("");
      setIsWriting(false);
    }
  };

  return (
    <div className="h-full flex flex-col bg-amber-200" style={{ fontFamily: 'Press Start 2P, monospace' }}>
      <header className="flex-shrink-0 p-4 bg-amber-900 border-b-4 border-black">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[10px] flex items-center gap-2 text-amber-100">
              <PixelBook size={16} />
              共同日记
            </h1>
            <p className="text-[7px] text-amber-300 mt-1">记录我们的每一天</p>
          </div>
          <button
            type="button"
            onClick={() => setIsWriting((current) => !current)}
            className="bg-orange-500 border-4 border-black text-white px-5 py-3 flex items-center gap-2 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all min-h-[52px]"
          >
            <PixelFeather size={16} />
            <span className="text-[10px]">{isWriting ? "收起" : "写日记"}</span>
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-auto p-4 space-y-3">
        {isWriting && (
          <form
            onSubmit={handleSubmit}
            className="bg-white border-4 border-black p-4 space-y-3 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
          >
            <div className="flex gap-2">
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

            <label htmlFor="diary-title" className="sr-only">日记标题</label>
            <input
              id="diary-title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="今天的标题"
              className="w-full bg-amber-50 border-4 border-black px-3 py-3 text-[8px] text-gray-800 placeholder:text-gray-400 outline-none focus:bg-white"
            />

            <label htmlFor="diary-content" className="sr-only">日记内容</label>
            <textarea
              id="diary-content"
              value={content}
              onChange={(event) => setContent(event.target.value)}
              placeholder="记录今天发生的事..."
              rows={4}
              className="w-full resize-none bg-amber-50 border-4 border-black px-3 py-3 text-[8px] text-gray-800 placeholder:text-gray-400 outline-none focus:bg-white leading-relaxed"
            />

            <button
              type="submit"
              className="w-full bg-orange-500 border-4 border-black text-white px-5 py-3 flex items-center justify-center gap-2 active:translate-x-[2px] active:translate-y-[2px] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none transition-all min-h-[48px]"
            >
              <PixelFeather size={16} />
              <span className="text-[10px]">保存日记</span>
            </button>
          </form>
        )}

        {entries.map((entry) => (
          <div
            key={entry.id}
            className="bg-white border-4 border-black p-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-amber-600 border border-black" />
                  <h3 className="text-[10px] leading-relaxed">{entry.title}</h3>
                </div>
                <p className="text-[7px] text-gray-500 ml-4 flex items-center gap-2">
                  <span>{entry.date}</span>
                  <span className="w-1 h-1 bg-gray-400" />
                  <span>{entry.author}</span>
                </p>
              </div>
              <div className="flex items-center gap-2">
                <PixelHeart size={14} className="text-amber-500 opacity-60" />
                <button
                  type="button"
                  aria-label={`删除${entry.title}`}
                  onClick={() => deleteEntry(entry.id)}
                  className="bg-red-500 text-white border-4 border-black p-2 active:translate-x-[1px] active:translate-y-[1px]"
                >
                  <PixelTrash size={12} />
                </button>
              </div>
            </div>
            <p className="text-[8px] text-gray-700 leading-relaxed ml-4">{entry.content}</p>
          </div>
        ))}

        {entries.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <div className="bg-white border-4 border-black p-6 inline-block">
              <PixelBook size={32} className="mx-auto mb-3 opacity-40" />
              <p className="text-[8px] leading-relaxed">还没有日记<br/>开始记录你们的故事吧</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
