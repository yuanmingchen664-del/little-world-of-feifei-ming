import { PixelCalendar, PixelCheckbox, PixelHeart } from "./PixelIcons";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import catsBackground from "../../imports/image-4.png";
import heartImage from "../../imports/image-3.png";
import smallHeart from "../../imports/image-5.png";

interface Anniversary {
  id: string;
  title: string;
  date: string;
  daysUntil: number;
}

interface Photo {
  id: string;
  url: string;
}

interface TodoItem {
  id: string;
  title: string;
  completed: boolean;
}

export function HomePage() {
  const nextAnniversary: Anniversary = {
    id: "1",
    title: "在一起纪念日",
    date: "2024-06-14",
    daysUntil: 21,
  };

  const recentPhotos: Photo[] = [
    {
      id: "1",
      url: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=600",
    },
    {
      id: "2",
      url: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=600",
    },
    {
      id: "3",
      url: "https://images.unsplash.com/photo-1464047736614-af63643285bf?w=600",
    },
  ];

  const todos: TodoItem[] = [
    {
      id: "1",
      title: "准备生日礼物",
      completed: false,
    },
    {
      id: "2",
      title: "订餐厅",
      completed: true,
    },
    {
      id: "3",
      title: "买鲜花",
      completed: false,
    },
  ];

  return (
    <div className="h-full overflow-auto bg-amber-200" style={{ fontFamily: 'Press Start 2P, monospace' }}>
      {/* 头部像素区域 - 使用猫咪背景图 */}
      <div
        className="relative h-[65vh] bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage: `url(${catsBackground})`,
          imageRendering: 'pixelated'
        }}
      >
        <div className="absolute bottom-0 left-0 right-0 flex justify-center items-center pb-6">
          <h1 className="text-2xl text-white text-center leading-relaxed drop-shadow-[4px_4px_0px_rgba(0,0,0,0.5)]">
            菲菲&小明的小世界
          </h1>
          <ImageWithFallback
            src={smallHeart}
            alt="Heart"
            className="h-10 w-auto ml-3"
            style={{ imageRendering: 'pixelated', objectFit: 'contain' }}
          />
        </div>
      </div>

      {/* 纪念日倒数 - 像素卡片 */}
      <div className="px-4 mt-4">
        <div className="bg-white border-4 border-black p-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex items-center gap-2 text-amber-600 mb-3">
            <PixelCalendar size={16} />
            <span className="text-[8px] tracking-wider">即将到来</span>
          </div>

          <h2 className="text-[10px] mb-1 leading-relaxed">{nextAnniversary.title}</h2>
          <p className="text-[7px] text-gray-500 mb-3">{nextAnniversary.date}</p>

          <div className="bg-amber-100 border-2 border-amber-600 p-4 text-center">
            <div className="text-3xl text-amber-800 mb-1">
              {nextAnniversary.daysUntil}
            </div>
            <div className="text-[8px] text-amber-600">天后</div>
          </div>
        </div>
      </div>

      {/* 待办事项 */}
      <div className="px-4 py-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-[10px] text-gray-800">待办事项</h3>
          <a href="/todos" className="text-amber-600 text-[8px] active:opacity-70">
            查看全部 &gt;
          </a>
        </div>

        <div className="space-y-2">
          {todos.slice(0, 3).map((todo) => (
            <div
              key={todo.id}
              className="bg-white border-2 border-black p-3 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center gap-3"
            >
              <PixelCheckbox size={16} checked={todo.completed} className="flex-shrink-0 text-amber-600" />
              <span className={`text-[8px] flex-1 leading-relaxed ${todo.completed ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
                {todo.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 最近照片预览 */}
      <div className="px-4 py-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-[10px] text-gray-800">最近的回忆</h3>
          <a href="/photos" className="text-amber-600 text-[8px] active:opacity-70">
            查看全部 &gt;
          </a>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {recentPhotos.map((photo, index) => (
            <div
              key={photo.id}
              className="aspect-square border-4 border-black overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <img
                src={photo.url}
                alt="Memory"
                className="w-full h-full object-cover"
                style={{ imageRendering: 'pixelated' }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* 相恋天数 - 像素卡片 */}
      <div className="px-4 pb-6">
        <div className="bg-gradient-to-r from-pink-500 via-red-500 to-pink-500 border-4 border-black p-6 text-white text-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex items-center justify-center gap-0 mb-3">
            <PixelHeart
              size={32}
              filled
              className="animate-pulse"
              style={{ animationDuration: '1.5s', animationDelay: '0ms' }}
            />
            <PixelHeart
              size={32}
              filled
              className="animate-pulse -ml-2"
              style={{ animationDuration: '1.5s', animationDelay: '750ms' }}
            />
          </div>
          <p className="text-[8px] mb-2">我们已经相恋</p>
          <div className="text-4xl mb-2">365</div>
          <p className="text-[8px]">天了</p>
        </div>
      </div>
    </div>
  );
}
