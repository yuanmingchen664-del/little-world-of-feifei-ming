import { useState } from "react";
import { PixelHeart } from "../components/PixelIcons";
import { useAuth } from "./AuthProvider";

export function LoginPage() {
  const { isLoading, isSupabaseConfigured, signIn } = useAuth();
  const [loginName, setLoginName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    const result = await signIn(loginName, password);

    setIsSubmitting(false);

    if (result.error) {
      setError(result.error);
    }
  };

  return (
    <div className="min-h-full bg-amber-200 flex items-center justify-center p-6" style={{ fontFamily: 'Press Start 2P, monospace' }}>
      <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white border-4 border-black p-5 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] space-y-4">
        <div className="text-center">
          <PixelHeart size={32} filled className="mx-auto text-orange-500 mb-3" />
          <h1 className="text-[12px] leading-relaxed">菲菲&小明的小世界</h1>
          <p className="text-[7px] text-gray-500 mt-2 leading-relaxed">登录后两个人会看到同一份内容</p>
        </div>

        {!isSupabaseConfigured && (
          <div className="bg-red-100 border-4 border-red-500 p-3 text-[7px] text-red-700 leading-relaxed">
            还没有配置 Supabase 环境变量。请先设置 VITE_SUPABASE_URL 和 VITE_SUPABASE_ANON_KEY。
          </div>
        )}

        <label htmlFor="login-name" className="sr-only">账号名</label>
        <input
          id="login-name"
          value={loginName}
          onChange={(event) => setLoginName(event.target.value)}
          placeholder="账号名"
          autoComplete="username"
          className="w-full bg-amber-50 border-4 border-black px-3 py-3 text-[8px] text-gray-800 placeholder:text-gray-400 outline-none focus:bg-white"
        />

        <label htmlFor="login-password" className="sr-only">密码</label>
        <input
          id="login-password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="密码"
          autoComplete="current-password"
          className="w-full bg-amber-50 border-4 border-black px-3 py-3 text-[8px] text-gray-800 placeholder:text-gray-400 outline-none focus:bg-white"
        />

        {error && <p className="text-[7px] text-red-600 leading-relaxed">{error}</p>}

        <button
          type="submit"
          disabled={isLoading || isSubmitting || !isSupabaseConfigured}
          className="w-full bg-orange-500 border-4 border-black text-white px-5 py-3 active:translate-x-[2px] active:translate-y-[2px] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none transition-all min-h-[48px] disabled:opacity-60"
        >
          <span className="text-[10px]">{isSubmitting ? "登录中" : "登录"}</span>
        </button>

        <div className="text-[7px] text-gray-500 leading-relaxed">
          账号：feifei / ming
        </div>
      </form>
    </div>
  );
}
