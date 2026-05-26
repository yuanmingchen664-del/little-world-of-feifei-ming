import { useState } from "react";
import {
  AnniversaryColor,
  AnniversaryMode,
  getAnniversaryMode,
  getAnniversaryStatus,
  getAnnualDaysUntil,
  getDaysSince,
  getNextAnnualDate,
  useAnniversaries,
} from "../hooks/useAnniversaries";
import { PixelPlus, PixelCalendar, PixelSparkle, PixelTrash } from "./PixelIcons";

const currentYear = String(new Date().getFullYear());

export function AnniversariesPage() {
  const { anniversaries, addAnniversary, deleteAnniversary, toggleAnniversaryMode } = useAnniversaries();
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [year, setYear] = useState(currentYear);
  const [mode, setMode] = useState<AnniversaryMode>("countdown");

  const getColorClasses = (color: AnniversaryColor) => {
    const colors: Record<string, { bg: string; border: string }> = {
      amber: { bg: "bg-amber-100", border: "border-amber-600" },
      orange: { bg: "bg-orange-100", border: "border-orange-600" },
      yellow: { bg: "bg-yellow-100", border: "border-yellow-600" },
    };
    return colors[color] || colors.amber;
  };

  const updateDateYear = (nextYear: string) => {
    const [, month = "01", day = "01"] = date.split("-");
    setDate(`${nextYear}-${month || "01"}-${day || "01"}`);
  };

  const handleYearChange = (value: string) => {
    const nextYear = value.replace(/\D/g, "").slice(0, 4);
    setYear(nextYear);

    if (nextYear.length === 4) {
      updateDateYear(nextYear);
    }
  };

  const handleDateChange = (value: string) => {
    setDate(value);

    const [nextYear] = value.split("-");
    if (nextYear) {
      setYear(nextYear);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (addAnniversary({ title, date, color: "amber", mode })) {
      setTitle("");
      setDate("");
      setYear(currentYear);
      setMode("countdown");
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

            <label htmlFor="anniversary-year" className="sr-only">纪念日年份</label>
            <input
              id="anniversary-year"
              inputMode="numeric"
              pattern="[0-9]*"
              value={year}
              onChange={(event) => handleYearChange(event.target.value)}
              placeholder="年份，例如 1995"
              className="w-full bg-amber-50 border-4 border-black px-3 py-3 text-[8px] text-gray-800 placeholder:text-gray-400 outline-none focus:bg-white"
            />

            <label htmlFor="anniversary-date" className="sr-only">纪念日日期</label>
            <input
              id="anniversary-date"
              type="date"
              value={date}
              onChange={(event) => handleDateChange(event.target.value)}
              className="w-full bg-amber-50 border-4 border-black px-3 py-3 text-[8px] text-gray-800 outline-none focus:bg-white"
            />

            <div className="grid grid-cols-2 gap-2">
              {([
                { value: "countdown", label: "倒数" },
                { value: "countup", label: "已过" },
              ] as { value: AnniversaryMode; label: string }[]).map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setMode(option.value)}
                  className={`border-4 border-black px-3 py-2 text-[8px] transition-all ${
                    mode === option.value
                      ? "bg-orange-500 text-white"
                      : "bg-amber-100 text-gray-700 active:translate-y-[1px]"
                  }`}
                >
                  {option.label}
                </button>
              ))}
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
          const mode = getAnniversaryMode(anniversary);
          const daysUntil = getAnnualDaysUntil(anniversary.date);
          const daysSince = getDaysSince(anniversary.date);
          const displayDays = mode === "countup" ? daysSince : Math.abs(daysUntil);
          const status = mode === "countup" ? "天了" : getAnniversaryStatus(daysUntil);
          const nextDate = getNextAnnualDate(anniversary.date);
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
                    {mode === "countdown" && (
                      <>
                        <span className="w-1 h-1 bg-gray-400" />
                        下次 {nextDate}
                      </>
                    )}
                  </p>
                </div>
                <div className="text-center flex-shrink-0">
                  <div className="text-2xl text-amber-900">
                    {displayDays}
                  </div>
                  <div className="text-[7px] text-gray-600">{status}</div>
                  <button
                    type="button"
                    onClick={() => toggleAnniversaryMode(anniversary.id)}
                    className="mt-2 bg-white text-gray-700 border-4 border-black px-2 py-1 text-[7px] active:translate-x-[1px] active:translate-y-[1px]"
                  >
                    {mode === "countup" ? "已过" : "倒数"}
                  </button>
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
