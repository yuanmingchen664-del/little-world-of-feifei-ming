import { useState } from "react";
import {
  AnniversaryColor,
  getAnniversaryStatus,
  getDaysUntil,
  useAnniversaries,
} from "../hooks/useAnniversaries";
import { PixelPlus, PixelCalendar, PixelSparkle, PixelTrash } from "./PixelIcons";

export function AnniversariesPage() {
  const { anniversaries, addAnniversary, deleteAnniversary } = useAnniversaries();
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [color, setColor] = useState<AnniversaryColor>("amber");

  const getColorClasses = (color: AnniversaryColor) => {
    const colors: Record<string, { bg: string; border: string }> = {
      amber: { bg: "bg-amber-100", border: "border-amber-600" },
      orange: { bg: "bg-orange-100", border: "border-orange-600" },
      yellow: { bg: "bg-yellow-100", border: "border-yellow-600" },
    };
    return colors[color] || colors.amber;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (addAnniversary({ title, date, color })) {
      setTitle("");
      setDate("");
      setColor("amber");
      setIsAdding(false);
    }
  };

  return (
    <div className="h-full flex flex-col bg-amber-200" style={{ fontFamily: 'Press Start 2P, monospace' }}>
      <header className="flex-shrink-0 p-4 bg-amber-900 border-b-4 border-black">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[10px] flex items-center gap-2 text-amber-100">
              <PixelCalendar size={16} />
              纪念日
            </h1>
            <p className="text-[7px] text-amber-300 mt-1">记住重要的日子</p>
          </div>
          <button
            type="button"
            onClick={() => setIsAdding((current) => !current)}
            className="bg-orange-500 border-4 border-black text-white px-5 py-3 flex items-center gap-2 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all min-h-[52px]"
          >
            <PixelPlus size={16} />
            <span className="text-[10px]">{isAdding ? "收起" : "添加"}</span>
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-auto p-4 space-y-3">
        {isAdding && (
          <form
            onSubmit={handleSubmit}
            className="bg-white border-4 border-black p-4 space-y-3 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
          >
            <label htmlFor="anniversary-title" className="sr-only">纪念日名称</label>
            <input
              id="anniversary-title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="纪念日名称"
              className="w-full bg-amber-50 border-4 border-black px-3 py-3 text-[8px] text-gray-800 placeholder:text-gray-400 outline-none focus:bg-white"
            />

            <label htmlFor="anniversary-date" className="sr-only">纪念日日期</label>
            <input
              id="anniversary-date"
              type="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
              className="w-full bg-amber-50 border-4 border-black px-3 py-3 text-[8px] text-gray-800 outline-none focus:bg-white"
            />

            <div className="grid grid-cols-3 gap-2">
              {(["amber", "orange", "yellow"] as AnniversaryColor[]).map((option) => {
                const colorClasses = getColorClasses(option);
                return (
                  <button
                    key={option}
                    type="button"
                    aria-label={`选择${option}颜色`}
                    onClick={() => setColor(option)}
                    className={`${colorClasses.bg} border-4 ${color === option ? colorClasses.border : "border-black"} min-h-[40px] active:translate-y-[1px]`}
                  />
                );
              })}
            </div>

            <button
              type="submit"
              className="w-full bg-orange-500 border-4 border-black text-white px-5 py-3 flex items-center justify-center gap-2 active:translate-x-[2px] active:translate-y-[2px] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none transition-all min-h-[48px]"
            >
              <PixelPlus size={16} />
              <span className="text-[10px]">保存纪念日</span>
            </button>
          </form>
        )}

        {anniversaries.map((anniversary) => {
          const colorClasses = getColorClasses(anniversary.color);
          const daysUntil = getDaysUntil(anniversary.date);
          const status = getAnniversaryStatus(daysUntil);
          return (
            <div
              key={anniversary.id}
              className={`${colorClasses.bg} border-4 ${colorClasses.border} p-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <PixelSparkle size={12} className="text-amber-800" />
                    <h3 className="text-[10px] leading-relaxed">{anniversary.title}</h3>
                  </div>
                  <p className="text-[7px] text-gray-600 flex items-center gap-1.5 ml-4">
                    <PixelCalendar size={10} />
                    {anniversary.date}
                  </p>
                </div>
                <div className="text-center flex-shrink-0">
                  <div className="text-2xl text-amber-900">
                    {Math.abs(daysUntil)}
                  </div>
                  <div className="text-[7px] text-gray-600">{status}</div>
                  <button
                    type="button"
                    aria-label={`删除${anniversary.title}`}
                    onClick={() => deleteAnniversary(anniversary.id)}
                    className="mt-2 bg-red-500 text-white border-4 border-black p-2 active:translate-x-[1px] active:translate-y-[1px]"
                  >
                    <PixelTrash size={12} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {anniversaries.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <div className="bg-white border-4 border-black p-6 inline-block">
              <PixelCalendar size={32} className="mx-auto mb-3 opacity-40" />
              <p className="text-[8px] leading-relaxed">还没有纪念日<br/>添加一个重要的日子吧</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
