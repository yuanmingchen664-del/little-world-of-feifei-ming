import { Outlet, NavLink } from "react-router";
import { useAuth } from "../auth/AuthProvider";
import { PixelHome, PixelBook, PixelMail, PixelList, PixelCalendar, PixelImage } from "./PixelIcons";

export function Layout() {
  const { account, signOut } = useAuth();

  return (
    <div className="flex flex-col h-full bg-amber-200" style={{ fontFamily: 'Press Start 2P, monospace' }}>
      <main className="flex-1 overflow-hidden">
        <Outlet />
      </main>

      <nav className="flex-shrink-0 bg-amber-900 border-t-4 border-black safe-area-inset-bottom">
        <div className="flex items-center justify-between px-3 py-2 border-b-2 border-black text-amber-200">
          <span className="text-[7px]">当前：{account?.displayName}</span>
          <button type="button" onClick={signOut} className="text-[7px] text-amber-300 active:opacity-70">
            退出
          </button>
        </div>
        <div className="flex justify-around items-center h-24 px-1">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-1 px-3 py-3 border-2 transition-all min-w-[56px] min-h-[60px] ${
                isActive
                  ? "bg-orange-500 border-black text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                  : "border-transparent text-amber-300 active:translate-y-[2px]"
              }`
            }
          >
            <PixelHome size={20} />
            <span className="text-[8px]">首页</span>
          </NavLink>

          <NavLink
            to="/diary"
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-1 px-3 py-3 border-2 transition-all min-w-[56px] min-h-[60px] ${
                isActive
                  ? "bg-orange-500 border-black text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                  : "border-transparent text-amber-300 active:translate-y-[2px]"
              }`
            }
          >
            <PixelBook size={20} />
            <span className="text-[8px]">日记</span>
          </NavLink>

          <NavLink
            to="/notes"
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-1 px-3 py-3 border-2 transition-all min-w-[56px] min-h-[60px] ${
                isActive
                  ? "bg-orange-500 border-black text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                  : "border-transparent text-amber-300 active:translate-y-[2px]"
              }`
            }
          >
            <PixelMail size={20} />
            <span className="text-[8px]">纸条</span>
          </NavLink>

          <NavLink
            to="/todos"
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-1 px-3 py-3 border-2 transition-all min-w-[56px] min-h-[60px] ${
                isActive
                  ? "bg-orange-500 border-black text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                  : "border-transparent text-amber-300 active:translate-y-[2px]"
              }`
            }
          >
            <PixelList size={20} />
            <span className="text-[8px]">待办</span>
          </NavLink>

          <NavLink
            to="/anniversaries"
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-1 px-3 py-3 border-2 transition-all min-w-[56px] min-h-[60px] ${
                isActive
                  ? "bg-orange-500 border-black text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                  : "border-transparent text-amber-300 active:translate-y-[2px]"
              }`
            }
          >
            <PixelCalendar size={20} />
            <span className="text-[8px]">纪念日</span>
          </NavLink>

          <NavLink
            to="/photos"
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-1 px-3 py-3 border-2 transition-all min-w-[56px] min-h-[60px] ${
                isActive
                  ? "bg-orange-500 border-black text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                  : "border-transparent text-amber-300 active:translate-y-[2px]"
              }`
            }
          >
            <PixelImage size={20} />
            <span className="text-[8px]">照片</span>
          </NavLink>
        </div>
      </nav>
    </div>
  );
}
